import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  Sparkles,
  Compass,
  Users,
  Calendar,
  Trees,
  Landmark,
  Store,
  ArrowRight,
  Quote,
  ChevronDown,
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { getDB } from '../lib/db'

interface ProfilImagesRow {
  image_profil_singkat: string | null
  image_sejarah: string | null
  image_pokdarwis: string | null
  whatsapp_1: string | null
}

interface VisiRow {
  periode: string
  judul_visi: string
  kutipan: string
  pilar_json: string
}

interface MisiRow {
  id: number
  nomor_urut: number
  judul: string
  deskripsi: string
}

export interface PilarItem {
  huruf: string
  judul: string
  deskripsi: string
}

const defaultPilarBerkah: PilarItem[] = [
  {
    huruf: 'B',
    judul: 'Bersih',
    deskripsi:
      'kondisi di mana penyelenggaraan pemerintahan dilaksanakan secara bersih (clean governance) dengan mengacu pada peraturan perundang-undangan yang berlaku.',
  },
  {
    huruf: 'B',
    judul: 'Berbudaya',
    deskripsi:
      'kondisi masyarakat yang berperilaku sesuai dengan norma-norma yang berlaku di masyarakat, agama, dan hukum negara serta menghormati, menghargai, dan menjaga nilai-nilai budaya warisan leluhur.',
  },
  {
    huruf: 'E',
    judul: 'Ekonomis',
    deskripsi:
      'kondisi di mana semua kegiatan penyelenggaraan pemerintahan harus berorientasi dan berdampak secara ekonomis kepada masyarakat dalam rangka menyejahterakan kehidupan Desa Karangpakuan.',
  },
  {
    huruf: 'R',
    judul: 'Rapih',
    deskripsi:
      'Adalah kondisi di mana kehidupan masyarakat dari mulai rumah tangga, RT, RW, Dusun sampai tingkat Desa senantiasa menjaga kebersihan dan kerapihan sebagai perwujudan masyarakat beragama.',
  },
  {
    huruf: 'K',
    judul: 'Kreatif',
    deskripsi:
      'Adalah kondisi di mana masyarakat Desa Karangpakuan mempunyai banyak gagasan dan ide-ide kreatif untuk membangun Desa bersama-sama dengan pemerintah Desa dalam segala bidang pembangunan.',
  },
  {
    huruf: 'A',
    judul: 'Agamis',
    deskripsi:
      'Nilai agama menjadi landasan tata kelola dan perilaku keseharian sehingga tercipta masyarakat Baldatun Toyyibatun Warabbun Ghafur (Desa yang Baik, Sejahtera, dan Diridhoi Allah SWT).',
  },
  {
    huruf: 'H',
    judul: 'Harmonis',
    deskripsi:
      'Adalah sebuah kondisi di mana masyarakat hidup rukun, damai, saling menghormati dan menghargai, bergotong royong, serta berkomitmen menciptakan ketertiban dan keamanan di Desa Karangpakuan.',
  },
]

const defaultMisiList: MisiRow[] = [
  {
    id: 1,
    nomor_urut: 1,
    judul: 'Tata Kelola Pemerintahan & Pelayanan',
    deskripsi:
      'Menciptakan tata kelola pemerintahan yang baik (good governance) dan bersih (clean governance) berdasarkan demokratisasi, transparansi, penegakan hukum, berkeadilan, kesetaraan gender, dan mengutamakan pelayanan kepada masyarakat.',
  },
  {
    id: 2,
    nomor_urut: 2,
    judul: 'Efektivitas Pelayanan Publik',
    deskripsi:
      'Meningkatkan pelayanan publik (Administrasi Kependudukan, Pertanahan, Pendidikan, Kesehatan) kepada masyarakat Desa secara efektif dan efisien.',
  },
  {
    id: 3,
    nomor_urut: 3,
    judul: 'SDM & Kelembagaan Masyarakat',
    deskripsi:
      'Meningkatkan kualitas Sumber Daya Manusia dan Fasilitas Lembaga Kemasyarakatan Desa (LPM, RT, RW, Karangtaruna, Masyarakat Adat, MUI Desa, Dewan Masjid Desa, Linmas, PKK, Posyandu, KWT, Gapoktan) sebagai lembaga mitra pemerintah Desa dalam rangka membangun Desa Karangpakuan.',
  },
  {
    id: 4,
    nomor_urut: 4,
    judul: 'Infrastruktur & Lingkungan Berkelanjutan',
    deskripsi:
      'Meningkatkan pembangunan infrastruktur Desa untuk meningkatkan kesejahteraan masyarakat serta penanggulangan kemiskinan melalui pemenuhan kebutuhan dasar, pembangunan sarana dan prasarana Desa, pengembangan potensi ekonomi lokal, serta pemanfaatan SDA dan lingkungan secara berkelanjutan.',
  },
  {
    id: 5,
    nomor_urut: 5,
    judul: 'Penguatan Ekonomi BUMD',
    deskripsi:
      'Mendirikan dan mengembangkan Badan Usaha Milik Desa (BUMDesa) yang profesional sebagai pilar kegiatan ekonomi masyarakat di Desa Karangpakuan yang berfungsi sebagai lembaga sosial (Social Institution) dan lembaga komersial (Commercial Institution).',
  },
  {
    id: 6,
    nomor_urut: 6,
    judul: 'Pemberdayaan KUKM & Usaha Bersama',
    deskripsi:
      'Melakukan pemberdayaan Kelompok Usaha Kecil dan Menengah (KUKM) / Kelompok Usaha Bersama BUMDesa dari mulai produksi sampai pemasaran dalam rangka meningkatkan potensi ekonomi masyarakat Desa.',
  },
  {
    id: 7,
    nomor_urut: 7,
    judul: 'Peningkatan Keagamaan & Guru Ngaji',
    deskripsi:
      'Meningkatkan bidang keagamaan melalui peningkatan kualitas Sumber Daya Manusia (SDM) dan kesejahteraan Guru Ngaji serta meningkatkan kualitas sarana peribadatan (Masjid dan Mushola).',
  },
  {
    id: 8,
    nomor_urut: 8,
    judul: 'Pelestarian Seni Budaya Sunda (SPBS)',
    deskripsi:
      'Meningkatkan kegiatan kebudayaan Sunda dalam rangka menunjang Kebudayaan Nasional dengan nilai-nilai luhur dan beradab serta mendukung program Sumedang Puseur Budaya Sunda (SPBS).',
  },
]

const getProfilPageData = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const db = getDB()
    const [imagesRow, visiRow, misiRes] = await Promise.all([
      db
        .prepare(
          'SELECT image_profil_singkat, image_sejarah, image_pokdarwis, whatsapp_1 FROM profil_desa LIMIT 1',
        )
        .first<ProfilImagesRow>(),
      db
        .prepare('SELECT * FROM visi_desa ORDER BY id DESC LIMIT 1')
        .first<VisiRow>(),
      db
        .prepare('SELECT * FROM misi_desa ORDER BY nomor_urut ASC, id ASC')
        .all<MisiRow>(),
    ])

    let parsedPilar: PilarItem[] = defaultPilarBerkah
    if (visiRow?.pilar_json) {
      try {
        const parsed = JSON.parse(visiRow.pilar_json)
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsedPilar = parsed
        }
      } catch {
        parsedPilar = defaultPilarBerkah
      }
    }

    return {
      whatsappNumber: imagesRow?.whatsapp_1 || '6281318375641',
      imageProfilSingkat: imagesRow?.image_profil_singkat ?? null,
      imageSejarah: imagesRow?.image_sejarah ?? null,
      imagePokdarwis: imagesRow?.image_pokdarwis ?? null,
      visi: {
        periode: visiRow?.periode || 'Periode 2019–2024',
        judulVisi: visiRow?.judul_visi || 'BERKAH',
        kutipan:
          visiRow?.kutipan ||
          '“Berkah adalah bertambahnya kebaikan yang terus menerus, baik kebaikan material (duniawi) maupun kebaikan spiritual (Ukhrawi).”',
        pilarList: parsedPilar,
      },
      misiList:
        misiRes.results && misiRes.results.length > 0
          ? misiRes.results
          : defaultMisiList,
    }
  } catch {
    return {
      whatsappNumber: '6281318375641',
      imageProfilSingkat: null,
      imageSejarah: null,
      imagePokdarwis: null,
      visi: {
        periode: 'Periode 2019–2024',
        judulVisi: 'BERKAH',
        kutipan:
          '“Berkah adalah bertambahnya kebaikan yang terus menerus, baik kebaikan material (duniawi) maupun kebaikan spiritual (Ukhrawi).”',
        pilarList: defaultPilarBerkah,
      },
      misiList: defaultMisiList,
    }
  }
})

export const Route = createFileRoute('/profil')({
  loader: async () => await getProfilPageData(),
  component: ProfilPage,
})

const pilarStyles = [
  { badgeBg: 'bg-sky-100 text-sky-700', pilarColor: 'text-sky-600', initialColor: 'text-sky-400' },
  { badgeBg: 'bg-amber-100 text-amber-700', pilarColor: 'text-amber-600', initialColor: 'text-amber-400' },
  { badgeBg: 'bg-emerald-100 text-emerald-700', pilarColor: 'text-emerald-600', initialColor: 'text-emerald-400' },
  { badgeBg: 'bg-[#0f3456] text-white', pilarColor: 'text-sky-600', initialColor: 'text-sky-300' },
  { badgeBg: 'bg-amber-100 text-amber-700', pilarColor: 'text-amber-600', initialColor: 'text-amber-300' },
  { badgeBg: 'bg-emerald-100 text-emerald-700', pilarColor: 'text-emerald-600', initialColor: 'text-emerald-300' },
  { badgeBg: 'bg-sky-100 text-sky-700', pilarColor: 'text-sky-600', initialColor: 'text-sky-400' },
]

function ProfilPage() {
  const {
    imageProfilSingkat,
    imageSejarah,
    imagePokdarwis,
    visi,
    misiList,
    whatsappNumber,
  } = Route.useLoaderData()

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/* HEADER / HERO */}
      <PageHero
        badge="PROFIL DESA WISATA"
        title="Profil Lengkap"
        highlightedTitle="Desa Wisata Karang Pakuan"
        subtitle="Know the Identity, Explore the Potential"
        description="Mengenal lebih dekat sejarah, identitas, potensi alam dan budaya, serta pengelola di balik Desa Wisata Karang Pakuan, Sumedang."
        imageSrc="/images/Heroimage.png"
        bottomFadeColor="#F8FAFC"
      >
        <a
          href="#sejarah-desa"
          className="inline-flex items-center gap-2 bg-[#ea7c1d] hover:bg-[#d66d12] text-white font-sans text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <span>Pelajari Sejarah</span>
          <ChevronDown className="w-4 h-4" />
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}?text=Halo%20Desa%20Wisata%20Karang%20Pakuan,%20saya%20ingin%20bertanya%20tentang%20profil%20dan%20wisata%20desa.`}
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
      {/* 1. PROFIL SINGKAT KARANG PAKUAN */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2.5 mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
              PROFIL DESA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
              Profil Singkat Karang Pakuan
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Visi, potensi, dan keunikan wilayah perbukitan serta pesisir
              Waduk Jatigede.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-5">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-950 shadow-md">
                  {imageProfilSingkat && (
                    <img
                      src={imageProfilSingkat}
                      alt="Harmoni Alam Pegunungan Karang Pakuan"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Autentik &amp; Lestari
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0f3456] leading-snug">
                  Harmoni Alam Pegunungan, Waduk Jatigede, dan Kearifan Lokal
                  Priangan
                </h3>

                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <p>
                    Desa Karangpakuan terletak di Kecamatan Darmaraja, Kabupaten
                    Sumedang, Jawa Barat, dengan karakteristik wilayah
                    perbukitan, lahan pertanian, perkebunan, dan kawasan pesisir
                    Waduk Jatigede. Memiliki luas wilayah sekitar 930 hektare
                    dengan ketinggian 278 mdpl, desa ini terdiri dari dua dusun,
                    yaitu Dusun Ancol dan Dusun Karanganyar, dengan 4 RW dan 25
                    RT, berpenduduk 4.431 jiwa (1.652 KK).
                  </p>
                  <p>
                    Masyarakat Karangpakuan memiliki potensi ekonomi di bidang
                    pertanian, perkebunan, peternakan, perikanan, perdagangan,
                    dan UMKM. Didukung kelembagaan aktif seperti PKK, Karang
                    Taruna, kelompok tani, LPMD, dan Pokdarwis, desa ini terus
                    memajukan potensi lokal secara partisipatif.
                  </p>
                  <p>
                    Keberadaan Waduk Jatigede menjadi daya tarik utama
                    ekowisata, salah satunya melalui Basisir Muda Demang (BMD)
                    dengan wisata pesisir, camping, kuliner, memancing, dan
                    perahu wisata menuju desa wisata berkelanjutan.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-[#0f3456] uppercase">
                    POTENSI ALAM &amp; PERTANIAN
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Wilayah 930 ha perbukitan, agrikultur subur, perkebunan,
                    dan perikanan air tawar Waduk Jatigede.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-[#0f3456] uppercase">
                    WISATA PESISIR &amp; BMD
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Basisir Muda Demang (BMD) menghadirkan spot camping, perahu
                    wisata, kuliner, dan pemancingan.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-[#0f3456] uppercase">
                    PEMBERDAYAAN WARGA
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Sinergi aktif 1.652 KK bersama Pokdarwis, PKK, Karang
                    Taruna, dan UMKM lokal berkelanjutan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEJARAH & IDENTITAS DESA */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
              NILAI &amp; SEJARAH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
              Sejarah &amp; Identitas Desa
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Warisan sejarah dan jati diri Sumedang yang tercermin dalam
              kekayaan budaya, nilai tradisi, serta kearifan lokal yang terus
              dijaga lintas generasi.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-7">
            <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-neutral-950">
              {imageSejarah && (
                <img
                  src={imageSejarah}
                  alt="Pesisir Karang Pakuan"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-emerald-400 uppercase">
                    LANSKAP &amp; KEARIFAN LOKAL
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Pesisir Karang Pakuan
                  </h3>
                </div>
                <span className="px-3.5 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs text-xs text-slate-200">
                  Est. 1929
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Desa Karangpakuan merupakan salah satu desa di Kecamatan
                Darmaraja, Kabupaten Sumedang, Jawa Barat, yang awalnya
                merupakan bagian dari wilayah administratif Desa Cipaku. Seiring
                perkembangan penduduk dan kebutuhan pelayanan pemerintahan,
                muncul aspirasi pemekaran yang dibahas melalui rapat desa pada
                26 September dan 7 November 1979. Hasilnya, wilayah Desa Cipaku
                dimekarkan menjadi tiga desa, yaitu Karangpakuan, Cipaku, dan
                Pakualam. Pemekaran tersebut kemudian disahkan melalui SK Bupati
                Sumedang Nomor 27/Op-440-Pem/Bup/Sk/81 tanggal 31 Januari 1981.
              </p>
              <p>
                Selain sejarah pembentukannya, Karangpakuan juga memiliki
                catatan perjuangan kemerdekaan Indonesia. Pada tahun 1947–1949,
                masyarakat wilayah Cipaku turut berjuang melalui Laskar Rakyat
                di bawah pimpinan Mayor Ribut, Kapten Suparman, Mayor Darsono,
                dan Mayor Salitonga. Perjuangan tersebut meninggalkan kisah
                pengorbanan warga, di antaranya Salinga, Sarya, dan Mayor
                Suroyo. Hingga kini, sejarah tersebut menjadi bagian dari
                identitas Desa Karangpakuan yang menjunjung tinggi nilai
                keberanian, persatuan, gotong royong, dan semangat membangun
                desa.
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 p-5 flex items-center gap-3.5">
              <Quote className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm font-semibold italic text-amber-900">
                Desa Wisata Karangpakuan — Menikmati Alam, Mengenal Budaya, dan
                Merasakan Kehangatan Masyarakat Desa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & PILAR MAKNA (TERHUBUNG DATABASE D1 UNTUK ADMIN CRUD) */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
              VISI &amp; MISI DESA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
              Visi &amp; Misi Desa Karangpakuan
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Arah pembangunan terpadu menuju terwujudnya masyarakat
              Karangpakuan yang mandiri, berkarakter, dan sejahtera lahir batin.
            </p>
          </div>

          {/* Kartu Gelap Visi */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#071f36] via-[#0d3559] to-[#08243f] p-7 sm:p-10 text-white overflow-hidden shadow-lg">
            <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 rounded-full border border-dashed border-white/15" />
            <div className="pointer-events-none absolute right-6 top-6 w-44 h-44 rounded-full border border-amber-400/20" />
            <div className="pointer-events-none absolute right-16 top-16 w-24 h-24 rounded-full border border-emerald-400/25" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[11px] font-bold tracking-wider uppercase text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  VISI DESA KARANGPAKUAN
                </span>

                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {visi.periode} • Est. 1981
                </span>
              </div>

              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
                  — ARAH POKOK PEMBANGUNAN
                </p>
                <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
                  {visi.judulVisi}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {visi.pilarList.map((item, i) => {
                  const style = pilarStyles[i % pilarStyles.length]
                  const rest = item.judul.toLowerCase().startsWith(item.huruf.toLowerCase())
                    ? item.judul.slice(item.huruf.length)
                    : ` ${item.judul}`
                  return (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-medium text-slate-200"
                    >
                      <strong className={`font-bold ${style.initialColor}`}>
                        {item.huruf}
                      </strong>
                      {rest}
                    </span>
                  )
                })}
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4">
                <p className="text-xs sm:text-sm italic text-slate-200">
                  {visi.kutipan}
                </p>
              </div>
            </div>
          </div>

          {/* Daftar Pilar Makna Visi */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0f3456]">
                Tujuh Pilar Makna Visi “{visi.judulVisi}”
              </h3>
              <span className="text-xs font-medium text-slate-400">
                {visi.pilarList.length} Prinsip Dasar
              </span>
            </div>

            <div className="space-y-3">
              {visi.pilarList.map((item, idx) => {
                const style = pilarStyles[idx % pilarStyles.length]
                const nomorPilar = `PILAR ${String(idx + 1).padStart(2, '0')}`
                return (
                  <div
                    key={nomorPilar}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-start gap-4"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 ${style.badgeBg}`}
                    >
                      {item.huruf}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-base text-[#0f3456]">
                          {item.judul}
                        </h4>
                        <span
                          className={`text-[10px] font-bold tracking-wider uppercase ${style.pilarColor}`}
                        >
                          {nomorPilar}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISI DESA KARANGPAKUAN (TERHUBUNG DATABASE D1 UNTUK ADMIN CRUD) */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
                Misi Desa Karangpakuan
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Upaya perwujudan visi pembangunan Desa Karangpakuan tersebut
                akan dicapai melalui {misiList.length} misi prioritas
                pembangunan untuk {visi.periode.toLowerCase()} sebagai berikut:
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-sky-100 text-[#0f3456] text-[11px] font-bold tracking-wider uppercase">
              {misiList.length} AGENDA PRIORITAS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {misiList.map((misi, idx) => {
              const nomorFormatted = String(misi.nomor_urut || idx + 1).padStart(
                2,
                '0',
              )
              return (
                <div
                  key={misi.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0f3456] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {nomorFormatted}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-[#0f3456]">
                      {misi.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {misi.deskripsi}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. POTENSI & KEUNIKAN DESA */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
              POTENSI &amp; KEUNIKAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
              Potensi &amp; Keunikan Desa
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Eksplorasi kekayaan alam, tradisi leluhur, produk lokal, dan
              pengalaman otentik khas Desa Wisata Karang Pakuan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Trees className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0f3456]">
                    Potensi Alam
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pemandangan alam, area hijau, dan sumber daya lokal yang asri
                  terjaga.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {['Bukit Hijau', 'Mata Air Alami', 'Agrowisata'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0f3456]">
                    Potensi Budaya
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tradisi, kesenian, dan kearifan lokal masyarakat yang sarat
                  nilai luhur Sunda.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {['Karawitan Buhun', 'Adat Panggung', 'Tradisi Tutur'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0f3456]">
                    Potensi Ekonomi
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Produk UMKM, kuliner otentik, dan ragam kerajinan tangan lokal
                  warga desa.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {['Kopi Karang', 'Anyaman Bambu', 'Olahan Tahu'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0f3456]">
                    Keunikan Wisata
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pengalaman wisata berbasis alam, edukasi pedesaan, dan
                  keterlibatan komunitas.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {['Live-in Warga', 'Trekking Senja', 'Edukasi Tani'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POKDARWIS & PENGELOLA */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
                PENGELOLA DESA
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
                Pokdarwis &amp; Pengelola
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Kelompok Sadar Wisata Karang Pakuan yang mengabdi secara
                profesional bersama pemerintah desa dan masyarakat lokal.
              </p>
            </div>

            <a
              href="#informasi-kontak"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-colors self-start md:self-auto"
            >
              <span>Informasi Lokasi &amp; Kontak</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-neutral-950">
              {imagePokdarwis && (
                <img
                  src={imagePokdarwis}
                  alt="Sinergi Bersama Pokdarwis Karang Pakuan"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-emerald-400 uppercase">
                    KOLABORASI KOMUNITAS &amp; DESA
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Sinergi Bersama Pokdarwis Karang Pakuan
                  </h3>
                </div>
                <span className="px-3.5 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs text-xs text-slate-200">
                  Komunitas Mandiri
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Pokdarwis Tembong Agung merupakan organisasi masyarakat Desa
              Karangpakuan yang disahkan pada 5 April 2024 melalui SK Kepala
              DISPARBUDPORA Kabupaten Sumedang Nomor 06 Tahun 2024. Pokdarwis
              berperan sebagai penggerak pengembangan pariwisata, pemberdayaan
              masyarakat, penerapan Sapta Pesona, serta pelestarian lingkungan.
              Pengelolaan Desa Wisata Karangpakuan dilakukan melalui kolaborasi
              Pemerintah Daerah, DISPARBUDPORA, Pemerintah Desa, BUMDes Medal
              Pakuan, dan Pokdarwis Tembong Agung. Pengembangan wisata mencakup
              destinasi alam dan ziarah, pemberdayaan UMKM lokal, wisata
              edukasi, paket wisata Karangpakuan Bites dan Karangpakuan Budaya,
              serta event tahunan seperti Parade Perahu dan Munggahan. Melalui
              sinergi tersebut, Pokdarwis berperan dalam pengembangan potensi
              wisata, sedangkan pengelola BMD menjalankan operasional dan
              pelayanan wisata untuk mendukung pariwisata berkelanjutan serta
              perekonomian masyarakat desa.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}