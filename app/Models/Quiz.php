<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    protected $table = 'quiz';

    protected $primaryKey = 'id_quiz';

    public $timestamps = false;

    protected $fillable = [
        'id_materi',
        'judul_quiz',
        'deskripsi',
        'batas_waktu_menit',
        'min_skor_lulus',
    ];

    protected function casts(): array
    {
        return [
            'batas_waktu_menit' => 'integer',
            'min_skor_lulus'    => 'float',
        ];
    }

    public function materi(): BelongsTo
    {
        return $this->belongsTo(Materi::class, 'id_materi', 'id_materi');
    }

    public function pertanyaan(): HasMany
    {
        return $this->hasMany(PertanyaanQuiz::class, 'id_quiz', 'id_quiz')->orderBy('urutan');
    }

    public function hasil(): HasMany
    {
        return $this->hasMany(HasilQuiz::class, 'id_quiz', 'id_quiz');
    }
}
