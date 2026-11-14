<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ParentingMission extends Model
{
    protected $table = 'parenting_mission';

    protected $primaryKey = 'id_misi';

    public $timestamps = false;

    protected $fillable = [
        'id_materi',
        'judul_misi',
        'deskripsi',
        'poin',
        'tenggat_hari',
        'badge_reward',
        'usia_min_bulan',
        'usia_maks_bulan',
        'sumber_aktivitas',
    ];

    protected function casts(): array
    {
        return [
            'poin'            => 'integer',
            'tenggat_hari'    => 'integer',
            'usia_min_bulan'  => 'integer',
            'usia_maks_bulan' => 'integer',
        ];
    }

    public function materi(): BelongsTo
    {
        return $this->belongsTo(Materi::class, 'id_materi', 'id_materi');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(ProgressMission::class, 'id_misi', 'id_misi');
    }
}
