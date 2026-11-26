<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        return SiteSetting::all()->pluck('value', 'key');
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => 'required|array',
        ]);

        foreach ($data['settings'] as $key => $value) {
            if (str_starts_with($key, 'image_')) {
                continue;
            }
            SiteSetting::set($key, $value);
        }

        return SiteSetting::all()->pluck('value', 'key');
    }
}
