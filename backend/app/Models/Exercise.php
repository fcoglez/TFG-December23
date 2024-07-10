<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Routine;


class Exercise extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    public function routines(){
        return $this->belongsToMany(Routine::class);
    }

    public function routine() {
        return $this->belongsTo(Routine::class);
    }
}
