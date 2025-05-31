<?php

namespace App\Helpers\Hospital\Config;

use App\Helpers\BaseHelper;
use App\Models\HospitalConfigItem;
use Illuminate\Support\Facades\DB;

class HospitalConfigHelper extends BaseHelper
{
    private function flattenWithPaths(array $array, string $prefix = ''): array
    {
        $result = [];

        foreach ($array as $key => $value) {
            $newKey = $prefix === '' ? $key : "{$prefix}.{$key}";

            if (is_array($value) && !array_is_list($value)) {
                // Recursively flatten associative arrays
                $result += $this->flattenWithPaths($value, $newKey);
            } else {
                $result[$newKey] = $value;
            }
        }
        return $result;
    }

    public function set(array $data): void
    {
        $toAutoCreatePaths = $data['auto_create_paths'] ?? false;
        $value = $data['value'];
        if (!isset($data['path']) && !$toAutoCreatePaths) {
            $this->addError('Path is required when auto_create_paths is false.');
            return;
        }
        try {
            DB::beginTransaction();
            if ($toAutoCreatePaths) {
                $flatItems = $this->flattenWithPaths($value, $data['path'] ?? '');

                foreach ($flatItems as $path => $value) {
                    HospitalConfigItem::updateOrCreate(
                        [
                            'hospital_id' => $data['hospital_id'],
                            'config_key' => $data['config_key'],
                            'path' => $path,
                        ],
                        ['value' => $value]
                    );
                }
            } else {
                HospitalConfigItem::updateOrCreate(
                    [
                        'hospital_id' => $data['hospital_id'],
                        'config_key' => $data['config_key'],
                        'path' => $data['path'] ?? null,
                    ],
                    ['value' => $value]
                );
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $this->addError('Failed to set hospital configuration: ' . $e->getMessage());
        }

    }

    public function get(array $data): mixed
    {
        $query = HospitalConfigItem::where('hospital_id', $data['hospital_id'])
            ->where('config_key', $data['config_key']);

        $requestedPath = $data['path'] ?? null;
        if ($requestedPath) {
            $query->where('path', 'like', $requestedPath . '%');
        }

        try {
            $results = $query->get();
            $nestedArray = [];
            foreach ($results as $item) {
                $paths = explode('.', $item->path);
                $temp = &$nestedArray;
                foreach ($paths as $path) {
                    if (!isset($temp[$path])) {
                        $temp[$path] = [];
                    }
                    $temp = &$temp[$path];
                }
                $temp = $item->value;
            }
            if ($requestedPath) {
                return $this->getRequestedPath($nestedArray, $requestedPath);
            }
            return $nestedArray;
        } catch (\Exception $e) {
            $this->addError('Failed to retrieve hospital configuration: ' . $e->getMessage());
            return null;
        }
    }

    private function getRequestedPath(array $array, string $requestedPath): mixed
    {
        $keys = explode('.', $requestedPath);
        $currentArray = $array;
        $value = null;
        foreach ($keys as $key) {
            $currentArray = $value = $currentArray[$key];
        }
        return $value;
    }

}
