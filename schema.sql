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