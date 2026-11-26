import { useState, useEffect, useRef } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown, Moon, Sun, Menu, X } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isDestinasiActive = ['/destinasi', '/paket-wisata', '/galeri'].includes(
    pathname,
  )

  // Deteksi scroll untuk mengubah background transparan -> putih
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tutup dropdown jika klik di luar area menu Destinasi
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return next
    })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* KIRI: LOGO & IDENTITAS DESA */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all ${
              isScrolled
                ? 'bg-sky-900 text-white shadow-sm'
                : 'bg-white text-sky-950 shadow-md'
            }`}
          />

          <div className="flex flex-col">
            <span
              className={`font-serif font-bold text-lg sm:text-xl tracking-wide leading-tight transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              DESA WISATA
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase mt-0.5 transition-colors ${
                isScrolled ? 'text-slate-500' : 'text-slate-200'
              }`}
            >
              KARANG PAKUAN • SUMEDANG
            </span>
          </div>
        </Link>

        {/* TENGAH: MENU NAVIGASI DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* Beranda */}
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="relative py-1.5 transition-colors"
          >
            {({ isActive }) => (
              <>
                <span
                  className={
                    isActive
                      ? isScrolled
                        ? 'text-slate-900 font-semibold'
                        : 'text-white font-semibold'
                      : isScrolled
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-200 hover:text-white'
                  }
                >
                  Beranda
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-sky-400 rounded-full" />
                )}
              </>
            )}
          </Link>

          {/* Profil */}
          <Link to="/profil" className="relative py-1.5 transition-colors">
            {({ isActive }) => (
              <>
                <span
                  className={
                    isActive
                      ? isScrolled
                        ? 'text-slate-900 font-semibold'
                        : 'text-white font-semibold'
                      : isScrolled
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-200 hover:text-white'
                  }
                >
                  Profil
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-sky-400 rounded-full" />
                )}
              </>
            )}
          </Link>

          {/* Destinasi (Klik ke /destinasi + Buka Dropdown) */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              to="/destinasi"
              onClick={() => setIsDropdownOpen(true)}
              className="relative inline-flex items-center gap-1.5 py-1.5 transition-colors"
            >
              <span
                className={
                  isDestinasiActive
                    ? isScrolled
                      ? 'text-slate-900 font-semibold'
                      : 'text-white font-semibold'
                    : isScrolled
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-200 hover:text-white'
                }
              >
                Destinasi
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                } ${
                  isDestinasiActive
                    ? isScrolled
                      ? 'text-slate-900'
                      : 'text-white'
                    : isScrolled
                      ? 'text-slate-600'
                      : 'text-slate-200'
                }`}
              />
              {isDestinasiActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-sky-400 rounded-full" />
              )}
            </Link>

            {isDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-48 z-50">
                <div
                  className={`rounded-2xl backdrop-blur-md border shadow-xl py-2 overflow-hidden ${
                    isScrolled
                      ? 'bg-white/95 border-slate-200/80'
                      : 'bg-[#0b192c]/95 border-white/15'
                  }`}
                >
                  <Link
                    to="/paket-wisata"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      isScrolled
                        ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Paket Wisata
                  </Link>
                  <Link
                    to="/galeri"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      isScrolled
                        ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Galeri
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Produk Lokal */}
          <a
            href="#produk-lokal"
            className={`relative py-1.5 transition-colors ${
              isScrolled
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            Produk Lokal
          </a>

          {/* Informasi & Kontak */}
          <a
            href="#informasi-kontak"
            className={`relative py-1.5 transition-colors ${
              isScrolled
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            Informasi & Kontak
          </a>
        </nav>

        {/* KANAN: TOMBOL DARK MODE SAJA */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={toggleTheme}
            title="Ganti Tema"
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              isScrolled
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15 backdrop-blur-sm'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* TOMBOL HAMBURGER MOBILE */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isScrolled
              ? 'text-slate-800 hover:bg-slate-100'
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Buka Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* MENU DROPDOWN MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg px-4 pt-3 pb-5 space-y-1">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Beranda
          </Link>
          <Link
            to="/profil"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Profil
          </Link>
          <div className="px-3 py-2">
            <Link
              to="/destinasi"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-800 hover:text-sky-700 mb-1.5"
            >
              Destinasi
            </Link>
            <div className="pl-3 space-y-1 border-l-2 border-slate-200">
              <Link
                to="/paket-wisata"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-slate-700 hover:text-sky-700"
              >
                Paket Wisata
              </Link>
              <Link
                to="/galeri"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-slate-700 hover:text-sky-700"
              >
                Galeri
              </Link>
            </div>
          </div>
          <a
            href="#produk-lokal"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Produk Lokal
          </a>
          <a
            href="#informasi-kontak"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Informasi & Kontak
          </a>

          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center px-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 text-slate-800 border border-slate-200"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}