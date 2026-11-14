<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HasilQuiz extends Model
{
    protected $table = 'hasil_quiz';

    protected $primaryKey = 'id_hasil_quiz';

    public $timestamps = false;

    protected $fillable = [
        'id_user',
        'id_quiz',
        'skor',
        'status_lulus',
        'tanggal_mengerjakan',
        'waktu_detik',
    ];

    protected function casts(): array
    {
        return [
            'skor'                => 'float',
            'status_lulus'        => 'boolean',
            'tanggal_mengerjakan' => 'datetime',
            'waktu_detik'         => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class, 'id_quiz', 'id_quiz');
    }
}
