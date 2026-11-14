<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PertanyaanScreening extends Model
{
    protected $table = 'pertanyaan_screening';

    protected $primaryKey = 'id_pertanyaan_screening';

    public $timestamps = false;

    protected $fillable = [
        'instrumen',
        'nomor_item',
        'subscale',
        'teks_pertanyaan',
    ];

    protected function casts(): array
    {
        return [
            'nomor_item' => 'integer',
        ];
    }

    public function jawaban(): HasMany
    {
        return $this->hasMany(JawabanScreening::class, 'id_pertanyaan_screening', 'id_pertanyaan_screening');
    }
}
