<?php

namespace App\Http\Controllers;

use App\Models\Anak;
use App\Models\ParentingMission;
use App\Models\ProgressMission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    /**
     * Daftar misi parenting untuk anak tertentu.
     * Difilter dinamis berdasarkan usia anak (bulan).
     */
    public function indexByAnak(Request $request, int $idAnak): JsonResponse
    {
        $anak = $request->user()->anak()->findOrFail($idAnak);
        $usiaBulan = $anak->usia_bulan;

        // Ambil misi yang mencakup usia anak
        $missions = ParentingMission::where('usia_min_bulan', '<=', $usiaBulan)
            ->where('usia_maks_bulan', '>=', $usiaBulan)
            ->with(['materi:id_materi,judul,kategori_target'])
            ->with(['progress' => function ($q) use ($anak) {
                $q->where('id_anak', $anak->id_anak);
            }])
            ->get();

        return response()->json([
            'anak'             => $anak->only(['id_anak', 'nama', 'tanggal_lahir', 'usia_bulan']),
            'total_misi'       => $missions->count(),
            'data'             => $missions,
        ]);
    }

    /**
     * Mulai mengerjakan suatu misi untuk anak tertentu
     */
    public function start(Request $request, int $idAnak, int $idMisi): JsonResponse
    {
        $anak = $request->user()->anak()->findOrFail($idAnak);
        $misi = ParentingMission::findOrFail($idMisi);

        $progress = ProgressMission::firstOrCreate(
            [
                'id_anak' => $anak->id_anak,
                'id_misi' => $misi->id_misi,
            ],
            [
                'tanggal_mulai' => now(),
            ]
        );

        return response()->json([
            'message'  => 'Misi berhasil dimulai.',
            'progress' => $progress->load('misi'),
        ]);
    }

    /**
     * Selesaikan misi dan simpan catatan refleksi
     */
    public function complete(Request $request, int $idAnak, int $idMisi): JsonResponse
    {
        $anak = $request->user()->anak()->findOrFail($idAnak);
        $misi = ParentingMission::findOrFail($idMisi);

        $data = $request->validate([
            'catatan' => ['nullable', 'string'],
        ]);

        $progress = ProgressMission::updateOrCreate(
            [
                'id_anak' => $anak->id_anak,
                'id_misi' => $misi->id_misi,
            ],
            [
                'tanggal_mulai'   => now(),
                'tanggal_selesai' => now(),
                'catatan'         => $data['catatan'] ?? null,
            ]
        );

        return response()->json([
            'message'     => "Selamat! Misi '{$misi->judul_misi}' telah diselesaikan (+{$misi->poin} poin).",
            'poin_didapat'=> $misi->poin,
            'progress'    => $progress->load('misi'),
        ]);
    }

    /**
     * [ADMIN] Buat misi parenting baru
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id_materi'        => ['required', 'integer', 'exists:materi,id_materi'],
            'judul_misi'       => ['required', 'string', 'max:255'],
            'deskripsi'        => ['nullable', 'string'],
            'poin'             => ['nullable', 'integer', 'min:1'],
            'tenggat_hari'     => ['nullable', 'integer', 'min:1'],
            'badge_reward'     => ['nullable', 'string', 'max:100'],
            'usia_min_bulan'   => ['required', 'integer', 'min:0'],
            'usia_maks_bulan'  => ['required', 'integer', 'gte:usia_min_bulan'],
            'sumber_aktivitas' => ['nullable', 'string', 'max:200'],
        ]);

        $misi = ParentingMission::create($data);

        return response()->json([
            'message' => 'Misi parenting berhasil dibuat.',
            'data'    => $misi,
        ], 201);
    }

    /**
     * [ADMIN] Hapus misi parenting
     */
    public function destroy(int $id): JsonResponse
    {
        $misi = ParentingMission::findOrFail($id);
        $misi->delete();

        return response()->json(['message' => 'Misi berhasil dihapus.']);
    }
}
