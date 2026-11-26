import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  ChevronDown,
  Star,
  MapPin,
  Clock,
  Ticket,
  Mountain,
  Compass,
  BookOpen,
  Users,
  CircleParking,
  Bath,
  Tent,
  Utensils,
  Landmark,
  MoreHorizontal,
  Image as ImageIcon,
  Play,
  X,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { RencanakanKunjunganSection } from '../components/RencanakanKunjunganSection'
import { getDB } from '../lib/db'

interface AktivitasDetailItem {
  icon: 'alam' | 'outdoor' | 'edukasi' | 'komunitas'
  judul: string
  deskripsi: string
}

interface FasilitasItem {
  icon: 'parkir' | 'toilet' | 'gazebo' | 'kuliner' | 'musholla' | 'lainnya'
  nama: string
  isMore?: boolean
}

interface GaleriItem {
  id: number
  tipe: 'foto' | 'video'
  judul: string
  subjudul: string
  durasi?: string | null
  media_url?: string | null
  thumbnail_url?: string | null
}

interface DestinasiDetailData {
  id: number
  slug: string
  judul: string
  badge_lokasi: string
  sub_lokasi: string
  is_unggulan: number
  deskripsi: string
  image_url: string | null
  lokasi_teks: string
  jam_operasional: string
  harga_tiket: string
  satuan_tiket: string
  dayaTarikUtama: string[]
  aktivitasDetail: AktivitasDetailItem[]
  fasilitas: FasilitasItem[]
}

interface DestinasiRow {
  id: number
  slug: string
  judul: string
  badge_lokasi: string | null
  sub_lokasi: string | null
  is_unggulan: number
  deskripsi: string
  image_url: string | null
  lokasi_teks: string | null
  jam_operasional: string | null
  harga_tiket: string | null
  satuan_tiket: string | null
  daya_tarik_utama_json: string | null
  aktivitas_detail_json: string | null
  fasilitas_json: string | null
}

// Data Default (Fallback jika D1 belum diisi Admin)
const defaultDestinasi: DestinasiDetailData = {
  id: 1,
  slug: 'bmd-basisir-muda-demang',
  judul: 'BMD – Basisir Muda Demang',
  badge_lokasi: 'Basisir Muda Demang',
  sub_lokasi: 'Waduk Jatigede, Sumedang',
  is_unggulan: 1,
  deskripsi:
    'BMD (Basisir Muda Demang) merupakan destinasi wisata alam yang terletak di pesisir Waduk Jatigede, Desa Karangpakuan, Kecamatan Darmaraja, Kabupaten Sumedang. Mengusung konsep wisata alam, rekreasi, dan kebersamaan, BMD menawarkan panorama waduk dengan berbagai aktivitas seperti camping, wisata kuliner, memancing, wisata perahu, serta kegiatan pertemuan dan gathering.',
  image_url: null,
  lokasi_teks: 'Desa Karangpakuan, Sumedang',
  jam_operasional: '08.00 – 17.00 WIB',
  harga_tiket: 'Rp10.000',
  satuan_tiket: '/ orang',
  dayaTarikUtama: [
    'Wisata Alam',
    'Camping Ground',
    'Aula Pertemuan',
    'Wisata Kuliner',
    'Wisata Memancing',
    'Perahu Wisata',
  ],
  aktivitasDetail: [
    {
      icon: 'alam',
      judul: 'Wisata Alam',
      deskripsi:
        'Menikmati panorama alam, pemandangan danau, dan suasana pedesaan yang asri.',
    },
    {
      icon: 'outdoor',
      judul: 'Aktivitas Outdoor',
      deskripsi:
        'Trekking, jelajah area perbukitan terbuka, atau beragam aktivitas kelompok.',
    },
    {
      icon: 'edukasi',
      judul: 'Wisata Edukasi',
      deskripsi:
        'Belajar konservasi alam, lingkungan ekowisata, dan kekayaan kearifan lokal.',
    },
    {
      icon: 'komunitas',
      judul: 'Kegiatan Komunitas',
      deskripsi:
        'Ruang berkumpul masyarakat, pentas budaya, dan perhelatan event desa.',
    },
  ],
  fasilitas: [
    { icon: 'parkir', nama: 'Area Parkir' },
    { icon: 'toilet', nama: 'Toilet Bersih' },
    { icon: 'gazebo', nama: 'Gazebo Santai' },
    { icon: 'kuliner', nama: 'Warung Kuliner' },
    { icon: 'musholla', nama: 'Musholla' },
    { icon: 'lainnya', nama: 'Fasilitas Lainnya', isMore: true },
  ],
}

const defaultGaleriList: GaleriItem[] = [
  {
    id: 1,
    tipe: 'foto',
    judul: 'Danau & Tepi Air BMD',
    subjudul: 'Pemandangan asri waduk & bukit',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 2,
    tipe: 'foto',
    judul: 'Gazebo Santai & Istirahat',
    subjudul: 'Tempat berkumpul teduh tepi alam',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 3,
    tipe: 'foto',
    judul: 'Area Camping Ground',
    subjudul: 'Sensasi bermalam di alam terbuka',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 4,
    tipe: 'video',
    judul: 'Video Jelajah BMD',
    subjudul: '02:15 • Dokumentasi Pesona Wisata',
    durasi: '02:15',
    media_url: null,
    thumbnail_url: null,
  },
]

const getDestinasiPageData = createServerFn({ method: 'GET' }).handler(
  async () => {
    try {
      const db = getDB()

      const [profilRow, destinasiRow, galeriRes, countRow] = await Promise.all([
        db
          .prepare('SELECT whatsapp_1 FROM profil_desa LIMIT 1')
          .first<{ whatsapp_1: string | null }>(),
        db
          .prepare(
            'SELECT * FROM destinasi ORDER BY is_unggulan DESC, id ASC LIMIT 1',
          )
          .first<DestinasiRow>(),
        db
          .prepare(
            'SELECT id, tipe, judul, subjudul, durasi, media_url, thumbnail_url FROM destinasi_galeri ORDER BY urutan ASC, id DESC LIMIT 4',
          )
          .all<GaleriItem>(),
        db
          .prepare('SELECT COUNT(*) as total FROM destinasi_galeri')
          .first<{ total: number }>(),
      ])

      let destinasi = defaultDestinasi
      if (destinasiRow) {
        let parsedTags = defaultDestinasi.dayaTarikUtama
        let parsedAktivitas = defaultDestinasi.aktivitasDetail
        let parsedFasilitas = defaultDestinasi.fasilitas

        try {
          if (destinasiRow.daya_tarik_utama_json) {
            const arr = JSON.parse(destinasiRow.daya_tarik_utama_json)
            if (Array.isArray(arr) && arr.length > 0) parsedTags = arr
          }
        } catch {
          // Gunakan default
        }

        try {
          if (destinasiRow.aktivitas_detail_json) {
            const arr = JSON.parse(destinasiRow.aktivitas_detail_json)
            if (Array.isArray(arr) && arr.length > 0) parsedAktivitas = arr
          }
        } catch {
          // Gunakan default
        }

        try {
          if (destinasiRow.fasilitas_json) {
            const arr = JSON.parse(destinasiRow.fasilitas_json)
            if (Array.isArray(arr) && arr.length > 0) parsedFasilitas = arr
          }
        } catch {
          // Gunakan default
        }

        destinasi = {
          id: destinasiRow.id,
          slug: destinasiRow.slug,
          judul: destinasiRow.judul,
          badge_lokasi: destinasiRow.badge_lokasi || 'Basisir Muda Demang',
          sub_lokasi: destinasiRow.sub_lokasi || 'Waduk Jatigede, Sumedang',
          is_unggulan: destinasiRow.is_unggulan ?? 1,
          deskripsi: destinasiRow.deskripsi,
          image_url: destinasiRow.image_url,
          lokasi_teks:
            destinasiRow.lokasi_teks || 'Desa Karangpakuan, Sumedang',
          jam_operasional: destinasiRow.jam_operasional || '08.00 – 17.00 WIB',
          harga_tiket: destinasiRow.harga_tiket || 'Rp10.000',
          satuan_tiket: destinasiRow.satuan_tiket || '/ orang',
          dayaTarikUtama: parsedTags,
          aktivitasDetail: parsedAktivitas,
          fasilitas: parsedFasilitas,
        }
      }

      const hasDbGaleri =
        galeriRes.results && galeriRes.results.length > 0 && (countRow?.total ?? 0) > 0

      return {
        whatsappNumber: profilRow?.whatsapp_1 || '6281318375641',
        destinasi,
        galeriPreview: hasDbGaleri ? galeriRes.results : defaultGaleriList,
        totalGaleriCount: hasDbGaleri ? (countRow?.total ?? 0) : 12,
      }
    } catch {
      return {
        whatsappNumber: '6281318375641',
        destinasi: defaultDestinasi,
        galeriPreview: defaultGaleriList,
        totalGaleriCount: 12,
      }
    }
  },
)

export const Route = createFileRoute('/destinasi')({
  loader: async () => await getDestinasiPageData(),
  component: DestinasiPage,
})

function DestinasiPage() {
  const { whatsappNumber, destinasi, galeriPreview, totalGaleriCount } =
    Route.useLoaderData()

  // State Modal Lightbox saat salah satu foto atau video diklik
  const [selectedMedia, setSelectedMedia] = useState<GaleriItem | null>(null)

  const renderAktivitasIcon = (type: AktivitasDetailItem['icon']) => {
    switch (type) {
      case 'alam':
        return (
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mx-auto">
            <Mountain className="w-5 h-5" />
          </div>
        )
      case 'outdoor':
        return (
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-500 flex items-center justify-center mx-auto">
            <Compass className="w-5 h-5" />
          </div>
        )
      case 'edukasi':
        return (
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-5 h-5" />
          </div>
        )
      case 'komunitas':
        return (
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-500 flex items-center justify-center mx-auto">
            <Users className="w-5 h-5" />
          </div>
        )
    }
  }

  const renderFasilitasIcon = (type: FasilitasItem['icon']) => {
    const baseClass =
      'w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-[#0f3456] flex items-center justify-center mx-auto shadow-2xs'
    switch (type) {
      case 'parkir':
        return (
          <div className={baseClass}>
            <CircleParking className="w-4 h-4" />
          </div>
        )
      case 'toilet':
        return (
          <div className={baseClass}>
            <Bath className="w-4 h-4" />
          </div>
        )
      case 'gazebo':
        return (
          <div className={baseClass}>
            <Tent className="w-4 h-4" />
          </div>
        )
      case 'kuliner':
        return (
          <div className={baseClass}>
            <Utensils className="w-4 h-4" />
          </div>
        )
      case 'musholla':
        return (
          <div className={baseClass}>
            <Landmark className="w-4 h-4" />
          </div>
        )
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-slate-500 flex items-center justify-center mx-auto shadow-2xs">
            <MoreHorizontal className="w-4 h-4" />
          </div>
        )
    }
  }

  // Pisahkan paragraf deskripsi agar kata pertama bisa dicetak tebal bila sesuai format
  const renderFormattedDeskripsi = (text: string) => {
    const prefix = 'BMD (Basisir Muda Demang)'
    if (text.startsWith(prefix)) {
      return (
        <>
          <strong className="font-bold text-[#0f3456]">{prefix}</strong>
          {text.slice(prefix.length)}
        </>
      )
    }
    return text
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/* 1. HERO SECTION DESTINASI */}
      <PageHero
        badge="DESTINASI WISATA"
        title="Jelajahi Pesona"
        highlightedTitle="Desa Wisata Karang Pakuan"
        subtitle="Discover the Attractions of Karang Pakuan"
        description="Jelajahi ragam daya tarik wisata alam, panorama pesisir waduk, hingga kearifan lokal yang memikat di Desa Wisata Karang Pakuan."
        imageSrc="/images/Heroimage.png"
        bottomFadeColor="#F8FAFC"
      >
        <a
          href="#main-destination"
          className="inline-flex items-center gap-2 bg-[#ea7c1d] hover:bg-[#d66d12] text-white font-sans text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <span>Pilih Destinasi</span>
          <ChevronDown className="w-4 h-4" />
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}?text=Halo%20Desa%20Wisata%20Karang%20Pakuan,%20saya%20ingin%20bertanya%20tentang%20destinasi%20wisata.`}
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

      {/* 2. MAIN DESTINATION CARD */}
      <section
        id="main-destination"
        className="pt-8 pb-6 bg-[#F8FAFC] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 lg:p-10 space-y-8">
            {/* Baris Badge Atas */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase bg-sky-50 border border-sky-200/80 text-[#0f3456]">
                DESTINASI WISATA
              </span>

              {destinasi.is_unggulan === 1 && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200/90 text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Destinasi Unggulan</span>
                </span>
              )}
            </div>

            {/* Judul Utama Destinasi */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f3456] tracking-tight !mt-3">
              {destinasi.judul}
            </h2>

            {/* Grid Media Kiri & Deskripsi + Daya Tarik Utama Kanan */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
              {/* Foto / Placeholder Kiri */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#06090e] min-h-[300px] sm:min-h-[350px] flex flex-col justify-between p-4 sm:p-5">
                {destinasi.image_url ? (
                  <img
                    src={destinasi.image_url}
                    alt={destinasi.judul}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f18] via-[#06090e] to-[#020408]" />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-medium text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{destinasi.badge_lokasi}</span>
                  </span>
                </div>

                <div className="relative z-10 flex justify-end">
                  <span className="text-xs font-medium text-slate-300/90 drop-shadow">
                    {destinasi.sub_lokasi}
                  </span>
                </div>
              </div>

              {/* Deskripsi & Daya Tarik Utama Kanan */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  {renderFormattedDeskripsi(destinasi.deskripsi)}
                </p>

                <div className="rounded-2xl bg-slate-50/90 border border-slate-200/70 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-wider uppercase text-[#0f3456]">
                      DAYA TARIK UTAMA
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {destinasi.dayaTarikUtama.length} Aktivitas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {destinasi.dayaTarikUtama.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0f3456] shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Kartu Info Bawah: Lokasi, Jam Operasional, Tiket Masuk */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                    LOKASI
                  </p>
                  <p className="text-sm font-bold text-[#0f3456] mt-0.5">
                    {destinasi.lokasi_teks}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                    JAM OPERASIONAL
                  </p>
                  <p className="text-sm font-bold text-[#0f3456] mt-0.5">
                    {destinasi.jam_operasional}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200/90 bg-amber-50/70 p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-amber-700">
                    TIKET MASUK
                  </p>
                  <p className="text-sm font-extrabold text-amber-600 mt-0.5">
                    {destinasi.harga_tiket}{' '}
                    <span className="text-xs font-medium text-amber-700/80">
                      {destinasi.satuan_tiket}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTINATION DETAIL AREA */}
      <section className="py-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Blok A: Daya Tarik & Aktivitas */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 lg:p-10 space-y-7">
            <div className="space-y-2.5">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase bg-sky-50 border border-sky-200/80 text-[#0f3456]">
                RAGAM PENGALAMAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f3456] tracking-tight">
                Daya Tarik &amp; Aktivitas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {destinasi.aktivitasDetail.map((item) => (
                <div
                  key={item.judul}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center space-y-3.5 shadow-2xs hover:shadow-md transition-shadow"
                >
                  {renderAktivitasIcon(item.icon)}
                  <h3 className="text-base font-bold text-[#0f3456]">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Blok B: Fasilitas Lengkap */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 lg:p-10 space-y-7">
            <div className="space-y-2.5">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase bg-sky-50 border border-sky-200/80 text-[#0f3456]">
                KENYAMANAN PENGUNJUNG
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f3456] tracking-tight">
                Fasilitas Lengkap
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {destinasi.fasilitas.map((fas) => (
                <div
                  key={fas.nama}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-center space-y-2.5 hover:bg-white hover:shadow-xs transition-all"
                >
                  {renderFasilitasIcon(fas.icon)}
                  <p
                    className={`text-xs font-bold ${
                      fas.isMore ? 'text-slate-400' : 'text-[#0f3456]'
                    }`}
                  >
                    {fas.nama}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Blok C: Galeri Foto & Video */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 lg:p-10 space-y-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-2.5">
                <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase bg-sky-50 border border-sky-200/80 text-[#0f3456]">
                  DOKUMENTASI DESA
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f3456] tracking-tight">
                  Galeri Foto &amp; Video
                </h2>
              </div>

              <Link
                to="/galeri"
                className="text-xs sm:text-sm font-bold text-[#0f3456] hover:text-[#ea7c1d] transition-colors"
              >
                Lihat Semua ({totalGaleriCount})
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {galeriPreview.map((item) => {
                const previewSrc = item.thumbnail_url || item.media_url
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMedia(item)}
                    className="group text-left space-y-2.5 focus:outline-none cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#06090e] border border-slate-200/60">
                      {previewSrc ? (
                        <img
                          src={previewSrc}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0c111b] to-[#04060a] group-hover:scale-105 transition-transform duration-300" />
                      )}

                      {item.tipe === 'foto' ? (
                        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0f3456]/90 backdrop-blur-xs text-[11px] font-semibold text-white">
                          <ImageIcon className="w-3 h-3" />
                          <span>Foto</span>
                        </span>
                      ) : (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/60 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            </div>
                          </div>
                          {item.durasi && (
                            <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 text-[11px] font-semibold text-white">
                              {item.durasi}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#0f3456] group-hover:text-[#ea7c1d] transition-colors">
                        {item.judul}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.subjudul}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. RENCANAKAN KUNJUNGAN ANDA */}
      <RencanakanKunjunganSection waNumber={whatsappNumber} />

      {/* MODAL LIGHTBOX UNTUK FOTO / VIDEO YANG DIKLIK */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#0b192c] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">
                  {selectedMedia.judul}
                </h3>
                {selectedMedia.subjudul && (
                  <p className="text-xs text-slate-300 mt-0.5">
                    {selectedMedia.subjudul}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup pratinjau"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black flex items-center justify-center">
              {selectedMedia.tipe === 'video' ? (
                selectedMedia.media_url ? (
                  <video
                    src={selectedMedia.media_url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center px-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center mx-auto">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {selectedMedia.judul}
                    </p>
                    <p className="text-xs text-slate-400">
                      Video dokumentasi akan segera diputar setelah file diunggah
                      oleh Admin ke Cloudflare R2.
                    </p>
                  </div>
                )
              ) : selectedMedia.media_url || selectedMedia.thumbnail_url ? (
                <img
                  src={selectedMedia.media_url || selectedMedia.thumbnail_url || ''}
                  alt={selectedMedia.judul}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center px-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center mx-auto">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {selectedMedia.judul}
                  </p>
                  <p className="text-xs text-slate-400">
                    Foto resolusi penuh akan tampil di sini setelah diunggah
                    oleh Admin ke Cloudflare R2.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}