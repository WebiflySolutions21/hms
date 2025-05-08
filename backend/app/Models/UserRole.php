<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users_roles';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'user_id',
        'role_id',
    ];

    /**
     * Get the user associated with the user_role.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the role associated with the user_role.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
