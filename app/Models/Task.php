<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'isDone',
        'end_date',
        'project_id',
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }
    public function project() {
        return $this->belongsTo(Project::class);
    }
}
