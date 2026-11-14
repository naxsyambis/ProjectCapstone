<?php

namespace App\Http\Controllers;

use App\Models\Materi;
use App\Models\ProgressMateri;
use App\Models\RekomendasiMateri;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MateriController extends Controller
{
    /**
     * Daftar materi edukasi:
     * - Default menampilkan materi berdasarkan rekomendasi assessment terakhir user (kategori_target)
     * - Bisa difilter per kategori_target atau tipe_konten
     * - Menyertakan status progress_materi milik user
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        // Ambil kategori rekomendasi terakhir user bila ada
        $rekomendasiTerakhir = RekomendasiMateri::where('id_user', $user->id_user)
            ->latest('tanggal_dibuat')
            ->first();

        $query = Materi::query();

        if ($request->filled('kategori_target')) {
            $query->where('kategori_target', $request->query('kategori_target'));
        } elseif ($request->boolean('recommended_only') && $rekomendasiTerakhir) {
            $query->whereIn('kategori_target', [$rekomendasiTerakhir->kategori_target, 'umum']);
        }

        if ($request->filled('tipe_konten')) {
            $query->where('tipe_konten', $request->query('tipe_konten'));
        }

        $materiList = $query->with(['quiz:id_quiz,id_materi,judul_quiz'])
            ->with(['progress' => function ($q) use ($user) {
                $q->where('id_user', $user->id_user);
            }])
            ->latest('created_at')
            ->get();

        return response()->json([
            'rekomendasi_aktif' => $rekomendasiTerakhir?->kategori_target ?? 'umum',
            'total'             => $materiList->count(),
            'data'              => $materiList,
        ]);
    }

    /**
     * Detail materi edukasi beserta status belajar user
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $user = $request->user();

        $materi = Materi::with(['quiz.pertanyaan', 'missions'])
            ->with(['progress' => function ($q) use ($user) {
                $q->where('id_user', $user->id_user);
            }])
            ->findOrFail($id);

        return response()->json($materi);
    }

    /**
     * Update progress belajar user pada materi ini (0-100%)
     */
    public function updateProgress(Request $request, int $id): JsonResponse
    {
        $materi = Materi::findOrFail($id);
        $user = $request->user();

        $data = $request->validate([
            'persentase' => ['required', 'integer', 'min:0', 'max:100'],
        ]);

        $persentase = (int) $data['persentase'];
        $status = 'sedang_belajar';
        $tanggalSelesai = null;

        if ($persentase >= 100) {
            $status = 'selesai';
            $tanggalSelesai = now();
        } elseif ($persentase === 0) {
            $status = 'belum_mulai';
        }

        $progress = ProgressMateri::updateOrCreate(
            [
                'id_user'   => $user->id_user,
                'id_materi' => $materi->id_materi,
            ],
            [
                'persentase'      => $persentase,
                'status'          => $status,
                'tanggal_selesai' => $tanggalSelesai,
            ]
        );

        return response()->json([
            'message'  => 'Progress materi berhasil diperbarui.',
            'progress' => $progress,
        ]);
    }

    /**
     * [ADMIN] Tambah materi baru
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'judul'           => ['required', 'string', 'max:255'],
            'kategori_target' => ['required', 'in:otoriter_ke_demokratis,permisif_ke_demokratis,penguatan_demokratis,umum'],
            'tipe_konten'     => ['required', 'in:video,artikel,pdf,referensi'],
            'url_video'       => ['nullable', 'string', 'max:500'],
            'isi_artikel'     => ['nullable', 'string'],
            'ringkasan'       => ['nullable', 'string'],
            'url_pdf'         => ['nullable', 'string', 'max:500'],
            'referensi'       => ['nullable', 'string'],
            'durasi_menit'    => ['nullable', 'integer', 'min:1'],
        ]);

        $materi = Materi::create($data);

        return response()->json([
            'message' => 'Materi berhasil ditambahkan.',
            'data'    => $materi,
        ], 201);
    }

    /**
     * [ADMIN] Update materi
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $materi = Materi::findOrFail($id);

        $data = $request->validate([
            'judul'           => ['sometimes', 'required', 'string', 'max:255'],
            'kategori_target' => ['sometimes', 'required', 'in:otoriter_ke_demokratis,permisif_ke_demokratis,penguatan_demokratis,umum'],
            'tipe_konten'     => ['sometimes', 'required', 'in:video,artikel,pdf,referensi'],
            'url_video'       => ['nullable', 'string', 'max:500'],
            'isi_artikel'     => ['nullable', 'string'],
            'ringkasan'       => ['nullable', 'string'],
            'url_pdf'         => ['nullable', 'string', 'max:500'],
            'referensi'       => ['nullable', 'string'],
            'durasi_menit'    => ['nullable', 'integer', 'min:1'],
        ]);

        $materi->update($data);

        return response()->json([
            'message' => 'Materi berhasil diupdate.',
            'data'    => $materi->fresh(),
        ]);
    }

    /**
     * [ADMIN] Hapus materi
     */
    public function destroy(int $id): JsonResponse
    {
        $materi = Materi::findOrFail($id);
        $materi->delete();

        return response()->json(['message' => 'Materi berhasil dihapus.']);
    }
}
