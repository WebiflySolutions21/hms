<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HospitalFormDetail extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'hospitals_forms_details';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'hospital_id',
        'form_id',
        'status',
        'visibility',
    ];

    /**
     * Get the hospital associated with the record.
     */
    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    /**
     * Get the form associated with the record.
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'visibility' => 'array',
    ];

}
