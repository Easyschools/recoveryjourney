<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public const SLOTS = [
        'home_facade', 'home_rooms', 'about_facade', 'about_rooms',
        'about_sessions', 'about_common', 'detox_center', 'family_session',
    ];

    public function index()
    {
        $paths = SiteSetting::whereIn('key', array_map(fn ($s) => "image_$s", self::SLOTS))->pluck('value', 'key');

        return collect(self::SLOTS)->mapWithKeys(function ($slot) use ($paths) {
            $path = $paths["image_$slot"] ?? null;
            return [$slot => $path ? asset("storage/$path") : null];
        });
    }

    public function store(Request $request, string $slot)
    {
        abort_unless(in_array($slot, self::SLOTS, true), 404);
        $request->validate(['image' => 'required|image|mimes:jpg,jpeg,png,webp|max:4096']);

        $path = $request->file('image')->store('site', 'public');
        $this->deleteFile($slot);
        SiteSetting::set("image_$slot", $path);

        return $this->index();
    }

    public function destroy(string $slot)
    {
        abort_unless(in_array($slot, self::SLOTS, true), 404);
        $this->deleteFile($slot);
        SiteSetting::where('key', "image_$slot")->delete();

        return $this->index();
    }

    private function deleteFile(string $slot): void
    {
        if ($old = SiteSetting::get("image_$slot")) {
            Storage::disk('public')->delete($old);
        }
    }
}
