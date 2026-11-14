// Master data butir asesmen pola asuh (PSDQ-SF Robinson et al., 2001)
export const DEFAULT_PERTANYAAN_ASSESSMENT = [
  // AUTORITATIF (15 item)
  { id_pertanyaan_assessment: 1, nomor_item: 1, gaya_asuh: 'autoritatif', dimensi: 'support_afeksi', teks_pertanyaan: 'Memberikan pujian dan apresiasi yang tulus ketika anak berperilaku baik.' },
  { id_pertanyaan_assessment: 2, nomor_item: 2, gaya_asuh: 'autoritatif', dimensi: 'support_afeksi', teks_pertanyaan: 'Menunjukkan kasih sayang secara fisik (memeluk, mencium, atau merangkul) kepada anak.' },
  { id_pertanyaan_assessment: 3, nomor_item: 3, gaya_asuh: 'autoritatif', dimensi: 'support_afeksi', teks_pertanyaan: 'Merespons dan peka terhadap perasaan serta kebutuhan emosional anak.' },
  { id_pertanyaan_assessment: 4, nomor_item: 4, gaya_asuh: 'autoritatif', dimensi: 'support_afeksi', teks_pertanyaan: 'Menyediakan waktu khusus untuk berbicara santai dan mendengarkan cerita anak.' },
  { id_pertanyaan_assessment: 5, nomor_item: 5, gaya_asuh: 'autoritatif', dimensi: 'support_afeksi', teks_pertanyaan: 'Menghibur dan menenangkan anak saat ia sedang merasa sedih atau cemas.' },
  { id_pertanyaan_assessment: 6, nomor_item: 6, gaya_asuh: 'autoritatif', dimensi: 'regulasi', teks_pertanyaan: 'Menjelaskan alasan di balik setiap aturan yang diberlakukan di rumah.' },
  { id_pertanyaan_assessment: 7, nomor_item: 7, gaya_asuh: 'autoritatif', dimensi: 'regulasi', teks_pertanyaan: 'Membantu anak memahami akibat dari perilaku buruknya terhadap orang lain.' },
  { id_pertanyaan_assessment: 8, nomor_item: 8, gaya_asuh: 'autoritatif', dimensi: 'regulasi', teks_pertanyaan: 'Konsisten menerapkan aturan keluarga yang telah disepakati bersama.' },
  { id_pertanyaan_assessment: 9, nomor_item: 9, gaya_asuh: 'autoritatif', dimensi: 'regulasi', teks_pertanyaan: 'Menekankan pentingnya tanggung jawab daripada sekadar kepatuhan buta.' },
  { id_pertanyaan_assessment: 10, nomor_item: 10, gaya_asuh: 'autoritatif', dimensi: 'regulasi', teks_pertanyaan: 'Mengajak anak berdiskusi saat menghadapi masalah perilaku.' },
  { id_pertanyaan_assessment: 11, nomor_item: 11, gaya_asuh: 'autoritatif', dimensi: 'otonomi', teks_pertanyaan: 'Memberi kesempatan anak untuk mengemukakan pendapatnya dalam keputusan keluarga.' },
  { id_pertanyaan_assessment: 12, nomor_item: 12, gaya_asuh: 'autoritatif', dimensi: 'otonomi', teks_pertanyaan: 'Mendorong anak untuk mencoba menyelesaikan masalahnya sendiri terlebih dahulu.' },
  { id_pertanyaan_assessment: 13, nomor_item: 13, gaya_asuh: 'autoritatif', dimensi: 'otonomi', teks_pertanyaan: 'Menghargai pilihan dan minat pribadi anak.' },
  { id_pertanyaan_assessment: 14, nomor_item: 14, gaya_asuh: 'autoritatif', dimensi: 'otonomi', teks_pertanyaan: 'Memberi kebebasan yang bertanggung jawab sesuai tahap usia anak.' },
  { id_pertanyaan_assessment: 15, nomor_item: 15, gaya_asuh: 'autoritatif', dimensi: 'otonomi', teks_pertanyaan: 'Mempertimbangkan sudut pandang anak sebelum memutuskan sesuatu yang menyangkut dirinya.' },

  // OTORITER (12 item)
  { id_pertanyaan_assessment: 16, nomor_item: 16, gaya_asuh: 'otoriter', dimensi: 'koersi_fisik', teks_pertanyaan: 'Menggunakan hukuman fisik (seperti memukul atau mencubit) saat anak tidak patuh.' },
  { id_pertanyaan_assessment: 17, nomor_item: 17, gaya_asuh: 'otoriter', dimensi: 'koersi_fisik', teks_pertanyaan: 'Mencengkeram atau menarik anak dengan kasar saat merasa marah kepadanya.' },
  { id_pertanyaan_assessment: 18, nomor_item: 18, gaya_asuh: 'otoriter', dimensi: 'koersi_fisik', teks_pertanyaan: 'Menampar atau memukul pantat anak ketika ia melakukan kesalahan besar.' },
  { id_pertanyaan_assessment: 19, nomor_item: 19, gaya_asuh: 'otoriter', dimensi: 'koersi_fisik', teks_pertanyaan: 'Mengancam akan memberikan kekerasan fisik agar anak mau menuruti perintah.' },
  { id_pertanyaan_assessment: 20, nomor_item: 20, gaya_asuh: 'otoriter', dimensi: 'hostilitas_verbal', teks_pertanyaan: 'Membentak atau berteriak dengan nada tinggi saat marah pada anak.' },
  { id_pertanyaan_assessment: 21, nomor_item: 21, gaya_asuh: 'otoriter', dimensi: 'hostilitas_verbal', teks_pertanyaan: 'Mengeluarkan kata-kata pedas, mengejek, atau mempermalukan anak.' },
  { id_pertanyaan_assessment: 22, nomor_item: 22, gaya_asuh: 'otoriter', dimensi: 'hostilitas_verbal', teks_pertanyaan: 'Menyalahkan anak secara berlebihan atas kesalahan sepele yang ia lakukan.' },
  { id_pertanyaan_assessment: 23, nomor_item: 23, gaya_asuh: 'otoriter', dimensi: 'hostilitas_verbal', teks_pertanyaan: 'Mengatakan kalimat yang melukai perasaan anak ketika ia menolak perintah.' },
  { id_pertanyaan_assessment: 24, nomor_item: 24, gaya_asuh: 'otoriter', dimensi: 'hukuman', teks_pertanyaan: 'Menuntut kepatuhan mutlak tanpa mau menjelaskan alasan aturan tersebut dibuat.' },
  { id_pertanyaan_assessment: 25, nomor_item: 25, gaya_asuh: 'otoriter', dimensi: 'hukuman', teks_pertanyaan: 'Menghukum anak dengan mencabut haknya tanpa ada kesempatan anak menjelaskan.' },
  { id_pertanyaan_assessment: 26, nomor_item: 26, gaya_asuh: 'otoriter', dimensi: 'hukuman', teks_pertanyaan: 'Mendiamkan anak (silent treatment) sebagai bentuk hukuman saat marah.' },
  { id_pertanyaan_assessment: 27, nomor_item: 27, gaya_asuh: 'otoriter', dimensi: 'hukuman', teks_pertanyaan: 'Mengharuskan anak selalu patuh karena prinsip "karena orang tua yang menyuruh".' },

  // PERMISIF (5 item)
  { id_pertanyaan_assessment: 28, nomor_item: 28, gaya_asuh: 'permisif', dimensi: 'indulgensi', teks_pertanyaan: 'Menyerah dan menuruti kemauan anak jika ia mulai menangis atau merengek.' },
  { id_pertanyaan_assessment: 29, nomor_item: 29, gaya_asuh: 'permisif', dimensi: 'indulgensi', teks_pertanyaan: 'Merasa kesulitan untuk berkata "tidak" pada permintaan anak.' },
  { id_pertanyaan_assessment: 30, nomor_item: 30, gaya_asuh: 'permisif', dimensi: 'indulgensi', teks_pertanyaan: 'Tidak menetapkan konsekuensi yang jelas ketika anak melanggar aturan.' },
  { id_pertanyaan_assessment: 31, nomor_item: 31, gaya_asuh: 'permisif', dimensi: 'indulgensi', teks_pertanyaan: 'Membiarkan anak melakukan apa saja sesuka hatinya tanpa banyak arahan.' },
  { id_pertanyaan_assessment: 32, nomor_item: 32, gaya_asuh: 'permisif', dimensi: 'indulgensi', teks_pertanyaan: 'Memanjakan anak secara berlebihan meskipun ia berbuat salah.' }
];

// Master data butir skrining BPSC (0-17 bulan)
export const DEFAULT_PERTANYAAN_BPSC = [
  { id_pertanyaan_screening: 1, instrumen: 'BPSC', nomor_item: 1, subscale: 'irritability', teks_pertanyaan: 'Apakah bayi Anda sering rewel atau mudah menangis tanpa sebab yang jelas?' },
  { id_pertanyaan_screening: 2, instrumen: 'BPSC', nomor_item: 2, subscale: 'irritability', teks_pertanyaan: 'Apakah bayi Anda sulit ditenangkan saat menangis?' },
  { id_pertanyaan_screening: 3, instrumen: 'BPSC', nomor_item: 3, subscale: 'irritability', teks_pertanyaan: 'Apakah bayi Anda mudah kaget atau bereaksi berlebihan terhadap suara keras?' },
  { id_pertanyaan_screening: 4, instrumen: 'BPSC', nomor_item: 4, subscale: 'irritability', teks_pertanyaan: 'Apakah bayi Anda sering tampak kesal atau tidak nyaman sepanjang hari?' },
  { id_pertanyaan_screening: 5, instrumen: 'BPSC', nomor_item: 5, subscale: 'difficulty_routines', teks_pertanyaan: 'Apakah bayi Anda memiliki jadwal tidur yang sangat tidak teratur atau sulit tidur nyenyak?' },
  { id_pertanyaan_screening: 6, instrumen: 'BPSC', nomor_item: 6, subscale: 'difficulty_routines', teks_pertanyaan: 'Apakah bayi Anda mengalami kesulitan atau menolak saat diberi makan/menyusu?' },
  { id_pertanyaan_screening: 7, instrumen: 'BPSC', nomor_item: 7, subscale: 'difficulty_routines', teks_pertanyaan: 'Apakah sangat sulit membentuk rutinitas harian untuk bayi Anda?' },
  { id_pertanyaan_screening: 8, instrumen: 'BPSC', nomor_item: 8, subscale: 'difficulty_routines', teks_pertanyaan: 'Apakah perubahan kecil pada kebiasaan sehari-hari membuat bayi Anda sangat gelisah?' },
  { id_pertanyaan_screening: 9, instrumen: 'BPSC', nomor_item: 9, subscale: 'inflexibility', teks_pertanyaan: 'Apakah bayi Anda sulit beradaptasi dengan orang baru di sekitarnya?' },
  { id_pertanyaan_screening: 10, instrumen: 'BPSC', nomor_item: 10, subscale: 'inflexibility', teks_pertanyaan: 'Apakah bayi Anda sangat cemas atau menolak saat berada di tempat asing?' },
  { id_pertanyaan_screening: 11, instrumen: 'BPSC', nomor_item: 11, subscale: 'inflexibility', teks_pertanyaan: 'Apakah bayi Anda menolak dipindahtangankan dari pengasuh utamanya?' },
  { id_pertanyaan_screening: 12, instrumen: 'BPSC', nomor_item: 12, subscale: 'inflexibility', teks_pertanyaan: 'Apakah bayi Anda tampak kaku dan sulit menerima transisi aktivitas?' }
];

// Master data butir skrining PPSC (18-65 bulan)
export const DEFAULT_PERTANYAAN_PPSC = [
  { id_pertanyaan_screening: 13, instrumen: 'PPSC', nomor_item: 1, subscale: 'externalizing', teks_pertanyaan: 'Sering mengalami tantrum hebat atau ledakan amarah?' },
  { id_pertanyaan_screening: 14, instrumen: 'PPSC', nomor_item: 2, subscale: 'externalizing', teks_pertanyaan: 'Suka memukul, menendang, atau menggigit orang lain?' },
  { id_pertanyaan_screening: 15, instrumen: 'PPSC', nomor_item: 3, subscale: 'externalizing', teks_pertanyaan: 'Sering merusak mainan atau benda di sekitarnya dengan sengaja?' },
  { id_pertanyaan_screening: 16, instrumen: 'PPSC', nomor_item: 4, subscale: 'externalizing', teks_pertanyaan: 'Sulit mematuhi aturan dan kerap membangkang arahan orang tua?' },
  { id_pertanyaan_screening: 17, instrumen: 'PPSC', nomor_item: 5, subscale: 'attention', teks_pertanyaan: 'Sangat sulit duduk tenang atau selalu bergerak seperti digerakkan motor?' },
  { id_pertanyaan_screening: 18, instrumen: 'PPSC', nomor_item: 6, subscale: 'attention', teks_pertanyaan: 'Mudah teralihkan perhatiannya dan sulit menyelesaikan aktivitas bermain sederhana?' },
  { id_pertanyaan_screening: 19, instrumen: 'PPSC', nomor_item: 7, subscale: 'attention', teks_pertanyaan: 'Sering bertindak terburu-buru tanpa memikirkan bahaya (impulsif)?' },
  { id_pertanyaan_screening: 20, instrumen: 'PPSC', nomor_item: 8, subscale: 'attention', teks_pertanyaan: 'Sulit diajak fokus mendengarkan saat diajak bicara langsung?' },
  { id_pertanyaan_screening: 21, instrumen: 'PPSC', nomor_item: 9, subscale: 'internalizing', teks_pertanyaan: 'Tampak sangat pemalu, menarik diri, atau takut mencoba hal baru?' },
  { id_pertanyaan_screening: 22, instrumen: 'PPSC', nomor_item: 10, subscale: 'internalizing', teks_pertanyaan: 'Sering tampak sedih, murung, atau menangis tanpa alasan jelas?' },
  { id_pertanyaan_screening: 23, instrumen: 'PPSC', nomor_item: 11, subscale: 'internalizing', teks_pertanyaan: 'Sangat cemas berlebihan saat harus berpisah sebentar dari orang tua?' },
  { id_pertanyaan_screening: 24, instrumen: 'PPSC', nomor_item: 12, subscale: 'internalizing', teks_pertanyaan: 'Sering mengeluh sakit perut atau sakit kepala saat merasa tidak nyaman?' },
  { id_pertanyaan_screening: 25, instrumen: 'PPSC', nomor_item: 13, subscale: 'internalizing', teks_pertanyaan: 'Mudah panik atau ketakutan terhadap hal-hal yang wajar?' },
  { id_pertanyaan_screening: 26, instrumen: 'PPSC', nomor_item: 14, subscale: 'social_interaction', teks_pertanyaan: 'Kesulitan berbagi mainan atau bermain bergantian dengan anak sebaya?' },
  { id_pertanyaan_screening: 27, instrumen: 'PPSC', nomor_item: 15, subscale: 'social_interaction', teks_pertanyaan: 'Cenderung menjauhi interaksi dengan teman sebaya?' },
  { id_pertanyaan_screening: 28, instrumen: 'PPSC', nomor_item: 16, subscale: 'social_interaction', teks_pertanyaan: 'Sulit menunjukkan empati atau menenangkan teman yang sedang menangis?' },
  { id_pertanyaan_screening: 29, instrumen: 'PPSC', nomor_item: 17, subscale: 'social_interaction', teks_pertanyaan: 'Kerap memicu pertengkaran saat bermain bersama anak lain?' },
  { id_pertanyaan_screening: 30, instrumen: 'PPSC', nomor_item: 18, subscale: 'social_interaction', teks_pertanyaan: 'Sulit diajak bekerja sama dalam kegiatan kelompok?' }
];

export const DEFAULT_MATERI = [
  {
    id_materi: 1,
    judul: 'Transisi Komunikasi Efektif: Dari Memerintah Menuju Mendengarkan',
    kategori_target: 'otoriter_ke_demokratis',
    tipe_konten: 'artikel',
    ringkasan: 'Panduan praktis bagi orang tua untuk mengubah instruksi keras menjadi dialog dua arah yang hangat tanpa kehilangan otoritas positif.',
    durasi_menit: 7,
    isi_artikel: '## Mengapa Komunikasi Dua Arah Penting?\n\nPola asuh otoriter seringkali mengutamakan kepatuhan instan, namun riset menunjukkan bahwa dialog dua arah membangun kecerdasan emosional dan penalaran moral anak.\n\n### Langkah Praktis:\n1. Gunakan I-Message alih-alih menyalahkan.\n2. Dengarkan sebelum menanggapi.\n3. Jelaskan konsekuensi logis aturan rumah.',
    quiz: { id_quiz: 1, judul_quiz: 'Kuis Evaluasi: Komunikasi Efektif Orang Tua' },
    progress: []
  },
  {
    id_materi: 2,
    judul: 'Membangun Batasan yang Tegas dan Penuh Kasih (Loving Limits)',
    kategori_target: 'permisif_ke_demokratis',
    tipe_konten: 'artikel',
    ringkasan: 'Cara menetapkan batasan yang konsisten pada anak tanpa merasa bersalah, menciptakan rasa aman bagi perkembangan emosi mereka.',
    durasi_menit: 5,
    isi_artikel: '## Anak Membutuhkan Batasan untuk Merasa Aman\n\nMenjadi orang tua yang penuh kasih bukan berarti mengizinkan segalanya. Batasan yang konsisten justru membuat anak merasa terlindungi dan belajar regulasi diri.',
    progress: []
  }
];

