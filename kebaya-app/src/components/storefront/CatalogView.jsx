import React, { useState } from 'react';
import { Search, Calendar, Filter, Sparkles, ChevronRight, Check, Eye } from 'lucide-react';
import { CATEGORIES, SIZES } from '../../data/kebayaData';

export function CatalogView({ kebayas, onSelectKebaya }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedSize, setSelectedSize] = useState('Semua Ukuran');
  const [filterDate, setFilterDate] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc

  // Filter kebayas
  const filteredKebayas = kebayas.filter(k => {
    // Search query
    const matchSearch = k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.color.toLowerCase().includes(searchQuery.toLowerCase());

    // Category
    const matchCat = selectedCategory === 'Semua Kategori' ||
      k.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (k.subcategory && k.subcategory.toLowerCase().includes(selectedCategory.toLowerCase()));

    // Size
    let matchSize = true;
    if (selectedSize.includes('S (')) matchSize = k.measurements.bust <= 92;
    else if (selectedSize.includes('M (')) matchSize = k.measurements.bust >= 94 && k.measurements.bust <= 98;
    else if (selectedSize.includes('L (')) matchSize = k.measurements.bust >= 100 && k.measurements.bust <= 104;
    else if (selectedSize.includes('XL/')) matchSize = k.measurements.bust >= 106;

    // Date Availability check
    let matchDate = true;
    if (filterDate) {
      const isBooked = (k.bookedDates || []).some(b => {
        return (filterDate >= b.start && filterDate <= (b.bufferEnd || b.end));
      });
      if (isBooked) matchDate = false;
    }

    return matchSearch && matchCat && matchSize && matchDate;
  });

  // Sort
  filteredKebayas.sort((a, b) => {
    if (sortBy === 'price-asc') return a.rentalPrice - b.rentalPrice;
    if (sortBy === 'price-desc') return b.rentalPrice - a.rentalPrice;
    return (b.timesRented || 0) - (a.timesRented || 0);
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EBDCE0] gap-4">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#7A1C30]">
            Katalog Kebaya Pilihan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            CATALOG KOLEKSI
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Showing {filteredKebayas.length} of {kebayas.length} koleksi kebaya couture
          </p>
        </div>

        {/* Date Filter & Availability Check directly matching Video */}
        <div className="bg-white p-3 rounded-2xl border border-[#DFCAD2] shadow-xs flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1C30]">
            <Calendar className="w-4 h-4" />
            <span>Cek Ketersediaan Tanggal:</span>
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-stone-200 outline-hidden focus:border-[#7A1C30]"
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate('')}
              className="text-[11px] text-stone-400 hover:text-stone-700 underline"
            >
              Reset Tanggal
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar matching video */}
      <div className="space-y-4 mb-8">
        
        {/* Search & Sort Input */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama dress, kode, warna (cth: IV001, Dusty Pink, Kutubaru)..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-[#E4D2D8] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#7A1C30] focus:border-[#7A1C30] shadow-2xs"
            />
          </div>

          <div className="sm:col-span-4 flex gap-2">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-1/2 px-3 py-3 bg-white rounded-2xl border border-[#E4D2D8] text-xs font-medium text-stone-700 outline-hidden"
            >
              {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-1/2 px-3 py-3 bg-white rounded-2xl border border-[#E4D2D8] text-xs font-medium text-stone-700 outline-hidden"
            >
              <option value="popular">Terpopuler</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'btn-glass-primary shadow-xs'
                  : 'btn-glass text-stone-700 hover:text-[#7A1C30]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Kebaya Cards Grid matching frame_00 and frame_11 */}
      {filteredKebayas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredKebayas.map((kebaya) => {
            const isMaintenance = kebaya.status === 'Maintenance';

            return (
              <div
                key={kebaya.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#ECD9DF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Badges */}
                <div 
                  onClick={() => onSelectKebaya(kebaya)}
                  className="relative aspect-3/4 overflow-hidden bg-stone-100 cursor-pointer"
                >
                  <img
                    src={kebaya.images[0]}
                    alt={kebaya.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges matching video */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {isMaintenance ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white shadow-xs">
                        Maintenance
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                        New In
                      </span>
                    )}

                    {kebaya.timesRented > 15 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#7A1C30] text-rose-100 shadow-xs">
                        Favorite
                      </span>
                    )}
                  </div>

                  {/* Size chip */}
                  <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full font-medium">
                    LD {kebaya.measurements.bust} cm
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-[#7A1C30]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#7A1C30] font-semibold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      Lihat Kalender & Detail
                    </span>
                  </div>
                </div>

                {/* Card Content matching video frame 00 */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                      <span>by {kebaya.brand} | {kebaya.code}</span>
                      <span className="capitalize">{kebaya.category}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectKebaya(kebaya)}
                      className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#7A1C30] transition-colors cursor-pointer line-clamp-1"
                    >
                      {kebaya.name}
                    </h3>

                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {kebaya.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-4 pt-3 border-t border-rose-100/60 flex items-center justify-between">
                    <div>
                      <p className="font-serif text-base font-bold text-[#7A1C30]">
                        Rp{kebaya.rentalPrice.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[10px] text-stone-400">/ 3 hari sewa</p>
                    </div>

                    <button
                      onClick={() => onSelectKebaya(kebaya)}
                      className="px-4 py-2 rounded-full btn-glass text-[#7A1C30] hover:text-[#7A1C30] text-xs font-semibold transition-all cursor-pointer"
                    >
                      Cek Jadwal
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-stone-800">
            Tidak Ada Kebaya yang Cocok
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian, filter tanggal atau kategori ukuran untuk melihat koleksi lainnya.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('Semua Kategori'); setSelectedSize('Semua Ukuran'); setFilterDate(''); }}
            className="mt-4 px-5 py-2 rounded-full bg-[#7A1C30] text-white text-xs font-semibold"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

    </section>
  );
}
