<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return Service::where('is_active', true)->orderBy('sort_order')->get();
    }

    public function adminIndex()
    {
        return Service::orderBy('sort_order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'code' => 'required|string|max:20',
            'type' => 'required|in:condition,therapy',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        return Service::create($data);
    }

    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'name_ar' => 'sometimes|string',
            'name_en' => 'sometimes|string',
            'code' => 'sometimes|string|max:20',
            'type' => 'sometimes|in:condition,therapy',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $service->update($data);
        return $service;
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
