<?php

namespace Database\Seeders;

use App\Constants\RoleConstants;
use App\Models\Role;

class RolesSeeder
{
    public function run(): void
    {

        foreach (RoleConstants::ROLES as $role) {
            Role::updateOrCreate(
                ['name' => $role]
            );
        }
    }
}
