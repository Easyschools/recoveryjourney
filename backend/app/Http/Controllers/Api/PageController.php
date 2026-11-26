<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        return Page::orderBy('slug')->get();
    }

    public function published()
    {
        return Page::where('is_published', true)->get();
    }

    public function show(string $slug)
    {
        $page = Page::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return $page;
    }

    public function update(Request $request, string $slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        $data = $request->validate([
            'title_ar' => 'sometimes|string',
            'title_en' => 'sometimes|string',
            'meta_desc_ar' => 'nullable|string',
            'meta_desc_en' => 'nullable|string',
            'content_ar' => 'nullable|array',
            'content_en' => 'nullable|array',
            'is_published' => 'boolean',
        ]);

        $page->update($data);

        return $page;
    }
}
