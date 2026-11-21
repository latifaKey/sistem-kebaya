import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle2, ShieldCheck, Send, CalendarCheck } from 'lucide-react';
import { STUDIO_CONFIG } from '../../data/financialData';
import confetti from 'canvas-confetti';

export function JanjiTemuModal({ onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-24');
  const [timeSlot, setTimeSlot] = useState('10:00 - 11:30 WIB');
  const [eventPurpose, setEventPurpose] = useState('Wisuda Sarjana');
  const [submitted, setSubmitted] = useState(false);

  const slots = [
    '09:00 - 10:30 WIB',
    '10:30 - 12:00 WIB',
    '13:00 - 14:30 WIB',
    '15:00 - 16:30 WIB',
    '16:30 - 18:00 WIB',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}
    setSubmitted(true);
  };

  const getWaLink = () => {
    const text = encodeURIComponent(
      `Halo Bywazu Attire,\nSaya ingin konfirmasi Jadwal Janji Temu Fitting Studio:\n\n` +
      `*Nama:* ${name}\n` +
      `*No WA:* ${phone}\n` +
      `*Tanggal Fitting:* ${date}\n` +
      `*Sesi Jam:* ${timeSlot}\n` +
      `*Keperluan Acara:* ${eventPurpose}\n\n` +
      `Mohon reservasi slot fitting untuk saya. Terima kasih!`
    );
    return `https://api.whatsapp.com/send?phone=${STUDIO_CONFIG.whatsappNumber}&text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-100">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-rose-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C30]">
                Private Fitting Experience
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Jadwalkan Janji Temu Fitting Studio
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Nikmati sesi fitting 1-on-1 eksklusif didampingi stylist busana kami di Home Studio Bywazu Attire Mojokerto. Bebas coba hingga 3 kebaya.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 block font-semibold mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Anisa Rahmawati"
                  className="w-full p-2.5 rounded-xl border border-stone-200 text-sm"
                />
              </div>

              <div>
                <label className="text-stone-700 block font-semibold mb-1">No. WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 08123456789"
                  className="w-full p-2.5 rounded-xl border border-stone-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-700 block font-semibold mb-1">Tanggal Fitting *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm"
                  />
                </div>

                <div>
                  <label className="text-stone-700 block font-semibold mb-1">Pilihan Sesi Jam *</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-xs bg-white font-medium"
                  >
                    {slots.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-stone-700 block font-semibold mb-1">Keperluan Acara</label>
                <input
                  type="text"
                  value={eventPurpose}
                  onChange={(e) => setEventPurpose(e.target.value)}
                  placeholder="Wisuda Undip, Lamaran, Pernikahan..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 text-sm"
                />
              </div>
            </div>

            <div className="bg-[#FAF6F7] p-3 rounded-xl border border-rose-100 flex items-center gap-2 text-xs text-stone-600">
              <MapPin className="w-4 h-4 text-[#7A1C30] flex-shrink-0" />
              <span>Lokasi: {STUDIO_CONFIG.address} (Bywazu Attire Mojokerto)</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-full btn-glass-primary font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Konfirmasi Jadwal Fitting
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3.5 rounded-full btn-glass text-stone-600 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Jadwal Fitting Dikonfirmasi!
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Terima kasih, {name}. Sesi fitting Anda telah kami jadwalkan pada <strong>{date} ({timeSlot})</strong>.
            </p>
            <div className="flex flex-col gap-2 pt-3">
              <a
                href={getWaLink()}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Detail ke WhatsApp Studio</span>
              </a>
              <button
                onClick={onClose}
                className="py-2.5 text-xs text-stone-500 hover:underline"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function HowToRentView() {
  const steps = [
    {
      num: "01",
      title: "Pilih Kebaya & Cek Tanggal",
      desc: "Pilih kebaya favorit Anda di katalog. Pastikan tanggal acara berstatus 'Tersedia' pada kalender interaktif."
    },
    {
      num: "02",
      title: "Booking Online & Pembayaran DP",
      desc: "Isi data pemesan serta ukuran badan. Lakukan pembayaran Down Payment (DP) 50% untuk mengunci kebaya di tanggal pilihan Anda."
    },
    {
      num: "03",
      title: "Pengambilan & Fitting Akhir",
      desc: "Kebaya dapat diambil di Studio Bywazu Mojokerto pada H-1 acara (atau dikirim H-2 untuk luar kota). Lakukan pelunasan sisa dan penyerahan jaminan KTP."
    },
    {
      num: "04",
      title: "Pengembalian & Jaminan Kembali",
      desc: "Kembalikan kebaya pada H+1 acara sebelum jam 17:00 WIB. Anda tidak perlu mencuci kebaya; proses dry clean higienis ditangani sepenuhnya oleh pihak studio."
    }
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C30]">
          Panduan Praktis
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
          CARA SEWA & KETENTUAN STUDIO
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-2">
          Proses sewa kebaya mudah, transparan, dan terpercaya baik untuk pelanggan dalam kota maupun pengiriman ke seluruh wilayah Indonesia.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {steps.map((st) => (
          <div key={st.num} className="bg-white rounded-3xl p-6 border border-[#ECD9DF] shadow-xs relative">
            <span className="font-serif text-4xl font-bold text-[#E2BAC4] block mb-3">
              {st.num}
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
              {st.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Terms and Conditions Accordion Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECD9DF] shadow-xs max-w-4xl mx-auto">
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#7A1C30]" />
          <span>Syarat & Ketentuan Umum Sewa</span>
        </h3>
        <ul className="space-y-2.5 text-xs text-stone-600 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#7A1C30] font-bold">&bull;</span>
            <span>Durasi sewa standar adalah <strong>3 hari</strong> (H-1 Pengambilan, Hari H Pemakaian, H+1 Pengembalian).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7A1C30] font-bold">&bull;</span>
            <span>Untuk <strong>sewa luar kota</strong>, kebaya dikirim H-2 menggunakan Paxel / JNE YES agar tiba tepat waktu. Dikenakan tambahan deposit jaminan dan ongkir.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7A1C30] font-bold">&bull;</span>
            <span>Customer wajib menyerahkan foto e-KTP asli yang masih berlaku sebagai data verifikasi identitas penyewa.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7A1C30] font-bold">&bull;</span>
            <span><strong>Dilarang mencuci sendiri</strong> kebaya yang disewa. Perawatan, pencucian khusus dry-clean, dan setrika uap merupakan tanggung jawab studio.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7A1C30] font-bold">&bull;</span>
            <span>Keterlambatan pengembalian dikenakan denda sesuai tarif tambahan harian yang berlaku pada kebaya terkait.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
