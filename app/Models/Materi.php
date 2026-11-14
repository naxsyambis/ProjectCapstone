<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Materi extends Model
{
    protected $table = 'materi';

    protected $primaryKey = 'id_materi';

    protected $fillable = [
        'judul',
        'kategori_target',
        'tipe_konten',
        'url_video',
        'isi_artikel',
        'ringkasan',
        'url_pdf',
        'referensi',
        'durasi_menit',
    ];

    protected function casts(): array
    {
        return [
            'durasi_menit' => 'integer',
        ];
    }

    public function quiz(): HasOne
    {
        return $this->hasOne(Quiz::class, 'id_materi', 'id_materi');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(ProgressMateri::class, 'id_materi', 'id_materi');
    }

    public function missions(): HasMany
    {
        return $this->hasMany(ParentingMission::class, 'id_materi', 'id_materi');
    }
}
