<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Exercise;

class Routine extends Model{

    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function exercises(){
        return $this->belongsToMany(Exercise::class);
    }

    // Relación uno a muchos con TrainerUser (una rutina puede estar asociada a varios usuarios)
    public function trainerUsers() {
        return $this->hasMany(TrainerUser::class, 'routine_id');
    }

    public function users(){
        return $this->belongsToMany(User::class);
    }
}
