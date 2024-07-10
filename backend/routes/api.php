<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\RoutineExerciseController;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TrainerUserController;

// #####  Login Users Routes ########
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);


// #####  Users Routes ########
Route::get('users', [UserController::class, 'findAll']);
Route::get('users/{id}', [UserController::class, 'findById']) -> whereNumber('id');
Route::get('users/{email}', [UserController::class, 'findByEmail'])-> where(['email' => '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$']);
Route::get('users/name', [UserController::class, 'findByName']);
Route::get('trainer/{id}', [UserController::class, 'getTrainerData']);
Route::get('normal-user/{id}', [UserController::class, 'getNormalUserData']);
Route::get('/user/{userId}/trainer-name', [UserController::class, 'getTrainerName']);
Route::get('/user/{userId}/routine', [UserController::class, 'getRoutineWithExercises']);
Route::get('/get-users-by-trainer/{trainerId}', [UserController::class, 'getUsersWithoutRoutineByTrainerId']);//sin rutina
Route::get('/get-users-with-routine-trainer/{trainerId}', [UserController::class, 'getUsersWithRoutineByTrainerId']);//con rutina

Route::post('users', [UserController::class, 'create']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'remove']);


// ####  Exercises Routes ####
Route::get('exercises', [ExerciseController::class, 'findAll']);
Route::get('exercises/{id}', [ExerciseController::class, 'findById']);

Route::post('exercises', [ExerciseController::class, 'create']);
Route::put('exercise/{id}', [ExerciseController::class, 'update']);
Route::delete('exercises/{id}', [ExerciseController::class, 'remove']);


// ####  Routines Routes ####
Route::get('routines', [RoutineController::class, 'findAll']);
Route::get('routines-with-exercises', [RoutineExerciseController::class, 'getRoutines']);
Route::get('routines/{id}', [RoutineController::class, 'getRoutineById']);

Route::post('routines', [RoutineController::class, 'create']);
Route::put('routine/{id}', [RoutineController::class, 'updateRoutine']);
Route::post('assign-exercises', [RoutineExerciseController::class, 'assignExercises']);
Route::delete('routines/{id}', [RoutineController::class, 'remove']);


// ####  User - Trainer Routes ####
Route::get('trainer-users', [TrainerUserController::class, 'findAllTrainers']);
Route::get('users-withOutTrainer', [TrainerUserController::class, 'getUsersWithoutTrainers']);
Route::get('trainer-users/{id}', [TrainerUserController::class, 'getTrainerDetails']);
Route::get('assigned-users/{id}', [TrainerUserController::class, 'getAssignedUsers']);

Route::post('add-users-trainer/{trainerId}/{userId}', [TrainerUserController::class, 'assignUsersToTrainer']);
Route::delete('remove-assignment/{trainerId}/{userId}',[TrainerUserController::class,  'removeAssignment']);

Route::post('upload/{type}/{id}', [FileController::class, 'uploadFile']);
Route::get('upload/{type}/{file}', [FileController::class, 'downloadFile']);
Route::delete('upload/{type}/{file}', [FileController::class, 'deleteFile']);


// ####  User - Routines Routes ####
Route::get('routine-user', [UserController::class, 'getUsersWithRoutines']);
Route::get('no-routine-user', [UserController::class, 'getUsersWithoutRoutines']);

Route::post('/add-routine-user/{userId}/{routineId}', [UserController::class, 'assignUserToRoutine']);
Route::delete('/remove-routine-user/{userId}', [UserController::class, 'removeRoutineFromUser']);

