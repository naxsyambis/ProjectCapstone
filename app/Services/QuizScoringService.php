<?php

namespace App\Services;

use App\Models\HasilQuiz;
use App\Models\PertanyaanQuiz;
use App\Models\Quiz;
use Illuminate\Validation\ValidationException;

class QuizScoringService
{
    /**
     * Hitung skor kuis dari jawaban user dan tentukan status kelulusan.
     *
     * @param int $userId
     * @param int $quizId
     * @param array $jawaban [ ['id_pertanyaan_quiz' => 1, 'jawaban' => 'a'], ... ]
     * @param int|null $waktuDetik
     * @return HasilQuiz
     */
    public function submitQuiz(int $userId, int $quizId, array $jawaban, ?int $waktuDetik = null): HasilQuiz
    {
        $quiz = Quiz::with('pertanyaan')->findOrFail($quizId);
        $totalPertanyaan = $quiz->pertanyaan->count();

        if ($totalPertanyaan === 0) {
            throw ValidationException::withMessages([
                'quiz' => ['Kuis ini belum memiliki daftar pertanyaan.'],
            ]);
        }

        $kunciJawaban = $quiz->pertanyaan->pluck('kunci_jawaban', 'id_pertanyaan_quiz')->toArray();

        $jumlahBenar = 0;
        foreach ($jawaban as $item) {
            $idSoal = $item['id_pertanyaan_quiz'];
            $pilihan = strtolower($item['jawaban'] ?? '');

            if (isset($kunciJawaban[$idSoal]) && $kunciJawaban[$idSoal] === $pilihan) {
                $jumlahBenar++;
            }
        }

        $skor = round(($jumlahBenar / $totalPertanyaan) * 100, 2);
        $statusLulus = ($skor >= (float) $quiz->min_skor_lulus);

        return HasilQuiz::create([
            'id_user'             => $userId,
            'id_quiz'             => $quiz->id_quiz,
            'skor'                => $skor,
            'status_lulus'        => $statusLulus,
            'tanggal_mengerjakan' => now(),
            'waktu_detik'         => $waktuDetik,
        ]);
    }
}
