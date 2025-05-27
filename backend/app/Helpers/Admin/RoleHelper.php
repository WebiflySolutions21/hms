<?php

namespace App\Helpers\Admin;

use App\Constants\RoleConstants;
use App\Helpers\BaseHelper;
use App\Models\Doctor;
use App\Models\LabTechnician;
use App\Models\Pharmacist;
use App\Models\Receptionist;
use App\Models\Role;
use App\Models\Staff;
use App\Models\User;

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
}
