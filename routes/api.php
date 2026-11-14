<?php

use App\Http\Controllers\AnakController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Profil user
    Route::put('/profil', [\App\Http\Controllers\ProfileController::class, 'update']);
    Route::put('/profil/onboarding', [\App\Http\Controllers\ProfileController::class, 'onboarding']);
    Route::post('/profil/foto', [\App\Http\Controllers\ProfileController::class, 'uploadFoto']);

    // Data anak milik user yang login
    Route::apiResource('anak', AnakController::class);

    // Assessment Pola Asuh (PSDQ-SF)
    Route::get('/assessment/pertanyaan', [\App\Http\Controllers\AssessmentController::class, 'pertanyaan']);
    Route::post('/assessment/submit', [\App\Http\Controllers\AssessmentController::class, 'submit']);
    Route::get('/assessment/history', [\App\Http\Controllers\AssessmentController::class, 'history']);
    Route::get('/assessment/{id}', [\App\Http\Controllers\AssessmentController::class, 'show']);

    // Screening Tumbuh Kembang Sosial-Emosional Anak (BPSC / PPSC)
    Route::get('/anak/{id_anak}/screening/pertanyaan', [\App\Http\Controllers\ScreeningController::class, 'pertanyaan']);
    Route::post('/anak/{id_anak}/screening/submit', [\App\Http\Controllers\ScreeningController::class, 'submit']);
    Route::get('/anak/{id_anak}/screening/history', [\App\Http\Controllers\ScreeningController::class, 'history']);
    Route::get('/anak/{id_anak}/screening/{id_screening}', [\App\Http\Controllers\ScreeningController::class, 'show']);

    // Materi Pembelajaran (Learning Path)
    Route::get('/materi', [\App\Http\Controllers\MateriController::class, 'index']);
    Route::get('/materi/{id}', [\App\Http\Controllers\MateriController::class, 'show']);
    Route::post('/materi/{id}/progress', [\App\Http\Controllers\MateriController::class, 'updateProgress']);

    // Kuis Pemahaman
    Route::get('/materi/{id_materi}/quiz', [\App\Http\Controllers\QuizController::class, 'showByMateri']);
    Route::post('/quiz/{id_quiz}/submit', [\App\Http\Controllers\QuizController::class, 'submit']);
    Route::get('/quiz/history', [\App\Http\Controllers\QuizController::class, 'history']);

    // Parenting Mission (Misi Harian ASQ:SE-2 per Anak)
    Route::get('/anak/{id_anak}/missions', [\App\Http\Controllers\MissionController::class, 'indexByAnak']);
    Route::post('/anak/{id_anak}/missions/{id_misi}/start', [\App\Http\Controllers\MissionController::class, 'start']);
    Route::post('/anak/{id_anak}/missions/{id_misi}/complete', [\App\Http\Controllers\MissionController::class, 'complete']);

    // Route Khusus Admin (CRUD User, Soal, Materi, Kuis, & Misi)
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/ping', fn () => ['message' => 'halo admin']);
        Route::get('/stats', [\App\Http\Controllers\AdminController::class, 'getStats']);
        Route::get('/hasil-assessment', [\App\Http\Controllers\AdminController::class, 'getHasilAssessment']);
        Route::get('/hasil-screening', [\App\Http\Controllers\AdminController::class, 'getHasilScreening']);

        // Admin Kelola User
        Route::get('/users', [\App\Http\Controllers\AdminController::class, 'getUsers']);
        Route::put('/users/{id}', [\App\Http\Controllers\AdminController::class, 'updateUser']);
        Route::delete('/users/{id}', [\App\Http\Controllers\AdminController::class, 'deleteUser']);

        // Admin Kelola Soal Asesmen Pola Asuh (PSDQ-SF)
        Route::get('/pertanyaan-assessment', [\App\Http\Controllers\AdminController::class, 'getPertanyaanAssessment']);
        Route::post('/pertanyaan-assessment', [\App\Http\Controllers\AdminController::class, 'storePertanyaanAssessment']);
        Route::put('/pertanyaan-assessment/{id}', [\App\Http\Controllers\AdminController::class, 'updatePertanyaanAssessment']);
        Route::delete('/pertanyaan-assessment/{id}', [\App\Http\Controllers\AdminController::class, 'deletePertanyaanAssessment']);

        // Admin Kelola Soal Skrining Anak (BPSC & PPSC)
        Route::get('/pertanyaan-screening', [\App\Http\Controllers\AdminController::class, 'getPertanyaanScreening']);
        Route::post('/pertanyaan-screening', [\App\Http\Controllers\AdminController::class, 'storePertanyaanScreening']);
        Route::put('/pertanyaan-screening/{id}', [\App\Http\Controllers\AdminController::class, 'updatePertanyaanScreening']);
        Route::delete('/pertanyaan-screening/{id}', [\App\Http\Controllers\AdminController::class, 'deletePertanyaanScreening']);
        
        // Admin CRUD Materi
        Route::post('/materi', [\App\Http\Controllers\MateriController::class, 'store']);
        Route::put('/materi/{id}', [\App\Http\Controllers\MateriController::class, 'update']);
        Route::delete('/materi/{id}', [\App\Http\Controllers\MateriController::class, 'destroy']);

        // Admin CRUD Quiz
        Route::post('/quiz', [\App\Http\Controllers\QuizController::class, 'store']);
        Route::delete('/quiz/{id}', [\App\Http\Controllers\QuizController::class, 'destroy']);

        // Admin CRUD Mission
        Route::post('/missions', [\App\Http\Controllers\MissionController::class, 'store']);
        Route::delete('/missions/{id}', [\App\Http\Controllers\MissionController::class, 'destroy']);
    });
});

