<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HospitalConfigItem extends Model
{
    protected $table = 'hospital_config_items';

    protected $fillable = ['hospital_id', 'config_key', 'path', 'value'];

    protected $casts = [
        'value' => 'array',
    ];

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }
}
