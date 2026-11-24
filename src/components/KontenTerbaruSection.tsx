import { ArrowUpRight, Play } from 'lucide-react'

export interface InstagramPostItem {
  id: number
  imageUrl?: string | null
  postUrl: string
  caption: string
  isCarousel?: boolean
}

export interface TikTokPostItem {
  id: number
  thumbnailUrl?: string | null
  videoUrl: string
  views: string
  title: string
}

interface KontenTerbaruProps {
  instagramPosts?: InstagramPostItem[]
  tiktokPosts?: TikTokPostItem[]
}

const defaultInstagramPosts: InstagramPostItem[] = [
  { id: 1, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'Postingan Instagram 1', isCarousel: true },
  { id: 2, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'Postingan Instagram 2', isCarousel: true },
  { id: 3, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'Postingan Instagram 3', isCarousel: true },
  { id: 4, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'Postingan Instagram 4', isCarousel: true },
  { id: 5, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'Postingan Instagram 5', isCarousel: true },
  { id: 6, imageUrl: null, postUrl: 'https://instagram.com/basisirmudademang', caption: 'Postingan Instagram 6', isCarousel: true },
]

const defaultTikTokPosts: TikTokPostItem[] = [
  { id: 1, thumbnailUrl: null, videoUrl: 'https://www.tiktok.com/@basisirmudademang_', views: '12,4 rb', title: 'Video TikTok 1' },
  { id: 2, thumbnailUrl: null, videoUrl: 'https://www.tiktok.com/@basisirmudademang_', views: '8,7 rb', title: 'Video TikTok 2' },
  { id: 3, thumbnailUrl: null, videoUrl: 'https://www.tiktok.com/@basisirmudademang_', views: '15,1 rb', title: 'Video TikTok 3' },
]

export function KontenTerbaruSection({
  instagramPosts = defaultInstagramPosts,
  tiktokPosts = defaultTikTokPosts,
}: KontenTerbaruProps) {
  return (
    <section id="galeri" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-sky-100 text-[#0f3456]">
            RAGAM PENGALAMAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3456]">
            Konten Terbaru
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Konten terbaru dari Instagram &amp; TikTok Desa Wisata Karang Pakuan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* KARTU INSTAGRAM */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">Instagram</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">@desawisatakarangpakuan</p>
                </div>
              </div>

              <a
                href="https://instagram.com/basisirmudademang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#0f3456] hover:bg-[#164775] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full transition-colors"
              >
                <span>Kunjungi di Instagram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {instagramPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-950 block"
                >
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  {post.isCarousel && (
                    <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-white/15 backdrop-blur-xs text-white flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                        <rect width="18" height="18" x="3" y="3" rx="4" />
                        <circle cx="12" cy="12" r="3.5" />
                      </svg>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* KARTU TIKTOK */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-slate-950 flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">TikTok</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">@desawisatakarangpakuan</p>
                </div>
              </div>

              <a
                href="https://www.tiktok.com/@basisirmudademang_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#0f3456] hover:bg-[#164775] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full transition-colors"
              >
                <span>Kunjungi di TikTok</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {tiktokPosts.map((video) => (
                <a
                  key={video.id}
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-950 block"
                >
                  {video.thumbnailUrl && (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-xs border border-white/25 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white text-xs font-medium">
                    <Play className="w-3 h-3 fill-white" />
                    <span>{video.views}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}