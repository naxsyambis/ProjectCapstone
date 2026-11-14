<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgressMission extends Model
{
    protected $table = 'progress_mission';

    protected $primaryKey = 'id_progress_misi';

    public $timestamps = false;

    protected $fillable = [
        'id_anak',
        'id_misi',
        'tanggal_mulai',
        'tanggal_selesai',
        'catatan',
    ];

    protected $appends = ['status'];

    protected function casts(): array
    {
        return [
            'tanggal_mulai'   => 'datetime',
            'tanggal_selesai' => 'datetime',
        ];
    }

    /**
     * Status diturunkan dari tanggal:
     * - tanggal_selesai != null -> 'selesai'
     * - tanggal_mulai != null   -> 'sedang_berjalan'
     * - selainnya               -> 'belum_mulai'
     */
    protected function status(): Attribute
    {
        return Attribute::get(function () {
            if ($this->tanggal_selesai) {
                return 'selesai';
            }
            if ($this->tanggal_mulai) {
                return 'sedang_berjalan';
            }
            return 'belum_mulai';
        });
    }

    public function anak(): BelongsTo
    {
        return $this->belongsTo(Anak::class, 'id_anak', 'id_anak');
    }

    public function misi(): BelongsTo
    {
        return $this->belongsTo(ParentingMission::class, 'id_misi', 'id_misi');
    }
}
