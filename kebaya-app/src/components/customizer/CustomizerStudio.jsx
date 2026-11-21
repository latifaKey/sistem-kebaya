import React, { useState } from 'react';
import { Mannequin3DCanvas } from './Mannequin3DCanvas';
import { MixMatchPanel } from './MixMatchPanel';
import { SmartSizingModal } from './SmartSizingModal';
import { SILHOUETTES, COLORWAYS, INNERS, BAWAHAN_LIST, ACCESSORIES, COMMUNITY_GALLERY } from '../../data/customizerData';
import { Calendar, Heart, Share2, Ruler, BookmarkPlus, ArrowRight, Check, Box } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CustomizerStudio({ onBookCustomLook, initialKebaya }) {
  // Initial selections
  const [activeTab, setActiveTab] = useState('silhouette');
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0]);
  const [selectedColorway, setSelectedColorway] = useState(COLORWAYS[0]);
  const [selectedInner, setSelectedInner] = useState(INNERS[0]);
  const [selectedBawahan, setSelectedBawahan] = useState(BAWAHAN_LIST[0]);
  const [selectedAccessories, setSelectedAccessories] = useState([ACCESSORIES[0], ACCESSORIES[1]]);
  
  // 3D Controls
  const [rotationAngle, setRotationAngle] = useState(0);
  const [lightingMode, setLightingMode] = useState('studio');

  // Smart Sizing Modal
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  const [userMeasurements, setUserMeasurements] = useState(null);

  // Save Look Modal
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [lookTitle, setLookTitle] = useState('Kombinasi Kebaya Anggun');
  const [creatorName, setCreatorName] = useState('');
  const [eventName, setEventName] = useState('Wisuda Sarjana');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculate pricing
  const baseRental = 300000;
  const silPrice = selectedSilhouette.priceMod || 0;
  const innerPrice = selectedInner.price || 0;
  const accessoriesPrice = selectedAccessories.reduce((acc, a) => acc + (a.price || 0), 0);
  const totalPackagePrice = baseRental + silPrice + innerPrice + accessoriesPrice;

  const handleSaveLook = (e) => {
    e.preventDefault();
    if (!creatorName) {
      alert('Mohon masukkan nama Anda.');
      return;
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    setSavedSuccess(true);
    setTimeout(() => {
      setIsSaveModalOpen(false);
      setSavedSuccess(false);
    }, 1500);
  };

  const handleBookNow = () => {
    // Package into an object for the booking modal
    const customLook = {
      id: `CUSTOM-${selectedSilhouette.id.toUpperCase()}-${selectedColorway.id.toUpperCase()}`,
      name: `${selectedSilhouette.name} (${selectedColorway.name})`,
      category: "Haute Couture Customizer",
      rentalPrice: totalPackagePrice,
      deposit: 200000,
      additionalDayPrice: 50000,
      measurements: userMeasurements ? {
        bust: parseInt(userMeasurements.ld) || 96,
        waist: parseInt(userMeasurements.lp) || 74,
        hips: parseInt(userMeasurements.pinggul) || 98,
        armLength: 56,
      } : {
        bust: 96,
        waist: 76,
        hips: 98,
        armLength: 56,
      },
      color: selectedColorway.name,
      customDetails: {
        silhouette: selectedSilhouette.name,
        colorway: selectedColorway.name,
        inner: selectedInner.name,
        bawahan: selectedBawahan.name,
        accessories: selectedAccessories.map(a => a.name).join(', ')
      }
    };

    onBookCustomLook(customLook);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Experience Header (Lacoste style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EAD4DB] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full btn-glass text-[#7A1C30] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Box className="w-3.5 h-3.5 text-[#7A1C30]" />
            <span>Three.js 3D Virtual Fitting & Lookbook</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            ATELIER 3D KEBAYA STUDIO
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Eksplorasi paduan siluet kebaya modern, warna kain lace, inner bustier, corak batik nusantara, dan aksesoris berkelas sebelum melakukan booking.
          </p>
        </div>

        {/* Quick Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSizingModalOpen(true)}
            className="px-4 py-2.5 rounded-full btn-glass text-stone-700 text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Ruler className="w-3.5 h-3.5 text-[#7A1C30]" />
            <span>{userMeasurements ? `Size ${userMeasurements.size}` : 'Panduan Ukuran'}</span>
          </button>

          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="px-4 py-2.5 rounded-full btn-glass text-[#7A1C30] text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-rose-600" />
            <span>Simpan Look Ini</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 3D Interactive Mannequin Canvas */}
        <div className="lg:col-span-6 sticky top-24">
          <Mannequin3DCanvas
            selectedSilhouette={selectedSilhouette}
            selectedColorway={selectedColorway}
            selectedInner={selectedInner}
            selectedBawahan={selectedBawahan}
            selectedAccessories={selectedAccessories}
            rotationAngle={rotationAngle}
            setRotationAngle={setRotationAngle}
            lightingMode={lightingMode}
            setLightingMode={setLightingMode}
          />
        </div>

        {/* Right: Step-by-Step Mix & Match Panel */}
        <div className="lg:col-span-6 flex flex-col h-full space-y-4">
          <MixMatchPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedSilhouette={selectedSilhouette}
            setSelectedSilhouette={setSelectedSilhouette}
            selectedColorway={selectedColorway}
            setSelectedColorway={setSelectedColorway}
            selectedInner={selectedInner}
            setSelectedInner={setSelectedInner}
            selectedBawahan={selectedBawahan}
            setSelectedBawahan={setSelectedBawahan}
            selectedAccessories={selectedAccessories}
            setSelectedAccessories={setSelectedAccessories}
            onOpenSizingModal={() => setIsSizingModalOpen(true)}
            userCustomMeasurements={userMeasurements}
          />

          {/* Bottom Summary & Direct Booking Action Bar */}
          <div className="bg-[#FAF4F6] rounded-3xl p-5 border border-[#E9D0D8] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                Estimasi Paket Sewa 3 Hari:
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#7A1C30]">
                  Rp{totalPackagePrice.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-stone-400">
                  (Termasuk atasan, inner, bawahan & {selectedAccessories.length} aksesoris)
                </span>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full btn-glass-primary font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Sewa Kombinasi Ini</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      {/* Sizing Modal */}
      <SmartSizingModal
        isOpen={isSizingModalOpen}
        onClose={() => setIsSizingModalOpen(false)}
        selectedSilhouette={selectedSilhouette}
        onApplySize={(meas) => setUserMeasurements(meas)}
      />

      {/* Save Look Modal (Lacoste Style Entry) */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-100">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
              Simpan Look ke Komunitas
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Bagikan paduan kebaya kreasi Anda ke Lookbook publik seperti pada Lacoste Experience Gallery.
            </p>

            {savedSuccess ? (
              <div className="py-8 text-center text-emerald-600 space-y-2">
                <Check className="w-12 h-12 mx-auto" />
                <p className="font-bold text-base">Look Berhasil Disimpan!</p>
                <p className="text-xs text-stone-500">Tersimpan di tab Lookbook & Vote</p>
              </div>
            ) : (
              <form onSubmit={handleSaveLook} className="space-y-4 text-xs">
                <div>
                  <label className="text-stone-700 block font-semibold mb-1">Judul Kreasi Look</label>
                  <input
                    type="text"
                    required
                    value={lookTitle}
                    onChange={(e) => setLookTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-stone-700 block font-semibold mb-1">Nama Pembuat / Akun IG</label>
                  <input
                    type="text"
                    required
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="Contoh: @clarasalsa"
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm"
                  />
                </div>

                <div>
                  <label className="text-stone-700 block font-semibold mb-1">Tujuan Acara / Event</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Wisuda, Lamaran, Kondangan..."
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full btn-glass-primary font-bold text-xs uppercase cursor-pointer"
                  >
                    Simpan & Publikasikan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSaveModalOpen(false)}
                    className="px-5 py-3 rounded-full btn-glass text-stone-600 text-xs font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
