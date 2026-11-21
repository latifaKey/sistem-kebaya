import React from 'react';
import { SILHOUETTES, COLORWAYS, INNERS, BAWAHAN_LIST, ACCESSORIES } from '../../data/customizerData';
import { Check, Info, Palette, Scissors, Layers, Gem, Ruler, Sparkles } from 'lucide-react';

export function MixMatchPanel({
  activeTab,
  setActiveTab,
  selectedSilhouette,
  setSelectedSilhouette,
  selectedColorway,
  setSelectedColorway,
  selectedInner,
  setSelectedInner,
  selectedBawahan,
  setSelectedBawahan,
  selectedAccessories,
  setSelectedAccessories,
  onOpenSizingModal,
  userCustomMeasurements
}) {
  const tabs = [
    { id: 'silhouette', label: '1. Siluet Kebaya', icon: Scissors },
    { id: 'colorway', label: '2. Warna & Lace', icon: Palette },
    { id: 'inner', label: '3. Inner / Kamisol', icon: Layers },
    { id: 'bawahan', label: '4. Kain Bawahan', icon: Layers },
    { id: 'accessories', label: '5. Aksesoris', icon: Gem },
  ];

  const toggleAccessory = (acc) => {
    if (selectedAccessories.some(a => a.id === acc.id)) {
      setSelectedAccessories(selectedAccessories.filter(a => a.id !== acc.id));
    } else {
      setSelectedAccessories([...selectedAccessories, acc]);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#ECD9DF] shadow-lg p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        
        {/* Step Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 border-b border-rose-100 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'btn-glass-primary shadow-xs'
                    : 'btn-glass text-stone-600 hover:text-[#7A1C30]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SILUET KEBAYA */}
        {activeTab === 'silhouette' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C30]">
                Pilih Model Potongan Kebaya
              </span>
              <button
                onClick={onOpenSizingModal}
                className="text-xs font-semibold text-[#7A1C30] hover:underline flex items-center gap-1.5"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Panduan Ukuran</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {SILHOUETTES.map((sil) => {
                const isSelected = selectedSilhouette.id === sil.id;
                return (
                  <div
                    key={sil.id}
                    onClick={() => setSelectedSilhouette(sil)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all relative ${
                      isSelected
                        ? 'border-[#7A1C30] bg-rose-50/70 shadow-sm'
                        : 'border-stone-200 hover:border-rose-200 hover:bg-stone-50/70'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {sil.image && (
                        <img
                          src={sil.image}
                          alt={sil.name}
                          className="w-12 h-14 rounded-xl object-cover ring-1 ring-stone-200 flex-shrink-0 shadow-2xs"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 tracking-wider">
                            {sil.code}
                          </span>
                          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white border border-rose-200 text-[#7A1C30]">
                            {sil.tag}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-sm text-stone-900 truncate">
                          {sil.bywazuName || sil.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                          {sil.description}
                        </p>

                        {sil.priceMod > 0 && (
                          <p className="text-[10px] font-semibold text-rose-700 mt-1">
                            +Rp{sil.priceMod.toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#7A1C30] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: WARNA & LACE */}
        {activeTab === 'colorway' && (
          <div className="space-y-3 animate-fadeIn">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C30] block mb-2">
              Pilih Warna & Tekstur Brokat Lace
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {COLORWAYS.map((col) => {
                const isSelected = selectedColorway.id === col.id;
                return (
                  <div
                    key={col.id}
                    onClick={() => setSelectedColorway(col)}
                    className={`cursor-pointer p-3 rounded-2xl border-2 transition-all relative flex items-center gap-3 ${
                      isSelected
                        ? 'border-[#7A1C30] bg-rose-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-rose-200 hover:bg-stone-50'
                    }`}
                  >
                    {/* Swatch circle with real photo thumbnail */}
                    <div className="relative w-11 h-11 rounded-full flex-shrink-0 shadow-xs border-2 border-white ring-1 ring-stone-200 overflow-hidden">
                      {col.image ? (
                        <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full" style={{ backgroundColor: col.hex }} />
                      )}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#7A1C30]/50 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white drop-shadow-xs" />
                        </div>
                      )}
                    </div>

                    <div className="overflow-hidden min-w-0 flex-1">
                      <h4 className="font-semibold text-xs text-stone-900 truncate">
                        {col.bywazuName || col.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 truncate mt-0.5">
                        {col.vibe}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: INNER / KAMISOL */}
        {activeTab === 'inner' && (
          <div className="space-y-3 animate-fadeIn">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C30] block mb-2">
              Pilih Inner Pelapis / Bustier
            </span>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {INNERS.map((inr) => {
                const isSelected = selectedInner.id === inr.id;
                return (
                  <div
                    key={inr.id}
                    onClick={() => setSelectedInner(inr)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${
                      isSelected
                        ? 'border-[#7A1C30] bg-rose-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-rose-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-stone-900">
                        {inr.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {inr.suitableFor}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 leading-snug">
                      {inr.description}
                    </p>

                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#7A1C30] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: KAIN BAWAHAN BATIK / SONGKET */}
        {activeTab === 'bawahan' && (
          <div className="space-y-3 animate-fadeIn">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C30] block mb-2">
              Pilih Kain Bawahan Nusantara
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {BAWAHAN_LIST.map((bawahan) => {
                const isSelected = selectedBawahan.id === bawahan.id;
                return (
                  <div
                    key={bawahan.id}
                    onClick={() => setSelectedBawahan(bawahan)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${
                      isSelected
                        ? 'border-[#7A1C30] bg-rose-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-rose-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A1C30]">
                        {bawahan.origin}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      {bawahan.name}
                    </h4>

                    <p className="text-[11px] text-stone-500 italic mt-1 leading-snug">
                      "{bawahan.patternMeaning}"
                    </p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-md border border-stone-300 shadow-xs"
                        style={{ backgroundColor: bawahan.patternBg }}
                      />
                      <span className="text-[10px] text-stone-600 font-medium">{bawahan.style}</span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#7A1C30] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: AKSESORIS */}
        {activeTab === 'accessories' && (
          <div className="space-y-3 animate-fadeIn">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C30] block mb-2">
              Aksesoris & Sentuhan Akhir (Dapat Dipilih Lebih Dari Satu)
            </span>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {ACCESSORIES.map((acc) => {
                const isSelected = selectedAccessories.some(a => a.id === acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAccessory(acc)}
                    className={`cursor-pointer p-3.5 rounded-2xl border-2 transition-all relative flex items-center justify-between ${
                      isSelected
                        ? 'border-[#7A1C30] bg-rose-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-rose-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#7A1C30] border-[#7A1C30] text-white' : 'border-stone-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <h4 className="font-semibold text-xs text-stone-900">
                          {acc.name}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          {acc.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#7A1C30] whitespace-nowrap pl-2">
                      +Rp{acc.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Sizing pill note if user configured */}
      {userCustomMeasurements && (
        <div className="mt-4 bg-emerald-50/80 border border-emerald-200/80 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-900">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Ukuran Terpilih: <strong>Size {userCustomMeasurements.size}</strong> (LD {userCustomMeasurements.ld})</span>
          </span>
          <button onClick={onOpenSizingModal} className="underline text-[11px] font-semibold text-emerald-800 hover:text-emerald-950">Ubah</button>
        </div>
      )}

    </div>
  );
}
