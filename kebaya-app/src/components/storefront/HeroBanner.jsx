import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Award, CalendarDays, Sparkles } from 'lucide-react';

export function HeroBanner({ onExploreCatalog, onOpenAppointment }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF9F8] via-[#FAF3F2] to-[#FAF7F5] pt-12 pb-20 border-b border-[#F0E2E5]">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full btn-glass text-[#7A1C30] text-[11px] font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C30]" />
              <span>Bywazu Attire &bull; Persewaan Kebaya Modern Mojokerto</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.15]">
              Sewa Kebaya Modern, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#7A1C30]">Sempurna</span> di Hari Kelulusan & Lamaran.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Menyewakan berbagai model kebaya modern & kutubaru premium untuk wisuda, lamaran, dan formal di Mojokerto. Lengkap dengan fasilitas <strong>Free Resize</strong>, <strong>Free Laundry</strong>, dan layanan fitting studio 1-on-1.
            </p>

            {/* CTA Buttons with Glassmorphism */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-8 py-4 rounded-full btn-glass-primary font-semibold text-sm shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Jelajahi Katalog Bywazu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto px-8 py-4 rounded-full btn-glass text-[#7A1C30] font-semibold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarDays className="w-4 h-4 text-[#7A1C30]" />
                <span>Jadwalkan Janji Temu Fitting</span>
              </button>
            </div>

            {/* Trust Badges matching Bywazu */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-rose-200/60 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#7A1C30]">Free</p>
                <p className="text-[10px] sm:text-xs text-stone-500 font-medium">Resize Custom Ukuran</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#7A1C30]">1-on-1</p>
                <p className="text-[10px] sm:text-xs text-stone-500 font-medium">Fitting Studio Mojokerto</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#7A1C30]">Free</p>
                <p className="text-[10px] sm:text-xs text-stone-500 font-medium">Laundry Terima Bersih</p>
              </div>
            </div>

          </div>

          {/* Right Visual Column (Showcase Card with Bywazu Photography) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">

              {/* Main Visual Image Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-white group">
                <div className="relative aspect-4/5 overflow-hidden">
                  <img
                    src="/images/bywazu/bywazu_ariana_rose_gold.jpg"
                    alt="Model Kebaya Bywazu Attire"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

                  {/* Floating Tags - Glass style */}
                  <div className="absolute top-4 left-4 btn-glass px-3 py-1 rounded-full text-[11px] font-semibold text-[#7A1C30] tracking-wide uppercase">
                    Bywazu Best-Seller
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-widest text-rose-200 font-medium">Koleksi Terpopuler</p>
                    <h3 className="font-serif text-xl font-bold">Ariana Rose Gold &bull; BWZ-01</h3>
                    <p className="text-xs text-stone-200 mt-1">Disewa 32x &bull; Rating 5.0/5.0 &bull; All Include Set</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
