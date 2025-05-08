<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'forms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'json'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'json' => 'array',
    ];

}
