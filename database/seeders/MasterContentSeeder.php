<?php

namespace Database\Seeders;

use App\Models\Materi;
use App\Models\ParentingMission;
use App\Models\Quiz;
use Illuminate\Database\Seeder;

class MasterContentSeeder extends Seeder
{
    /**
     * Seed contoh materi awal, quiz, dan misi parenting ASQ:SE-2
     */
    public function run(): void
    {
        // 1. Materi Otoriter ke Demokratis
        $materi1 = Materi::firstOrCreate(
            ['judul' => 'Transisi Komunikasi Efektif: Dari Memerintah Menuju Mendengarkan'],
            [
                'kategori_target' => 'otoriter_ke_demokratis',
                'tipe_konten'     => 'artikel',
                'ringkasan'       => 'Panduan praktis bagi orang tua untuk mengubah instruksi keras menjadi dialog dua arah yang hangat tanpa kehilangan otoritas positif.',
                'isi_artikel'     => "## Mengapa Komunikasi Dua Arah Penting?\n\nPola asuh otoriter seringkali mengutamakan kepatuhan instan, namun riset menunjukkan bahwa dialog dua arah membangun kecerdasan emosional dan penalaran moral anak.\n\n### Langkah Praktis:\n1. **Gunakan 'I-Message' alih-alih menyalahkan**: Contoh: 'Ayah khawatir kalau kamu memanjat itu' alih-alih 'Jangan nakal!'.\n2. **Dengarkan sebelum menanggapi**: Beri jeda 5 detik saat anak berbicara sebelum memberikan arahan.\n3. **Jelaskan konsekuensi logis**: Bantu anak memahami *mengapa* aturan itu ada.",
                'durasi_menit'    => 7,
            ]
        );

        // Quiz Materi 1
        if (! $materi1->quiz) {
            $quiz1 = Quiz::create([
                'id_materi'         => $materi1->id_materi,
                'judul_quiz'        => 'Kuis Evaluasi: Komunikasi Efektif Orang Tua',
                'deskripsi'         => 'Uji pemahaman Anda tentang transisi gaya komunikasi instruktif ke dialogis.',
                'batas_waktu_menit' => 10,
                'min_skor_lulus'    => 70.00,
            ]);

            $quiz1->pertanyaan()->createMany([
                [
                    'teks_pertanyaan' => 'Apa keuntungan utama menggunakan teknik I-Message saat menegur anak?',
                    'pilihan_a'       => 'Membuat anak merasa bersalah dan takut.',
                    'pilihan_b'       => 'Menyampaikan kekhawatiran orang tua tanpa menyudutkan harga diri anak.',
                    'pilihan_c'       => 'Menunjukkan kekuasaan orang tua di rumah.',
                    'pilihan_d'       => 'Membuat anak langsung diam seketika.',
                    'kunci_jawaban'   => 'b',
                    'urutan'          => 1,
                ],
                [
                    'teks_pertanyaan' => 'Apa yang membedakan konsekuensi logis dengan hukuman murni?',
                    'pilihan_a'       => 'Konsekuensi logis berhubungan langsung dengan tindakan anak dan bertujuan mendidik.',
                    'pilihan_b'       => 'Konsekuensi logis selalu menimbulkan rasa sakit fisik.',
                    'pilihan_c'       => 'Hukuman murni lebih efektif untuk jangka panjang.',
                    'pilihan_d'       => 'Konsekuensi logis hanya boleh diberikan oleh guru sekolah.',
                    'kunci_jawaban'   => 'a',
                    'urutan'          => 2,
                ],
            ]);
        }

        // Misi Parenting ASQ:SE-2 untuk Materi 1
        ParentingMission::firstOrCreate(
            ['judul_misi' => 'Misi Refleksi 10 Menit: Dengarkan Cerita Anak'],
            [
                'id_materi'        => $materi1->id_materi,
                'deskripsi'        => 'Duduk bersama anak tanpa distraksi gawai selama 10 menit. Tanyakan tentang hal paling menyenangkan yang ia rasakan hari ini dan dengarkan tanpa memotong.',
                'poin'             => 15,
                'tenggat_hari'     => 1,
                'badge_reward'     => 'Pendengar Hebat',
                'usia_min_bulan'   => 24,
                'usia_maks_bulan'  => 65,
                'sumber_aktivitas' => 'ASQ:SE-2 Learning Activities (Komunikasi Sosial)',
            ]
        );

        // 2. Materi Permisif ke Demokratis
        $materi2 = Materi::firstOrCreate(
            ['judul' => 'Membangun Batasan yang Tegas dan Penuh Kasih (Loving Limits)'],
            [
                'kategori_target' => 'permisif_ke_demokratis',
                'tipe_konten'     => 'artikel',
                'ringkasan'       => 'Cara menetapkan batasan yang konsisten pada anak tanpa merasa bersalah, menciptakan rasa aman bagi perkembangan emosi mereka.',
                'isi_artikel'     => "## Anak Membutuhkan Batasan untuk Merasa Aman\n\nMenjadi orang tua yang penuh kasih bukan berarti mengizinkan segalanya. Batasan yang konsisten justru membuat anak merasa terlindungi dan belajar regulasi diri.",
                'durasi_menit'    => 5,
            ]
        );

        // Misi Parenting untuk Balita (BPSC usia 6-18 bulan)
        ParentingMission::firstOrCreate(
            ['judul_misi' => 'Permainan Cilukba dan Rutinitas Tidur Tenang'],
            [
                'id_materi'        => $materi2->id_materi,
                'deskripsi'        => 'Lakukan kontak mata dan permainan cilukba untuk melatih kepercayaan sosial bayi, dilanjutkan dengan rutinitas membaca dongeng pengantar tidur di jam yang sama.',
                'poin'             => 10,
                'tenggat_hari'     => 2,
                'badge_reward'     => 'Sahabat Bayi',
                'usia_min_bulan'   => 6,
                'usia_maks_bulan'  => 18,
                'sumber_aktivitas' => 'ASQ:SE-2 Learning Activities (Regulasi Tidur & Sosial)',
            ]
        );
    }
}
