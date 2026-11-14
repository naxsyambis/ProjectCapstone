<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgressMateri extends Model
{
    protected $table = 'progress_materi';

    protected $primaryKey = 'id_progress_materi';

    const CREATED_AT = null;
    const UPDATED_AT = 'updated_at';

    protected $fillable = [
        'id_user',
        'id_materi',
        'status',
        'persentase',
        'tanggal_selesai',
    ];

    protected function casts(): array
    {
        return [
            'persentase'      => 'integer',
            'tanggal_selesai' => 'datetime',
            'updated_at'      => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function materi(): BelongsTo
    {
        return $this->belongsTo(Materi::class, 'id_materi', 'id_materi');
    }
}
