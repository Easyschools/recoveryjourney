<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index()
    {
        return Faq::where('is_active', true)->orderBy('sort_order')->get();
    }

    public function adminIndex()
    {
        return Faq::orderBy('sort_order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question_ar' => 'required|string',
            'question_en' => 'required|string',
            'answer_ar' => 'required|string',
            'answer_en' => 'required|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        return Faq::create($data);
    }

    public function update(Request $request, Faq $faq)
    {
        $data = $request->validate([
            'question_ar' => 'sometimes|string',
            'question_en' => 'sometimes|string',
            'answer_ar' => 'sometimes|string',
            'answer_en' => 'sometimes|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $faq->update($data);
        return $faq;
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function reorder(Request $request)
    {
        $request->validate(['ids' => 'required|array']);
        foreach ($request->ids as $index => $id) {
            Faq::where('id', $id)->update(['sort_order' => $index]);
        }
        return response()->json(['message' => 'Reordered']);
    }
}
