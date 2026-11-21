import React, { useState } from 'react';
import { COMMUNITY_GALLERY, COLORWAYS, BAWAHAN_LIST } from '../../data/customizerData';
import { Heart, ArrowRight, Check, Share2, Award, Box } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CommunityGallery({ onAdoptLook, onOpenCustomizer }) {
  const [looks, setLooks] = useState(COMMUNITY_GALLERY);
  const [votedIds, setVotedIds] = useState([]);

  const handleVote = (id) => {
    if (votedIds.includes(id)) {
      setLooks(looks.map(l => l.id === id ? { ...l, likes: l.likes - 1 } : l));
      setVotedIds(votedIds.filter(v => v !== id));
    } else {
      setLooks(looks.map(l => l.id === id ? { ...l, likes: l.likes + 1 } : l));
      setVotedIds([...votedIds, id]);
      try {
        confetti({
          particleCount: 40,
          spread: 45,
          origin: { y: 0.7 }
        });
      } catch {}
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header inspired by Lacoste Member Experience */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EBDCE0] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full btn-glass text-[#7A1C30] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C30]" />
            <span>Inspirasi Komunitas & Voting Kreasi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            LOOKBOOK & COMMUNITY CREATIONS
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Pilih dan beri suara (vote) untuk paduan kebaya terfavorit buatan para member atau pakai langsung paduan ini untuk hari acaramu.
          </p>
        </div>

        <button
          onClick={onOpenCustomizer}
          className="px-6 py-3 rounded-full btn-glass-primary font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Box className="w-4 h-4 text-white" />
          <span>Buat Model Sendiri</span>
        </button>
      </div>

      {/* Grid of Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {looks.map((look) => {
          const isVoted = votedIds.includes(look.id);
          const col = COLORWAYS.find(c => c.id === look.colorwayId) || COLORWAYS[0];
          const bawahan = BAWAHAN_LIST.find(b => b.id === look.bawahanId) || BAWAHAN_LIST[0];

          return (
            <div
              key={look.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#ECD9DF] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                
                {/* Visual Header Banner representing the Look */}
                <div 
                  className="relative h-56 p-4 flex flex-col justify-between overflow-hidden bg-stone-900 group-hover:scale-[1.02] transition-transform duration-500"
                >
                  {look.image && (
                    <img
                      src={look.image}
                      alt={look.title}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-85 group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/40 to-black/20" />

                  {/* Top Creator Badge & Vote Button */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="btn-glass px-2.5 py-0.5 rounded-full text-[10px] font-bold text-stone-800 font-mono">
                      {look.id}
                    </span>

                    <button
                      onClick={() => handleVote(look.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
                        isVoted
                          ? 'btn-glass-primary'
                          : 'btn-glass text-stone-800 hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isVoted ? 'fill-current text-white' : 'text-rose-600'}`} />
                      <span>{look.likes}</span>
                    </button>
                  </div>

                  {/* Bottom title in visual */}
                  <div className="relative z-10 text-white">
                    <p className="text-[10px] uppercase tracking-widest text-rose-200 font-medium">
                      {look.event}
                    </p>
                    <h3 className="font-serif text-lg font-bold line-clamp-1">
                      {look.title}
                    </h3>
                  </div>
                </div>

                {/* Creator info and components */}
                <div className="p-4 space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={look.avatar}
                      alt={look.creator}
                      className="w-7 h-7 rounded-full object-cover border border-rose-200"
                    />
                    <div className="overflow-hidden">
                      <p className="font-semibold text-stone-800 truncate">{look.creator}</p>
                      <p className="text-[10px] text-stone-400">Desainer Tamu</p>
                    </div>
                  </div>

                  {/* Look Components Breakdown */}
                  <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200/80 space-y-1 text-[11px] text-stone-600">
                    <div>
                      <span className="text-stone-400">Warna:</span>{' '}
                      <strong className="text-stone-700">{col.name}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400">Bawahan:</span>{' '}
                      <strong className="text-stone-700 line-clamp-1">{bawahan.name}</strong>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {look.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-rose-50 text-[#7A1C30]">
                        #{t}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

              {/* Card Footer with Price & Direct Adoption Button */}
              <div className="p-4 pt-0">
                <div className="border-t border-rose-100/60 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Paket Sewa:</span>
                    <strong className="font-serif text-base text-[#7A1C30]">
                      Rp{look.totalPackage.toLocaleString('id-ID')}
                    </strong>
                  </div>

                  <button
                    onClick={() => onAdoptLook(look)}
                    className="px-4 py-1.5 rounded-full btn-glass-primary text-xs font-semibold shadow-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Sewa Look Ini</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
