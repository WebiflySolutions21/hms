<?php

namespace App\Helpers\SuperAdmin;

use App\Constants\RoleConstants;
use App\Helpers\BaseHelper;
use App\Models\Admin;
use App\Models\Form;
use App\Models\FormVersion;
use App\Models\HospitalFormVersionDetail;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SuperAdminHelper extends BaseHelper
{
    public function getFormListByHospitalId($hospital_id): array
    {
        // Get all forms (not deleted)
            $forms = Form::where('is_deleted', 0)->get();

            // Get all hospital form version details for this hospital
            $hospitalFormVersions = HospitalFormVersionDetail::where('hospital_id', $hospital_id)
                ->get()
                ->keyBy('form_version_id');

            // Get all versions for all forms
            $formVersions = FormVersion::whereIn('form_id', $forms->pluck('id'))
                ->get()
                ->groupBy('form_id');

        $result = [];
        foreach ($forms as $form) {
            $versions = [];
            foreach ($formVersions[$form->id] ?? [] as $version) {
                $hfd = $hospitalFormVersions[$version->id] ?? null;
                $versions[] = [
                    'form_version_id' => $version->id,
                    'version' => $version->version,
                    'json' => $version->json,
                    'status' => $hfd->status ?? 'inactive',
                    'visibility' => isset($hfd->visibility) ? json_decode($hfd->visibility, true) : null,
                ];
            }
            $result[] = [
                'form_id' => $form->id,
                'form_name' => $form->name,
                'versions' => $versions,
            ];
        }

        return $result;
    }

    public function createAdmin(array $data): void
    {
        $user = User::where('username', $data['username'])->first();
        $admin = new Admin;
        $admin->user_id = $user->id;
        $admin->hospital_id = $data['hospital_id'];
        $admin->details = $data['details'] ?? null;
        $admin->save();

        $role = Role::where('name', RoleConstants::ADMIN)->first();
        $user->assignRole($role);

    }

    public function getUsernameList(string $match)
    {
        return User::where('username', 'like', "%$match%")->limit(10)->pluck('username');
    }
}
