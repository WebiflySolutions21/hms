<?php

namespace Database\Seeders;

use App\Constants\PermissionConstants;
use App\Models\Permission;

class PermissionsSeeder
{
    public function run(): void
    {
        foreach (PermissionConstants::PERMISSIONS as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission]
            );
        }
    }
}
