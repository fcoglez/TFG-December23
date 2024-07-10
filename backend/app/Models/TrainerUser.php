<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainerUser extends Model {
    use HasFactory;

    protected $fillable = [
        'trainer_id',
        'user_id',
        'routine_id',
    ];

    // Relaciones muchos a uno con User y Routine
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function routine() {
        return $this->belongsTo(Routine::class, 'routine_id');
    }

    // Relación muchos a uno con User como entrenador
    public function trainer() {
        return $this->belongsTo(User::class, 'trainer_id', 'id');
    }
    
}
