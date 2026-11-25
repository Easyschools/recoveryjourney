<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'slug', 'title_ar', 'title_en', 'meta_desc_ar', 'meta_desc_en',
        'content_ar', 'content_en', 'is_published',
    ];

    protected $casts = [
        'content_ar' => 'array',
        'content_en' => 'array',
        'is_published' => 'boolean',
    ];
}
