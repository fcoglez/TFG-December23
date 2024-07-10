<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model {

    use HasFactory;

    protected $fillable = [
        'email',
        'password',
        'name',
        'surname',
        'role',
        'image'
    ];

    public function trainerUsers() {
        return $this->hasMany(TrainerUser::class, 'user_id');
    }

    public function assignedUsers() {
        return $this->belongsToMany(User::class, 'trainer_users', 'trainer_id', 'user_id', 'routine_id');
    }

    public function trainers() {
        return $this->belongsToMany(User::class, 'trainer_users', 'user_id', 'trainer_id');
    }

    public function normalUsers() {
        return $this->belongsToMany(User::class, 'trainer_users', 'trainer_id', 'user_id')
                    ->where('role', 'normal');
    }

    public function trainerUser() {
        return $this->hasOne(TrainerUser::class, 'user_id');
    }

    public function routines(){
        return $this->belongsToMany(Routine::class, 'routine_user', 'user_id', 'routine_id');
    }

    public function trainer(){
        return $this->hasOne(TrainerUser::class, 'user_id', 'id');
    }

    public function routine() {
        return $this->belongsTo(Routine::class);
    }
}


