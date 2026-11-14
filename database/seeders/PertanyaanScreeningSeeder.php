<?php

namespace Database\Seeders;

use App\Models\PertanyaanScreening;
use Illuminate\Database\Seeder;

class PertanyaanScreeningSeeder extends Seeder
{
    /**
     * Seed master data BPSC (12 item) dan PPSC (18 item)
     * Skala: 0=Tidak Sama Sekali | 1=Agak | 2=Sangat
     */
    public function run(): void
    {
        $items = [
            // BPSC (Usia 0 - 17 Bulan) - 12 Item
            // Irritability (4 item)
            ['instrumen' => 'BPSC', 'nomor_item' => 1, 'subscale' => 'irritability', 'teks_pertanyaan' => 'Apakah bayi Anda sering rewel atau mudah menangis tanpa sebab yang jelas?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 2, 'subscale' => 'irritability', 'teks_pertanyaan' => 'Apakah bayi Anda sulit ditenangkan saat menangis?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 3, 'subscale' => 'irritability', 'teks_pertanyaan' => 'Apakah bayi Anda mudah kaget atau bereaksi berlebihan terhadap suara keras?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 4, 'subscale' => 'irritability', 'teks_pertanyaan' => 'Apakah bayi Anda sering tampak kesal atau tidak nyaman sepanjang hari?'],

            // Difficulty Routines (4 item)
            ['instrumen' => 'BPSC', 'nomor_item' => 5, 'subscale' => 'difficulty_routines', 'teks_pertanyaan' => 'Apakah bayi Anda memiliki jadwal tidur yang sangat tidak teratur atau sulit tidur nyenyak?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 6, 'subscale' => 'difficulty_routines', 'teks_pertanyaan' => 'Apakah bayi Anda mengalami kesulitan atau menolak saat diberi makan/menyusu?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 7, 'subscale' => 'difficulty_routines', 'teks_pertanyaan' => 'Apakah sangat sulit membentuk rutinitas harian untuk bayi Anda?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 8, 'subscale' => 'difficulty_routines', 'teks_pertanyaan' => 'Apakah perubahan kecil pada kebiasaan sehari-hari membuat bayi Anda sangat gelisah?'],

            // Inflexibility (4 item)
            ['instrumen' => 'BPSC', 'nomor_item' => 9, 'subscale' => 'inflexibility', 'teks_pertanyaan' => 'Apakah bayi Anda sulit beradaptasi dengan orang baru di sekitarnya?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 10, 'subscale' => 'inflexibility', 'teks_pertanyaan' => 'Apakah bayi Anda sangat cemas atau menolak saat berada di tempat asing?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 11, 'subscale' => 'inflexibility', 'teks_pertanyaan' => 'Apakah bayi Anda menolak dipindahtangankan dari pengasuh utamanya?'],
            ['instrumen' => 'BPSC', 'nomor_item' => 12, 'subscale' => 'inflexibility', 'teks_pertanyaan' => 'Apakah bayi Anda tampak kaku dan sulit menerima transisi aktivitas?'],

            // PPSC (Usia 18 - 65 Bulan) - 18 Item
            // Externalizing
            ['instrumen' => 'PPSC', 'nomor_item' => 1, 'subscale' => 'externalizing', 'teks_pertanyaan' => 'Sering mengalami tantrum hebat atau ledakan amarah?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 2, 'subscale' => 'externalizing', 'teks_pertanyaan' => 'Suka memukul, menendang, atau menggigit orang lain?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 3, 'subscale' => 'externalizing', 'teks_pertanyaan' => 'Sering merusak mainan atau benda di sekitarnya dengan sengaja?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 4, 'subscale' => 'externalizing', 'teks_pertanyaan' => 'Sulit mematuhi aturan dan kerap membangkang arahan orang tua?'],

            // Attention
            ['instrumen' => 'PPSC', 'nomor_item' => 5, 'subscale' => 'attention', 'teks_pertanyaan' => 'Sangat sulit duduk tenang atau selalu bergerak seperti digerakkan motor?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 6, 'subscale' => 'attention', 'teks_pertanyaan' => 'Mudah teralihkan perhatiannya dan sulit menyelesaikan aktivitas bermain sederhana?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 7, 'subscale' => 'attention', 'teks_pertanyaan' => 'Sering bertindak terburu-buru tanpa memikirkan bahaya (impulsif)?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 8, 'subscale' => 'attention', 'teks_pertanyaan' => 'Sulit diajak fokus mendengarkan saat diajak bicara langsung?'],

            // Internalizing
            ['instrumen' => 'PPSC', 'nomor_item' => 9, 'subscale' => 'internalizing', 'teks_pertanyaan' => 'Tampak sangat pemalu, menarik diri, atau takut mencoba hal baru?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 10, 'subscale' => 'internalizing', 'teks_pertanyaan' => 'Sering terlihat sedih, murung, atau tampak tidak bahagia?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 11, 'subscale' => 'internalizing', 'teks_pertanyaan' => 'Sangat cemas ketika harus berpisah sementara dengan orang tua?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 12, 'subscale' => 'internalizing', 'teks_pertanyaan' => 'Sering mengeluh sakit perut/kepala tanpa penyebab medis yang jelas?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 13, 'subscale' => 'internalizing', 'teks_pertanyaan' => 'Memiliki ketakutan berlebihan terhadap hal-hal tertentu?'],

            // Parenting Challenges
            ['instrumen' => 'PPSC', 'nomor_item' => 14, 'subscale' => 'parenting_challenges', 'teks_pertanyaan' => 'Apakah Anda merasa sangat kewalahan dalam menghadapi perilaku anak sehari-hari?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 15, 'subscale' => 'parenting_challenges', 'teks_pertanyaan' => 'Apakah perilaku anak menimbulkan konflik atau ketegangan yang sering di rumah?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 16, 'subscale' => 'parenting_challenges', 'teks_pertanyaan' => 'Apakah anak memiliki pola tidur yang sangat bermasalah atau sering terbangun ketakutan?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 17, 'subscale' => 'parenting_challenges', 'teks_pertanyaan' => 'Apakah anak sangat pemilih makanan hingga mengganggu suasana makan keluarga?'],
            ['instrumen' => 'PPSC', 'nomor_item' => 18, 'subscale' => 'parenting_challenges', 'teks_pertanyaan' => 'Apakah Anda merasa khawatir dengan perkembangan sosial dan pertemanan anak?'],
        ];

        foreach ($items as $item) {
            PertanyaanScreening::updateOrCreate(
                [
                    'instrumen'  => $item['instrumen'],
                    'nomor_item' => $item['nomor_item'],
                ],
                $item
            );
        }
    }
}
