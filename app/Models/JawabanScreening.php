<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JawabanScreening extends Model
{
    protected $table = 'jawaban_screening';

    protected $primaryKey = 'id_jawaban_screening';

    public $timestamps = false;

    protected $fillable = [
        'id_screening',
        'id_pertanyaan_screening',
        'skor_item',
    ];

    protected function casts(): array
    {
        return [
            'skor_item' => 'integer',
        ];
    }

    public function screening(): BelongsTo
    {
        return $this->belongsTo(ScreeningAnak::class, 'id_screening', 'id_screening');
    }

    public function pertanyaan(): BelongsTo
    {
        return $this->belongsTo(PertanyaanScreening::class, 'id_pertanyaan_screening', 'id_pertanyaan_screening');
    }
}
