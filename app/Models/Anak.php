<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Anak extends Model
{
    protected $table = 'anak';

    protected $primaryKey = 'id_anak';

    protected $fillable = [
        'id_user',
        'nama',
        'tanggal_lahir',
        'jenis_kelamin',
        'foto',
        'catatan',
    ];

    protected $appends = ['usia_bulan'];

    protected function casts(): array
    {
        return [
            'tanggal_lahir' => 'date:Y-m-d',
        ];
    }

    /** Usia anak dalam bulan penuh, dihitung dari tanggal_lahir. */
    protected function usiaBulan(): Attribute
    {
        return Attribute::get(
            fn () => (int) $this->tanggal_lahir->diffInMonths(now())
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function screenings(): HasMany
    {
        return $this->hasMany(ScreeningAnak::class, 'id_anak', 'id_anak');
    }

    public function progressMisi(): HasMany
    {
        return $this->hasMany(ProgressMission::class, 'id_anak', 'id_anak');
    }
}
