import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Zap,
  Clock,
  Mountain,
  Store,
  FileText,
  Users,
  ExternalLink,
  Award,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import {
  KontenTerbaruSection,
  type InstagramPostItem,
  type TikTokPostItem,
} from '../components/KontenTerbaruSection'
import { getDB } from '../lib/db'

interface ProfilRow {
  judul: string
  deskripsi: string
  image_url: string | null
  whatsapp_1: string | null
  instagram_handle: string | null
  tiktok_handle: string | null
}

interface DestinasiRow {
  id: number
  slug: string
  judul: string
  kategori: string
  deskripsi: string
  tags: string | null
  image_url: string | null
}

interface ProdukRow {
  id: number
  nama_produk: string
  badge: string
  badge_color: string | null
  kategori: string
  deskripsi: string
  image_url: string | null
}

interface BeritaRow {
  id: number
  slug: string
  judul: string
  kategori: string
  tanggal_tampil: string
  ringkasan: string
  image_url: string | null
}

interface SocialFeedRow {
  id: number
  platform: 'instagram' | 'tiktok'
  post_url: string
  thumbnail_url: string | null
  caption_or_title: string | null
  views_count: string | null
  is_carousel: number
}

// Server Function untuk mengambil seluruh data Homepage dari Cloudflare D1
const getHomePageData = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const db = getDB()

    const [profil, destinasiUnggulan, produkRes, beritaRes, socialRes] =
      await Promise.all([
        db.prepare('SELECT * FROM profil_desa LIMIT 1').first<ProfilRow>(),
        db
          .prepare('SELECT * FROM destinasi WHERE is_unggulan = 1 LIMIT 1')
          .first<DestinasiRow>(),
        db
          .prepare(
            'SELECT * FROM produk_lokal WHERE is_unggulan = 1 ORDER BY id DESC LIMIT 3',
          )
          .all<ProdukRow>(),
        db
          .prepare('SELECT * FROM berita ORDER BY id DESC LIMIT 3')
          .all<BeritaRow>(),
        db
          .prepare('SELECT * FROM social_feeds ORDER BY urutan ASC, id DESC')
          .all<SocialFeedRow>(),
      ])

    return {
      profil: profil ?? null,
      destinasiUnggulan: destinasiUnggulan ?? null,
      produkList: produkRes.results ?? [],
      beritaList: beritaRes.results ?? [],
      socialFeeds: socialRes.results ?? [],
    }
  } catch (error) {
    console.error('Gagal mengambil data D1:', error)
    return {
      profil: null,
      destinasiUnggulan: null,
      produkList: [],
      beritaList: [],
      socialFeeds: [],
    }
  }
})

export const Route = createFileRoute('/')({
  loader: async () => await getHomePageData(),
  component: HomePage,
})

const categoryColors = ['text-emerald-600', 'text-amber-600', 'text-sky-600']

function HomePage() {
  const data = Route.useLoaderData()
  const waPrimary = data?.profil?.whatsapp_1 || '6281318375641'

  // 1. Profil Desa (Fallback ke teks default & kotak hitam jika tabel masih kosong)
  const profilJudul = data.profil?.judul || 'Profil Karang Pakuan'
  const profilDeskripsi =
    data.profil?.deskripsi ||
    'Desa Wisata Karangpakuan yang terletak di Kecamatan Darmaraja, Kabupaten Sumedang, merupakan destinasi wisata berbasis alam, budaya, edukasi, dan pemberdayaan masyarakat di kawasan Waduk Jatigede. Memiliki daya tarik seperti Basisir Muda Demang, Pasir Tugaran, Wisata Ziarah Kabuyutan Astana Gede Cipaku, Kampung Tohaga, Bank Sampah, dan WISDOM, desa ini juga menawarkan produk UMKM lokal. Melalui kolaborasi pemerintah desa, BUMDes, Pokdarwis, UMKM, dan masyarakat, Karangpakuan terus mengembangkan pariwisata berkelanjutan sekaligus memperkuat ekonomi lokal.'
  const profilImageUrl = data.profil?.image_url || null
  const waNumber = data.profil?.whatsapp_1 || '6281318375641'

  // 2. Destinasi Unggulan
  const destinasiJudul =
    data.destinasiUnggulan?.judul || 'Wisata Karang Pakuan'
  const destinasiKategori =
    data.destinasiUnggulan?.kategori || 'DESA WISATA'
  const destinasiDeskripsi =
    data.destinasiUnggulan?.deskripsi ||
    'Basisir Muda Demang (BMD) menawarkan panorama waduk dan suasana alam terbuka. BMD menjadi tempat rekreasi dan kebersamaan dengan berbagai aktivitas, seperti camping, wisata perahu, memancing, kuliner UMKM lokal, serta gathering.'
  const destinasiTags = data.destinasiUnggulan?.tags
    ? data.destinasiUnggulan.tags.split(',').map((t) => t.trim())
    : ['Wisata Alam', 'Seni & Budaya', 'Kuliner Lokal']
  const destinasiUnggulanImageUrl = data.destinasiUnggulan?.image_url || null

  // 3. Produk Lokal Unggulan (Fallback jika tabel produk_lokal belum diisi)
  const produkList =
    data.produkList.length > 0
      ? data.produkList.map((item, idx) => ({
          id: item.id,
          badge: item.badge,
          badgeColor: item.badge_color || 'bg-amber-600 text-white',
          category: item.kategori,
          categoryColor: categoryColors[idx % categoryColors.length],
          title: item.nama_produk,
          description: item.deskripsi,
          imageUrl: item.image_url,
        }))
      : [
          {
            id: 1,
            badge: 'OLAHAN PANGAN',
            badgeColor: 'bg-amber-600 text-white',
            category: 'PRODUK UMKM DESA',
            categoryColor: 'text-emerald-600',
            title: 'Katempling',
            description:
              'Camilan tradisional berbahan dasar singkong dengan cita rasa gurih dan renyah, menjadi salah satu produk UMKM unggulan Desa Karangpakuan.',
            imageUrl: null,
          },
          {
            id: 2,
            badge: 'KARYA PEREMPUAN DESA',
            badgeColor: 'bg-amber-400 text-slate-950',
            category: 'WARUNG KULINER',
            categoryColor: 'text-amber-600',
            title: 'Opak Geulis Moronyoy',
            description:
              'Kelompok Wanita Tani (KWT) menghasilkan produk lokal seperti Opak Geulis Moronyoy, keripik bantal, nasi liwet, dan katering.',
            imageUrl: null,
          },
          {
            id: 3,
            badge: 'KULINER KHAS',
            badgeColor: 'bg-emerald-600 text-white',
            category: 'PENGRAJIN KARANG PAKUAN',
            categoryColor: 'text-sky-600',
            title: 'Olahan Ikan',
            description:
              'Mengolah hasil perikanan Waduk Jatigede menjadi produk lokal seperti kore ikan, ikan asin, keripik ikan, dan nugget ikan.',
            imageUrl: null,
          },
        ]

  // 4. Berita & Agenda Terbaru
  const beritaList =
    data.beritaList.length > 0
      ? data.beritaList.map((b) => ({
          id: b.id,
          date: b.tanggal_tampil,
          category: b.kategori,
          title: b.judul,
          excerpt: b.ringkasan,
          imageUrl: b.image_url,
        }))
      : [
          {
            id: 1,
            date: '10 NOV 2026',
            category: 'AGENDA DESA',
            title: 'Kegiatan A',
            excerpt: 'Rangkaian A',
            imageUrl: null,
          },
          {
            id: 2,
            date: '11 NOV 2026',
            category: 'FESTIVAL',
            title: 'Agenda B',
            excerpt: 'Rangkaian B',
            imageUrl: null,
          },
          {
            id: 3,
            date: '12 NOV 2026',
            category: 'EDUKASI',
            title: 'Pelatihan C',
            excerpt: 'Rangkaian C',
            imageUrl: null,
          },
        ]

  // 5. Sosial Media Feeds
  const igFromDb = data.socialFeeds
    .filter((s) => s.platform === 'instagram')
    .slice(0, 6)
  const ttFromDb = data.socialFeeds
    .filter((s) => s.platform === 'tiktok')
    .slice(0, 3)

  const instagramPosts: InstagramPostItem[] =
    igFromDb.length > 0
      ? igFromDb.map((item) => ({
          id: item.id,
          imageUrl: item.thumbnail_url,
          postUrl: item.post_url,
          caption: item.caption_or_title || 'Instagram Desa Wisata Karang Pakuan',
          isCarousel: item.is_carousel === 1,
        }))
      : [
          { id: 1, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'IG 1', isCarousel: true },
          { id: 2, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'IG 2', isCarousel: true },
          { id: 3, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'IG 3', isCarousel: true },
          { id: 4, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'IG 4', isCarousel: true },
          { id: 5, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'IG 5', isCarousel: true },
          { id: 6, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'IG 6', isCarousel: true },
        ]

  const tiktokPosts: TikTokPostItem[] =
    ttFromDb.length > 0
      ? ttFromDb.map((item) => ({
          id: item.id,
          thumbnailUrl: item.thumbnail_url,
          videoUrl: item.post_url,
          views: item.views_count || '1,2 rb',
          title: item.caption_or_title || 'TikTok Desa Wisata Karang Pakuan',
        }))
      : [
          { id: 1, thumbnailUrl: null, videoUrl: 'https://tiktok.com/@basisirmudademang', views: '12,4 rb', title: 'TikTok 1' },
          { id: 2, thumbnailUrl: null, videoUrl: 'https://tiktok.com/@basisirmudademang', views: '8,7 rb', title: 'TikTok 2' },
          { id: 3, thumbnailUrl: null, videoUrl: 'https://tiktok.com/@basisirmudademang', views: '15,1 rb', title: 'TikTok 3' },
        ]

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/*{/* 1. HERO SECTION */}
      <PageHero
        badge="KARANG PAKUAN SUMEDANG"
        title="Selamat Datang Di"
        highlightedTitle="Desa Wisata Karang Pakuan"
        subtitle="Discover the Village, Experience the Culture"
        description="Nikmati keindahan alam, budaya, dan pengalaman wisata autentik di Desa Wisata Karang Pakuan, Sumedang."
        imageSrc="/images/Heroimage.png"
        bottomFadeColor="#F8FAFC"
      >
        <a
          href="#destinasi-unggulan"
          className="inline-flex items-center gap-2 bg-[#ea7c1d] hover:bg-[#d66d12] text-white font-sans text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <span>Jelajahi Wisata</span>
          <ChevronDown className="w-4 h-4" />
        </a>

        <a
          href={`https://wa.me/${waPrimary}?text=Halo%20Desa%20Wisata%20Karang%20Pakuan,%20saya%20ingin%20bertanya%20tentang%20wisata.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-sans text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
          </svg>
          <span>Hubungi Kami</span>
        </a>
      </PageHero>

      {/* 2. PROFIL KARANG PAKUAN */}
      <section id="profil" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative pb-6 pr-0 sm:pr-6">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-neutral-950 shadow-xl">
                {profilImageUrl && (
                  <img
                    src={profilImageUrl}
                    alt={profilJudul}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f3456]/90 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  KAWASAN WISATA
                </div>
              </div>

              <div className="absolute bottom-0 right-2 sm:right-0 bg-white rounded-2xl shadow-lg border border-slate-100 p-4 flex items-center gap-3.5 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    Desa Wisata Unggulan
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kabupaten Sumedang, Jawa Barat
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
                DISCOVER KARANG PAKUAN
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456] tracking-tight">
                {profilJudul}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {profilDeskripsi}
              </p>

              <div className="pt-2">
                <a
                  href="#destinasi-unggulan"
                  className="inline-flex items-center gap-2 bg-[#0f3456] hover:bg-[#164775] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
                >
                  <span>Lihat Profil</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTINASI UNGGULAN */}
      <section id="destinasi-unggulan" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
              DESTINASI FAVORIT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
              Destinasi Unggulan
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Temukan spot wisata terbaik untuk bersantai bersama keluarga,
              berburu foto estetik, dan menjelahi Wisata Karang Pakuan
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-amber-200/70 shadow-md grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] bg-neutral-950">
              {destinasiUnggulanImageUrl && (
                <img
                  src={destinasiUnggulanImageUrl}
                  alt={destinasiJudul}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea7c1d] text-white text-[11px] font-bold tracking-wider uppercase shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                UNGGULAN POPULER
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-sky-50 text-[#0f3456] border border-sky-100">
                  {destinasiKategori}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#0f3456]">
                  {destinasiJudul}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {destinasiDeskripsi}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {destinasiTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase">
                  SPOT FAVORIT
                </span>

                <a
                  href="#paket-wisata"
                  className="inline-flex items-center gap-2 bg-[#ea7c1d] hover:bg-[#d66d12] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
                >
                  <span>Lihat Detail BMD</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PENGELOLAAN WISATA */}
      <section id="paket-wisata" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
              RAGAM PENGALAMAN &amp; POTENSI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
              Pengelolaan Wisata
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Temukan harmoni alam pesisir, kekayaan budaya lokal, edukasi, dan
              beragam potensi unggulan di Desa Wisata Karang Pakuan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm text-center flex flex-col items-center space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Mountain className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0f3456]">
                Objek Wisata (ODTW)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Basisir Muda Demang (camping &amp; perahu), Pasir Tugaran, dan
                Wisata Ziarah Kabuyutan Astana Gede.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm text-center flex flex-col items-center space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0f3456]">
                UMKM &amp; Produk Lokal
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                KWT (Opak Geulis Moronyoy, liwet), Katempling singkong khas,
                dan aneka olahan hasil perikanan waduk.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm text-center flex flex-col items-center space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0f3456]">
                Wisata Edukasi
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Sarana edukasi Bank Sampah, Kampung Tohaga (pertanian mandiri),
                dan WISDOM (Wisata Domba binaan).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm text-center flex flex-col items-center space-y-3.5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0f3456]">
                Paket Wisata &amp; Event
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Karangpakuan Bites, Karangpakuan Budaya, serta Event Tahunan
                Parade Perahu &amp; Tradisi Munggahan.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="#produk-lokal"
              className="inline-flex items-center gap-2 bg-[#ea7c1d] hover:bg-[#d66d12] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-sm transition-colors"
            >
              <span>Eksplorasi Semua Pengalaman</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. PRODUK LOKAL UNGGULAN */}
      <section id="produk-lokal" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2.5 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
                PRODUK KHAS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
                Produk Lokal Unggulan
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Dukung produk masyarakat desa! Temukan beragam produk lokal khas
                Karang Pakuan olahan warga asli dan pelaku UMKM pesisir
                Jatigede.
              </p>
            </div>

            <a
              href="#produk-lokal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-colors self-start md:self-auto"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {produkList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-56 w-full bg-neutral-950">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${item.badgeColor}`}
                  >
                    • {item.badge}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col space-y-2.5">
                  <span
                    className={`text-[11px] font-bold tracking-wider uppercase ${item.categoryColor}`}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#0f3456]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BERITA & AGENDA TERBARU */}
      <section id="berita" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2.5 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
                INFORMASI TERKINI
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
                Berita &amp; Agenda Terbaru
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Ikuti kabar perkembangan destinasi, agenda atraksi budaya, dan
                kegiatan kemasyarakatan di Karang Pakuan.
              </p>
            </div>

            <a
              href="#berita"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-colors self-start md:self-auto"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {beritaList.map((news) => (
              <article
                key={news.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-52 w-full bg-neutral-950">
                  {news.imageUrl && (
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold tracking-wider text-amber-600 uppercase">
                      {news.date} • {news.category}
                    </p>
                    <h3 className="text-lg font-bold text-[#0f3456]">
                      {news.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500">{news.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KONTEN TERBARU (INSTAGRAM & TIKTOK) */}
      <KontenTerbaruSection
        instagramPosts={instagramPosts}
        tiktokPosts={tiktokPosts}
      />
    </div>
  )
}