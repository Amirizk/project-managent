<?php

namespace App\Models;

use Barryvdh\Reflection\DocBlock\Tag;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'team_admin_id',
        'organization_id',
        'percentage_done',
    ];

    public function tasks() {
        return $this->hasMany(Task::class);
    }

    public function team() {
        return $this->belongsTo(Team::class);
    }


    // belongs to one organization_id
    public function user() {
        return $this->belongsTo(User::class);
    }



}
