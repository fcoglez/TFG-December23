<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('trainer_users', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('trainer_id')->unsigned()->nullable()->default(null);
            $table->bigInteger('user_id')->unsigned();
            $table->timestamps();


            $table->foreign('trainer_id')->references('id')->on('users');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainer_users');
    }
};
