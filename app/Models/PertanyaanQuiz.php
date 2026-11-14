<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PertanyaanQuiz extends Model
{
    protected $table = 'pertanyaan_quiz';

    protected $primaryKey = 'id_pertanyaan_quiz';

    public $timestamps = false;

    protected $fillable = [
        'id_quiz',
        'teks_pertanyaan',
        'pilihan_a',
        'pilihan_b',
        'pilihan_c',
        'pilihan_d',
        'kunci_jawaban',
        'urutan',
    ];

    protected function casts(): array
    {
        return [
            'urutan' => 'integer',
        ];
    }

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class, 'id_quiz', 'id_quiz');
    }
}
