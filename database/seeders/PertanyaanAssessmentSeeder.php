<?php

namespace Database\Seeders;

use App\Models\PertanyaanAssessment;
use Illuminate\Database\Seeder;

class PertanyaanAssessmentSeeder extends Seeder
{
    /**
     * Seed 32 item PSDQ-SF (Robinson et al., 2001)
     * Skala Likert: 1=Tidak Pernah ... 5=Selalu
     */
    public function run(): void
    {
        $items = [
            // AUTORITATIF (15 item)
            // Support & Afeksi (5)
            ['nomor_item' => 1, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'support_afeksi', 'teks_pertanyaan' => 'Memberikan pujian dan apresiasi yang tulus ketika anak berperilaku baik.'],
            ['nomor_item' => 2, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'support_afeksi', 'teks_pertanyaan' => 'Menunjukkan kasih sayang secara fisik (memeluk, mencium, atau merangkul) kepada anak.'],
            ['nomor_item' => 3, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'support_afeksi', 'teks_pertanyaan' => 'Merespons dan peka terhadap perasaan serta kebutuhan emosional anak.'],
            ['nomor_item' => 4, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'support_afeksi', 'teks_pertanyaan' => 'Menyediakan waktu khusus untuk berbicara santai dan mendengarkan cerita anak.'],
            ['nomor_item' => 5, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'support_afeksi', 'teks_pertanyaan' => 'Menghibur dan menenangkan anak saat ia sedang merasa sedih atau cemas.'],

            // Regulasi / Penalaran Induktif (5)
            ['nomor_item' => 6, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'regulasi', 'teks_pertanyaan' => 'Menjelaskan alasan di balik setiap aturan yang diberlakukan di rumah.'],
            ['nomor_item' => 7, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'regulasi', 'teks_pertanyaan' => 'Membantu anak memahami akibat dari perilaku buruknya terhadap orang lain.'],
            ['nomor_item' => 8, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'regulasi', 'teks_pertanyaan' => 'Konsisten menerapkan aturan keluarga yang telah disepakati bersama.'],
            ['nomor_item' => 9, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'regulasi', 'teks_pertanyaan' => 'Menekankan pentingnya tanggung jawab daripada sekadar kepatuhan buta.'],
            ['nomor_item' => 10, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'regulasi', 'teks_pertanyaan' => 'Mengajak anak berdiskusi saat menghadapi masalah perilaku.'],

            // Otonomi Demokratis (5)
            ['nomor_item' => 11, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'otonomi', 'teks_pertanyaan' => 'Memberi kesempatan anak untuk mengemukakan pendapatnya dalam keputusan keluarga.'],
            ['nomor_item' => 12, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'otonomi', 'teks_pertanyaan' => 'Mendorong anak untuk mencoba menyelesaikan masalahnya sendiri terlebih dahulu.'],
            ['nomor_item' => 13, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'otonomi', 'teks_pertanyaan' => 'Menghargai pilihan dan minat pribadi anak.'],
            ['nomor_item' => 14, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'otonomi', 'teks_pertanyaan' => 'Memberi kebebasan yang bertanggung jawab sesuai tahap usia anak.'],
            ['nomor_item' => 15, 'gaya_asuh' => 'autoritatif', 'dimensi' => 'otonomi', 'teks_pertanyaan' => 'Mempertimbangkan sudut pandang anak sebelum memutuskan sesuatu yang menyangkut dirinya.'],

            // OTORITER (12 item)
            // Koersi Fisik (4)
            ['nomor_item' => 16, 'gaya_asuh' => 'otoriter', 'dimensi' => 'koersi_fisik', 'teks_pertanyaan' => 'Menggunakan hukuman fisik (seperti memukul atau mencubit) saat anak tidak patuh.'],
            ['nomor_item' => 17, 'gaya_asuh' => 'otoriter', 'dimensi' => 'koersi_fisik', 'teks_pertanyaan' => 'Mencengkeram atau menarik anak dengan kasar saat merasa marah kepadanya.'],
            ['nomor_item' => 18, 'gaya_asuh' => 'otoriter', 'dimensi' => 'koersi_fisik', 'teks_pertanyaan' => 'Menampar atau memukul pantat anak ketika ia melakukan kesalahan besar.'],
            ['nomor_item' => 19, 'gaya_asuh' => 'otoriter', 'dimensi' => 'koersi_fisik', 'teks_pertanyaan' => 'Mengancam akan memberikan kekerasan fisik agar anak mau menuruti perintah.'],

            // Hostilitas Verbal (4)
            ['nomor_item' => 20, 'gaya_asuh' => 'otoriter', 'dimensi' => 'hostilitas_verbal', 'teks_pertanyaan' => 'Membentak atau berteriak dengan nada tinggi saat marah pada anak.'],
            ['nomor_item' => 21, 'gaya_asuh' => 'otoriter', 'dimensi' => 'hostilitas_verbal', 'teks_pertanyaan' => 'Mengeluarkan kata-kata pedas, mengejek, atau mempermalukan anak.'],
            ['nomor_item' => 22, 'gaya_asuh' => 'otoriter', 'dimensi' => 'hostilitas_verbal', 'teks_pertanyaan' => 'Menyalahkan anak secara berlebihan atas kesalahan sepele yang ia lakukan.'],
            ['nomor_item' => 23, 'gaya_asuh' => 'otoriter', 'dimensi' => 'hostilitas_verbal', 'teks_pertanyaan' => 'Mengatakan kalimat yang melukai perasaan anak ketika ia menolak perintah.'],

            // Hukuman Non-Fisik / Hukuman Arbitrer (4)
            ['nomor_item' => 24, 'gaya_asuh' => 'otoriter', 'dimensi' => 'hukuman', 'teks_pertanyaan' => 'Menuntut kepatuhan mutlak tanpa mau menjelaskan alasan aturan tersebut dibuat.'],
            ['nomor_item' => 25, 'gaya_asuh' => 'otoriter', 'dimensi' => 'hukuman', 'teks_pertanyaan' => 'Menghukum anak dengan mencabut haknya tanpa ada kesempatan anak menjelaskan.'],
            ['nomor_item' => 26, 'gaya_asuh' => 'otoriter', 'dimensi' => 'hukuman', 'teks_pertanyaan' => 'Mendiamkan anak (silent treatment) sebagai bentuk hukuman saat marah.'],
            ['nomor_item' => 27, 'gaya_asuh' => 'otoriter', 'dimensi' => 'hukuman', 'teks_pertanyaan' => 'Mengharuskan anak selalu patuh karena prinsip "karena orang tua yang menyuruh".'],

            // PERMISIF (5 item)
            // Indulgensi / Kurang Batasan (5)
            ['nomor_item' => 28, 'gaya_asuh' => 'permisif', 'dimensi' => 'indulgensi', 'teks_pertanyaan' => 'Menyerah dan menuruti kemauan anak jika ia mulai menangis atau merengek.'],
            ['nomor_item' => 29, 'gaya_asuh' => 'permisif', 'dimensi' => 'indulgensi', 'teks_pertanyaan' => 'Merasa kesulitan untuk berkata "tidak" pada permintaan anak.'],
            ['nomor_item' => 30, 'gaya_asuh' => 'permisif', 'dimensi' => 'indulgensi', 'teks_pertanyaan' => 'Tidak menetapkan konsekuensi yang jelas ketika anak melanggar aturan.'],
            ['nomor_item' => 31, 'gaya_asuh' => 'permisif', 'dimensi' => 'indulgensi', 'teks_pertanyaan' => 'Membiarkan anak melakukan apa saja sesuka hatinya tanpa banyak arahan.'],
            ['nomor_item' => 32, 'gaya_asuh' => 'permisif', 'dimensi' => 'indulgensi', 'teks_pertanyaan' => 'Memanjakan anak secara berlebihan meskipun ia berbuat salah.'],
        ];

        foreach ($items as $item) {
            PertanyaanAssessment::updateOrCreate(
                ['nomor_item' => $item['nomor_item']],
                $item
            );
        }
    }
}
