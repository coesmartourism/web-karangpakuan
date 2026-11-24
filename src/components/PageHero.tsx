import type { ReactNode } from 'react'

interface PageHeroProps {
  badge?: string
  title: string
  highlightedTitle?: string
  subtitle?: string
  description?: string
  imageSrc?: string
  children?: ReactNode
  minHeightClass?: string
}

export function PageHero({
  badge = 'KARANG PAKUAN SUMEDANG',
  title,
  highlightedTitle,
  subtitle,
  description,
  imageSrc = '/images/Heroimage.png',
  children,
  minHeightClass = 'min-h-[88vh]',
}: PageHeroProps) {
  return (
    <section
      className={`relative w-full ${minHeightClass} flex items-center justify-center overflow-hidden pt-24 pb-28`}
    >
      {/* Foto Background Hero */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Lapisan Linear Gradient Persis Spesifikasi Figma */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(7, 31, 54, 0.72) 0%, rgba(14, 56, 96, 0.45) 45%, rgba(10, 48, 80, 0.65) 70%, rgba(248, 250, 252, 1) 100%)',
        }}
      />

      {/* Konten Teks & Tombol Hero */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-slate-100 uppercase">
              {badge}
            </span>
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
          {title}
          {highlightedTitle && (
            <span className="block font-serif italic font-semibold text-amber-400 mt-1">
              {highlightedTitle}
            </span>
          )}
        </h1>

        {subtitle && (
          <p className="mt-5 text-sm sm:text-base font-semibold text-white tracking-wide">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="mt-2 text-sm sm:text-base text-slate-200/95 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}