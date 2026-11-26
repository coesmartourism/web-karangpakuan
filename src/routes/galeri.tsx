import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  ChevronDown,
  Image as ImageIcon,
  Play,
  MapPin,
  Clock,
  X,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { RencanakanKunjunganSection } from '../components/RencanakanKunjunganSection'
import { getDB } from '../lib/db'

interface GaleriMediaItem {
  id: number
  tipe: 'foto' | 'video'
  judul: string
  subjudul: string // Untuk foto: nama lokasi; untuk video: deskripsi singkat
  durasi?: string | null
  media_url?: string | null
  thumbnail_url?: string | null
}

// Data Default Foto (Fallback jika D1 belum diisi Admin)
const defaultFotoList: GaleriMediaItem[] = [
  {
    id: 1,
    tipe: 'foto',
    judul: 'Danau Tenang Pegunungan',
    subjudul: 'Telaga Biru Pakuan',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 2,
    tipe: 'foto',
    judul: 'Gazebo Pendopo Tradisional',
    subjudul: 'Kawasan Rest Area Desa',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 3,
    tipe: 'foto',
    judul: 'Area Perkemahan Bukit',
    subjudul: 'Puncak Bukit Karang',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 4,
    tipe: 'foto',
    judul: 'Sawah Terasering Subur',
    subjudul: 'Lembah Hijau Wetan',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 5,
    tipe: 'foto',
    judul: 'Trekking Jalur Rimba',
    subjudul: 'Rute BMD Demang',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 6,
    tipe: 'foto',
    judul: 'Kebun Herbal & Teh Desa',
    subjudul: 'Agro Edukasi Pakuan',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 7,
    tipe: 'foto',
    judul: 'Homestay Rumah Panggung',
    subjudul: 'Dusun Kasepuhan',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 8,
    tipe: 'foto',
    judul: 'Panorama Sore Karang Pakuan',
    subjudul: 'Jalur Utama Desa',
    media_url: null,
    thumbnail_url: null,
  },
]

// Data Default Video (Fallback jika D1 belum diisi Admin)
const defaultVideoList: GaleriMediaItem[] = [
  {
    id: 101,
    tipe: 'video',
    judul: 'Jelajah BMD – Basisir Muda Demang',
    subjudul:
      'Eksplorasi panorama bukit berkabut dan keindahan pesona alam Basisir Muda Demang.',
    durasi: '03:24',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 102,
    tipe: 'video',
    judul: 'Kegiatan Edukasi Lingkungan',
    subjudul:
      'Program pelestarian hutan lindung dan penanaman bibit pohon bersama pemuda desa.',
    durasi: '02:17',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 103,
    tipe: 'video',
    judul: 'Profil Singkat Desa Wisata Karang Pakuan',
    subjudul:
      'Sekilas pesona desa, kehangatan budaya warga, dan keindahan bentang alam asri.',
    durasi: '01:56',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 104,
    tipe: 'video',
    judul: 'Upacara Adat Seren Taun & Kesenian Lokal',
    subjudul:
      'Dokumentasi kehangatan tradisi syukur panen raya dan pentas seni gamelan warga Karang Pakuan.',
    durasi: '04:12',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 105,
    tipe: 'video',
    judul: 'Cita Rasa Kuliner Tradisional & Kopi Lereng',
    subjudul:
      'Proses pengolahan biji kopi lokal dan ragam santapan khas pedesaan warisan leluhur.',
    durasi: '02:45',
    media_url: null,
    thumbnail_url: null,
  },
  {
    id: 106,
    tipe: 'video',
    judul: 'Menyusuri Arung Jeram & Curug Karang',
    subjudul:
      'Keseruan petualangan wisata susur sungai berbatu dan segarnya air terjun alami pegunungan.',
    durasi: '03:50',
    media_url: null,
    thumbnail_url: null,
  },
]

const getGaleriPageData = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const db = getDB()

    const [profilRow, galeriRes] = await Promise.all([
      db
        .prepare('SELECT whatsapp_1 FROM profil_desa LIMIT 1')
        .first<{ whatsapp_1: string | null }>(),
      db
        .prepare(
          'SELECT id, tipe, judul, subjudul, durasi, media_url, thumbnail_url FROM destinasi_galeri ORDER BY urutan ASC, id DESC',
        )
        .all<GaleriMediaItem>(),
    ])

    const allItems = galeriRes.results ?? []
    const dbFotos = allItems.filter((item) => item.tipe === 'foto')
    const dbVideos = allItems.filter((item) => item.tipe === 'video')

    return {
      whatsappNumber: profilRow?.whatsapp_1 || '6281318375641',
      fotoList: dbFotos.length > 0 ? dbFotos : defaultFotoList,
      videoList: dbVideos.length > 0 ? dbVideos : defaultVideoList,
    }
  } catch {
    return {
      whatsappNumber: '6281318375641',
      fotoList: defaultFotoList,
      videoList: defaultVideoList,
    }
  }
})

export const Route = createFileRoute('/galeri')({
  loader: async () => await getGaleriPageData(),
  component: GaleriPage,
})

function GaleriPage() {
  const { whatsappNumber, fotoList, videoList } = Route.useLoaderData()
  const [selectedMedia, setSelectedMedia] = useState<GaleriMediaItem | null>(
    null,
  )

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/* 1. HERO SECTION GALERI */}
      <PageHero
        badge="GALERI & DOKUMENTASI"
        title="Jejak Keindahan"
        highlightedTitle="Desa Wisata Karang Pakuan"
        subtitle="Capture the Moment, Feel the Serenity"
        description="Jelajahi potret pesona alam, kehangatan budaya lokal, hingga keseruan aktivitas wisata yang terekam indah di setiap sudut Desa Wisata Karang Pakuan."
        imageSrc="/images/Heroimage.png"
        bottomFadeColor="#F8FAFC"
      >
        <a
          href="#koleksi-foto"
          className="inline-flex items-center gap-2 bg-[#ea7c1d] hover:bg-[#d66d12] text-white font-sans text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <span>Koleksi Foto</span>
          <ChevronDown className="w-4 h-4" />
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}?text=Halo%20Desa%20Wisata%20Karang%20Pakuan,%20saya%20ingin%20merencanakan%20kunjungan%20wisata.`}
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
          <span>Rencanakan Kunjungan</span>
        </a>
      </PageHero>

      {/* 2. CONTENT SECTION GALERI (FOTO & VIDEO) */}
      <section
        id="koleksi-foto"
        className="pt-8 pb-8 bg-[#F8FAFC] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* BAGIAN A: FOTO */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center shadow-2xs">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f3456] tracking-tight">
                Foto
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {fotoList.map((foto) => {
                const previewSrc = foto.thumbnail_url || foto.media_url
                return (
                  <button
                    key={foto.id}
                    type="button"
                    onClick={() => setSelectedMedia(foto)}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-2.5 text-left shadow-2xs hover:shadow-md transition-all cursor-pointer focus:outline-none"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#06090e]">
                      {previewSrc ? (
                        <img
                          src={previewSrc}
                          alt={foto.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0d131f] via-[#06090e] to-[#020306] group-hover:scale-105 transition-transform duration-300" />
                      )}
                    </div>

                    <div className="px-1.5 pt-3 pb-1 space-y-1">
                      <h3 className="text-sm font-bold text-[#0f3456] group-hover:text-[#ea7c1d] transition-colors line-clamp-1">
                        {foto.judul}
                      </h3>
                      {foto.subjudul && (
                        <p className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                          <MapPin className="w-3 h-3 text-[#ea7c1d] shrink-0" />
                          <span className="truncate">{foto.subjudul}</span>
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* BAGIAN B: VIDEO */}
          <div id="koleksi-video" className="space-y-6 scroll-mt-20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 text-[#ea7c1d] flex items-center justify-center shadow-2xs">
                <Play className="w-4 h-4 fill-[#ea7c1d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f3456] tracking-tight">
                Video
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoList.map((video) => {
                const thumbSrc = video.thumbnail_url || video.media_url
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setSelectedMedia(video)}
                    className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden text-left shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col focus:outline-none"
                  >
                    {/* Thumbnail Gelap + Tombol Play Oranye + Badge Durasi */}
                    <div className="relative aspect-[16/9] w-full bg-[#06090e] overflow-hidden">
                      {thumbSrc ? (
                        <img
                          src={thumbSrc}
                          alt={video.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0d131f] via-[#06090e] to-[#020306] group-hover:scale-105 transition-transform duration-300" />
                      )}

                      {/* Tombol Play Oranye di Tengah */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#ea7c1d] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Badge Durasi Pojok Kanan Bawah */}
                      {video.durasi && (
                        <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[11px] font-semibold text-white">
                          <Clock className="w-3 h-3 text-slate-300" />
                          <span>{video.durasi}</span>
                        </span>
                      )}
                    </div>

                    {/* Judul & Deskripsi Singkat Video */}
                    <div className="p-5 space-y-1.5 flex-1">
                      <h3 className="text-base font-bold text-[#0f3456] group-hover:text-[#ea7c1d] transition-colors">
                        {video.judul}
                      </h3>
                      {video.subjudul && (
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {video.subjudul}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. RENCANAKAN KUNJUNGAN ANDA */}
      <RencanakanKunjunganSection waNumber={whatsappNumber} />

      {/* MODAL LIGHTBOX PRATINJAU FOTO / PEMUTAR VIDEO */}
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
                    <div className="w-14 h-14 rounded-full bg-[#ea7c1d] text-white flex items-center justify-center mx-auto shadow-lg">
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
                  src={
                    selectedMedia.media_url || selectedMedia.thumbnail_url || ''
                  }
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