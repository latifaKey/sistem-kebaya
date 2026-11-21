import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../../data/financialData';

export function Navbar({ activeTab, setActiveTab, currentMode, setCurrentMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'catalog', label: 'Katalog Koleksi' },
    { id: 'appointment', label: 'Janji Temu Fitting' },
    { id: 'terms', label: 'Panduan Sewa' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name (Left) */}
          <div 
            onClick={() => {
              if (currentMode !== 'client') setCurrentMode('client');
              setActiveTab('catalog');
            }}
            className="cursor-pointer group flex items-center gap-3.5 select-none"
          >
            <div className="relative">
              <img 
                src="/images/logo_bywazu.png" 
                alt="Bywazu Attire" 
                className="w-12 h-12 rounded-full object-cover ring-1 ring-stone-200/80 shadow-xs group-hover:scale-105 transition-transform bg-[#F4F0EB]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-[26px] font-semibold tracking-wider text-stone-900 group-hover:text-[#7A1C30] transition-colors leading-none">
                Bywazu Attire
              </span>
              <span className="text-[9px] tracking-[0.26em] uppercase text-stone-400 font-sans font-medium mt-1">
                Modern Kebaya & Atelier &bull; Mojokerto
              </span>
            </div>
          </div>

          {/* Center Navigation - Single Unified Minimal Floating Segment Bar */}
          {currentMode === 'client' && (
            <nav className="hidden lg:flex items-center p-1 bg-stone-100/80 backdrop-blur-sm rounded-full border border-stone-200/60 shadow-2xs">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#7A1C30] text-white shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                  >
                    {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-200' : 'text-stone-400'}`} />}
                    <span>{item.label}</span>
                    {item.count > 0 && (
                      <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-[#7A1C30]'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Area - Obvious Studio Admin Switch & Consultation */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* Clear & Obvious Studio Admin Button */}
            <button
              onClick={() => setCurrentMode('admin')}
              className="btn-glass px-3.5 py-2 rounded-full text-xs font-semibold text-stone-700 hover:text-[#7A1C30] flex items-center gap-1.5 border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              title="Beralih ke Dashboard Web Admin Studio"
            >
              <ShieldCheck className="w-4 h-4 text-[#7A1C30] group-hover:scale-110 transition-transform" />
              <span>Studio Admin</span>
            </button>

            {currentMode === 'client' && (
              <a
                href={`https://api.whatsapp.com/send?phone=${STUDIO_CONFIG.whatsappNumber}&text=Halo%20Admin%20Bywazu%20Attire,%20saya%20ingin%20konsultasi%20sewa%20kebaya`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex btn-glass-primary px-4 py-2 rounded-full text-xs font-semibold shadow-xs items-center gap-1.5 hover:shadow-md transition-all cursor-pointer"
              >
                <span>Konsultasi Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            )}

            {/* Mobile Hamburger Toggle */}
            {currentMode === 'client' && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && currentMode === 'client' && (
        <div className="lg:hidden border-t border-stone-200 bg-white/95 backdrop-blur-xl px-4 py-3 space-y-1 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#7A1C30] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-[#7A1C30]'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-stone-100 space-y-2">
            <button
              onClick={() => {
                setCurrentMode('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-[#7A1C30]/30 text-[#7A1C30] bg-rose-50/80 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#7A1C30]" />
              <span>Buka Dashboard Studio Admin</span>
            </button>

            <a
              href={`https://api.whatsapp.com/send?phone=${STUDIO_CONFIG.whatsappNumber}&text=Halo%20Admin%20Bywazu%20Attire,%20saya%20ingin%20konsultasi%20sewa%20kebaya`}
              target="_blank"
              rel="noreferrer"
              className="w-full btn-glass-primary py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>Konsultasi Studio via WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
