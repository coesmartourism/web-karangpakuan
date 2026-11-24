import { Link } from '@tanstack/react-router'

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.459 3.473 1.331 4.985L2 22l5.188-1.361a9.93 9.93 0 0 0 4.843 1.258h.004c5.515 0 9.969-4.454 9.969-9.969A9.914 9.914 0 0 0 19.08 4.92 9.908 9.908 0 0 0 12.031 2zm5.822 14.129c-.246.693-1.434 1.326-1.988 1.408-.506.075-1.147.107-1.851-.117-.427-.136-.975-.318-1.676-.621-2.952-1.275-4.88-4.248-5.027-4.444-.147-.196-1.201-1.598-1.201-3.048 0-1.45.76-2.163 1.03-2.458.27-.295.59-.369.786-.369.196 0 .393.002.565.01.181.009.424-.069.663.506.246.591.836 2.041.91 2.189.073.147.122.319.024.516-.098.196-.147.319-.295.491-.147.172-.309.384-.442.516-.147.147-.301.307-.129.602.172.295.763 1.259 1.639 2.039 1.126 1.004 2.075 1.315 2.37 1.463.295.147.467.123.639-.074.172-.196.737-.86.934-1.155.196-.295.393-.246.663-.147.27.098 1.72.811 2.015.959.295.147.491.221.565.344.074.123.074.713-.172 1.406z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      id="informasi-kontak"
      className="bg-[#0b0f17] text-slate-300 border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* KOLOM 1: IDENTITAS & SOSIAL MEDIA (4 kolom) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                {/* <img src="/images/logo.png" alt="Logo Karangpakuan" className="w-9 h-9 object-contain" /> */}
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide leading-tight">
                  DESA WISATA
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-amber-400 uppercase mt-0.5">
                  KARANGPAKUAN • SUMEDANG
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Kawasan desa wisata di Kabupaten Sumedang yang memadukan keindahan
              panorama alam, kekayaan tradisi budaya, dan kenyamanan rekreasi
              keluarga.
            </p>

            {/* Lingkaran Sosial Media */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/basisirmudademang"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Desa Wisata Karangpakuan"
                className="w-10 h-10 rounded-full border border-slate-700/80 bg-slate-900/60 hover:border-amber-400/60 hover:text-amber-400 text-slate-300 flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.tiktok.com/@basisirmudademang_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Desa Wisata Karangpakuan"
                className="w-10 h-10 rounded-full border border-slate-700/80 bg-slate-900/60 hover:border-amber-400/60 hover:text-amber-400 text-slate-300 flex items-center justify-center transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/6281318375641"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Desa Wisata Karangpakuan"
                className="w-10 h-10 rounded-full border border-slate-700/80 bg-slate-900/60 hover:border-amber-400/60 hover:text-amber-400 text-slate-300 flex items-center justify-center transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* KOLOM 2: NAVIGASI (2 kolom) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
              NAVIGASI
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/profil" className="hover:text-amber-400 transition-colors">
                    Profil
                </Link>
              </li>
              <li>
                <a
                  href="#paket-wisata"
                  className="hover:text-amber-400 transition-colors"
                >
                  Destinasi
                </a>
              </li>
              <li>
                <a
                  href="#produk-lokal"
                  className="hover:text-amber-400 transition-colors"
                >
                  Produk Lokal
                </a>
              </li>
              <li>
                <a
                  href="#informasi-kontak"
                  className="hover:text-amber-400 transition-colors"
                >
                  Informasi & Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: KONTAK (3 kolom) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
              KONTAK
            </h3>

            <div className="space-y-4 text-sm">
              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    WHATSAPP
                  </p>
                  <div className="mt-1 space-y-0.5 text-slate-200">
                    <a
                      href="https://wa.me/6281318375641"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-amber-400 transition-colors"
                    >
                      +62 813 1837 5641
                    </a>
                    <a
                      href="https://wa.me/6285222028706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-amber-400 transition-colors"
                    >
                      +62 852 2202 8706
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3">
                <InstagramIcon className="w-4 h-4 text-pink-400 mt-1 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    INSTAGRAM
                  </p>
                  <a
                    href="https://instagram.com/basisirmudademang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-slate-200 hover:text-amber-400 transition-colors"
                  >
                    @basisirmudademang
                  </a>
                </div>
              </div>

              {/* TikTok */}
              <div className="flex items-start gap-3">
                <TikTokIcon className="w-4 h-4 text-slate-200 mt-1 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    TIKTOK
                  </p>
                  <a
                    href="https://tiktok.com/@basisirmudademang_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-slate-200 hover:text-amber-400 transition-colors"
                  >
                    @basisirmudademang_
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM 4: LOKASI & EMBED PETA (3 kolom) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
              LOKASI
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Karangpakuan, Kec. Darmaraja, Kabupaten Sumedang, Jawa Barat 45372
            </p>

            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <iframe
                title="Lokasi Desa Wisata Karangpakuan"
                src="https://maps.google.com/maps?q=Wisata%20Karang%20Pakuan%20Darmaraja%20Sumedang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-36 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* GARIS BAWAH HAK CIPTA */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Desa Wisata Karangpakuan, Sumedang. Hak
            Cipta Dilindungi.
          </p>
          <p>Dikelola oleh Pokdarwis & Pemerintah Desa Karangpakuan</p>
        </div>
      </div>
    </footer>
  )
}