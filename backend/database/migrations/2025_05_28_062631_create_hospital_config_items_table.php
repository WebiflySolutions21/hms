<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hospital_config_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hospital_id')->constrained('hospitals')->onDelete('cascade');
            $table->string('config_key', 255)->nullable(false);
            $table->string('path', 255)->nullable(false);
            $table->json('value')->nullable(false);
            $table->timestamps();
            $table->index(['hospital_id', 'config_key']);
            $table->unique(['hospital_id', 'config_key', 'path']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospital_config_items');
    }
};
