<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $ip = $request->ip();
        $key = 'contact:' . $ip;

        if (RateLimiter::tooManyAttempts($key, 5)) {
            return response()->json(['message' => 'Too many requests'], 429);
        }

        RateLimiter::hit($key, 300);

        // Honeypot check
        if ($request->filled('website')) {
            return response()->json(['success' => true]);
        }

        $data = $request->validate([
            'name' => 'nullable|string|max:100',
            'phone' => ['required', 'regex:/^[0-9٠-٩]{10,11}$/'],
            'consultation_for' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:1000',
            'locale' => 'nullable|in:ar,en',
        ]);

        // Normalize Arabic-Indic digits
        $data['phone'] = strtr($data['phone'], ['٠'=>'0','١'=>'1','٢'=>'2','٣'=>'3','٤'=>'4','٥'=>'5','٦'=>'6','٧'=>'7','٨'=>'8','٩'=>'9']);

        $submission = ContactSubmission::create($data);

        // Send email notification (non-blocking)
        try {
            $email = \App\Models\SiteSetting::get('contact_email', config('mail.to.address'));
            if ($email) {
                Mail::raw(
                    "New contact submission\n\nName: {$submission->name}\nPhone: {$submission->phone}\nFor: {$submission->consultation_for}\nMessage: {$submission->message}",
                    fn($m) => $m->to($email)->subject('رحلة التعافي - استشارة جديدة')
                );
            }
        } catch (\Throwable $e) {
            // Don't fail the response if mail fails
        }

        return response()->json(['success' => true]);
    }

    public function index()
    {
        return ContactSubmission::latest()->paginate(20);
    }

    public function markRead(ContactSubmission $submission)
    {
        $submission->update(['is_read' => true]);
        return $submission;
    }

    public function destroy(ContactSubmission $submission)
    {
        $submission->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
