<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'test@example.com'], // Find by email
            [
                'name' => 'Test User',
                'username' => 'testuser',
                'password' => Hash::make('defaultpassword'), // Provide a hashed password
            ]
        );

        new RolesSeeder()->run();
        new PermissionsSeeder()->run();
        new RolesPermissionsSeeder()->run();

    }
}
