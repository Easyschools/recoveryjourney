<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name_ar', 'name_en', 'code', 'type', 'sort_order', 'is_active',
    ];

    protected $casts = ['is_active' => 'boolean'];
}
