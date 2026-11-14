<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ScreeningAnak extends Model
{
    protected $table = 'screening_anak';

    protected $primaryKey = 'id_screening';

    public $timestamps = false;

    protected $fillable = [
        'id_anak',
        'instrumen_digunakan',
        'usia_anak_saat_screening',
        'tanggal_screening',
        'skor_bpsc_irritability',
        'skor_bpsc_difficulty_routines',
        'skor_bpsc_inflexibility',
        'skor_ppsc_total',
        'status_risiko',
        'rekomendasi',
        'catatan_klinis',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_screening'             => 'datetime',
            'usia_anak_saat_screening'      => 'integer',
            'skor_bpsc_irritability'        => 'integer',
            'skor_bpsc_difficulty_routines' => 'integer',
            'skor_bpsc_inflexibility'       => 'integer',
            'skor_ppsc_total'               => 'integer',
        ];
    }

    public function anak(): BelongsTo
    {
        return $this->belongsTo(Anak::class, 'id_anak', 'id_anak');
    }

    public function jawaban(): HasMany
    {
        return $this->hasMany(JawabanScreening::class, 'id_screening', 'id_screening');
    }
}
