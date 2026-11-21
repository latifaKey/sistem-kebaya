import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  Shirt,
  CalendarDays,
  Boxes,
  RefreshCw,
  CalendarCheck,
  ClipboardList,
  Users,
  Receipt,
  FileText,
  CreditCard,
  TrendingDown,
  LineChart,
  FileSpreadsheet,
  History,
  Settings,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  X
} from 'lucide-react';
import { STUDIO_CONFIG } from '../../data/financialData';

export function AdminLayout({ activePage, setActivePage, onExitToClient, unpaidCount, children }) {
  // Sidebar open/close state (Default open)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Curated Luxury Color Themes for Sidebar (Soft, colored, not stark white & not muddy red)
  const [sidebarTheme, setSidebarTheme] = useState('dusty-rose');

  const themes = {
    'dusty-rose': {
      id: 'dusty-rose',
      label: 'Dusty Rose Silk',
      asideBg: 'bg-[#EDE1E4] border-[#DEC5CC]',
      headerBg: 'bg-[#E5D5D9] border-[#D8C2C7]',
      textColor: 'text-[#2D1B22]',
      inactiveText: 'text-[#5C414A] hover:text-[#7A1C30] hover:bg-white/60',
      activeBtn: 'bg-[#7A1C30] text-white shadow-xs',
      categoryColor: 'text-[#876570]',
      dividerColor: 'bg-[#D9C4C9]',
      badgeActive: 'bg-white/20 text-white',
      badgeInactive: 'bg-white/90 text-[#7A1C30] border border-[#D9C4C9]',
      bottomBg: 'bg-[#E3D2D6] border-[#D5BFC5]',
      dotBg: 'bg-[#EDE1E4]'
    },
    'espresso': {
      id: 'espresso',
      label: 'Velvet Espresso',
      asideBg: 'bg-[#221B1E] border-[#382B30]',
      headerBg: 'bg-[#1C1618] border-[#382B30]',
      textColor: 'text-[#F5ECF0]',
      inactiveText: 'text-[#B8A4AB] hover:text-white hover:bg-white/10',
      activeBtn: 'bg-[#8F233B] text-white shadow-xs',
      categoryColor: 'text-[#947E85]',
      dividerColor: 'bg-[#382B30]',
      badgeActive: 'bg-white/20 text-white',
      badgeInactive: 'bg-[#8F233B] text-white',
      bottomBg: 'bg-[#1A1416] border-[#382B30]',
      dotBg: 'bg-[#221B1E]'
    },
    'cashmere': {
      id: 'cashmere',
      label: 'Warm Cashmere',
      asideBg: 'bg-[#EFE7E0] border-[#DECFC4]',
      headerBg: 'bg-[#E6DCD3] border-[#D6C7BB]',
      textColor: 'text-[#2C231C]',
      inactiveText: 'text-[#5C4E43] hover:text-[#7A1C30] hover:bg-white/60',
      activeBtn: 'bg-[#7A1C30] text-white shadow-xs',
      categoryColor: 'text-[#8C7A6E]',
      dividerColor: 'bg-[#DAC9BC]',
      badgeActive: 'bg-white/20 text-white',
      badgeInactive: 'bg-white/90 text-[#7A1C30] border border-[#DAC9BC]',
      bottomBg: 'bg-[#E4D9CE] border-[#D4C3B5]',
      dotBg: 'bg-[#EFE7E0]'
    }
  };

  const currentTheme = themes[sidebarTheme] || themes['dusty-rose'];

  // Grouped Navigation matching the exact user-approved design from Image 1
  const menuGroups = [
    {
      category: 'Utama',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'notifications', label: 'Notifikasi', icon: Bell, badge: unpaidCount },
      ]
    },
    {
      category: 'Operasional Sewa',
      items: [
        { id: 'rental-calendar', label: 'Kalender Booking', icon: CalendarCheck },
        { id: 'bookings', label: 'Data Booking', icon: ClipboardList },
        { id: 'appointment-admin', label: 'Jadwal Janji Temu', icon: CalendarDays },
        { id: 'customers', label: 'Pelanggan (CRM)', icon: Users },
      ]
    },
    {
      category: 'Inventaris & Atelier',
      items: [
        { id: 'catalog-admin', label: 'Katalog Kebaya', icon: Shirt },
        { id: 'inventory', label: 'Status Inventaris', icon: Boxes },
        { id: 'maintenance', label: 'Maintenance & Laundry', icon: RefreshCw },
      ]
    },
    {
      category: 'Keuangan & Laporan',
      items: [
        { id: 'transactions', label: 'Transaksi', icon: Receipt },
        { id: 'invoices', label: 'Invoice Generator', icon: FileText },
        { id: 'payments', label: 'Pembayaran', icon: CreditCard },
        { id: 'expenses', label: 'Pengeluaran', icon: TrendingDown },
        { id: 'bep-analysis', label: 'Analisis BEP & ROI', icon: LineChart },
        { id: 'reports', label: 'Laporan', icon: FileSpreadsheet },
      ]
    },
    {
      category: 'Sistem',
      items: [
        { id: 'logs', label: 'Activity Log', icon: History },
        { id: 'settings', label: 'Pengaturan', icon: Settings },
      ]
    }
  ];

  const allItems = menuGroups.flatMap(g => g.items);
  const currentItem = allItems.find(m => m.id === activePage) || allItems[0];

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex">
      
      {/* Luxury Colored Sidebar - Soft Dusty Rose Silk by default (not stark white & not muddy red) */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } ${currentTheme.asideBg} ${currentTheme.textColor} flex flex-col justify-between flex-shrink-0 shadow-sm border-r sticky top-0 h-screen overflow-y-auto transition-all duration-300 z-40`}
      >
        <div>
          
          {/* Studio Brand Header */}
          <div className={`p-4 border-b ${currentTheme.headerBg} flex items-center justify-center select-none`}>
            <div className={`flex items-center ${isSidebarOpen ? 'gap-3' : 'justify-center'} overflow-hidden w-full`}>
              <img
                src="/images/logo_bywazu.png"
                alt="Bywazu Logo"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-stone-200/80 shadow-2xs flex-shrink-0 bg-[#F4F0EB]"
              />
              {isSidebarOpen && (
                <div className="min-w-0">
                  <span className={`font-serif text-lg font-bold tracking-wider ${currentTheme.textColor} truncate block leading-tight`}>
                    Bywazu Attire
                  </span>
                  <p className="text-[9px] tracking-widest uppercase text-[#7A1C30] font-bold truncate mt-0.5">
                    Studio Management &bull; Mojokerto
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links Grouped by Business Function */}
          <nav className={`p-2.5 ${isSidebarOpen ? 'space-y-3' : 'space-y-2'}`}>
            {menuGroups.map((group) => (
              <div key={group.category} className="space-y-0.5">
                
                {/* Category Header */}
                {isSidebarOpen ? (
                  <div className="px-3 pt-1.5 pb-1 flex items-center gap-2 select-none">
                    <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${currentTheme.categoryColor}`}>
                      {group.category}
                    </span>
                    <div className={`h-px flex-1 ${currentTheme.dividerColor}`} />
                  </div>
                ) : (
                  <div className="py-1 px-0.5 flex flex-col items-center select-none">
                    <span className={`text-[8px] font-bold ${currentTheme.categoryColor} uppercase truncate px-0.5 text-center block tracking-tight`}>
                      {group.category.slice(0, 4)}
                    </span>
                    <div className={`w-5 h-px ${currentTheme.dividerColor} mt-0.5`} />
                  </div>
                )}

                {/* Group Items */}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      title={!isSidebarOpen ? item.label : undefined}
                      className={`w-full flex items-center ${
                        isSidebarOpen ? 'justify-between px-3.5 py-2.5' : 'justify-center p-2.5'
                      } rounded-xl text-xs font-medium transition-all relative cursor-pointer group ${
                        isActive
                          ? currentTheme.activeBtn
                          : currentTheme.inactiveText
                      }`}
                    >
                      <div className={`flex items-center ${isSidebarOpen ? 'gap-2.5 min-w-0' : 'justify-center'}`}>
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'opacity-70 group-hover:opacity-100'}`} />
                        {isSidebarOpen && <span className="truncate">{item.label}</span>}
                      </div>

                      {/* Notification Badges (Expanded) */}
                      {isSidebarOpen && item.badge > 0 && (
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full flex-shrink-0 ${
                          isActive ? currentTheme.badgeActive : currentTheme.badgeInactive
                        }`}>
                          {item.badge}
                        </span>
                      )}

                      {/* Collapsed dot badge (Icon Rail) */}
                      {!isSidebarOpen && item.badge > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7A1C30] ring-2 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

        </div>

        {/* User Profile & Return to Public Website (Bottom) */}
        <div className={`p-3.5 border-t ${currentTheme.bottomBg} ${isSidebarOpen ? '' : 'flex flex-col items-center'}`}>
          {isSidebarOpen ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className={`text-xs font-bold ${currentTheme.textColor}`}>Admin / Owner</p>
                  <p className="text-[10px] opacity-75 font-medium">Studio Mojokerto</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" title="Sistem Aktif & Terhubung" />
                  <span className="text-[10px] font-semibold text-emerald-600">Online</span>
                </div>
              </div>

              {/* Palette Color Switcher: 3 curated luxury options */}
              <div className="flex items-center justify-between py-2 border-t border-black/10 my-1.5">
                <span className="text-[10px] font-semibold opacity-70">Warna Tema:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSidebarTheme('dusty-rose')}
                    title="Dusty Rose Silk (Lembut & Anggun)"
                    className={`w-4 h-4 rounded-full bg-[#EDE1E4] border-2 transition-transform cursor-pointer ${
                      sidebarTheme === 'dusty-rose' ? 'border-[#7A1C30] scale-125 shadow-xs' : 'border-stone-400/60'
                    }`}
                  />
                  <button
                    onClick={() => setSidebarTheme('espresso')}
                    title="Velvet Espresso (Mewah Teduh)"
                    className={`w-4 h-4 rounded-full bg-[#221B1E] border-2 transition-transform cursor-pointer ${
                      sidebarTheme === 'espresso' ? 'border-[#8F233B] scale-125 shadow-xs' : 'border-stone-400/60'
                    }`}
                  />
                  <button
                    onClick={() => setSidebarTheme('cashmere')}
                    title="Warm Cashmere (Hangat Natural)"
                    className={`w-4 h-4 rounded-full bg-[#EFE7E0] border-2 transition-transform cursor-pointer ${
                      sidebarTheme === 'cashmere' ? 'border-[#7A1C30] scale-125 shadow-xs' : 'border-stone-400/60'
                    }`}
                  />
                </div>
              </div>

              <button
                onClick={onExitToClient}
                className="w-full mt-1 py-2 px-3 rounded-xl bg-white/90 hover:bg-white text-stone-700 hover:text-[#7A1C30] border border-stone-200/80 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer group"
              >
                <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#7A1C30]" />
                <span>Lihat Website Publik</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs mb-1" title="Sistem Aktif & Terhubung" />
              <button
                onClick={onExitToClient}
                title="Lihat Website Publik"
                className="p-2 rounded-xl bg-white/90 hover:bg-white text-stone-700 hover:text-[#7A1C30] transition-colors cursor-pointer shadow-2xs"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto transition-all duration-300">
        
        {/* Top Control Bar of Admin Area */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            
            {/* The Sidebar Toggle Icon Button (PanelLeftClose / PanelLeftOpen) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer flex items-center justify-center border border-stone-200/60 shadow-2xs"
              title={isSidebarOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5 text-stone-700" />
              ) : (
                <PanelLeftOpen className="w-5 h-5 text-stone-700" />
              )}
            </button>

            <div className="h-4 w-px bg-stone-200 hidden sm:block" />

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-serif font-bold text-stone-900 text-sm">
                {currentItem.label}
              </span>
              <span className="text-stone-400">&bull;</span>
              <span className="text-stone-500 font-medium text-[11px] hidden sm:inline">
                Bywazu Studio Management Mojokerto
              </span>
            </div>
          </div>

          {/* Quick Exit to Public Website Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExitToClient}
              className="btn-glass px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#7A1C30] hover:bg-rose-50 flex items-center gap-1.5 border border-stone-200 shadow-2xs transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#7A1C30]" />
              <span className="hidden sm:inline">Lihat Website Publik</span>
              <span className="sm:hidden">Web Publik</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>

      </main>

    </div>
  );
}
