/* =========================================================
   config.js — PENGATURAN UJIAN EKONOMI (APBN & APBD)
   =========================================================
   Edit file ini saja untuk mengubah soal, jawaban, durasi
   ujian, atau daftar kelas. Tidak perlu sentuh script.js
   atau style.css.
   ========================================================= */

/* ---------- durasi ujian (dalam menit) ---------- */
const EXAM_DURATION_MINUTES = 30;

/* ---------- ambang waktu peringatan (dalam detik) ----------
   Saat sisa waktu <= angka ini, timer akan berubah merah
   dan berkedip sebagai peringatan. */
const WARNING_THRESHOLD_SECONDS = 60;

/* ---------- daftar kelas pada dropdown biodata ---------- */
const CLASS_OPTIONS = [
  "XII.1", "XII.2", "XII.3", "XII.4", "XII.5",
  "XII.6", "XII.7", "XII.8", "XII.9", "XII.10", "XII.11"
];

/* ---------- daftar soal ----------
   Setiap soal punya format:
   {
     q: "Teks pertanyaan",
     options: ["A", "B", "C", "D", "E"],
     answer: 0   // index jawaban benar (0=A, 1=B, 2=C, 3=D, 4=E)
   }
   Tambah atau hapus soal langsung di array ini — jumlah soal
   di halaman ujian akan otomatis menyesuaikan. */
const questions = [
  { q: "Dokumen yang memuat rencana keuangan tahunan pemerintah pusat dan disetujui oleh DPR disebut...",
    options: ["APBD", "APBN", "RAPBN", "Nota Keuangan", "Kebijakan Fiskal"], answer: 1 },
  { q: "Sumber pendapatan asli daerah (PAD) yang berasal dari pungutan atas jasa yang disediakan pemerintah daerah disebut...",
    options: ["Pajak Daerah", "Retribusi Daerah", "Dana Bagi Hasil", "Hibah Daerah", "Dana Alokasi Umum"], answer: 1 },
  { q: "Dana Alokasi Umum (DAU) bertujuan utama untuk...",
    options: ["Membiayai proyek khusus daerah", "Mengurangi kesenjangan fiskal antar daerah", "Membayar utang luar negeri", "Menambah cadangan devisa", "Membiayai belanja pegawai pusat"], answer: 1 },
  { q: "Kondisi ketika belanja negara lebih besar daripada pendapatan negara disebut...",
    options: ["Surplus anggaran", "Anggaran berimbang", "Defisit anggaran", "Anggaran fungsional", "Anggaran dinamis"], answer: 2 },
  { q: "Berikut ini yang termasuk komponen belanja negara dalam APBN adalah...",
    options: ["Pajak Penghasilan", "Bea Cukai", "Belanja Pemerintah Pusat", "Penerimaan Hibah", "Pendapatan Bukan Pajak"], answer: 2 },
  { q: "Dana Alokasi Khusus (DAK) dialokasikan untuk...",
    options: ["Kebutuhan umum daerah", "Membiayai kegiatan khusus sesuai prioritas nasional", "Gaji aparatur sipil negara pusat", "Subsidi bahan bakar minyak", "Cadangan umum negara"], answer: 1 },
  { q: "Salah satu fungsi APBN dalam perekonomian adalah fungsi stabilisasi, yang bertujuan untuk...",
    options: ["Menentukan besaran pajak daerah", "Menjaga kestabilan perekonomian dan mengendalikan inflasi", "Mengatur belanja partai politik", "Menetapkan nilai tukar rupiah secara tetap", "Mengatur ekspor komoditas"], answer: 1 },
  { q: "APBD ditetapkan melalui persetujuan bersama antara pemerintah daerah dengan...",
    options: ["Kementerian Keuangan", "DPRD", "Mahkamah Agung", "Bank Indonesia", "DPR RI"], answer: 1 },
  { q: "Contoh belanja daerah yang bersifat langsung adalah...",
    options: ["Belanja bunga utang", "Belanja pegawai administratif", "Belanja modal pembangunan jalan", "Belanja hibah pusat", "Belanja subsidi nasional"], answer: 2 },
  { q: "Jika realisasi pendapatan negara sama dengan realisasi belanja negara, kondisi tersebut disebut...",
    options: ["Defisit anggaran", "Surplus anggaran", "Anggaran berimbang", "Anggaran ekspansif", "Anggaran fungsional"], answer: 2 },
  { q: "Siklus APBN diawali dengan tahap...",
    options: ["Pengawasan", "Pertanggungjawaban", "Perencanaan dan penyusunan", "Pelaksanaan", "Pemeriksaan oleh BPK"], answer: 2 },
  { q: "Lembaga yang berwenang memeriksa pertanggungjawaban pelaksanaan APBN adalah...",
    options: ["DPR", "Kementerian Keuangan", "Badan Pemeriksa Keuangan (BPK)", "Bank Indonesia", "OJK"], answer: 2 },
  { q: "Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBB-P2) merupakan salah satu sumber...",
    options: ["Pendapatan negara dari migas", "Pendapatan asli daerah", "Dana perimbangan", "Hibah luar negeri", "Penerimaan bukan pajak pusat"], answer: 1 },
  { q: "Kebijakan anggaran ekspansif biasanya diterapkan pemerintah pada kondisi...",
    options: ["Perekonomian sedang mengalami inflasi tinggi", "Perekonomian sedang lesu atau resesi", "Pendapatan negara jauh melebihi belanja", "Nilai tukar rupiah menguat tajam", "Cadangan devisa berlebih"], answer: 1 },
  { q: "Dana Bagi Hasil (DBH) dialokasikan berdasarkan...",
    options: ["Jumlah penduduk daerah semata", "Persentase realisasi penerimaan tertentu dari daerah penghasil", "Luas wilayah administratif", "Indeks pembangunan manusia", "Jumlah pegawai negeri di daerah"], answer: 1 },
  { q: "Belanja tidak langsung dalam APBD antara lain berupa...",
    options: ["Belanja modal infrastruktur", "Belanja barang dan jasa proyek", "Belanja pegawai dan bunga utang", "Belanja hibah pembangunan gedung", "Belanja bantuan sosial terprogram"], answer: 2 },
  { q: "Fungsi APBN yang berkaitan dengan pemerataan pendapatan antar golongan masyarakat disebut fungsi...",
    options: ["Alokasi", "Distribusi", "Stabilisasi", "Otorisasi", "Perencanaan"], answer: 1 },
  { q: "RAPBN diajukan pemerintah kepada DPR paling lambat pada bulan...",
    options: ["Januari", "Maret", "Agustus", "Oktober", "Desember"], answer: 2 },
  { q: "Salah satu prinsip penyusunan APBD adalah transparansi, yang berarti...",
    options: ["Anggaran disusun tanpa perlu diketahui publik", "Anggaran terbuka untuk diketahui dan diawasi masyarakat", "Anggaran hanya dilaporkan kepada DPRD", "Anggaran boleh diubah sewaktu-waktu tanpa persetujuan", "Anggaran dirahasiakan demi keamanan negara"], answer: 1 },
  { q: "Contoh penerimaan negara bukan pajak (PNBP) adalah...",
    options: ["Pajak penghasilan", "Bea masuk", "Laba BUMN dan hasil pengelolaan kekayaan negara", "Pajak pertambahan nilai", "Cukai tembakau"], answer: 2 },
  { q: "Apabila belanja daerah lebih kecil daripada pendapatan daerah, maka daerah tersebut mengalami...",
    options: ["Defisit anggaran", "Surplus anggaran", "Anggaran berimbang", "Utang daerah", "Krisis fiskal"], answer: 1 },
  { q: "Otonomi daerah memberikan kewenangan kepada pemerintah daerah untuk...",
    options: ["Mencetak mata uang sendiri", "Mengatur dan mengurus rumah tangga daerahnya sendiri", "Menentukan kebijakan luar negeri", "Mengelola militer daerah", "Membuat undang-undang nasional"], answer: 1 },
  { q: "Belanja modal dalam APBN/APBD digunakan untuk...",
    options: ["Membayar gaji pegawai", "Membiayai bunga dan cicilan utang", "Memperoleh aset tetap seperti gedung dan jalan", "Membiayai subsidi energi", "Membiayai belanja rutin kantor"], answer: 2 },
  { q: "Ketika pemerintah menambah utang untuk menutup defisit anggaran, kebijakan tersebut disebut pembiayaan...",
    options: ["Anggaran berimbang", "Defisit melalui utang", "Surplus fiskal", "Netral fiskal", "Konsolidasi fiskal"], answer: 1 },
  { q: "Salah satu tujuan otonomi daerah dalam pengelolaan APBD adalah...",
    options: ["Menyeragamkan seluruh kebijakan daerah di Indonesia", "Meningkatkan pelayanan publik sesuai kebutuhan dan potensi daerah", "Menghapus peran pemerintah pusat sepenuhnya", "Mengurangi pendapatan asli daerah", "Membatasi partisipasi masyarakat dalam pembangunan"], answer: 1 }
];
