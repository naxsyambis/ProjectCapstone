<?php

namespace App\Http\Controllers;

use App\Models\Anak;
use App\Models\PertanyaanScreening;
use App\Models\ScreeningAnak;
use App\Services\ScreeningScoringService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ScreeningController extends Controller
{
    public function __construct(
        protected ScreeningScoringService $scoringService
    ) {}

    /**
     * Ambil pertanyaan screening yang sesuai dengan umur anak:
     * - 0 - 17 bulan: BPSC (12 pertanyaan)
     * - 18 - 65 bulan: PPSC (18 pertanyaan)
     * - > 65 bulan: Ditolak (validasi klinis)
     */
    public function pertanyaan(Request $request, int $idAnak): JsonResponse
    {
        $anak = $this->findOwnedChild($request, $idAnak);
        $usiaBulan = $anak->usia_bulan;

        if ($usiaBulan > 65) {
            throw ValidationException::withMessages([
                'anak' => ['Anak telah berusia lebih dari 65 bulan. Instrumen BPSC/PPSC tidak berlaku untuk usia ini.'],
            ]);
        }

        $instrumen = ($usiaBulan <= 17) ? 'BPSC' : 'PPSC';

        $pertanyaan = PertanyaanScreening::where('instrumen', $instrumen)
            ->orderBy('nomor_item')
            ->get([
                'id_pertanyaan_screening',
                'instrumen',
                'nomor_item',
                'subscale',
                'teks_pertanyaan',
            ]);

        return response()->json([
            'anak'               => $anak,
            'usia_bulan'         => $usiaBulan,
            'instrumen_digunakan'=> $instrumen,
            'total_pertanyaan'   => $pertanyaan->count(),
            'pertanyaan'         => $pertanyaan,
        ]);
    }

    /**
     * Submit jawaban screening anak dan hitung status risiko
     */
    public function submit(Request $request, int $idAnak): JsonResponse
    {
        $anak = $this->findOwnedChild($request, $idAnak);
        $usiaBulan = $anak->usia_bulan;

        if ($usiaBulan > 65) {
            throw ValidationException::withMessages([
                'anak' => ['Anak telah berusia lebih dari 65 bulan. Skrining BPSC/PPSC tidak dapat dilakukan.'],
            ]);
        }

        $instrumen = ($usiaBulan <= 17) ? 'BPSC' : 'PPSC';
        $minSoal = ($instrumen === 'BPSC') ? 12 : 18;

        $data = $request->validate([
            'jawaban'                          => ['required', 'array', "min:{$minSoal}"],
            'jawaban.*.id_pertanyaan_screening'=> ['required', 'integer', 'exists:pertanyaan_screening,id_pertanyaan_screening'],
            'jawaban.*.skor_item'              => ['required', 'integer', 'in:0,1,2'], // 0=Tidak sama sekali, 1=Agak, 2=Sangat
        ]);

        $screening = DB::transaction(function () use ($anak, $instrumen, $usiaBulan, $data) {
            $screening = ScreeningAnak::create([
                'id_anak'                  => $anak->id_anak,
                'instrumen_digunakan'      => $instrumen,
                'usia_anak_saat_screening' => $usiaBulan,
                'tanggal_screening'        => now(),
                'status_risiko'            => 'aman',
                'rekomendasi'              => 'aktivitas_parenting',
            ]);

            $payloadJawaban = [];
            foreach ($data['jawaban'] as $item) {
                $payloadJawaban[] = [
                    'id_screening'             => $screening->id_screening,
                    'id_pertanyaan_screening'  => $item['id_pertanyaan_screening'],
                    'skor_item'                => $item['skor_item'],
                ];
            }

            $screening->jawaban()->createMany($payloadJawaban);

            // Hitung skor klinis dan at_risk
            return $this->scoringService->calculate($screening->id_screening);
        });

        return response()->json([
            'message'   => 'Screening anak berhasil diproses.',
            'screening' => $screening->load('jawaban.pertanyaan'),
        ], 201);
    }

    /**
     * Riwayat screening untuk anak tertentu
     */
    public function history(Request $request, int $idAnak): JsonResponse
    {
        $anak = $this->findOwnedChild($request, $idAnak);

        $riwayat = $anak->screenings()
            ->orderByDesc('tanggal_screening')
            ->get();

        return response()->json($riwayat);
    }

    /**
     * Detail hasil screening
     */
    public function show(Request $request, int $idAnak, int $idScreening): JsonResponse
    {
        $anak = $this->findOwnedChild($request, $idAnak);

        $screening = $anak->screenings()
            ->with('jawaban.pertanyaan')
            ->findOrFail($idScreening);

        return response()->json($screening);
    }

    private function findOwnedChild(Request $request, int $idAnak): Anak
    {
        return $request->user()->anak()->findOrFail($idAnak);
    }
}
