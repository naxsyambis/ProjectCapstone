<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JawabanAssessment extends Model
{
    protected $table = 'jawaban_assessment';

    protected $primaryKey = 'id_jawaban_assessment';

    public $timestamps = false;

    protected $fillable = [
        'id_assessment',
        'id_pertanyaan_assessment',
        'skor_item',
    ];

    protected function casts(): array
    {
        return [
            'skor_item' => 'integer',
        ];
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(AssessmentPolaAsuh::class, 'id_assessment', 'id_assessment');
    }

    public function pertanyaan(): BelongsTo
    {
        return $this->belongsTo(PertanyaanAssessment::class, 'id_pertanyaan_assessment', 'id_pertanyaan_assessment');
    }
}
