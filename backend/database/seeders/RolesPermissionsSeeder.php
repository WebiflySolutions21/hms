<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;

class RolesPermissionsSeeder
{
    public function run(): void
    {
        // Create roles permissions
        $roles_permissions = [
            'tester' => ['test_permission'],
            'super-admin' => ['manage-hospitals', 'manage-forms'],
        ];

        foreach ($roles_permissions as $role => $permissions) {
            $role_id = Role::where('name', $role)->first()->id;
            foreach ($permissions as $permission) {
                $permission_id = Permission::where('name', $permission)->first()->id;
                RolePermission::updateOrCreate([
                    'role_id' => $role_id,
                    'permission_id' => $permission_id,
                ]);
            }
        }


    }
}
