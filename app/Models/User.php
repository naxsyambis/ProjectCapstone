<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users';

    protected $primaryKey = 'id_user';

    const CREATED_AT = 'tanggal_daftar';

    protected $fillable = [
        'nama_lengkap',
        'email',
        'email_verified_at',
        'password',
        'nomor_hp',
        'foto_profil',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function anak(): HasMany
    {
        return $this->hasMany(Anak::class, 'id_user', 'id_user');
    }

    public function assessments(): HasMany
    {
        return $this->hasMany(AssessmentPolaAsuh::class, 'id_user', 'id_user');
    }

    public function rekomendasiMateri(): HasMany
    {
        return $this->hasMany(RekomendasiMateri::class, 'id_user', 'id_user');
    }

    public function progressMateri(): HasMany
    {
        return $this->hasMany(ProgressMateri::class, 'id_user', 'id_user');
    }

    public function hasilQuiz(): HasMany
    {
        return $this->hasMany(HasilQuiz::class, 'id_user', 'id_user');
    }
}
