-- 1. Tabel Profil & Pengaturan Umum Desa
CREATE TABLE IF NOT EXISTS profil_desa (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  image_url TEXT,
  image_profil_singkat TEXT,
  image_sejarah TEXT,
  image_pokdarwis TEXT,
  whatsapp_1 TEXT,
  whatsapp_2 TEXT,
  instagram_handle TEXT,
  tiktok_handle TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Destinasi & Paket Wisata
CREATE TABLE IF NOT EXISTS destinasi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  tags TEXT, -- dipisahkan koma, misal: "Wisata Alam,Seni & Budaya,Kuliner Lokal"
  harga TEXT,
  image_url TEXT,
  is_unggulan INTEGER DEFAULT 0, -- 1 = tampil di kartu Destinasi Unggulan homepage
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Produk Lokal UMKM
CREATE TABLE IF NOT EXISTS produk_lokal (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_produk TEXT NOT NULL,
  badge TEXT NOT NULL,        -- misal: "OLAHAN PANGAN"
  badge_color TEXT DEFAULT 'bg-amber-600 text-white',
  kategori TEXT NOT NULL,     -- misal: "PRODUK UMKM DESA"
  deskripsi TEXT NOT NULL,
  harga TEXT,
  image_url TEXT,
  is_unggulan INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Berita & Agenda Terbaru
CREATE TABLE IF NOT EXISTS berita (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  kategori TEXT NOT NULL,     -- misal: "AGENDA DESA", "FESTIVAL", "EDUKASI"
  tanggal_tampil TEXT NOT NULL, -- misal: "10 NOV 2026"
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Galeri Foto
CREATE TABLE IF NOT EXISTS galeri (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  judul TEXT NOT NULL,
  kategori TEXT,
  image_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabel Feed Sosial Media (Instagram & TikTok)
CREATE TABLE IF NOT EXISTS social_feeds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL CHECK(platform IN ('instagram', 'tiktok')),
  post_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption_or_title TEXT,
  views_count TEXT, -- khusus TikTok, misal: "12,4 rb"
  is_carousel INTEGER DEFAULT 1,
  urutan INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabel Visi Desa (1 baris aktif untuk periode berjalan)
CREATE TABLE IF NOT EXISTS visi_desa (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  periode TEXT NOT NULL,
  judul_visi TEXT NOT NULL,
  kutipan TEXT NOT NULL,
  pilar_json TEXT NOT NULL, -- JSON array berisi [{ huruf, judul, deskripsi }]
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. Tabel Misi Desa (Banyak baris, bisa di-CRUD & diurutkan)
CREATE TABLE IF NOT EXISTS misi_desa (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nomor_urut INTEGER NOT NULL DEFAULT 1,
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Utama Destinasi Wisata (mendukung 1 atau banyak destinasi unggulan)
CREATE TABLE IF NOT EXISTS destinasi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  badge_lokasi TEXT DEFAULT 'Basisir Muda Demang',
  sub_lokasi TEXT DEFAULT 'Waduk Jatigede, Sumedang',
  is_unggulan INTEGER DEFAULT 1,
  deskripsi TEXT NOT NULL,
  image_url TEXT,
  lokasi_teks TEXT DEFAULT 'Desa Karangpakuan, Sumedang',
  jam_operasional TEXT DEFAULT '08.00 – 17.00 WIB',
  harga_tiket TEXT DEFAULT 'Rp10.000',
  satuan_tiket TEXT DEFAULT '/ orang',
  daya_tarik_utama_json TEXT, -- Array string: ["Wisata Alam", "Camping Ground", ...]
  aktivitas_detail_json TEXT, -- Array object: [{ icon, judul, deskripsi, warna }]
  fasilitas_json TEXT,        -- Array object: [{ icon, nama, is_more }]
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Galeri Foto & Video Destinasi (terhubung ke /destinasi dan /galeri)
CREATE TABLE IF NOT EXISTS destinasi_galeri (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destinasi_id INTEGER DEFAULT 1,
  tipe TEXT CHECK(tipe IN ('foto', 'video')) NOT NULL DEFAULT 'foto',
  judul TEXT NOT NULL,
  subjudul TEXT,
  durasi TEXT, -- Khusus tipe 'video', misal '02:15'
  media_url TEXT,
  thumbnail_url TEXT,
  urutan INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS paket_wisata (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  kategori_badge TEXT NOT NULL,          
  badge_dot_color TEXT DEFAULT 'sky',    
  sub_lokasi TEXT NOT NULL,              
  rating TEXT DEFAULT '4.8',
  jumlah_ulasan TEXT DEFAULT '120+ ulasan',
  judul TEXT NOT NULL,                    
  deskripsi TEXT NOT NULL,
  durasi TEXT NOT NULL,                   
  kapasitas TEXT NOT NULL,                
  harga TEXT NOT NULL,                    
  satuan_harga TEXT DEFAULT '/ orang',
  is_populer INTEGER DEFAULT 0,           
  label_highlight TEXT,                  
  fasilitas_json TEXT NOT NULL,         
  image_url TEXT,
  urutan INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);