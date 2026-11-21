import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Phone, MapPin, Ruler, CreditCard, Send, CalendarCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STUDIO_CONFIG } from '../../data/financialData';

export function BookingModal({ kebaya, preselectedDate, onClose, onBookingSuccess }) {
  if (!kebaya) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [rentalType, setRentalType] = useState('Dalam Kota (Studio)'); // or 'Luar Kota (Ekspedisi)'
  const [eventDate, setEventDate] = useState(preselectedDate || '2026-11-25');
  const [durationDays, setDurationDays] = useState(3);
  const [lingkarDada, setLingkarDada] = useState(String(kebaya.measurements.bust));
  const [lingkarPinggang, setLingkarPinggang] = useState(String(kebaya.measurements.waist));
  const [lingkarPinggul, setLingkarPinggul] = useState(String(kebaya.measurements.hips));
  const [ukuranKamisol, setUkuranKamisol] = useState('M');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedBooking, setGeneratedBooking] = useState(null);

  // Price calculations
  const basePrice = kebaya.rentalPrice;
  const extraDays = Math.max(0, durationDays - 3);
  const extraDaysPrice = extraDays * (kebaya.additionalDayPrice || 50000);
  const shippingFee = rentalType.includes('Luar Kota') ? 35000 : 0;
  const totalPrice = basePrice + extraDaysPrice + shippingFee;
  const dpAmount = Math.round(totalPrice * 0.5);
  const sisaAmount = totalPrice - dpAmount;

  // Calculate Ambil / Balik dates based on Event date
  const calculateDates = () => {
    try {
      const ev = new Date(eventDate);
      const isLuarKota = rentalType.includes('Luar Kota');
      
      const pickup = new Date(ev);
      pickup.setDate(ev.getDate() - (isLuarKota ? 2 : 1));
      
      const returnDate = new Date(ev);
      returnDate.setDate(ev.getDate() + (durationDays - (isLuarKota ? 2 : 1)));

      return {
        pickupStr: pickup.toISOString().split('T')[0] + ' 10:00',
        returnStr: returnDate.toISOString().split('T')[0] + ' 15:00',
      };
    } catch {
      return { pickupStr: eventDate, returnStr: eventDate };
    }
  };

  const dates = calculateDates();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('Mohon lengkapi nama dan nomor WhatsApp Anda.');
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      id: `RES-${randomNum}`,
      invoiceNo: `RES-${randomNum}`,
      date: new Date().toISOString().split('T')[0],
      customerName,
      phone: phone.startsWith('0') ? '62' + phone.slice(1) : phone,
      address: address || 'Mojokerto / Surabaya',
      kebayaId: kebaya.id,
      kebayaName: kebaya.name,
      rentalType,
      pickupDate: dates.pickupStr,
      returnDate: dates.returnStr,
      durationDays,
      basePrice,
      deposit: kebaya.deposit || 200000,
      discount: 0,
      shippingFee,
      totalPrice,
      paidAmount: dpAmount,
      remainingAmount: sisaAmount,
      status: 'Reserved',
      paymentStatus: 'DP',
      ktpUploaded: true,
      measurements: {
        lingkarDada: `${lingkarDada} cm`,
        lingkarPinggang: `${lingkarPinggang} cm`,
        lingkarPinggul: `${lingkarPinggul} cm`,
        lingkarKetiak: `${kebaya.measurements.armpit || 44} cm`,
        lingkarLenganAtas: "28 cm",
        lingkarSiku: "24 cm",
        lingkarPergelangan: `${kebaya.measurements.wrist || 18} cm`,
        ukuranKamisol: `${ukuranKamisol} (${kebaya.color})`
      },
      fittingNotes: notes || `Reservasi online kebaya ${kebaya.name} untuk tanggal acara ${eventDate}.`
    };

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setGeneratedBooking(newBooking);
    setIsSubmitted(true);
    onBookingSuccess(newBooking);
  };

  // WhatsApp formatted message link
  const getWhatsAppBookingLink = () => {
    if (!generatedBooking) return '#';
    const text = encodeURIComponent(
      `Halo Bywazu Attire,\nSaya ingin konfirmasi reservasi kebaya:\n\n` +
      `*Kode Booking:* ${generatedBooking.id}\n` +
      `*Nama:* ${generatedBooking.customerName}\n` +
      `*Kebaya:* ${generatedBooking.kebayaName} (${generatedBooking.kebayaId})\n` +
      `*Jenis Sewa:* ${generatedBooking.rentalType}\n` +
      `*Tanggal Event:* ${eventDate}\n` +
      `*Pengambilan:* ${generatedBooking.pickupDate}\n` +
      `*Pengembalian:* ${generatedBooking.returnDate}\n` +
      `*Total Tagihan:* Rp${generatedBooking.totalPrice.toLocaleString('id-ID')}\n` +
      `*DP (50%):* Rp${generatedBooking.paidAmount.toLocaleString('id-ID')}\n` +
      `*Sisa Pelunasan:* Rp${generatedBooking.remainingAmount.toLocaleString('id-ID')}\n\n` +
      `Mohon info rekening pembayaran DP untuk kunci jadwal. Terima kasih!`
    );
    return `https://api.whatsapp.com/send?phone=${STUDIO_CONFIG.whatsappNumber}&text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#ECD9DF]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-4 sm:p-8">
            
            {/* Header */}
            <div className="border-b border-rose-100 pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C30]">
                Reservasi Sewa Kebaya
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                {kebaya.name} ({kebaya.code})
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Kunci jadwal kebaya favoritmu dengan DP 50%. Pelunasan saat pengambilan/fitting.
              </p>
            </div>

            <div className="space-y-5">
              
              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Fitri Hidayati"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#7A1C30] focus:ring-1 focus:ring-[#7A1C30] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 085713003249"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#7A1C30] focus:ring-1 focus:ring-[#7A1C30] outline-hidden text-sm"
                  />
                </div>
              </div>

              {/* Rental Type & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Jenis Layanan Sewa
                  </label>
                  <select
                    value={rentalType}
                    onChange={(e) => setRentalType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#7A1C30] focus:ring-1 focus:ring-[#7A1C30] outline-hidden text-sm bg-white"
                  >
                    <option value="Dalam Kota (Studio)">Dalam Kota (Ambil di Studio Bywazu Mojokerto)</option>
                    <option value="Luar Kota (Ekspedisi Paxel/JNE)">Luar Kota (Kirim via Ekspedisi Paxel/JNE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Tanggal Hari H Acara *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#7A1C30] focus:ring-1 focus:ring-[#7A1C30] outline-hidden text-sm"
                  />
                </div>
              </div>

              {/* Automated Schedule Preview */}
              <div className="bg-[#FAF6F7] p-3.5 rounded-xl border border-rose-100 text-xs">
                <span className="font-bold text-[#7A1C30] uppercase tracking-wider block mb-1.5">
                  Estimasi Jadwal Pengambilan & Pengembalian:
                </span>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div>
                    <span className="text-stone-500 block">Jadwal Ambil / Kirim:</span>
                    <strong className="text-stone-900">{dates.pickupStr}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Batas Pengembalian:</span>
                    <strong className="text-stone-900">{dates.returnStr}</strong>
                  </div>
                </div>
              </div>

              {/* Address (for Luar Kota) */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Alamat Pengiriman / Domisili
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Jl. Pemuda No..., Kota/Kabupaten"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#7A1C30] focus:ring-1 focus:ring-[#7A1C30] outline-hidden text-sm"
                />
              </div>

              {/* Measurement Section for Accurate Fitting */}
              <div className="border-t border-stone-200 pt-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <Ruler className="w-4 h-4 text-[#7A1C30]" />
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Ukuran Badan Customer (Untuk Penyesuaian Fitting)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-stone-500 block mb-1">Lingkar Dada (cm)</label>
                    <input
                      type="number"
                      value={lingkarDada}
                      onChange={(e) => setLingkarDada(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-200 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-stone-500 block mb-1">Lingkar Pinggang (cm)</label>
                    <input
                      type="number"
                      value={lingkarPinggang}
                      onChange={(e) => setLingkarPinggang(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-200 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-stone-500 block mb-1">Lingkar Pinggul (cm)</label>
                    <input
                      type="number"
                      value={lingkarPinggul}
                      onChange={(e) => setLingkarPinggul(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-200 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-stone-500 block mb-1">Ukuran Kamisol</label>
                    <select
                      value={ukuranKamisol}
                      onChange={(e) => setUkuranKamisol(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-200 font-semibold bg-white"
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Sewa Kebaya ({durationDays} hari):</span>
                  <span>Rp{basePrice.toLocaleString('id-ID')}</span>
                </div>
                {extraDaysPrice > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Tambahan {extraDays} Hari:</span>
                    <span>Rp{extraDaysPrice.toLocaleString('id-ID')}</span>
                  </div>
                )}
                {shippingFee > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Ongkos Kirim Luar Kota:</span>
                    <span>Rp{shippingFee.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-sm text-stone-900">
                  <span>Total Tagihan:</span>
                  <span className="text-[#7A1C30]">Rp{totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-medium text-emerald-700">
                  <span>Uang Muka (DP 50% untuk lock tgl):</span>
                  <span>Rp{dpAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Sisa Pelunasan (saat fitting/ambil):</span>
                  <span>Rp{sisaAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full btn-glass-primary font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-white" />
                <span>Kirim Permintaan Reservasi</span>
              </button>

            </div>

          </form>
        ) : (
          /* Success Screen with WhatsApp Direct Link */
          <div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#7A1C30]">
                Reservasi Berhasil Dibuat
              </span>
              <h3 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                Terima Kasih, {generatedBooking.customerName}!
              </h3>
              <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
                Nomor Booking Anda adalah <strong className="text-[#7A1C30] font-mono text-base">{generatedBooking.id}</strong>. Data telah otomatis tersimpan ke sistem studio.
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-[#FAF6F7] rounded-2xl p-5 border border-rose-100 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Kebaya:</span>
                <span className="font-bold text-stone-800">{generatedBooking.kebayaName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Jadwal Ambil:</span>
                <span className="font-semibold text-stone-800">{generatedBooking.pickupDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Jadwal Kembali:</span>
                <span className="font-semibold text-stone-800">{generatedBooking.returnDate}</span>
              </div>
              <div className="flex justify-between border-t border-rose-200/60 pt-2 font-bold text-sm">
                <span>DP yang Perlu Dibayar:</span>
                <span className="text-[#7A1C30]">Rp{generatedBooking.paidAmount.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Bukti ke WhatsApp Admin</span>
              </a>

              <button
                onClick={onClose}
                className="py-3.5 px-6 rounded-full btn-glass text-stone-700 font-semibold text-sm transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
