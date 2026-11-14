<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RekomendasiMateri extends Model
{
    protected $table = 'rekomendasi_materi';

    protected $primaryKey = 'id_rekomendasi';

    public $timestamps = false;

    protected $fillable = [
        'id_user',
        'id_assessment',
        'id_screening',
        'kategori_target',
        'tanggal_dibuat',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_dibuat' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(AssessmentPolaAsuh::class, 'id_assessment', 'id_assessment');
    }

    public function screening(): BelongsTo
    {
        return $this->belongsTo(ScreeningAnak::class, 'id_screening', 'id_screening');
    }
}
