<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\TeamController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/contact', [ContactController::class, 'submit']);
Route::get('/pages/{slug}', [PageController::class, 'show']);
Route::get('/faqs', [FaqController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/team', [TeamController::class, 'index']);
Route::get('/images', [ImageController::class, 'index']);
Route::get('/settings/public', [SettingsController::class, 'index']);

// Auth
Route::post('/admin/login', [AuthController::class, 'login']);

// Admin routes (protected)
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Pages
    Route::get('/pages', [PageController::class, 'index']);
    Route::put('/pages/{slug}', [PageController::class, 'update']);

    // FAQs
    Route::get('/faqs', [FaqController::class, 'adminIndex']);
    Route::post('/faqs', [FaqController::class, 'store']);
    Route::put('/faqs/{faq}', [FaqController::class, 'update']);
    Route::delete('/faqs/{faq}', [FaqController::class, 'destroy']);
    Route::post('/faqs/reorder', [FaqController::class, 'reorder']);

    // Team
    Route::get('/team', [TeamController::class, 'adminIndex']);
    Route::post('/team', [TeamController::class, 'store']);
    Route::post('/team/{teamMember}', [TeamController::class, 'update']); // POST for file upload
    Route::delete('/team/{teamMember}', [TeamController::class, 'destroy']);

    // Services
    Route::get('/services', [ServiceController::class, 'adminIndex']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    // Settings
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::put('/settings', [SettingsController::class, 'update']);

    // Site photos
    Route::post('/images/{slot}', [ImageController::class, 'store']);
    Route::delete('/images/{slot}', [ImageController::class, 'destroy']);

    // Contact submissions
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::put('/contacts/{submission}/read', [ContactController::class, 'markRead']);
    Route::delete('/contacts/{submission}', [ContactController::class, 'destroy']);
});
