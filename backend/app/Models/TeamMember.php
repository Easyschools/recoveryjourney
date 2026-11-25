<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name_ar', 'name_en', 'role_ar', 'role_en',
        'bio_ar', 'bio_en', 'photo', 'sort_order', 'is_active',
    ];

    protected $casts = ['is_active' => 'boolean'];
}
