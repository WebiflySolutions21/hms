<?php

namespace Database\Seeders;

use App\Models\Permission;

class PermissionsSeeder
{
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'test_permission',
            'manage-hospitals',
            'manage-forms'
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission]
            );
        }
    }
}
