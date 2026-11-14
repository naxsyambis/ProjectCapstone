<?php

namespace App\Http\Controllers;

use App\Models\HasilQuiz;
use App\Models\Materi;
use App\Models\PertanyaanQuiz;
use App\Models\Quiz;
use App\Services\QuizScoringService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function __construct(
        protected QuizScoringService $quizService
    ) {}

    /**
     * Ambil soal kuis untuk suatu materi
     */
    public function showByMateri(int $idMateri): JsonResponse
    {
        $quiz = Quiz::with(['pertanyaan' => function ($q) {
            $q->select([
                'id_pertanyaan_quiz',
                'id_quiz',
                'teks_pertanyaan',
                'pilihan_a',
                'pilihan_b',
                'pilihan_c',
                'pilihan_d',
                'urutan',
            ]); // Kunci jawaban disembunyikan agar user tidak mencontek
        }])->where('id_materi', $idMateri)->firstOrFail();

        return response()->json($quiz);
    }

    /**
     * Submit pengerjaan kuis dan hitung nilai
     */
    public function submit(Request $request, int $idQuiz): JsonResponse
    {
        $data = $request->validate([
            'waktu_detik'                       => ['nullable', 'integer', 'min:0'],
            'jawaban'                           => ['required', 'array', 'min:1'],
            'jawaban.*.id_pertanyaan_quiz'      => ['required', 'integer', 'exists:pertanyaan_quiz,id_pertanyaan_quiz'],
            'jawaban.*.jawaban'                 => ['required', 'string', 'in:a,b,c,d,A,B,C,D'],
        ]);

        $hasil = $this->quizService->submitQuiz(
            userId: $request->user()->id_user,
            quizId: $idQuiz,
            jawaban: $data['jawaban'],
            waktuDetik: $data['waktu_detik'] ?? null
        );

        return response()->json([
            'message' => $hasil->status_lulus ? 'Selamat, Anda LULUS kuis!' : 'Anda belum mencapai batas minimal kelulusan.',
            'hasil'   => $hasil->load('quiz:id_quiz,judul_quiz,min_skor_lulus'),
        ], 201);
    }

    /**
     * Riwayat hasil kuis milik user
     */
    public function history(Request $request): JsonResponse
    {
        $riwayat = HasilQuiz::with('quiz:id_quiz,id_materi,judul_quiz,min_skor_lulus')
            ->where('id_user', $request->user()->id_user)
            ->latest('tanggal_mengerjakan')
            ->get();

        return response()->json($riwayat);
    }

    /**
     * [ADMIN] Buat kuis beserta daftar pertanyaan
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id_materi'                      => ['required', 'integer', 'exists:materi,id_materi', 'unique:quiz,id_materi'],
            'judul_quiz'                     => ['required', 'string', 'max:255'],
            'deskripsi'                      => ['nullable', 'string'],
            'batas_waktu_menit'              => ['nullable', 'integer', 'min:1'],
            'min_skor_lulus'                 => ['nullable', 'numeric', 'min:0', 'max:100'],
            'pertanyaan'                     => ['required', 'array', 'min:1'],
            'pertanyaan.*.teks_pertanyaan'    => ['required', 'string'],
            'pertanyaan.*.pilihan_a'          => ['required', 'string', 'max:500'],
            'pertanyaan.*.pilihan_b'          => ['required', 'string', 'max:500'],
            'pertanyaan.*.pilihan_c'          => ['nullable', 'string', 'max:500'],
            'pertanyaan.*.pilihan_d'          => ['nullable', 'string', 'max:500'],
            'pertanyaan.*.kunci_jawaban'      => ['required', 'in:a,b,c,d'],
            'pertanyaan.*.urutan'             => ['nullable', 'integer'],
        ]);

        $quiz = DB::transaction(function () use ($data) {
            $quiz = Quiz::create([
                'id_materi'         => $data['id_materi'],
                'judul_quiz'        => $data['judul_quiz'],
                'deskripsi'         => $data['deskripsi'] ?? null,
                'batas_waktu_menit' => $data['batas_waktu_menit'] ?? null,
                'min_skor_lulus'    => $data['min_skor_lulus'] ?? 70.00,
            ]);

            foreach ($data['pertanyaan'] as $index => $soal) {
                $quiz->pertanyaan()->create([
                    'teks_pertanyaan' => $soal['teks_pertanyaan'],
                    'pilihan_a'       => $soal['pilihan_a'],
                    'pilihan_b'       => $soal['pilihan_b'],
                    'pilihan_c'       => $soal['pilihan_c'] ?? null,
                    'pilihan_d'       => $soal['pilihan_d'] ?? null,
                    'kunci_jawaban'   => strtolower($soal['kunci_jawaban']),
                    'urutan'          => $soal['urutan'] ?? ($index + 1),
                ]);
            }

            return $quiz->load('pertanyaan');
        });

        return response()->json([
            'message' => 'Kuis berhasil dibuat.',
            'data'    => $quiz,
        ], 201);
    }

    /**
     * [ADMIN] Hapus kuis
     */
    public function destroy(int $id): JsonResponse
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();

        return response()->json(['message' => 'Kuis berhasil dihapus.']);
    }
}
