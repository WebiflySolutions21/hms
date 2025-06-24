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
        Schema::create('hospitals', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['active', 'revoked'])->default('active'); // Enum with default value 'active'
            $table->string('registration_no')->unique()->nullable(false); // Hospital registration number, unique and not null
            $table->string('name')->nullable(false); // Name of the hospital, not null
            $table->string('mobile')->nullable(false); // Mobile/contact information, not null
            $table->text('address')->nullable(false); // Address of the hospital, not null
            $table->datetime('registration_date')->nullable(false); // Registration date, not null
            $table->timestamps(); // Includes created_at and updated_at
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospitals');
    }
};
