<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PertanyaanAssessment extends Model
{
    protected $table = 'pertanyaan_assessment';

    protected $primaryKey = 'id_pertanyaan_assessment';

    public $timestamps = false;

    protected $fillable = [
        'nomor_item',
        'teks_pertanyaan',
        'gaya_asuh',
        'dimensi',
    ];

    protected function casts(): array
    {
        return [
            'nomor_item' => 'integer',
        ];
    }

    public function jawaban(): HasMany
    {
        return $this->hasMany(JawabanAssessment::class, 'id_pertanyaan_assessment', 'id_pertanyaan_assessment');
    }
}
