<?php

namespace Database\Seeders;

use App\Models\Role;

class RolesSeeder
{
    public function run(): void
    {
        // Create roles
        $roles = [
            'tester',
            'super-admin'
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role]
            );
        }
    }
}
