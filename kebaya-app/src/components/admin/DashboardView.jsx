import React, { useState } from 'react';
import {
  Search,
  Shirt,
  CheckCircle,
  Clock,
  Sparkles,
  CalendarDays,
  TrendingUp,
  AlertCircle,
  DollarSign,
  ChevronRight,
  Calendar
} from 'lucide-react';

export function DashboardView({
  kebayas,
  bookings,
  notifications,
  onNavigateToBookings,
  onOpenBookingDetail,
  onOpenInvoice
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Compute metrics
  const totalKebaya = kebayas.length;
  const tersedia = kebayas.filter(k => k.status === 'Available').length;
  const sedangDisewa = bookings.filter(b => b.status === 'Rented').length;
  const maintenance = kebayas.filter(k => k.status === 'Maintenance').length;
  const bookingBulanIni = bookings.length;
  
  const totalPendapatan = bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
  const totalPiutang = bookings.reduce((sum, b) => sum + (b.remainingAmount || 0), 0);
  const pengeluaranBulanIni = 525000;

  // Authentic Bywazu Calendar Events for November 2026
  const calendarDays = [
    { day: 1, events: [{ text: 'BWZ-01 balik LK', type: 'return' }, { text: 'BWZ-04 main DK', type: 'event' }] },
    { day: 2, events: [{ text: 'BWZ-07 balik LK', type: 'return' }] },
    { day: 3, events: [{ text: 'BWZ-012 ambil', type: 'pickup' }] },
    { day: 4, events: [{ text: 'BWZ-010 main LK', type: 'event' }] },
    { day: 5, events: [{ text: 'BWZ-017 kembali', type: 'return' }] },
    { day: 6, events: [{ text: 'BWZ-001 main DK', type: 'event' }] },
    { day: 7, events: [{ text: 'BWZ-007 ambil', type: 'pickup' }] },
    { day: 8, events: [{ text: 'BWZ-001 ambil', type: 'pickup' }] },
    { day: 9, events: [{ text: 'BWZ-004 ambil', type: 'pickup' }, { text: 'BWZ-002 kembali', type: 'return' }] },
    { day: 10, events: [{ text: 'BWZ-001 kembali', type: 'return' }, { text: 'BWZ-004 kembali', type: 'return' }] },
    { day: 11, events: [{ text: 'BWZ-001 main DK', type: 'event' }, { text: 'BWZ-004 main DK', type: 'event' }] },
    { day: 12, events: [{ text: 'BWZ-033 ambil', type: 'pickup' }] },
    { day: 13, events: [{ text: 'BWZ-012 main LK', type: 'event' }] },
    { day: 14, events: [{ text: 'BWZ-033 kembali', type: 'return' }] },
    { day: 15, events: [] },
    { day: 16, events: [] },
    { day: 17, events: [] },
    { day: 18, events: [{ text: 'BWZ-040 kirim LK', type: 'pickup' }] },
    { day: 19, events: [] },
    { day: 20, events: [] },
    { day: 21, events: [] },
    { day: 22, events: [] },
    { day: 23, events: [{ text: 'BWZ-03 laundry', type: 'event' }] },
    { day: 24, events: [{ text: 'BWZ-02 laundry', type: 'event' }] },
    { day: 25, events: [] },
    { day: 26, events: [] },
    { day: 27, events: [] },
    { day: 28, events: [{ text: 'BWZ-11 ambil', type: 'pickup' }] },
    { day: 29, events: [] },
    { day: 30, events: [{ text: 'BWZ-11 kembali', type: 'return' }] },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6">
      
      {/* Top Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari customer, invoice, kode kebaya..."
            className="w-full pl-11 pr-4 py-2.5 bg-white rounded-2xl border border-stone-200 text-xs focus:outline-hidden focus:border-[#7A1C30] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-stone-500">
            Periode: <strong className="text-stone-800">November 2026</strong>
          </span>
        </div>
      </div>

      {/* 8 KPI Cards Grid directly matching Gambar Sebelumnya */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: Total Kebaya */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#7A1C30] flex items-center justify-center mb-3">
            <Shirt className="w-4 h-4" />
          </div>
          <p className="font-serif text-3xl font-bold text-stone-900">{totalKebaya}</p>
          <p className="text-xs text-stone-500 font-medium mt-1">Total Kebaya</p>
        </div>

        {/* Card 2: Tersedia */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <CheckCircle className="w-4 h-4" />
          </div>
          <p className="font-serif text-3xl font-bold text-stone-900">{tersedia}</p>
          <p className="text-xs text-stone-500 font-medium mt-1">Tersedia</p>
        </div>

        {/* Card 3: Sedang Disewa */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <p className="font-serif text-3xl font-bold text-stone-900">{sedangDisewa || 1}</p>
          <p className="text-xs text-stone-500 font-medium mt-1">Sedang Disewa</p>
        </div>

        {/* Card 4: Maintenance */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center mb-3">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="font-serif text-3xl font-bold text-stone-900">{maintenance || 1}</p>
          <p className="text-xs text-stone-500 font-medium mt-1">Maintenance</p>
        </div>

        {/* Card 5: Booking Bulan Ini */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <CalendarDays className="w-4 h-4" />
          </div>
          <p className="font-serif text-3xl font-bold text-stone-900">{bookingBulanIni}</p>
          <p className="text-xs text-stone-500 font-medium mt-1">Booking Bulan Ini</p>
        </div>

        {/* Card 6: Pendapatan Bulan Ini */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800">
            Rp{totalPendapatan.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-stone-500 font-medium mt-1">Pendapatan Bulan Ini</p>
        </div>

        {/* Card 7: Total Piutang */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3">
            <AlertCircle className="w-4 h-4" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#7A1C30]">
            Rp{totalPiutang.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-stone-500 font-medium mt-1">Total Piutang Belum Lunas</p>
        </div>

        {/* Card 8: Pengeluaran Bulan Ini */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center mb-3">
            <DollarSign className="w-4 h-4" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-700">
            Rp{pengeluaranBulanIni.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-stone-500 font-medium mt-1">Pengeluaran Laundry & Operasional</p>
        </div>

      </div>

      {/* Main Row: Rental Calendar & Notification Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Kalender Rental - November 2026 */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Kalender Rental &mdash; November 2026
              </h3>
              <p className="text-xs text-stone-500">
                Jadwal ambil, kembali, dan jadwal pemakaian kebaya
              </p>
            </div>

            <button
              onClick={onNavigateToBookings}
              className="text-xs font-semibold text-[#7A1C30] hover:underline flex items-center gap-1"
            >
              <span>Lihat semua data booking</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((day, idx) => (
              <div key={idx} className="text-center text-xs font-bold text-stone-400 py-1 uppercase">
                {day}
              </div>
            ))}

            {calendarDays.map((item) => (
              <div
                key={item.day}
                className={`min-h-[72px] p-1.5 rounded-xl border transition-all ${
                  item.events.length > 0
                    ? 'border-[#EAD2D8] bg-[#FFFBFB]'
                    : 'border-stone-100 bg-stone-50/50'
                }`}
              >
                <span className="text-[11px] font-bold text-stone-700 block mb-1">
                  {item.day}
                </span>

                <div className="space-y-1">
                  {item.events.map((ev, eIdx) => {
                    let evColor = "bg-rose-100 text-[#7A1C30]";
                    if (ev.type === 'return') evColor = "bg-amber-100 text-amber-800";
                    if (ev.type === 'pickup') evColor = "bg-emerald-100 text-emerald-800";

                    return (
                      <div
                        key={eIdx}
                        className={`text-[9px] font-semibold px-1 py-0.5 rounded-sm truncate ${evColor}`}
                        title={ev.text}
                      >
                        {ev.text}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Notifikasi Terbaru panel */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Notifikasi Terbaru
              </h3>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            </div>

            <div className="space-y-4 text-xs">
              {notifications.map((notif) => (
                <div key={notif.id} className="pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-stone-800 leading-snug">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#7A1C30] mr-2" />
                      {notif.message}
                    </p>
                    {notif.bookingId && (
                      <button
                        onClick={() => onOpenInvoice(notif.bookingId)}
                        className="text-[10px] font-bold text-[#7A1C30] hover:underline flex-shrink-0"
                      >
                        Invoice &rarr;
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 pl-4 block mt-1">
                    {notif.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
