import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  Users,
  Check,
  Tag,
  Mountain,
  Compass,
  Landmark,
  Calendar,
  MessageSquare,
  CalendarCheck,
  CreditCard,
  Flag,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { RencanakanKunjunganSection } from '../components/RencanakanKunjunganSection'
import { getDB } from '../lib/db'

interface PaketWisataItem {
  id: number
  slug: string
  kategori_badge: string
  badge_dot_color: 'sky' | 'emerald' | 'orange'
  sub_lokasi: string
  rating: string
  jumlah_ulasan: string
  judul: string
  deskripsi: string
  durasi: string
  kapasitas: string
  harga: string
  satuan_harga: string
  is_populer: number
  label_highlight?: string | null
  fasilitas: string[]
  image_url?: string | null
}

interface PaketWisataRow {
  id: number
  slug: string
  kategori_badge: string
  badge_dot_color: string | null
  sub_lokasi: string
  rating: string | null
  jumlah_ulasan: string | null
  judul: string
  deskripsi: string
  durasi: string
  kapasitas: string
  harga: string
  satuan_harga: string | null
  is_populer: number
  label_highlight: string | null
  fasilitas_json: string
  image_url: string | null
}

// Data Default (Fallback persis sesuai desain jika D1 belum diisi Admin)
const defaultPaketList: PaketWisataItem[] = [
  {
    id: 1,
    slug: 'paket-karangpakuan-bites',
    kategori_badge: 'Kuliner & UMKM Lokal',
    badge_dot_color: 'sky',
    sub_lokasi: 'Waduk Jatigede & BMD',
    rating: '4.8',
    jumlah_ulasan: '120+ ulasan',
    judul: 'Paket Karangpakuan Bites',
    deskripsi:
      'Wisata alam, kuliner khas desa (nasi liwet), mengenal UMKM lokal, menikmati panorama Waduk Jatigede, dan mencicipi produk khas desa.',
    durasi: '± 4 – 5 Jam',
    kapasitas: '10 – 30 Orang',
    harga: 'Rp75.000',
    satuan_harga: '/ orang',
    is_populer: 0,
    label_highlight: null,
    fasilitas: [
      'Tiket masuk wisata ODTW Basisir Muda Demang (BMD)',
      'Pemandu wisata lokal terverifikasi',
      'Wisata dan menikmati panorama alam Waduk Jatigede',
      'Pengalaman kuliner khas desa (paket nasi liwet)',
      'Pengenalan produk UMKM lokal Desa Karangpakuan',
      'Edukasi dan pengalaman mengenal proses produksi kuliner lokal',
      'Kesempatan mencicipi produk UMKM lokal',
      'Area bersantai dan menikmati suasana alam',
      'Dokumentasi kegiatan bersama rombongan',
    ],
    image_url: null,
  },
  {
    id: 2,
    slug: 'paket-karangpakuan-budaya',
    kategori_badge: 'Ziarah & Budaya',
    badge_dot_color: 'emerald',
    sub_lokasi: 'Kearifan Lokal Cipaku',
    rating: '4.9',
    jumlah_ulasan: '95+ ulasan',
    judul: 'Paket Karangpakuan Budaya',
    deskripsi:
      'Wisata alam, ziarah sejarah ke Kabuyutan Astana Gede Cipaku, mengenal asal-usul desa, tradisi leluhur, dan nilai kearifan lokal.',
    durasi: '± 1 Hari Penuh',
    kapasitas: '10 – 50 Orang',
    harga: 'Rp100.000',
    satuan_harga: '/ orang',
    is_populer: 0,
    label_highlight: null,
    fasilitas: [
      'Tiket masuk wisata ODTW Basisir Muda Demang (BMD)',
      'Pemandu wisata lokal terverifikasi',
      'Wisata dan menikmati panorama alam Waduk Jatigede',
      'Kunjungan wisata ziarah Kabuyutan Astana Gede Cipaku',
      'Pemandu atau narasumber pengenalan sejarah dan budaya lokal',
      'Edukasi sejarah dan asal-usul Desa Karangpakuan',
      'Pengenalan nilai-nilai tradisi dan kearifan lokal masyarakat',
      'Area bersantai dan menikmati suasana alam',
      'Dokumentasi kegiatan bersama rombongan',
    ],
    image_url: null,
  },
  {
    id: 3,
    slug: 'paket-karangpakuan-edugreen',
    kategori_badge: 'Edukasi Rombongan',
    badge_dot_color: 'orange',
    sub_lokasi: '4 Wahana Terpadu',
    rating: '5.0',
    jumlah_ulasan: '180+ ulasan',
    judul: 'Paket Karangpakuan EduGreen',
    deskripsi:
      'Program edukasi komprehensif 4 wahana: BMD (alam), Kampung Tohaga (tani), WISDOM (peternakan domba), dan Bank Sampah Berhias YKDC (3R).',
    durasi: '1 Hari Penuh / Menginap',
    kapasitas: '20 – 100 Orang (Sekolah/Komunitas)',
    harga: 'Rp150.000',
    satuan_harga: '/ orang',
    is_populer: 1,
    label_highlight: 'Best Experience',
    fasilitas: [
      'Pemandu dan fasilitator edukasi',
      'Praktik menanam bibit tanaman',
      'Praktik pemberian pakan domba dengan pendampingan peternak',
      'Praktik pemilahan dan penimbangan sampah',
      'Lembar aktivitas siswa (Eco Worksheet)',
      'Sertifikat peserta',
      'Dokumentasi kegiatan bersama rombongan',
      'Konsumsi atau nasi liwet dari UMKM/KWT lokal',
      'Souvenir produk lokal atau hasil kreativitas daur ulang',
    ],
    image_url: null,
  },
]

const wahanaEdukasiList = [
  {
    nomor: '01',
    judul: 'ODTW BMD',
    deskripsi:
      'Edukasi alam, konservasi pesisir danau Jatigede, pemahaman bentang alam geografi.',
    tag: 'Observasi Ekosistem',
    tagColor: 'text-sky-600',
  },
  {
    nomor: '02',
    judul: 'Kampung Tohaga',
    deskripsi:
      'Praktik pertanian organik, mencangkul, membibit tanaman sayur, dan panen sayuran lokal.',
    tag: 'Hands-on Farming',
    tagColor: 'text-emerald-600',
  },
  {
    nomor: '03',
    judul: 'Kandang WISDOM',
    deskripsi:
      'Pengenalan peternakan domba unggul, interaksi memberi pakan, serta pengolahan pupuk kandang.',
    tag: 'Edukasi Satwa & Ternak',
    tagColor: 'text-orange-600',
  },
  {
    nomor: '04',
    judul: 'Bank Sampah YKDC',
    deskripsi:
      'Workshop 3R (Reduce, Reuse, Recycle), simulasi pemilahan sampah anorganik & kreasi daur ulang.',
    tag: 'Zero-Waste Action',
    tagColor: 'text-[#0f3456]',
  },
]

const aktivitasPilihanList = [
  {
    icon: 'alam',
    bgClass: 'bg-emerald-600',
    judul: 'Trekking / Jelajah Alam',
    deskripsi:
      'Menyusuri perbukitan hijau, panorama Waduk Jatigede, dan udara segar pedesaan.',
  },
  {
    icon: 'edukasi',
    bgClass: 'bg-sky-600',
    judul: 'Edukasi Lingkungan',
    deskripsi:
      'Pengenalan ekosistem air tawar, konservasi pohon lokal, serta pertanian organik.',
  },
  {
    icon: 'budaya',
    bgClass: 'bg-[#ea7c1d]',
    judul: 'Belajar Budaya Desa',
    deskripsi:
      'Mengenal kesenian Sunda buhun, kuliner tradisional, dan keramahan tata krama kearifan warga.',
  },
  {
    icon: 'kelompok',
    bgClass: 'bg-[#0f3456]',
    judul: 'Aktivitas Kelompok',
    deskripsi:
      'Program Outbound, team building, fun games seru untuk instansi, komunitas, & sekolah.',
  },
]

const fasilitasUmumList = [
  'Pendamping / pemandu lokal berpengalaman',
  'Tiket masuk seluruh destinasi wisata',
  'Perlengkapan kegiatan (sesuai paket pilihan)',
  'Konsumsi (snack khas / makan, sesuai paket)',
  'Dokumentasi kegiatan (opsional / rombongan)',
]

const reservationSteps = [
  {
    nomor: '1',
    icon: Calendar,
    judul: 'Pilih Paket Wisata',
    deskripsi: 'Tentukan paket yang cocok untuk Anda atau kelompok.',
  },
  {
    nomor: '2',
    icon: MessageSquare,
    judul: 'Hubungi Pengelola',
    deskripsi: 'Kirim pesan WhatsApp ke admin resmi wisata.',
  },
  {
    nomor: '3',
    icon: CalendarCheck,
    judul: 'Tanggal & Peserta',
    deskripsi: 'Sepakati jadwal kunjungan dan jumlah orang.',
  },
  {
    nomor: '4',
    icon: CreditCard,
    judul: 'Konfirmasi & Bayar',
    deskripsi: 'Lakukan konfirmasi sesuai petunjuk resmi panitia.',
  },
  {
    nomor: '5',
    icon: Flag,
    judul: 'Nikmati Liburan',
    deskripsi: 'Rasakan pengalaman autentik & berkesan di desa.',
  },
]

const getPaketWisataPageData = createServerFn({ method: 'GET' }).handler(
  async () => {
    try {
      const db = getDB()
      const [profilRow, paketRes] = await Promise.all([
        db
          .prepare('SELECT whatsapp_1 FROM profil_desa LIMIT 1')
          .first<{ whatsapp_1: string | null }>(),
        db
          .prepare('SELECT * FROM paket_wisata ORDER BY urutan ASC, id ASC')
          .all<PaketWisataRow>(),
      ])

      const mappedPaket: PaketWisataItem[] =
        paketRes.results && paketRes.results.length > 0
          ? paketRes.results.map((row) => {
              let parsedFasilitas: string[] = []
              try {
                const parsed = JSON.parse(row.fasilitas_json)
                if (Array.isArray(parsed)) parsedFasilitas = parsed
              } catch {
                parsedFasilitas = []
              }

              const validColor =
                row.badge_dot_color === 'emerald' ||
                row.badge_dot_color === 'orange'
                  ? row.badge_dot_color
                  : 'sky'

              return {
                id: row.id,
                slug: row.slug,
                kategori_badge: row.kategori_badge,
                badge_dot_color: validColor,
                sub_lokasi: row.sub_lokasi,
                rating: row.rating || '4.8',
                jumlah_ulasan: row.jumlah_ulasan || '100+ ulasan',
                judul: row.judul,
                deskripsi: row.deskripsi,
                durasi: row.durasi,
                kapasitas: row.kapasitas,
                harga: row.harga,
                satuan_harga: row.satuan_harga || '/ orang',
                is_populer: row.is_populer ?? 0,
                label_highlight: row.label_highlight,
                fasilitas: parsedFasilitas,
                image_url: row.image_url,
              }
            })
          : defaultPaketList

      return {
        whatsappNumber: profilRow?.whatsapp_1 || '6281318375641',
        paketList: mappedPaket,
      }
    } catch {
      return {
        whatsappNumber: '6281318375641',
        paketList: defaultPaketList,
      }
    }
  },
)

export const Route = createFileRoute('/paket-wisata')({
  loader: async () => await getPaketWisataPageData(),
  component: PaketWisataPage,
})

function PaketWisataPage() {
  const { whatsappNumber, paketList } = Route.useLoaderData()

  const getDotColorClass = (color: PaketWisataItem['badge_dot_color']) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500'
      case 'orange':
        return 'bg-[#ea7c1d]'
      default:
        return 'bg-sky-500'
    }
  }

  const renderAktivitasIcon = (type: string) => {
    switch (type) {
      case 'alam':
        return <Mountain className="w-5 h-5 text-white" />
      case 'edukasi':
        return <Compass className="w-5 h-5 text-white" />
      case 'budaya':
        return <Landmark className="w-5 h-5 text-white" />
      default:
        return <Users className="w-5 h-5 text-white" />
    }
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/* 1. HERO SECTION PAKET WISATA */}
      <PageHero
        badge="PAKET WISATA"
        title="Rencana Perjalanan"
        highlightedTitle="Desa Wisata Karang Pakuan"
        subtitle="Curated Trips, Meaningful Experiences"
        description="Pilihan paket kunjungan terpadu untuk menikmati keindahan alam, budaya, edukasi, dan pengalaman bermakna di desa kami."
        imageSrc="/images/Heroimage.png"
        bottomFadeColor="#F8FAFC"
      >
        <a
          href="#pilihan-paket"
          className="inline-flex items-center gap-2 bg-[#ea7c1d] hover:bg-[#d66d12] text-white font-sans text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <span>Daftar Paket</span>
          <ChevronDown className="w-4 h-4" />
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}?text=Halo%20Desa%20Wisata%20Karang%20Pakuan,%20saya%20ingin%20memesan%20paket%20wisata.`}
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
          <span>Pesan Sekarang</span>
        </a>
      </PageHero>

      {/* 2. PILIHAN PAKET WISATA KARANG PAKUAN + RINCIAN 4 WAHANA */}
      <section
        id="pilihan-paket"
        className="pt-8 pb-8 bg-[#F8FAFC] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase bg-sky-50 border border-sky-200/80 text-[#0f3456]">
                EKSPLORASI LENGKAP
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f3456] tracking-tight">
                Pilihan Paket Wisata Karang Pakuan
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Pilih skema perjalanan sesuai dengan kebutuhan kelompok,
                keluarga, atau rombongan Anda di Desa Wisata Karang Pakuan
                (Waduk Jatigede).
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-[#0f3456] self-start lg:self-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Semua paket didampingi pemandu lokal terverifikasi</span>
            </div>
          </div>

          {/* 3 Kartu Paket Wisata */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {paketList.map((paket) => {
              const isPopuler = paket.is_populer === 1
              const waText = encodeURIComponent(
                `Halo Desa Wisata Karang Pakuan, saya ingin memesan *${paket.judul}* (${paket.harga} ${paket.satuan_harga}). Mohon info jadwal dan ketersediaannya.`,
              )

              return (
                <div
                  key={paket.id}
                  className={`relative bg-white rounded-3xl overflow-hidden flex flex-col justify-between transition-all ${
                    isPopuler
                      ? 'border-2 border-[#ea7c1d] shadow-xl'
                      : 'border border-slate-200/80 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Area Media / Header Gelap Kartu */}
                    <div className="relative h-56 bg-[#06090e] p-4 flex flex-col justify-between overflow-hidden">
                      {paket.image_url ? (
                        <img
                          src={paket.image_url}
                          alt={paket.judul}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0d131f] via-[#06090e] to-[#020306]" />
                      )}

                      {/* Pita POPULER di Pojok Kanan Atas */}
                      {isPopuler && (
                        <div className="absolute top-5 -right-10 w-36 bg-[#ea7c1d] text-white text-[10px] font-extrabold tracking-widest uppercase text-center py-1 rotate-45 shadow-md z-20">
                          POPULER
                        </div>
                      )}

                      {/* Badge Kategori Atas */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0f3456] text-[11px] font-bold shadow-xs">
                          <span
                            className={`w-2 h-2 rounded-full ${getDotColorClass(
                              paket.badge_dot_color,
                            )}`}
                          />
                          <span>{paket.kategori_badge}</span>
                        </span>
                      </div>

                      {/* Sub-lokasi & Rating Bawah */}
                      <div className="relative z-10 flex items-center justify-between gap-2 text-xs">
                        {isPopuler && paket.label_highlight ? (
                          <span className="px-2.5 py-1 rounded-md bg-[#ea7c1d] text-white font-bold text-[11px]">
                            {paket.label_highlight}
                          </span>
                        ) : (
                          <span className="text-slate-200 font-medium">
                            {paket.sub_lokasi}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 text-white font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{paket.rating}</span>
                          <span className="text-slate-400 font-normal">
                            ({paket.jumlah_ulasan})
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Isi Detail Paket */}
                    <div className="p-6 space-y-5">
                      <div className="space-y-2">
                        <h3 className="text-xl font-extrabold text-[#0f3456]">
                          {paket.judul}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {paket.deskripsi}
                        </p>
                      </div>

                      {/* Info Durasi & Kapasitas Grup */}
                      <div className="py-3.5 border-y border-slate-100 space-y-2 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-2 text-slate-400">
                            <Clock
                              className={`w-3.5 h-3.5 ${
                                isPopuler ? 'text-[#ea7c1d]' : 'text-slate-400'
                              }`}
                            />
                            <span>Durasi Wisata</span>
                          </span>
                          <span className="font-bold text-[#0f3456] text-right">
                            {paket.durasi}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-2 text-slate-400">
                            <Users
                              className={`w-3.5 h-3.5 ${
                                isPopuler ? 'text-[#ea7c1d]' : 'text-slate-400'
                              }`}
                            />
                            <span>Kapasitas Grup</span>
                          </span>
                          <span className="font-bold text-[#0f3456] text-right">
                            {paket.kapasitas}
                          </span>
                        </div>
                      </div>

                      {/* Daftar Fasilitas Lengkap Termasuk */}
                      <div className="space-y-2.5">
                        <p className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                          FASILITAS LENGKAP TERMASUK
                        </p>
                        <ul className="space-y-2">
                          {paket.fasilitas.map((fas, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-slate-600 leading-snug"
                            >
                              <Check
                                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  isPopuler
                                    ? 'text-[#ea7c1d]'
                                    : 'text-emerald-600'
                                }`}
                              />
                              <span>{fas}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer Kartu: Harga & Tombol Pesan Sekarang */}
                  <div className="p-6 pt-0 space-y-3.5">
                    <div
                      className={`rounded-2xl px-4 py-3 flex items-center justify-between ${
                        isPopuler
                          ? 'bg-orange-50/80 border border-orange-200/80'
                          : 'bg-slate-50 border border-slate-200/70'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <Tag
                          className={`w-3.5 h-3.5 ${
                            isPopuler ? 'text-[#ea7c1d]' : 'text-slate-400'
                          }`}
                        />
                        <span>Mulai dari</span>
                      </span>
                      <div className="text-right">
                        <span
                          className={`text-lg font-extrabold ${
                            isPopuler ? 'text-[#ea7c1d]' : 'text-[#0f3456]'
                          }`}
                        >
                          {paket.harga}
                        </span>
                        <span className="text-[11px] text-slate-400 ml-1">
                          {paket.satuan_harga}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-1.5 py-3 px-5 rounded-full text-xs sm:text-sm font-bold text-white shadow-sm transition-colors ${
                        isPopuler
                          ? 'bg-[#ea7c1d] hover:bg-[#d66d12]'
                          : 'bg-[#0f3456] hover:bg-[#09223a]'
                      }`}
                    >
                      <span>Pesan Sekarang</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Box Rincian 4 Wahana Edukasi Rombongan */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f3456]">
                Rincian 4 Wahana Edukasi Rombongan
              </h3>

              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-500">
                Target Peserta:{' '}
                <strong className="text-[#0f3456] ml-1">
                  PAUD/TK, SD, SMP, SMA, Komunitas &amp; Instansi
                </strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {wahanaEdukasiList.map((wahana) => (
                <div
                  key={wahana.nomor}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-sky-100/80 text-sky-700 text-[11px] font-extrabold">
                        {wahana.nomor}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#0f3456]">
                        {wahana.judul}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {wahana.deskripsi}
                    </p>
                  </div>

                  <p className={`text-[11px] font-bold ${wahana.tagColor}`}>
                    • {wahana.tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. AKTIVITAS YANG BISA DIPILIH & FASILITAS UMUM PAKET */}
      <section className="py-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Kolom Kiri (7 kolom): Aktivitas yang Bisa Dipilih */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase bg-sky-50 border border-sky-200/80 text-[#0f3456]">
                  RAGAM PETUALANGAN
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f3456] tracking-tight">
                  Aktivitas yang Bisa Dipilih
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Aktivitas menarik dan edukatif yang dapat disesuaikan dengan
                  kebutuhan
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aktivitasPilihanList.map((item) => (
                  <div
                    key={item.judul}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-3.5 shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl ${item.bgClass} flex items-center justify-center shrink-0 shadow-xs`}
                      >
                        {renderAktivitasIcon(item.icon)}
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#0f3456] leading-snug">
                        {item.judul}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Kanan (5 kolom): Fasilitas Umum Paket */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase bg-sky-50 border border-sky-200/80 text-[#0f3456]">
                    TERMASUK DI SEMUA PAKET
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f3456] tracking-tight">
                    Fasilitas Umum Paket
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Jaminan kenyamanan &amp; keselamatan terstandardisasi
                  </p>
                </div>

                <ul className="space-y-3">
                  {fasilitasUmumList.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 text-xs sm:text-sm font-semibold text-[#0f3456]"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Tanpa Biaya Tambahan</span>
                </span>
                <span className="text-slate-400 font-medium">
                  Didampingi Pemandu Resmi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESERVATION STEPS SECTION */}
      <section className="py-8 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.16em] uppercase bg-sky-50 border border-sky-200/80 text-[#0f3456]">
              ALUR MUDAH &amp; CEPAT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f3456] tracking-tight">
              Cara Reservasi / Pemesanan
            </h2>
            <p className="text-sm text-slate-500">
              5 langkah sederhana untuk merencanakan liburan istimewa Anda di
              Desa Karang Pakuan Sumedang
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {reservationSteps.map((step, index) => {
              const IconComponent = step.icon
              const isLast = index === reservationSteps.length - 1

              return (
                <div
                  key={step.nomor}
                  className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 text-center flex flex-col items-center space-y-3.5"
                >
                  {/* Bulatan Nomor */}
                  <div className="w-7 h-7 rounded-full bg-[#0f3456] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                    {step.nomor}
                  </div>

                  {/* Kotak Ikon */}
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-[#0f3456] flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Judul & Deskripsi */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-extrabold text-[#0f3456]">
                      {step.judul}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.deskripsi}
                    </p>
                  </div>

                  {/* Panah Penghubung Antar-Langkah di Desktop */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-400 items-center justify-center shadow-2xs"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. RENCANAKAN KUNJUNGAN ANDA */}
      <RencanakanKunjunganSection waNumber={whatsappNumber} />
    </div>
  )
}