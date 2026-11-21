import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Calendar, Clock, Ruler, Info } from 'lucide-react';

export function ProductDetailModal({ kebaya, onClose, onOpenBooking, onOpenAppointment }) {
  if (!kebaya) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(10); // 0-indexed: 10 is November 2026
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedRentalDate, setSelectedRentalDate] = useState(null);

  // Month names
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Days in month calculation
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

  // Check date status based on booked dates and buffers
  const getDateStatus = (day) => {
    const formattedDate = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Check against kebaya's booked ranges
    for (const b of (kebaya.bookedDates || [])) {
      if (formattedDate >= b.start && formattedDate <= b.end) {
        if (formattedDate === b.start || formattedDate === b.end) {
          return { type: 'transit', label: 'Ambil / Balik', note: b.customer || 'Reserved' };
        }
        return { type: 'event', label: 'Hari H', note: b.customer || 'Disewa' };
      }
      if (b.bufferEnd && formattedDate > b.end && formattedDate <= b.bufferEnd) {
        return { type: 'maintenance', label: 'Maintenance Pasca Sewa', note: 'Laundry & Ironing' };
      }
    }

    // Check if user selected this date for preview
    if (selectedRentalDate === day) {
      return { type: 'selected', label: 'Pilihan Anda' };
    }

    return { type: 'available', label: 'Tersedia' };
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleDateClick = (day, status) => {
    if (status.type === 'available' || status.type === 'selected') {
      setSelectedRentalDate(day);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#ECD9DF]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-4 sm:p-8">
          
          {/* Back link */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs text-[#7A1C30] hover:underline font-semibold uppercase tracking-wider mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke katalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-stone-100 shadow-inner group">
                <img
                  src={kebaya.images[activeImageIdx] || kebaya.images[0]}
                  alt={kebaya.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm ${
                    kebaya.status === 'Available'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}>
                    {kebaya.status === 'Available' ? 'Available' : 'Maintenance'}
                  </span>
                </div>

                {/* Image Counter */}
                <div className="absolute top-3 right-3 bg-stone-900/70 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  {activeImageIdx + 1} / {kebaya.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {kebaya.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {kebaya.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIdx === idx ? 'border-[#7A1C30] ring-2 ring-rose-200' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Sizing Details Quick Glance */}
              <div className="bg-[#FAF6F7] rounded-2xl p-4 border border-[#EEDCE1]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A1C30] flex items-center gap-1.5 mb-3">
                  <Ruler className="w-4 h-4" />
                  Panduan Ukuran Detail (Fitting Guide)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-rose-100">
                    <span className="text-stone-500">Lingkar Dada (LD):</span>
                    <p className="font-semibold text-stone-800">{kebaya.measurements.bust} cm</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-rose-100">
                    <span className="text-stone-500">Lingkar Pinggang:</span>
                    <p className="font-semibold text-stone-800">{kebaya.measurements.waist} cm</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-rose-100">
                    <span className="text-stone-500">Lingkar Pinggul:</span>
                    <p className="font-semibold text-stone-800">{kebaya.measurements.hips} cm</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-rose-100">
                    <span className="text-stone-500">Panjang Lengan:</span>
                    <p className="font-semibold text-stone-800">{kebaya.measurements.armLength} cm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Interactive Calendar, Pricing & CTA */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                    Kode: {kebaya.code} &bull; by {kebaya.brand}
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                  {kebaya.name}
                </h2>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-[#7A1C30]">
                    Rp{kebaya.rentalPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm text-stone-500">/ sewa {kebaya.rentalDurationDays} hari</span>
                  <span className="text-xs text-stone-400">
                    (Additional day: Rp{kebaya.additionalDayPrice.toLocaleString('id-ID')})
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-stone-600 text-sm leading-relaxed">
                {kebaya.description}
              </p>

              {/* INTERACTIVE AVAILABILITY CALENDAR (Core Feature from Video) */}
              <div className="bg-white rounded-2xl border border-[#EAD2D8] p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#7A1C30]" />
                    <h3 className="font-serif font-bold text-lg text-stone-900">
                      Kalender Ketersediaan Rental
                    </h3>
                  </div>

                  {/* Month Switcher */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold text-stone-800 min-w-[130px] text-center">
                      {monthNames[selectedMonth]} {selectedYear}
                    </span>
                    <button
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-1.5 mb-3 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
                    <div key={i} className="text-[11px] font-bold text-stone-400 py-1 uppercase">
                      {d}
                    </div>
                  ))}

                  {/* Empty cells for offset */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-9" />
                  ))}

                  {/* Day cells */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const status = getDateStatus(day);

                    let cellBg = "bg-white text-stone-700 hover:bg-rose-50 border border-stone-100 cursor-pointer";
                    if (status.type === 'event') {
                      cellBg = "bg-[#FAD2DB] text-[#7A1C30] font-bold border border-[#F3B0C1] cursor-not-allowed";
                    } else if (status.type === 'transit') {
                      cellBg = "bg-[#FCE8A9] text-[#785B0C] font-semibold border border-[#EED076] cursor-not-allowed";
                    } else if (status.type === 'maintenance') {
                      cellBg = "bg-[#E1ECF4] text-[#2C6288] border border-[#BFD9EA] cursor-not-allowed";
                    } else if (status.type === 'selected') {
                      cellBg = "bg-[#7A1C30] text-white font-bold ring-2 ring-[#7A1C30]/30";
                    }

                    return (
                      <div
                        key={day}
                        onClick={() => handleDateClick(day, status)}
                        title={`${day} ${monthNames[selectedMonth]}: ${status.label}`}
                        className={`h-9 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${cellBg}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                {/* Color Legend Matching Video exactly */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-stone-100 text-[11px] text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#FAD2DB] border border-[#F3B0C1]" />
                    <span>Hari H / Pemakaian</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#FCE8A9] border border-[#EED076]" />
                    <span>Kirim / Ambil / Pulang</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#E1ECF4] border border-[#BFD9EA]" />
                    <span>Maintenance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-white border border-stone-200" />
                    <span>Tersedia</span>
                  </div>
                </div>

                {/* Explanatory Buffer Note from Video */}
                <div className="mt-3 bg-[#FAF8F6] p-3 rounded-xl border border-stone-200/80 flex items-start gap-2.5 text-xs text-stone-600 leading-relaxed">
                  <Info className="w-4 h-4 text-[#7A1C30] flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-stone-800">Jadwal Maintenance Pasca Sewa:</strong> Setelah kebaya dikembalikan, terdapat jeda maintenance selama 1 hari (area dalam kota) atau 2 hari (area luar kota). Pada jadwal Maintenance ini kebaya sedang dirapikan & dry-cleaned dan baru dapat dibooking untuk tanggal berikutnya.
                  </p>
                </div>
              </div>

              {/* Items included */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                  Paket Sewa Termasuk:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  {(kebaya.includedItems || []).map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenBooking(kebaya, selectedRentalDate ? `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedRentalDate).padStart(2, '0')}` : null)}
                  className="flex-1 py-3.5 px-6 rounded-full btn-glass-primary font-semibold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Sewa Sekarang ({selectedRentalDate ? `Tgl ${selectedRentalDate} ${monthNames[selectedMonth]}` : 'Pilih Tanggal'})</span>
                </button>

                <button
                  onClick={() => { onClose(); onOpenAppointment && onOpenAppointment(kebaya); }}
                  className="py-3.5 px-6 rounded-full btn-glass text-[#7A1C30] font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#7A1C30]" />
                  <span>Jadwal Fitting Studio</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
