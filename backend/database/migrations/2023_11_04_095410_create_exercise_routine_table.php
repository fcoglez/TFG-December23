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
        Schema::create('exercise_routine', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('routine_id')->unsigned();
            $table->bigInteger('exercise_id')->unsigned();
            $table->timestamps();

            $table->foreign('routine_id')->references('id')->on('routines')->onDelete('cascade');
            $table->foreign('exercise_id')->references('id')->on('exercises')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('exercise_routine');
    }
};
