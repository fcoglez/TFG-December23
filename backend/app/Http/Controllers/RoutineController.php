<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Routine;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class RoutineController extends Controller {

    public function findAll() {
        $routines = Routine::all();
        return response()->json($routines, 200);
    }

    public function create(Request $request) {
        try {
            $request->validate([
                'name' => 'required|string',
                'description' => 'string|nullable',
                'exercises' => 'array'
            ]);

            $routine = new Routine();
            $routine->name = $request->input('name');
            $routine->description = $request->input('description');
            $routine->save();

            if ($request->has('exercises')) {
                $exerciseIds = $request->input('exercises');
                $routine->exercises()->attach($exerciseIds);
            }

            return response()->json(['message' => 'Rutina creada con éxito'], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ha ocurrido un error al crear la rutina.'], 500);
        }
    }

    public function updateRoutine(Request $request, $id) {
        try {
            $request->validate([
                'name' => 'required|string',
                'description' => 'nullable|string',
                'exercise_ids' => 'array',
            ]);

            $routine = Routine::find($id);

            if (!$routine) {
                return response()->json(['message' => 'La rutina no existe'], 404);
            }

            $routine->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
            ]);

            if ($request->has('exercise_ids')) {
                $routine->exercises()->sync($request->input('exercise_ids'));
            }

            return response()->json(['message' => 'Rutina actualizada correctamente'], 200);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Error editando la  routina', 'error' => $e->getMessage()], 500);
        }
    }

    public function remove($id) {
        try {
            $routine = Routine::find($id);

            if (!$routine) {
                return response()->json(['error' => 'Rutina no encontrada'], 404);
            }

            $routine->exercises()->detach();
            $routine->delete();

            return response()->json(['message' => 'Rutina eliminada con éxito'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Ha ocurrido un error al eliminar la rutina. Detalles: ' . $e->getMessage()], 500);
        }
    }

    public function getRoutineById($id) {
        try {
            $routine = Routine::with('exercises')->findOrFail($id);
            return response()->json(['routine' => $routine], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error retrieving routine'], 500);
        }
    }
}