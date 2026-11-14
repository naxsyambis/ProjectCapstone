<?php

namespace App\Http\Controllers;

use App\Models\AssessmentPolaAsuh;
use App\Models\PertanyaanAssessment;
use App\Models\RekomendasiMateri;
use App\Services\PSDQScoringService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AssessmentController extends Controller
{
    public function __construct(
        protected PSDQScoringService $scoringService
    ) {}

    /**
     * Ambil 32 pertanyaan PSDQ-SF untuk kuesioner asesmen.
     */
    public function pertanyaan(): JsonResponse
    {
        $pertanyaan = PertanyaanAssessment::orderBy('nomor_item')->get([
            'id_pertanyaan_assessment',
            'nomor_item',
            'teks_pertanyaan',
            'gaya_asuh',
            'dimensi',
        ]);

        return response()->json([
            'total'      => $pertanyaan->count(),
            'pertanyaan' => $pertanyaan,
        ]);
    }

    /**
     * Simpan jawaban asesmen dan hitung skor gaya pengasuhan secara otomatis.
     */
    public function submit(Request $request): JsonResponse
    {
        $data = $request->validate([
            'jawaban'                          => ['required', 'array', 'min:32'],
            'jawaban.*.id_pertanyaan_assessment' => ['required', 'integer', 'exists:pertanyaan_assessment,id_pertanyaan_assessment'],
            'jawaban.*.skor_item'              => ['required', 'integer', 'min:1', 'max:5'],
        ]);

        $user = $request->user();

        $assessment = DB::transaction(function () use ($user, $data) {
            $assessment = AssessmentPolaAsuh::create([
                'id_user'            => $user->id_user,
                'tanggal_assessment' => now(),
            ]);

            $payloadJawaban = [];
            foreach ($data['jawaban'] as $item) {
                $payloadJawaban[] = [
                    'id_assessment'            => $assessment->id_assessment,
                    'id_pertanyaan_assessment' => $item['id_pertanyaan_assessment'],
                    'skor_item'                => $item['skor_item'],
                ];
            }

            $assessment->jawaban()->createMany($payloadJawaban);

            // Hitung skor otomatis dengan PSDQScoringService
            $scored = $this->scoringService->calculate($assessment->id_assessment);

            // Simpan rekomendasi materi berdasarkan gaya dominan
            $kategoriTarget = $this->scoringService->getTargetCategory($scored->gaya_dominan);
            RekomendasiMateri::create([
                'id_user'         => $user->id_user,
                'id_assessment'   => $scored->id_assessment,
                'id_screening'    => null,
                'kategori_target' => $kategoriTarget,
                'tanggal_dibuat'  => now(),
            ]);

            return $scored;
        });

        return response()->json([
            'message'    => 'Assessment berhasil disimpan dan dinilai.',
            'assessment' => $assessment->load('jawaban.pertanyaan'),
        ], 201);
    }

    /**
     * Riwayat assessment yang pernah dilakukan oleh user.
     */
    public function history(Request $request): JsonResponse
    {
        $riwayat = $request->user()->assessments()
            ->orderByDesc('tanggal_assessment')
            ->get();

        return response()->json($riwayat);
    }

    /**
     * Detail hasil assessment tertentu beserta rincian jawabannya.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $assessment = $request->user()->assessments()
            ->with('jawaban.pertanyaan')
            ->findOrFail($id);

        return response()->json($assessment);
    }
}
