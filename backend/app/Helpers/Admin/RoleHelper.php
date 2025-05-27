<?php

namespace App\Helpers\Admin;

use App\Constants\RoleConstants;
use App\Helpers\BaseHelper;
use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\LabTechnician;
use App\Models\Pharmacist;
use App\Models\Receptionist;
use App\Models\Role;
use App\Models\Staff;
use App\Models\User;
use App\Models\Admin;

class RoleHelper extends BaseHelper
{

    public function assignRoleToUser(User $user, Role $role, array $data)
    {
        $user->assignRole($role);
        $model = match ($role->name) {
            RoleConstants::DOCTOR => new Doctor(),
            RoleConstants::LAB_TECHNICIAN => new LabTechnician(),
            RoleConstants::RECEPTIONIST => new Receptionist(),
            RoleConstants::PHARMACIST => new Pharmacist(),
            RoleConstants::STAFF => new Staff(),
            default => null,
        };
        if (!$model) {
            $this->addError('Invalid Role');
        }
        $model->user_id = $user->id;
        $model->hospital_id = $data['hospital_id'];
        $model->details = $data['details'] ?? null;
        $model->save();
    }

    public function getUserDetails(User $user): array
    {
        $user_roles = $user->roles()->get();
        $user_details['name'] = $user->name;
        $user_details['email'] = $user->email;
        $user_details['username'] = $user->username;
        foreach ($user_roles as $user_role) {
            $model = match ($user_role->name) {
                RoleConstants::DOCTOR => Doctor::where('user_id', $user->id)->first(),
                RoleConstants::LAB_TECHNICIAN => LabTechnician::where('user_id', $user->id)->first(),
                RoleConstants::RECEPTIONIST => Receptionist::where('user_id', $user->id)->first(),
                RoleConstants::PHARMACIST => Pharmacist::where('user_id', $user->id)->first(),
                RoleConstants::STAFF => Staff::where('user_id', $user->id)->first(),
                RoleConstants::ADMIN => Admin::where('user_id', $user->id)->first()
            };
            $hospital = Hospital::where('id', $model->hospital_id)->first();
            $user_details['roles'][] = [
                'name' => $user_role->name,
                'details' => $model->details,
                'hospital' => [
                    'name' => $hospital->name,
                    'id' => $hospital->id,
                    'registration_no' => $hospital->registration_no
                ]
            ];
        }
        return $user_details;

    }
}
