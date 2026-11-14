<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Update profil user (nama, nomor_hp, dsb.)
     */
    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nama_lengkap'  => ['sometimes', 'required', 'string', 'max:150'],
            'nama_panggilan'=> ['nullable', 'string', 'max:100'],
            'nomor_hp'      => ['nullable', 'string', 'max:20'],
        ]);

        $user = $request->user();
        $user->update(array_filter($data, fn($v) => $v !== null));

        return response()->json([
            'message' => 'Profil berhasil diperbarui.',
            'user'    => $user->fresh(),
        ]);
    }

    /**
     * Selesaikan onboarding (isi nama_panggilan dan data anak pertama kali)
     */
    public function onboarding(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nama_panggilan'      => ['nullable', 'string', 'max:100'],
            'usia_orang_tua'      => ['nullable', 'integer'],
            'bayi'                => ['nullable', 'array'],
            'bayi.nama'           => ['required_with:bayi', 'string', 'max:100'],
            'bayi.tanggal_lahir'  => ['required_with:bayi', 'date', 'before_or_equal:today'],
            'bayi.jenis_kelamin'  => ['required_with:bayi', 'in:L,P'],
        ]);

        $user = $request->user();

        // Simpan data anak bila disertakan
        if (!empty($data['bayi'])) {
            $user->anak()->create([
                'nama'          => $data['bayi']['nama'],
                'tanggal_lahir' => $data['bayi']['tanggal_lahir'],
                'jenis_kelamin' => $data['bayi']['jenis_kelamin'],
            ]);
        }

        return response()->json([
            'message' => 'Onboarding selesai.',
            'user'    => array_merge($user->toArray(), [
                'profil_lengkap' => true,
            ]),
        ]);
    }

    /**
     * Upload foto profil user
     */
    public function uploadFoto(Request $request): JsonResponse
    {
        $request->validate([
            'foto' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        $user = $request->user();

        // Hapus foto lama jika ada
        if ($user->foto_profil && Storage::disk('public')->exists($user->foto_profil)) {
            Storage::disk('public')->delete($user->foto_profil);
        }

        $path = $request->file('foto')->store('foto_profil', 'public');
        $user->update(['foto_profil' => $path]);

        return response()->json([
            'message'  => 'Foto profil berhasil diperbarui.',
            'foto_url' => Storage::disk('public')->url($path),
        ]);
    }
}

