<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
    protected $fillable = ['name'];

    public function hospitalFormVersionDetails(): HasMany
    {
        return $this->hasMany(HospitalFormVersionDetail::class, 'form_version_id');
    }

    public function versions(): HasMany
    {
        return $this->hasMany(FormVersion::class, 'form_id');
    }
}
