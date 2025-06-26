<?php

namespace App\Http\Controllers;

use App\Helpers\Hospital\Config\HospitalConfigHelper;
use App\Helpers\ResponseHelper;

class HospitalConfigController extends Controller
{
    public function set()
    {
        $isInvalidRequest = $this->validateRequest([
            'hospital_id' => 'required|integer|exists:hospitals,id',
            'config_key' => 'required|regex:/^[a-zA-Z]+$/',
            'path' => 'nullable|regex:/^[a-zA-Z.]+$/',
            'value' => 'required|array',
            'auto_create_paths' => 'nullable|boolean',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        $hospitalConfigHelper = new HospitalConfigHelper;
        $hospitalConfigHelper->set($this->validatedData);
        if ($hospitalConfigHelper->hasErrors()) {
            return ResponseHelper::errorResponse($hospitalConfigHelper->getErrorMessage());
        }

        return ResponseHelper::successResponse(['message' => 'Hospital configurations updated successfully']);
    }

    public function get()
    {
        $isInvalidRequest = $this->validateRequest([
            'hospital_id' => 'required|integer|exists:hospitals,id',
            'config_key' => 'required|regex:/^[a-zA-Z]+$/',
            'path' => 'nullable|regex:/^[a-zA-Z.]+$/',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        $hospitalConfigHelper = new HospitalConfigHelper;
        $config = $hospitalConfigHelper->get($this->validatedData);
        if ($hospitalConfigHelper->hasErrors()) {
            return ResponseHelper::errorResponse($hospitalConfigHelper->getErrorMessage());
        }
        if (empty($config)) {
            return ResponseHelper::errorResponse('No configuration found for the given parameters');
        }

        return ResponseHelper::successResponse(['config' => $config]);
    }
}
