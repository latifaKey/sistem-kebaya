import React from 'react';
import { STUDIO_CONFIG } from '../../data/financialData';
import { Phone, MapPin, Heart, Globe, Camera } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo_bywazu.png"
                alt="Logo Bywazu Attire"
                className="w-10 h-10 object-contain rounded-full bg-white/10 p-1"
              />
              <h3 className="font-serif text-2xl font-bold tracking-wider text-white">
                {STUDIO_CONFIG.name}
              </h3>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Sewa Kebaya Modern, Wisuda, Lamaran, & Prewedding di Mojokerto dengan fasilitas Free Resize, Free Laundry, dan layanan fitting studio 1-on-1.
            </p>
            <div className="flex items-center gap-3 text-stone-400">
              <a
                href={STUDIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-300 transition-colors flex items-center gap-1.5 text-xs"
                title="Instagram @bywazu.attire"
              >
                <Camera className="w-4 h-4 text-rose-300" />
                <span>{STUDIO_CONFIG.instagram}</span>
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${STUDIO_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Studio Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-200">
              Studio & Fitting
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{STUDIO_CONFIG.address}</span>
              </li>
              <li>{STUDIO_CONFIG.openingHours}</li>
              <li className="text-emerald-400 font-medium">Free Resize & Free Laundry</li>
              <li>Pengiriman Luar Kota: Seluruh Jawa, Madura, Bali (Paxel / JNE)</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-200">
              Koleksi Unggulan
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Ariana Series & Rose Gold Couture</li>
              <li>Selena Burgundy Luxury Set</li>
              <li>Ginela Maroon & Alara Sage</li>
              <li>Janggan Modern & Couple Sets</li>
            </ul>
          </div>

          {/* Layanan Unggulan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-200">
              Layanan Unggulan
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Free Fitting 1-on-1 di Studio</li>
              <li>Free Penyesuaian Ukuran Badan (Resize)</li>
              <li>Free Laundry & Dry Clean Pasca Sewa</li>
              <li>Pengiriman Kilat Paxel & JNE YES</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>&copy; 2026 {STUDIO_CONFIG.name}. Seluruh Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>untuk Magang Pengembangan Sistem Kebaya Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
