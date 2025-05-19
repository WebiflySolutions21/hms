<?php

namespace App\Http\Controllers;

use App\Constants\RoleConstants;
use App\Helpers\ResponseHelper;
use App\Models\Role;
use App\Models\User;

class RoleController extends Controller
{
    public function assignRoleToUser()
    {
        $validation = $this->validateRequest([
            'user_id' => 'required|integer|exists:users,id',
            'hospital_id' => 'required|integer|exists:hospitals,id',
            'role' => 'required|string|in:' . RoleConstants::ADMIN . ',' . RoleConstants::RECEPTION . ',' . RoleConstants::TESTER . ',' . RoleConstants::DOCTOR . ',' . RoleConstants::STAFF . ',' . RoleConstants::LAB . ',' . RoleConstants::PHARMACY,]);

        if ($validation) {
            return $validation;
        }

        $user = User::find($this->validatedData['user_id']);
        $role = Role::find($this->validatedData['role_id']);

        if ($user->hasRole($role)) {
            return ResponseHelper::errorResponse('User already has this role');
        }

        $user->roles()->attach($role);

        return ResponseHelper::successResponse(['message' => 'Role assigned successfully']);
    }
}
