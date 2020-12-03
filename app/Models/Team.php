<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
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
    ];

    public function users() {
        return $this->hasMany(User::class);
    }
    public function projects() {
        return $this->hasMany(Project::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

}
