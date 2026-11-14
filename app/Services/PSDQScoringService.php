<?php

namespace App\Services;

use App\Models\AssessmentPolaAsuh;
use Illuminate\Support\Facades\DB;

class PSDQScoringService
{
    /**
     * Hitung rata-rata skor per gaya asuh (autoritatif, otoriter, permisif)
     * dan tentukan gaya_dominan beserta rekomendasi kategori materi.
     */
    public function calculate(int $assessmentId): AssessmentPolaAsuh
    {
        $assessment = AssessmentPolaAsuh::with('jawaban.pertanyaan')->findOrFail($assessmentId);

        // Ambil rata-rata skor per gaya_asuh
        $scores = DB::table('jawaban_assessment as ja')
            ->join('pertanyaan_assessment as pa', 'ja.id_pertanyaan_assessment', '=', 'pa.id_pertanyaan_assessment')
            ->where('ja.id_assessment', $assessmentId)
            ->select('pa.gaya_asuh', DB::raw('AVG(ja.skor_item) as rata_skor'))
            ->groupBy('pa.gaya_asuh')
            ->pluck('rata_skor', 'gaya_asuh')
            ->toArray();

        $skorAutoritatif = isset($scores['autoritatif']) ? round((float) $scores['autoritatif'], 2) : 0.00;
        $skorOtoriter    = isset($scores['otoriter']) ? round((float) $scores['otoriter'], 2) : 0.00;
        $skorPermisif    = isset($scores['permisif']) ? round((float) $scores['permisif'], 2) : 0.00;

        // Tentukan gaya dominan (aturan tie-break: otoriter > permisif > autoritatif jika ada skor identik)
        $gayaDominan = 'autoritatif';
        $maxSkor = $skorAutoritatif;

        if ($skorPermisif >= $maxSkor) {
            $maxSkor = $skorPermisif;
            $gayaDominan = 'permisif';
        }

        if ($skorOtoriter >= $maxSkor) {
            $maxSkor = $skorOtoriter;
            $gayaDominan = 'otoriter';
        }

        $keterangan = match ($gayaDominan) {
            'autoritatif' => 'Gaya pengasuhan demokratis/autoritatif: seimbang antara kehangatan, komunikasi terbuka, dan batasan yang jelas.',
            'otoriter'    => 'Gaya pengasuhan otoriter: cenderung menuntut kepatuhan mutlak dengan kontrol tinggi dan kehangatan yang minim.',
            'permisif'    => 'Gaya pengasuhan permisif: sangat hangat dan penyayang namun minim memberikan aturan atau batasan yang konsisten.',
            default       => null,
        };

        $assessment->update([
            'skor_autoritatif' => $skorAutoritatif,
            'skor_otoriter'    => $skorOtoriter,
            'skor_permisif'    => $skorPermisif,
            'gaya_dominan'     => $gayaDominan,
            'keterangan'       => $keterangan,
        ]);

        return $assessment->fresh();
    }

    /**
     * Tentukan kategori target materi pembelajaran berdasarkan gaya dominan
     */
    public function getTargetCategory(string $gayaDominan): string
    {
        return match ($gayaDominan) {
            'otoriter'    => 'otoriter_ke_demokratis',
            'permisif'    => 'permisif_ke_demokratis',
            'autoritatif' => 'penguatan_demokratis',
            default       => 'umum',
        };
    }
}
