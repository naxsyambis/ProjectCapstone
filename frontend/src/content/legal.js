// DRAF isi hukum. WAJIB ditinjau tim (dan dosen atau pihak berwenang) sebelum dipublikasikan.
// Pastikan isinya sesuai kenyataan sistem:
//  - masa penyimpanan data dan proses penghapusan akun
//  - siapa saja yang dapat melihat hasil screening anak (administrator?)
//  - penyedia hosting dan pihak ketiga yang dipakai
//  - alamat email kontak (VITE_SUPPORT_EMAIL)
//  - rujukan peraturan perundang-undangan (cek ulang nomor dan nama aturannya)
// Format bagian: { id, judul, paragraf?: [], daftar?: [], kontak?: true }

export const TANGGAL_PEMBARUAN = '8 November 2026'

export const PRIVACY = {
  pengantar:
    'Vidya Parent (ParentPath) membantu orang tua memahami gaya pengasuhan dan memantau perkembangan sosial-emosional anak. Kami memperlakukan data keluarga Anda, terutama data anak, dengan hati-hati. Kebijakan ini menjelaskan data apa yang kami kumpulkan, untuk apa, dan apa hak Anda.',
  bagian: [
    {
      id: 'data-dikumpulkan',
      judul: 'Data yang kami kumpulkan',
      paragraf: ['Kami hanya mengumpulkan data yang diperlukan untuk menjalankan layanan:'],
      daftar: [
        'Data akun: nama lengkap, nama panggilan, alamat email, nomor HP (opsional), usia, dan foto profil (opsional).',
        'Data anak: nama, tanggal lahir, jenis kelamin, dan catatan opsional yang Anda isi.',
        'Jawaban dan hasil assessment gaya pengasuhan (PSDQ).',
        'Jawaban dan hasil screening sosial-emosional anak (BPSC/PPSC).',
        'Progres belajar, hasil kuis, dan progres misi parenting.',
        'Data teknis untuk keamanan, seperti waktu masuk dan percobaan masuk yang gagal.',
      ],
    },
    {
      id: 'penggunaan',
      judul: 'Cara kami menggunakan data',
      daftar: [
        'Menyusun jalur belajar sesuai hasil assessment Anda.',
        'Menghitung hasil screening dan menyarankan misi parenting atau konsultasi dengan profesional.',
        'Menampilkan progres di dasbor dan laporan perkembangan.',
        'Menjaga keamanan akun dan mencegah penyalahgunaan.',
        'Memperbaiki kualitas layanan.',
      ],
      paragraf: ['Kami tidak menjual data Anda dan tidak menggunakannya untuk iklan.'],
    },
    {
      id: 'data-anak',
      judul: 'Data anak dan persetujuan',
      paragraf: [
        'Data anak hanya boleh dimasukkan oleh orang tua atau wali yang sah. Dengan memasukkan data anak, Anda menyatakan berhak melakukannya dan menyetujui pemrosesannya untuk tujuan di atas.',
        'Pemrosesan data pribadi, termasuk data anak, dilakukan dengan memperhatikan peraturan pelindungan data pribadi yang berlaku di Indonesia, termasuk Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.',
        'Anda dapat menarik persetujuan kapan saja dengan menghapus data anak atau akun Anda.',
      ],
    },
    {
      id: 'bukan-diagnosis',
      judul: 'Hasil screening bukan diagnosis',
      paragraf: [
        'Hasil assessment dan screening bersifat edukatif dan penapisan awal. Hasil tersebut bukan diagnosis medis atau psikologis dan tidak menggantikan pemeriksaan oleh psikolog, dokter, atau tenaga kesehatan.',
      ],
    },
    {
      id: 'berbagi',
      judul: 'Berbagi data dengan pihak lain',
      paragraf: ['Kami tidak menjual atau menyewakan data Anda. Data hanya dapat diakses oleh:'],
      daftar: [
        'Administrator yang berwenang, sebatas yang diperlukan untuk mengelola dan menjaga layanan.',
        'Penyedia infrastruktur (misalnya hosting) yang membantu menjalankan layanan, dengan kewajiban menjaga kerahasiaan.',
        'Pihak berwenang, jika diwajibkan oleh hukum.',
      ],
    },
    {
      id: 'pihak-ketiga',
      judul: 'Layanan pihak ketiga',
      paragraf: [
        'Beberapa fitur membuka layanan pihak ketiga, misalnya video YouTube pada materi dan pencarian lokasi psikolog melalui peta. Kami tidak mengirimkan data anak Anda ke layanan tersebut, tetapi memuat kontennya dapat membuat alamat IP Anda terlihat oleh penyedia layanan itu. Penggunaannya tunduk pada kebijakan masing-masing penyedia.',
      ],
    },
    {
      id: 'keamanan',
      judul: 'Keamanan data',
      paragraf: [
        'Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data Anda, antara lain penyimpanan kata sandi dalam bentuk ter-hash (tidak dapat dibaca), pembatasan percobaan masuk, validasi masukan, dan pembatasan akses berdasarkan peran. Tidak ada sistem yang sepenuhnya bebas risiko, jadi mohon jaga kerahasiaan kata sandi Anda.',
      ],
    },
    {
      id: 'penyimpanan',
      judul: 'Penyimpanan dan penghapusan',
      paragraf: [
        'Data disimpan selama akun Anda aktif. Menghapus data anak akan menghapus riwayat screening dan misi anak tersebut. Menghapus akun akan menghapus data akun dan data terkait, kecuali data yang wajib kami simpan menurut hukum.',
      ],
    },
    {
      id: 'hak-anda',
      judul: 'Hak Anda',
      daftar: [
        'Mengakses dan meminta salinan data Anda.',
        'Memperbaiki data yang tidak akurat, melalui Profil dan Data Anak.',
        'Menghapus data atau akun, melalui Pengaturan Akun.',
        'Menarik persetujuan dan mengajukan keberatan.',
      ],
    },
    {
      id: 'perubahan',
      judul: 'Perubahan kebijakan',
      paragraf: [
        'Kami dapat memperbarui kebijakan ini. Perubahan penting akan diberitahukan melalui aplikasi. Tanggal pembaruan tercantum di bagian atas halaman.',
      ],
    },
    {
      id: 'kontak',
      judul: 'Hubungi kami',
      paragraf: ['Pertanyaan tentang kebijakan ini dapat dikirim ke:'],
      kontak: true,
    },
  ],
}

export const TERMS = {
  pengantar:
    'Dengan membuat akun atau menggunakan Vidya Parent, Anda menyetujui Ketentuan Layanan ini dan Kebijakan Privasi. Jika Anda tidak setuju, mohon tidak menggunakan layanan.',
  bagian: [
    {
      id: 'layanan',
      judul: 'Tentang layanan',
      paragraf: [
        'Vidya Parent adalah layanan edukasi pengasuhan: assessment gaya pengasuhan, jalur belajar dan kuis, screening sosial-emosional anak, serta misi parenting.',
        'Layanan ini bukan layanan medis, psikologi, atau konseling.',
      ],
    },
    {
      id: 'akun',
      judul: 'Akun dan keamanan',
      daftar: [
        'Anda berusia minimal 18 tahun atau cakap hukum untuk menyetujui ketentuan ini.',
        'Anda memberikan data yang benar dan memperbaruinya jika berubah.',
        'Anda menjaga kerahasiaan kata sandi dan bertanggung jawab atas aktivitas di akun Anda.',
        'Segera laporkan jika akun Anda digunakan tanpa izin.',
      ],
    },
    {
      id: 'hasil',
      judul: 'Penggunaan hasil assessment dan screening',
      paragraf: [
        'Hasil bersifat penapisan awal dan edukatif, bukan diagnosis. Hasil dapat dipengaruhi cara Anda menjawab. Keputusan tentang kesehatan atau perkembangan anak sebaiknya dikonsultasikan dengan psikolog atau dokter.',
        'Jika anak dalam kondisi darurat atau Anda khawatir dengan keselamatannya, segera ke IGD terdekat atau hubungi nomor darurat 112. Jangan menunggu hasil di aplikasi.',
      ],
    },
    {
      id: 'kekayaan-intelektual',
      judul: 'Konten dan hak kekayaan intelektual',
      paragraf: [
        'Materi, soal, tampilan, dan kode dalam layanan dilindungi hak cipta atau hak lain milik kami atau pemberi lisensi. Instrumen pihak ketiga (misalnya PSDQ, BPSC/PPSC, dan sumber aktivitas) tetap menjadi milik pemegang haknya.',
        'Anda boleh memakainya untuk keperluan pribadi, dan tidak boleh menyalin, memperjualbelikan, atau mendistribusikannya tanpa izin.',
      ],
    },
    {
      id: 'larangan',
      judul: 'Hal yang tidak diperbolehkan',
      daftar: [
        'Mengakses akun atau data orang lain tanpa hak.',
        'Memasukkan data anak yang bukan di bawah pengasuhan Anda.',
        'Mencoba menembus keamanan, melakukan uji penetrasi tanpa izin tertulis, atau mengganggu layanan.',
        'Menggunakan layanan untuk tujuan yang melanggar hukum.',
        'Mengunggah berkas berbahaya atau yang melanggar hak pihak lain.',
      ],
    },
    {
      id: 'tanggung-jawab',
      judul: 'Batasan tanggung jawab',
      paragraf: [
        'Layanan disediakan sebagaimana adanya. Sejauh diizinkan hukum, kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan hasil layanan sebagai pengganti nasihat profesional, atau dari gangguan di luar kendali kami.',
      ],
    },
    {
      id: 'penghentian',
      judul: 'Penangguhan dan penghentian',
      paragraf: [
        'Anda dapat berhenti dan menghapus akun kapan saja melalui Pengaturan Akun. Kami dapat menangguhkan akun yang melanggar ketentuan atau membahayakan keamanan layanan.',
      ],
    },
    {
      id: 'perubahan',
      judul: 'Perubahan ketentuan',
      paragraf: ['Ketentuan dapat diperbarui. Penggunaan layanan setelah perubahan berarti Anda menyetujui versi terbaru.'],
    },
    {
      id: 'hukum',
      judul: 'Hukum yang berlaku dan kontak',
      paragraf: ['Ketentuan ini tunduk pada hukum Republik Indonesia. Pertanyaan dapat dikirim ke:'],
      kontak: true,
    },
  ],
}

export const FAQ = [
  {
    tanya: 'Apa bedanya assessment dan screening?',
    jawab:
      'Assessment menilai gaya pengasuhan Anda sebagai orang tua (PSDQ) dan menghasilkan jalur belajar. Screening menilai perkembangan sosial-emosional anak, satu kuesioner untuk satu anak: BPSC untuk usia di bawah 18 bulan dan PPSC untuk usia 18 sampai 65 bulan.',
  },
  {
    tanya: 'Apakah hasil screening adalah diagnosis?',
    jawab:
      'Bukan. Screening hanya penapisan awal. Hasilnya membantu menentukan langkah berikutnya dan tidak menggantikan pemeriksaan oleh psikolog atau dokter.',
  },
  {
    tanya: 'Hasil screening menyatakan perlu perhatian. Apa yang harus saya lakukan?',
    jawab:
      'Hasil ini bukan penilaian bahwa ada yang salah dengan anak atau cara Anda mengasuh. Kami menyarankan berkonsultasi dengan psikolog anak atau dokter anak, dengan membawa hasil screening dan catatan perilaku anak. Misi parenting ditunda sampai Anda berkonsultasi.',
  },
  {
    tanya: 'Seberapa sering assessment perlu diulang?',
    jawab:
      'Kami menyarankan mengulang assessment setiap 1 sampai 2 bulan setelah mempelajari materi, supaya jalur belajar mengikuti perkembangan gaya pengasuhan Anda.',
  },
  {
    tanya: 'Mengapa minggu berikutnya di jalur belajar masih terkunci?',
    jawab:
      'Minggu berikutnya terbuka setelah Anda menandai materi selesai dan lulus kuis minggu sebelumnya (nilai minimal 70%). Kuis bisa diulang kapan saja.',
  },
  {
    tanya: 'Bagaimana menambah anak kedua atau ketiga?',
    jawab: 'Buka Profil, lalu pada bagian Profil Anak pilih Tambah. Screening dan misi dibuat terpisah untuk tiap anak.',
  },
  {
    tanya: 'Saya lupa kata sandi.',
    jawab: 'Pilih Lupa Kata Sandi di halaman masuk, lalu ikuti petunjuk yang dikirim ke email Anda.',
  },
  {
    tanya: 'Bagaimana menghapus akun dan data saya?',
    jawab: 'Buka Profil, lalu Pengaturan Akun, dan pilih Hapus Akun. Data anak dan hasil terkait ikut dihapus.',
  },
]