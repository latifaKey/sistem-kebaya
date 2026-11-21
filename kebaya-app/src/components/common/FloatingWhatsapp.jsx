import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STUDIO_CONFIG } from '../../data/financialData';

export function FloatingWhatsapp() {
  const waUrl = `https://api.whatsapp.com/send?phone=${STUDIO_CONFIG.whatsappNumber}&text=Halo%20Admin%20Bywazu%20Attire,%20saya%20ingin%20tanya%20seputar%20katalog%20sewa%20kebaya%20dan%20fitting%20studio%20Mojokerto.`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 btn-glass-dark p-3.5 rounded-full shadow-2xl flex items-center gap-2.5 group transition-all hover:scale-105 cursor-pointer"
      title="Hubungi Admin Studio via WhatsApp"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
      <MessageCircle className="w-5 h-5 text-emerald-400" />
      <span className="hidden sm:inline-block text-xs font-semibold pr-1 text-white">
        WhatsApp Studio
      </span>
    </a>
  );
}
