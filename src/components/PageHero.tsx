import type { ReactNode } from 'react'

interface PageHeroProps {
  badge?: string
  title: string
  highlightedTitle?: string
  subtitle?: string
  description?: string
  imageSrc?: string
  bottomFadeColor?: string
  children?: ReactNode
}

export function PageHero({
  badge = 'KARANG PAKUAN SUMEDANG',
  title,
  highlightedTitle,
  subtitle,
  description,
  imageSrc = '/images/Heroimage.png',
  bottomFadeColor = '#F8FAFC',
  children,
}: PageHeroProps) {
  return (
    <section className="relative w-full min-h-[88vh] sm:min-h-[760px] flex items-center justify-center overflow-hidden bg-[#06182c]">
      {/* Foto Latar Belakang */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay Biru Gelap Khas Karang Pakuan */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6, 24, 44, 0.82) 0%, rgba(11, 38, 68, 0.62) 48%, rgba(16, 48, 82, 0.35) 76%, rgba(248, 250, 252, 0.92) 94%, #F8FAFC 100%)',
        }}
      />

      {/* Konten Utama di Tengah */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 pb-24 flex flex-col items-center">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#FFD124]">
              {badge}
            </span>
          </div>
        )}

        {/* Judul Utama (Playfair Display, 60px) */}
        <h1 className="font-serif font-medium text-4xl sm:text-5xl md:text-[60px] md:leading-[64px] tracking-normal text-white drop-shadow-sm">
          <span className="block">{title}</span>
          {highlightedTitle && (
            <span className="block italic text-[#FFD124] mt-1">
              {highlightedTitle}
            </span>
          )}
        </h1>

        {/* Teks Keterangan (Plus Jakarta Sans, 18px, line-height 28px, #F1F5F9 90%) */}
        {(subtitle || description) && (
          <div className="mt-5 max-w-[580px] font-sans text-base sm:text-[18px] leading-[28px] text-[#F1F5F9]/90">
            {subtitle && (
              <p className="font-semibold text-white">{subtitle}</p>
            )}
            {description && <p className="mt-0.5 font-normal">{description}</p>}
          </div>
        )}

        {/* Slot Tombol CTA */}
        {children && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            {children}
          </div>
        )}
      </div>

      {/* Gradien Bawah Tambahan agar Transisi ke Section Berikutnya Super Mulus */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background: `linear-gradient(to bottom, transparent, ${bottomFadeColor})`,
        }}
      />
    </section>
  )
}