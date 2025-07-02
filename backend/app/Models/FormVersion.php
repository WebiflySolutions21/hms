<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormVersion extends Model
{
    public mixed $version;

    protected $table = 'form_versions';

    protected $fillable = [
        'form_id',
        'version',
        'json',
    ];

    protected $casts = [
        'json' => 'array',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }
}
