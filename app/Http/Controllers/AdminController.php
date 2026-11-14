<?php

namespace App\Http\Controllers;

use App\Models\PertanyaanAssessment;
use App\Models\PertanyaanScreening;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    // ==========================================
    // 1. KELOLA USER (Admin Manage Users)
    // ==========================================

    /**
     * Ambil daftar seluruh user (orang tua & admin)
     */
    public function getUsers(Request $request): JsonResponse
    {
        $users = User::withCount(['anak', 'assessments'])
            ->orderByDesc('id_user')
            ->get();

        return response()->json($users);
    }

    /**
     * Update data user (nama, email, role, nomor_hp, password opsional)
     */
    public function updateUser(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'nama_lengkap' => ['required', 'string', 'max:150'],
            'email'        => ['required', 'email', 'max:150', Rule::unique('users', 'email')->ignore($user->id_user, 'id_user')],
            'role'         => ['required', 'in:orang_tua,admin'],
            'nomor_hp'     => ['nullable', 'string', 'max:20'],
            'password'     => ['nullable', 'string', 'min:8'],
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Data user berhasil diperbarui.',
            'user'    => $user->fresh(),
        ]);
    }

    /**
     * Hapus user beserta relasinya
     */
    public function deleteUser(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User berhasil dihapus.']);
    }

    // ==========================================
    // 2. KELOLA SOAL ASESMEN ORANG TUA (PSDQ-SF)
    // ==========================================

    public function getPertanyaanAssessment(): JsonResponse
    {
        $pertanyaan = PertanyaanAssessment::orderBy('nomor_item')->get();
        return response()->json($pertanyaan);
    }

    public function storePertanyaanAssessment(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nomor_item'      => ['required', 'integer', 'min:1', 'unique:pertanyaan_assessment,nomor_item'],
            'teks_pertanyaan' => ['required', 'string'],
            'gaya_asuh'       => ['required', 'in:autoritatif,otoriter,permisif'],
            'dimensi'         => ['required', 'in:support_afeksi,regulasi,otonomi,koersi_fisik,hostilitas_verbal,hukuman,indulgensi'],
        ]);

        $soal = PertanyaanAssessment::create($data);

        return response()->json([
            'message' => 'Soal asesmen pola asuh berhasil ditambahkan.',
            'data'    => $soal,
        ], 201);
    }

    public function updatePertanyaanAssessment(Request $request, int $id): JsonResponse
    {
        $soal = PertanyaanAssessment::findOrFail($id);

        $data = $request->validate([
            'nomor_item'      => ['required', 'integer', 'min:1', Rule::unique('pertanyaan_assessment', 'nomor_item')->ignore($soal->id_pertanyaan_assessment, 'id_pertanyaan_assessment')],
            'teks_pertanyaan' => ['required', 'string'],
            'gaya_asuh'       => ['required', 'in:autoritatif,otoriter,permisif'],
            'dimensi'         => ['required', 'in:support_afeksi,regulasi,otonomi,koersi_fisik,hostilitas_verbal,hukuman,indulgensi'],
        ]);

        $soal->update($data);

        return response()->json([
            'message' => 'Soal asesmen berhasil diupdate.',
            'data'    => $soal->fresh(),
        ]);
    }

    public function deletePertanyaanAssessment(int $id): JsonResponse
    {
        $soal = PertanyaanAssessment::findOrFail($id);
        $soal->delete();

        return response()->json(['message' => 'Soal asesmen berhasil dihapus.']);
    }

    // ==========================================
    // 3. KELOLA SOAL SKRINING ANAK (BPSC & PPSC)
    // ==========================================

    public function getPertanyaanScreening(): JsonResponse
    {
        $pertanyaan = PertanyaanScreening::orderBy('instrumen')->orderBy('nomor_item')->get();
        return response()->json($pertanyaan);
    }

    public function storePertanyaanScreening(Request $request): JsonResponse
    {
        $data = $request->validate([
            'instrumen'       => ['required', 'in:BPSC,PPSC'],
            'nomor_item'      => ['required', 'integer', 'min:1'],
            'subscale'        => ['required', 'string', 'max:60'],
            'teks_pertanyaan' => ['required', 'string'],
        ]);

        // Cek kombinasi unik instrumen & nomor_item
        $exists = PertanyaanScreening::where('instrumen', $data['instrumen'])
            ->where('nomor_item', $data['nomor_item'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => "Nomor item {$data['nomor_item']} untuk instrumen {$data['instrumen']} sudah digunakan."], 422);
        }

        $soal = PertanyaanScreening::create($data);

        return response()->json([
            'message' => 'Soal skrining anak berhasil ditambahkan.',
            'data'    => $soal,
        ], 201);
    }

    public function updatePertanyaanScreening(Request $request, int $id): JsonResponse
    {
        $soal = PertanyaanScreening::findOrFail($id);

        $data = $request->validate([
            'instrumen'       => ['required', 'in:BPSC,PPSC'],
            'nomor_item'      => ['required', 'integer', 'min:1'],
            'subscale'        => ['required', 'string', 'max:60'],
            'teks_pertanyaan' => ['required', 'string'],
        ]);

        $exists = PertanyaanScreening::where('instrumen', $data['instrumen'])
            ->where('nomor_item', $data['nomor_item'])
            ->where('id_pertanyaan_screening', '!=', $soal->id_pertanyaan_screening)
            ->exists();

        if ($exists) {
            return response()->json(['message' => "Nomor item {$data['nomor_item']} untuk instrumen {$data['instrumen']} sudah digunakan."], 422);
        }

        $soal->update($data);

        return response()->json([
            'message' => 'Soal skrining anak berhasil diupdate.',
            'data'    => $soal->fresh(),
        ]);
    }

    public function deletePertanyaanScreening(int $id): JsonResponse
    {
        $soal = PertanyaanScreening::findOrFail($id);
        $soal->delete();

        return response()->json(['message' => 'Soal skrining anak berhasil dihapus.']);
    }

    // ==========================================
    // 4. STATISTIK & HASIL (Dashboard Admin)
    // ==========================================

    public function getStats(): JsonResponse
    {
        $totalUser = User::where('role', 'orang_tua')->count();
        $totalAssessment = \App\Models\AssessmentPolaAsuh::count();
        $totalScreening = \App\Models\ScreeningAnak::count();
        $totalAtRisk = \App\Models\ScreeningAnak::where('status_risiko', 'at_risk')->count();

        return response()->json([
            'pengguna_terdaftar'  => $totalUser,
            'assessment_selesai'  => $totalAssessment,
            'screening_selesai'   => $totalScreening,
            'perlu_perhatian'     => $totalAtRisk,
        ]);
    }

    public function getHasilAssessment(): JsonResponse
    {
        $data = \App\Models\AssessmentPolaAsuh::with('user:id_user,nama_lengkap')
            ->orderByDesc('tanggal_assessment')
            ->get();

        return response()->json($data);
    }

    public function getHasilScreening(): JsonResponse
    {
        $data = \App\Models\ScreeningAnak::with('anak:id_anak,nama,usia_bulan')
            ->orderByDesc('tanggal_screening')
            ->get();

        return response()->json($data);
    }
}
