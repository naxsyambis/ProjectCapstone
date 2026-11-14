<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentPolaAsuh extends Model
{
    protected $table = 'assessment_pola_asuh';

    protected $primaryKey = 'id_assessment';

    public $timestamps = false;

    protected $fillable = [
        'id_user',
        'tanggal_assessment',
        'skor_autoritatif',
        'skor_otoriter',
        'skor_permisif',
        'gaya_dominan',
        'keterangan',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_assessment' => 'datetime',
            'skor_autoritatif'   => 'float',
            'skor_otoriter'      => 'float',
            'skor_permisif'      => 'float',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function jawaban(): HasMany
    {
        return $this->hasMany(JawabanAssessment::class, 'id_assessment', 'id_assessment');
    }
}
