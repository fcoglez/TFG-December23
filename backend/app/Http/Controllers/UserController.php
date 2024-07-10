<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\TrainerUser;
use App\Models\Routine;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller {

    public function findAll(Request $request) {
        $role = $request-> query('role');

        if ('' != $role ) {
            $user = DB::table('users')->where('role', $role)->get();
            return response()->json(['user' => $user], 200);
        }
        return User::all();
    }

    public function findById(string $id) {
        try {
            $user = User::findOrFail($id);
            return response()->json(['user' => $user], 200);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    public function findByEmail(string $email) {
        try {
            $user = DB::table('users')->where('email', $email)->get();
            return response()->json(['user' => $user], 200);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    public function findByName(Request $request) {
        try {
            $name = $request-> query('name');
            $user = DB::table('users')->where('name', $name)->get();
            return response()->json(['user' => $user], 200);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    public function create(Request $request) {
        try{
            $validatedData = Validator::make($request->all(), [
                'name' => ['required', 'string'],
                'surname' => ['required', 'string'],
                'email' => ['required', 'email'],
                'password' => ['required'],
                'password' => ['required'],
                'role' => ['required']
            ]);

            if ($validatedData->fails()) {
                return response()->json(['message' => $validatedData->messages()], 400);
            }

            if (User::where('email', $request->input('email'))->exists()) {
                return response()->json(['message' => 'Este correo ya esta en uso'], 400);
            }

            $user = User::create([
                'email' => $request->input('email'),
                'password' => $request->input('password'),
                'name' => $request->input('name'),
                'surname' => $request->input('surname'),
                'role' => $request->input('role')
            ]);
            return response()->json(['message' => 'Usuario insertado correctamente', 'user' => $user], 201);
        } catch(ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id) {
        $userID = User::find($id);

        if (!$userID) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $validatedData = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
            'name' => ['required', 'string'],
            'surname' => ['required', 'string'],
        ]);

        if ($validatedData->fails()) {
            return response()->json(['message' => 'Error en la validación de datos', 'errors' => $validatedData->errors()], 400);
        }

        try {
            $user = User::findOrFail($id);
            $user->email = $request->input('email');
            $user->password = $request->input('password');
            $user->name = $request->input('name');
            $user->surname = $request->input('surname');
            $user->role = $request->input('role');
            $user->save();

            return response()->json(['message' => 'Usuario actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Error al actualizar el recurso: ' . $e->getMessage()], 500);
        }
    }

    public function remove(string $id) {
        try {
            $user = User::findOrFail($id);
            if ($user->image) {
                $oldPath = '../storage/app/upload/user/'.$user->image;
                if (realpath($oldPath)) {
                    @unlink($oldPath);
                }
            }
            $user->delete();
            return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    public function register(Request $request) {
        try{
            $validatedData = Validator::make($request->all(), [
                'email' => ['required', 'email'],
                'password' => ['required'],
                'name' => ['required', 'string'],
                'surname' => ['required', 'string']
            ]);

            if ($validatedData->fails()) {
                return response()->json(['message' => 'error en la validación de datos'], 400);
            }

            if (User::where('email', $request->input('email'))->exists()) {
                return response()->json(['message' => 'Este correo ya esta en uso'], 400);
            }

            $user = User::create([
                'email' => $request->input('email'),
                'password' => $request->input('password'),
                'name' => $request->input('name'),
                'surname' => $request->input('surname'),
            ]);

            return response()->json(['message' => 'Usuario registrado correctamente', 'user' => $user], 201);

        } catch(ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request) {

        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'No authorized'], 401);
        }

        try {
            $email = $request->input('email');
            $user = DB::table('users')->where('email', $email)->first();

            if ($user) {
                $password = $request->input('password');
                if ($password != $user->password) {
                    return response()->json(['message' => 'error password'], 401);
                }
                return response()->json(['user' => $user], 200);
            } else {
                return response()->json(['message' => 'No authorized'], 401);
            }
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'No authorized'], 401);
        }
    }

    public function getTrainerData($id) {
        try {

            $trainer = User::where('id', $id)->where('role', 'trainer')->first();

            if (!$trainer) {
                return response()->json(['error' => 'Trainer not found'], 404);
            }

            return response()->json(['data' => $trainer], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function getNormalUserData($id) {
        try {
            $normalUser = User::where('id', $id)->where('role', 'normal')->first();

            if (!$normalUser) {
                return response()->json(['error' => 'Normal user not found'], 404);
            }

            return response()->json(['data' => $normalUser], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function getTrainerName($userId) {
        try {
            $user = User::find($userId);

            if (!$user || $user->role !== 'normal') {
                return response()->json(['error' => 'El usuario no es un usuario normal'], 404);
            }

            $trainerUser = $user->trainer;

            if ($trainerUser) {
                $trainer = $trainerUser->trainer;

                if ($trainer) {
                    return response()->json(['trainerName' => $trainer->name]);
                }
            }

            return response()->json(['message' => 'Este usuario no tiene entrenador asignado'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Se produjo un error: ' . $e->getMessage()], 500);
        }
    }

    public function getRoutineWithExercises($userId) {
        try {
            $user = User::find($userId);

            if (!$user || $user->role !== 'normal') {
                return response()->json(['error' => 'El usuario no es un usuario normal'], 404);
            }

            $routineWithExercises = $user->routines()->with('exercises')->first();

            if (!$routineWithExercises) {
                return response()->json(['message' => 'Este usuario no tiene rutina asignada'], 200);
            }

            return response()->json(['routine' => $routineWithExercises]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Se produjo un error: ' . $e->getMessage()], 500);
        }
    }

    public function getUsersWithRoutines() {
        try {

            $normalUsersWithRoutines = User::where('role', 'normal')
                ->whereHas('routines')
                ->with('routines')
                ->get();

            return response()->json(['usersWithRoutines' => $normalUsersWithRoutines]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al obtener usuarios normales con rutinas', 'message' => $e->getMessage()], 500);
        }
    }

    public function assignUserToRoutine($userId, $routineId) {
        try {
            $routine = Routine::findOrFail($routineId);
            $user = User::where('id', $userId)
                ->where('role', 'normal')
                ->firstOrFail();

            $user->routines()->attach($routine);

            return response()->json(['message' => 'Usuario adjuntado a la rutina exitosamente']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al adjuntar usuario a la rutina', 'message' => $e->getMessage()], 500);
        }
    }

    public function removeRoutineFromUser($userId) {
        try {

            $user = User::findOrFail($userId);
            $user->routines()->detach();

            return response()->json(['message' => 'Asignación de rutinas eliminada exitosamente']);

        } catch(Exception $e) {
            return response()->json(['error' => 'Error al eliminar la asignación de rutinas', 'message' => $e->getMessage()], 500);
        }
    }

    public function getUsersWithoutRoutines() {
        try {
            $usersWithoutRoutines = User::where('role', 'normal')
                ->whereDoesntHave('routines')
                ->get();

            return response()->json(['usersWithoutRoutines' => $usersWithoutRoutines], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUsersWithoutRoutineByTrainerId(Request $request, $trainerId) {
        $trainerId = (int)$trainerId;

        $users = User::join('trainer_users', 'users.id', '=', 'trainer_users.user_id')
            ->leftJoin('routine_user', function ($join) {
                $join->on('users.id', '=', 'routine_user.user_id');
            })
            ->where('trainer_users.trainer_id', $trainerId)
            ->whereNull('routine_user.user_id')
            ->select('users.id as user_id', 'users.email', 'users.name', 'users.surname', 'users.role')
            ->get();

        return response()->json(['usersWithoutRoutine' => $users]);
    }

    public function getUsersWithRoutineByTrainerId(Request $request, $trainerId){
        $trainerId = (int)$trainerId;

        $users = User::join('trainer_users', 'users.id', '=', 'trainer_users.user_id')
            ->join('routine_user', 'users.id', '=', 'routine_user.user_id')
            ->join('routines', 'routine_user.routine_id', '=', 'routines.id')
            ->where('trainer_users.trainer_id', $trainerId)
            ->select('users.id as user_id', 'users.email', 'users.name', 'users.surname', 'users.role', 'routines.name as routine_name')
            ->get();

        return response()->json(['usersWithRoutine' => $users]);
    }
}
