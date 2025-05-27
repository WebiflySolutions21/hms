<?php

namespace App\Http\Controllers;

use App\Constants\RoleConstants;
use App\Helpers\Admin\RoleHelper;
use App\Helpers\ResponseHelper;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    public function assignRoleToUser()
    {
        $validation = $this->validateRequest([
            'username' => 'required|exists:users,username',
            'hospital_id' => 'required|integer|exists:hospitals,id',
            'role' => 'required|exists:roles,name|string|in:' . RoleConstants::RECEPTIONIST . ',' . RoleConstants::DOCTOR . ',' . RoleConstants::STAFF . ',' . RoleConstants::LAB_TECHNICIAN . ',' . RoleConstants::PHARMACIST,
            'details' => 'array'
        ]);

        if ($validation) {
            return $validation;
        }

        $user = User::where('username', $this->validatedData['username'])->first();
        $role = Role::where('name', $this->validatedData['role'])->first();

        if ($user->hasRole($role)) {
            return ResponseHelper::errorResponse('User already has this role');
        }

        $role_helper = new RoleHelper();
        try {
            DB::beginTransaction();
            $role_helper->assignRoleToUser($user, $role, $this->validatedData);

        } catch (\Exception $exception) {
            DB::rollBack();
            return ResponseHelper::errorResponse($exception->getMessage());
        }
        if ($role_helper->hasErrors()) {
            return ResponseHelper::errorResponse($role_helper->getErrorMessage());
        }
        DB::commit();
        return ResponseHelper::successResponse(['message' => 'Role assigned successfully']);
    }

    public function getUserDetails()
    {
        $user = Auth::user();
        $details = new RoleHelper()->getUserDetails($user);
        return ResponseHelper::successResponse($details);
    }
}
