<?php

namespace App\Services;

use App\Models\ScreeningAnak;
use Illuminate\Support\Facades\DB;

class ScreeningScoringService
{
    /**
     * Hitung skor dan risiko untuk instrumen BPSC (0-17 bulan) atau PPSC (18-65 bulan)
     */
    public function calculate(int $screeningId): ScreeningAnak
    {
        $screening = ScreeningAnak::with('jawaban.pertanyaan')->findOrFail($screeningId);

        if ($screening->instrumen_digunakan === 'BPSC') {
            return $this->calculateBPSC($screening);
        }

        return $this->calculatePPSC($screening);
    }

    /**
     * BPSC (0-17 bulan):
     * 12 item dengan 3 subskala: irritability, difficulty_routines, inflexibility.
     * Cutoff at_risk: bila ada salah satu subskala >= 3.
     */
    private function calculateBPSC(ScreeningAnak $screening): ScreeningAnak
    {
        $subscaleScores = DB::table('jawaban_screening as js')
            ->join('pertanyaan_screening as ps', 'js.id_pertanyaan_screening', '=', 'ps.id_pertanyaan_screening')
            ->where('js.id_screening', $screening->id_screening)
            ->select('ps.subscale', DB::raw('SUM(js.skor_item) as total_skor'))
            ->groupBy('ps.subscale')
            ->pluck('total_skor', 'subscale')
            ->toArray();

        $irritability = (int) ($subscaleScores['irritability'] ?? 0);
        $routines     = (int) ($subscaleScores['difficulty_routines'] ?? 0);
        $inflexible   = (int) ($subscaleScores['inflexibility'] ?? 0);

        $isAtRisk = ($irritability >= 3 || $routines >= 3 || $inflexible >= 3);
        $statusRisiko = $isAtRisk ? 'at_risk' : 'aman';
        $rekomendasi  = $isAtRisk ? 'rujuk_psikolog' : 'aktivitas_parenting';

        $catatanKlinis = $isAtRisk
            ? 'Skrining BPSC menunjukkan indikasi risiko sosial-emosional pada salah satu subskala (>= 3). Disarankan untuk berkonsultasi lebih lanjut dengan tenaga profesional/psikolog anak.'
            : 'Perkembangan sosial-emosional bayi dalam batas aman sesuai instrumen BPSC. Lanjutkan stimulasi dengan aktivitas parenting yang sesuai.';

        $screening->update([
            'skor_bpsc_irritability'        => $irritability,
            'skor_bpsc_difficulty_routines' => $routines,
            'skor_bpsc_inflexibility'       => $inflexible,
            'skor_ppsc_total'               => null,
            'status_risiko'                 => $statusRisiko,
            'rekomendasi'                   => $rekomendasi,
            'catatan_klinis'                => $catatanKlinis,
        ]);

        return $screening->fresh();
    }

    /**
     * PPSC (18-65 bulan):
     * 18 item total skor (0-36).
     * Cutoff at_risk: bila total skor >= 9.
     */
    private function calculatePPSC(ScreeningAnak $screening): ScreeningAnak
    {
        $totalSkor = (int) DB::table('jawaban_screening')
            ->where('id_screening', $screening->id_screening)
            ->sum('skor_item');

        $isAtRisk = ($totalSkor >= 9);
        $statusRisiko = $isAtRisk ? 'at_risk' : 'aman';
        $rekomendasi  = $isAtRisk ? 'rujuk_psikolog' : 'aktivitas_parenting';

        $catatanKlinis = $isAtRisk
            ? "Skrining PPSC menunjukkan total skor {$totalSkor} (>= 9). Disarankan untuk berkonsultasi lebih lanjut dengan psikolog klinis anak atau fasilitas tumbuh kembang."
            : "Perkembangan sosial-emosional anak dalam batas aman (total skor {$totalSkor} < 9). Terus dampingi dengan misi pengasuhan positif.";

        $screening->update([
            'skor_bpsc_irritability'        => null,
            'skor_bpsc_difficulty_routines' => null,
            'skor_bpsc_inflexibility'       => null,
            'skor_ppsc_total'               => $totalSkor,
            'status_risiko'                 => $statusRisiko,
            'rekomendasi'                   => $rekomendasi,
            'catatan_klinis'                => $catatanKlinis,
        ]);

        return $screening->fresh();
    }
}
