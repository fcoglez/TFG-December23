<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Exercise;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ExerciseController extends Controller{

    public function findAll() {
        return Exercise::all();
    }

    public function create(Request $request) {
        try{
            $validatedData = Validator::make($request->all(), [
                'name' => ['required', 'string', 'max:20'],
                'description' => ['required', 'string']
            ]);

            if ($validatedData->fails()) {
                return response()->json(['message' => $validatedData->messages()], 400);
            }

            $exercise = Exercise::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
            ]);

            return response()->json(['message' => 'Ejercicio insertado correctamente', 'user' => $exercise], 201);
        } catch(ModelNotFoundException $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function findById(string $id) {
        try {
            $exercise = Exercise::findOrFail($id);
            return response()->json(['exercise' => $exercise], 200);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'Ejercicio no encontrado'], 404);
        }
    }

    public function update(Request $request, string $id) {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json(['message' => 'Ejercicio no encontrado'], 404);
        }

        $validatedData = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:20'],
            'description' => ['required', 'string'],
        ]);

        if ($validatedData->fails()) {
            return response()->json(['message' => 'Error en la validación de datos', 'errors' => $validatedData->errors()], 400);
        }

        try {
            $exercise = Exercise::findOrFail($id);
            $exercise->name = $request->input('name');
            $exercise->description = $request->input('description');
            $exercise->save();
            return response()->json(['message' => 'Ejercicio actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Error al actualizar el Ejercicio: ' . $e->getMessage()], 500);
        }
    }

    public function remove(string $id){
        try {
            $exercise = Exercise::findOrFail($id);
            if ($exercise->image) {
                $oldPath = '../storage/app/upload/exercises/'.$exercise->image;
                if (realpath($oldPath)) {
                    @unlink($oldPath);
                }
            }
            $exercise->delete();
            return response()->json(['message' => 'Ejercicio eliminado correctamente'], 200);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'Ejercicio no encontrado'], 404);
        }
    }
}
