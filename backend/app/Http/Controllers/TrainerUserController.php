<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainerUser;
use App\Models\UserRoutine;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class TrainerUserController extends Controller {

    public function findAllTrainers() {
        try {
            $trainerUsers = User::where('role', 'trainer')->get(['id', 'name']);

            return response()->json($trainerUsers);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUsersWithoutTrainers() {
        try {
            $normalUsersWithoutTrainers = User::where('role', 'normal')
            ->whereDoesntHave('trainerUsers')
            ->get();

            return response()->json($normalUsersWithoutTrainers);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getTrainerById($trainerId) {
        try {
            $trainer = User::with('assignedUsers', 'assignedUsers.routine')->findOrFail($trainerId);

            return response()->json($trainer);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Entrenador no encontrado.'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAssignedUsers($trainerId) {
        try {
            $trainer = User::find($trainerId);

            if (!$trainer) {
                return response()->json(['error' => 'Entrenador no encontrado'], 404);
            }

            $normalUsers = $trainer->normalUsers;

            return response()->json(['assigned users' => $normalUsers]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al obtener usuarios normales asignados: ' . $e->getMessage()], 500);
        }
    }

    public function assignUsersToTrainer($trainerId, $userId) {
        $trainer = User::find($trainerId);
        $user = User::find($userId);

        if (!$trainer || !$user) {
            return response()->json(['error' => 'Usuario o entrenador no encontrado'], 404);
        }

        $trainerUser = new TrainerUser([
            'trainer_id' => $trainer->id,
            'user_id' => $user->id,
        ]);

        $trainerUser->save();

        return response()->json(['message' => 'Asignación exitosa'], 200);
    }

    public function removeAssignment($trainerId, $userId) {
        try {
            TrainerUser::where('trainer_id', $trainerId)
                ->where('user_id', $userId)
                ->delete();

            return response()->json(['message' => 'Asignación eliminada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la asignación. Detalles: ' . $e->getMessage()], 500);
        }
    }

    public function getTrainerDetails($trainerId) {
        try {
            $trainerUsers = TrainerUser::with(['user', 'routine', 'trainer'])
                ->where('trainer_id', $trainerId)
                ->whereHas('trainer', function ($query) use ($trainerId) {
                    $query->where('id', $trainerId);
                })
                ->get();

            $trainerDetails = [];

            foreach ($trainerUsers as $trainerUser) {
                $id = $trainerUser->id;
                $user = $trainerUser->user;
                $trainer = $trainerUser->trainer;

                if ($user && $user->name && $user->surname) {
                    $userName = $user->name . ' ' . $user->surname;
                } else {
                    $userName = 'Nombre no disponible';
                }

                $trainerDetails[] = [
                    'id' => $id,
                    'trainer' => $trainer,
                    'user' => $user,
                    'routine' => $trainerUser->routine,
                    'created_at' => $trainerUser->created_at,
                    'updated_at' => $trainerUser->updated_at,
                ];
            }

            if (empty($trainerDetails)) {
                return response()->json(['message' => 'El entrenador no tiene usuarios asignados'], 200);
            }

            return response()->json($trainerDetails);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Entrenador no encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
