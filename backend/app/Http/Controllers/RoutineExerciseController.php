<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Routine;

class RoutineExerciseController extends Controller {

    public function getRoutines() {
        $routinesWithExercises = Routine::with('exercises')->get();
        return response()->json($routinesWithExercises, 200);
    }

    public function assignExercises(Request $request) {
        $routine = Routine::find($request->routine_id);
        $routine->exercises()->sync($request->exercise_id);

        return response()->json(['message' => 'Ejercicios asignados a la rutina con éxito']);
    }
    
}
