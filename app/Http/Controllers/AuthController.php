<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nama_lengkap' => ['required', 'string', 'max:150'],
            'email'        => ['required', 'email', 'max:150', 'unique:users,email'],
            'password'     => ['required', 'string', 'min:8', 'confirmed'],
            'nomor_hp'     => ['nullable', 'string', 'max:20'],
        ]);

        // role tidak boleh dari input; selalu default 'orang_tua'
        $user = User::create($data);

        return response()->json([
            'message'        => 'Registrasi berhasil.',
            'user'           => $user->fresh(),
            'token'          => $user->createToken('auth_token')->plainTextToken,
            'has_assessment' => false,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        return response()->json([
            'message'        => 'Login berhasil.',
            'user'           => array_merge($user->toArray(), [
                'profil_lengkap' => $user->anak()->exists(),
            ]),
            'token'          => $user->createToken('auth_token')->plainTextToken,
            'has_assessment' => $user->assessments()->exists(),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json(array_merge($user->toArray(), [
            'profil_lengkap' => $user->anak()->exists(),
        ]));
    }

    public function logout(Request $request): JsonResponse
    {
        // hapus token yang sedang dipakai saja (device lain tetap login)
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout berhasil.']);
    }
}
