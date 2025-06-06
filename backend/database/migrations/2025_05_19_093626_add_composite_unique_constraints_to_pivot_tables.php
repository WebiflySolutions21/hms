<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users_roles', function (Blueprint $table) {
            $table->unique(['role_id', 'user_id']);
        });
        Schema::table('roles_permissions', function (Blueprint $table) {
            $table->unique(['role_id', 'permission_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users_roles', function (Blueprint $table) {
            $table->dropUnique(['role_id', 'user_id']);
        });
        Schema::table('roles_permissions', function (Blueprint $table) {
            $table->dropUnique(['role_id', 'permission_id']);
        });
    }
};
