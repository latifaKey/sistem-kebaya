import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

export function SmartSizingModal({ isOpen, onClose, selectedSilhouette, onApplySize }) {
  if (!isOpen) return null;

  const [tinggi, setTinggi] = useState('162');
  const [berat, setBerat] = useState('52');
  const [ld, setLd] = useState('96');
  const [lp, setLp] = useState('74');
  const [pinggul, setPinggul] = useState('98');
  const [isHijab, setIsHijab] = useState(true);
  const [analyzed, setAnalyzed] = useState(false);

  // Size calculation algorithm
  const calculateRecommendation = () => {
    const bust = parseFloat(ld) || 96;
    let size = 'M';
    let statusText = 'Ukuran Pas Ideal (True to Size)';
    let notes = [];

    if (bust <= 90) {
      size = 'S';
      notes.push('Disarankan kamisol busa push-up atau bustier satin size S.');
    } else if (bust <= 98) {
      size = 'M';
      notes.push('Sangat proporsional dengan siluet ' + selectedSilhouette.name + '.');
    } else if (bust <= 104) {
      size = 'L';
      notes.push('Siluet ' + selectedSilhouette.name + ' memberi efek jenjang dan ramping pada torso.');
    } else {
      size = 'XL (Big Size)';
      notes.push('Tersedia opsi tali silang fleksibel di punggung untuk kenyamanan ekstra.');
    }

    if (isHijab) {
      notes.push('Rekomendasi inner: Manset Spandex Silk leher tinggi senada.');
    } else {
      notes.push('Rekomendasi inner: Bustier tulang penyangga untuk postur tegap.');
    }

    return { size, statusText, notes };
  };

  const recommendation = calculateRecommendation();

  const handleApply = () => {
    onApplySize({
      size: recommendation.size,
      ld: `${ld} cm`,
      lp: `${lp} cm`,
      pinggul: `${pinggul} cm`,
      isHijab
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 text-[#7A1C30] flex items-center justify-center">
            <Ruler className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C30]">
            Virtual Fit & Sizing Advisor
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          Kalkulator Ukuran Pas Kebaya
        </h3>
        <p className="text-xs text-stone-500 mb-5">
          Masukkan estimasi ukuran tubuh Anda. Algoritma kami akan mencocokkan kelenturan brokat dan pola potong siluet <strong>{selectedSilhouette.name}</strong>.
        </p>

        {/* Input Form */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div>
            <label className="text-stone-600 block mb-1">Tinggi Badan (cm)</label>
            <input
              type="number"
              value={tinggi}
              onChange={(e) => setTinggi(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 font-semibold"
            />
          </div>
          <div>
            <label className="text-stone-600 block mb-1">Berat Badan (kg)</label>
            <input
              type="number"
              value={berat}
              onChange={(e) => setBerat(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 font-semibold"
            />
          </div>
          <div>
            <label className="text-stone-600 block mb-1 font-bold text-[#7A1C30]">
              Lingkar Dada / LD (cm) *
            </label>
            <input
              type="number"
              value={ld}
              onChange={(e) => setLd(e.target.value)}
              className="w-full p-2.5 rounded-xl border-2 border-rose-300 font-bold text-stone-900"
            />
          </div>
          <div>
            <label className="text-stone-600 block mb-1">Lingkar Pinggang (cm)</label>
            <input
              type="number"
              value={lp}
              onChange={(e) => setLp(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 font-semibold"
            />
          </div>
        </div>

        {/* Hijab Toggle */}
        <div className="bg-[#FAF6F7] p-3 rounded-xl border border-rose-100 flex items-center justify-between text-xs mb-5">
          <span className="font-semibold text-stone-700">Kenakan Hijab / Manset Tertutup?</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsHijab(true)}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                isHijab ? 'btn-glass-primary' : 'btn-glass text-stone-600'
              }`}
            >
              Ya (Hijab)
            </button>
            <button
              type="button"
              onClick={() => setIsHijab(false)}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                !isHijab ? 'btn-glass-primary' : 'btn-glass text-stone-600'
              }`}
            >
              Non-Hijab
            </button>
          </div>
        </div>

        {/* Smart Result Box */}
        <div className="bg-gradient-to-br from-[#FAF0F3] to-[#F5E2E8] p-4 rounded-2xl border border-[#DFCAD2] mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C30]">
              Rekomendasi Ukuran Anda:
            </span>
            <span className="px-3 py-1 rounded-full btn-glass-primary text-xs font-bold font-mono">
              Size {recommendation.size}
            </span>
          </div>

          <p className="text-xs font-semibold text-stone-800 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{recommendation.statusText}</span>
          </p>

          <ul className="text-[11px] text-stone-600 space-y-1">
            {recommendation.notes.map((n, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#7A1C30] font-bold">&bull;</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleApply}
          className="w-full py-3.5 rounded-full btn-glass-primary font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Terapkan Ukuran ke Studio 3D</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
