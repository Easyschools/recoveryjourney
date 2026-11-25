<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    public function index()
    {
        return TeamMember::where('is_active', true)->orderBy('sort_order')->get();
    }

    public function adminIndex()
    {
        return TeamMember::orderBy('sort_order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'role_ar' => 'required|string',
            'role_en' => 'required|string',
            'bio_ar' => 'nullable|string',
            'bio_en' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('team', 'public');
        }

        return TeamMember::create($data);
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $data = $request->validate([
            'name_ar' => 'sometimes|string',
            'name_en' => 'sometimes|string',
            'role_ar' => 'sometimes|string',
            'role_en' => 'sometimes|string',
            'bio_ar' => 'nullable|string',
            'bio_en' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            if ($teamMember->photo) {
                Storage::disk('public')->delete($teamMember->photo);
            }
            $data['photo'] = $request->file('photo')->store('team', 'public');
        }

        $teamMember->update($data);
        return $teamMember;
    }

    public function destroy(TeamMember $teamMember)
    {
        if ($teamMember->photo) {
            Storage::disk('public')->delete($teamMember->photo);
        }
        $teamMember->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
