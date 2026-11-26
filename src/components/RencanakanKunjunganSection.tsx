import { MapPin, Zap, Clock, ExternalLink } from 'lucide-react'

interface RencanakanKunjunganProps {
  waNumber?: string
}

export function RencanakanKunjunganSection({
  waNumber = '6281318375641',
}: RencanakanKunjunganProps) {
  return (
    <section className="pt-12 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12">
          {/* Kiri (7 kolom): Info Perjalanan & Banner WhatsApp */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-8">
            <div className="space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100/80 border border-sky-200/80 text-[#0f3456]">
                PANDUAN PERJALANAN
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f3456] tracking-tight">
                Rencanakan Kunjungan Anda
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Rencanakan liburan impianmu sekarang dan nikmati keasrian waduk,
                budaya lokal, serta pengalaman wisata autentik di Desa Karang
                Pakuan.
              </p>
            </div>

            {/* 3 Kartu Info (Ikon sejajar di samping judul atas) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/70 text-sky-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-sky-600 uppercase whitespace-nowrap">
                      KAWASAN WISATA
                    </p>
                    <h3 className="text-[15px] font-bold text-[#0f3456] leading-snug mt-0.5">
                      Lokasi Strategis
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Desa Karang Pakuan, Kec. Darmaraja, Kab. Sumedang, Jawa Barat.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-emerald-600 uppercase whitespace-nowrap">
                      AKSES CEPAT
                    </p>
                    <h3 className="text-[15px] font-bold text-[#0f3456] leading-snug mt-0.5">
                      Akses Tempuh
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hanya 30 menit dari pusat Kota Sumedang, dengan akses jalan
                  yang mudah.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-amber-600 uppercase whitespace-nowrap">
                      WAKTU LAYANAN
                    </p>
                    <h3 className="text-[15px] font-bold text-[#0f3456] leading-snug mt-0.5">
                      Jam Operasional
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Buka Setiap Hari: 08.00 – 17.00 WIB (Spot Sunset s/d 18.00
                  WIB)
                </p>
              </div>
            </div>

            {/* Banner Gelap Reservasi WhatsApp */}
            <div className="rounded-2xl bg-[#0b192c] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-2 max-w-md">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/10 text-amber-400">
                  LAYANAN RESERVASI &amp; INFO CEPAT
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Siap Berkunjung ke Karang Pakuan?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dapatkan penawaran paket wisata terbaik, panduan parkir
                  perahu, dan jadwal festival terbaru.
                </p>
              </div>

              <a
                href={`https://wa.me/${waNumber}?text=Halo%20Desa%20Wisata%20Karang%20Pakuan,%20saya%20ingin%20melakukan%20reservasi%20kunjungan.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs sm:text-sm font-bold px-5 py-3.5 rounded-full shadow-lg shrink-0 transition-colors"
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
                <span>CHAT VIA WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Kanan (5 kolom): Maps Desa Wisata Karang Pakuan */}
          <div className="lg:col-span-5 relative min-h-[380px] bg-slate-800 flex items-center justify-center">
            <iframe
              title="Peta Desa Wisata Karang Pakuan"
              src="https://maps.google.com/maps?q=Wisata%20Karang%20Pakuan%20Darmaraja%20Sumedang&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0 opacity-75"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-[#0b192c]/45 pointer-events-none" />

            <div className="relative z-10 text-center px-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#ea7c1d] text-white flex items-center justify-center mx-auto shadow-lg ring-4 ring-white/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white drop-shadow">
                  Desa Wisata Karang Pakuan
                </h3>
                <p className="text-xs text-slate-200 mt-0.5">
                  Desa Karang Pakuan, Kabupaten Sumedang, Jawa Barat
                </p>
              </div>
              <div className="pt-1">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Wisata+Karang+Pakuan+Darmaraja+Sumedang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0f3456] text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-colors"
                >
                  <span>BUKA DI GOOGLE MAPS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}