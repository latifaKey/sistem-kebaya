import React, { useState } from 'react';
import { Plus, Search, Filter, Sparkles, Check, Edit2, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../../data/kebayaData';

export function KebayaCatalogAdmin({ kebayas, onToggleStatus, onAddKebaya }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Semua Kategori');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New kebaya form
  const [code, setCode] = useState('IV045');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Modern');
  const [color, setColor] = useState('Emerald Green');
  const [bust, setBust] = useState('98');
  const [price, setPrice] = useState('350000');

  const filtered = kebayas.filter(k => {
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase()) ||
      k.code.toLowerCase().includes(search.toLowerCase()) ||
      k.color.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'Semua Kategori' || k.category === selectedCat;
    return matchSearch && matchCat;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !code) return;

    const newK = {
      id: code,
      code,
      name,
      brand: "Siheyatri",
      category,
      color,
      rentalPrice: parseInt(price) || 300000,
      deposit: 200000,
      additionalDayPrice: 50000,
      rentalDurationDays: 3,
      status: "Available",
      timesRented: 0,
      measurements: {
        bust: parseInt(bust) || 98,
        waist: 76,
        hips: 100,
        armLength: 56,
        armpit: 44,
        wrist: 18,
      },
      images: ["/images/kebaya/IV001.jpg"],
      description: `Koleksi kebaya ${name} warna ${color}. Dibuat dari brokat berkualitas tinggi.`,
      includedItems: ["Kebaya Atasan", "Kamisol Senada", "Kain Batik Lilit"],
      bookedDates: []
    };

    onAddKebaya(newK);
    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      
      {/* Title & Actions directly matching frame 11 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Katalog Kebaya
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {kebayas.length} kebaya terdaftar di koleksi studio
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-full btn-glass-primary text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Kebaya</span>
          </button>
        </div>
      </div>

      {/* Filter Row matching frame 11 */}
      <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center gap-3 text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama / kode..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 outline-hidden focus:border-[#7A1C30]"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="p-1.5 rounded-lg border border-stone-200 bg-white"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Grid of Kebaya Cards matching frame 11 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((k) => {
          const isMaint = k.status === 'Maintenance';

          return (
            <div
              key={k.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={k.images[0]}
                    alt={k.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={() => onToggleStatus(k.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors shadow-xs ${
                        isMaint ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                      }`}
                      title="Klik untuk ubah status Available / Maintenance"
                    >
                      {k.status}
                    </button>
                  </div>
                </div>

                {/* Content matching frame 11 */}
                <div className="p-4 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-stone-400">
                    <span className="font-mono font-bold text-stone-800">{k.code}</span>
                    <span>{k.timesRented || 0}x disewa</span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-stone-900 line-clamp-1">
                    {k.name}
                  </h4>

                  <p className="text-[11px] text-stone-500">
                    {k.category} &bull; {k.color} &bull; LD {k.measurements.bust} cm
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-4 pt-0">
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-sm font-bold text-[#7A1C30]">
                      Rp{k.rentalPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-stone-400 block">/ sewa 3 hari</span>
                  </div>

                  <button
                    onClick={() => onToggleStatus(k.id)}
                    className="px-3 py-1 rounded-lg border border-stone-200 hover:bg-stone-50 text-[11px] font-medium text-stone-600"
                  >
                    {isMaint ? 'Tandai Siap' : 'Set Maint'}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Kebaya Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100">
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
              Tambah Koleksi Kebaya Baru
            </h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-600 block mb-1">Kode Kebaya *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="Modern">Modern</option>
                    <option value="Kutubaru">Kutubaru</option>
                    <option value="Tradisional">Tradisional</option>
                    <option value="Wisuda">Wisuda</option>
                    <option value="Pengantin">Pengantin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-stone-600 block mb-1">Nama Model Kebaya *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Royal Peplum Emerald Chantilly"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-stone-600 block mb-1">Warna</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block mb-1">LD (cm)</label>
                  <input
                    type="number"
                    value={bust}
                    onChange={(e) => setBust(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full btn-glass-primary font-bold text-xs uppercase cursor-pointer"
                >
                  Simpan Kebaya
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-3 rounded-full btn-glass text-stone-600 text-xs cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
