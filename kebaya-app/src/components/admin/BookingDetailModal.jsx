import React, { useState } from 'react';
import {
  X,
  Phone,
  Ruler,
  Calendar,
  CheckCircle2,
  FileText,
  Send,
  Trash2,
  Edit,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { STUDIO_CONFIG } from '../../data/financialData';

export function BookingDetailModal({
  booking,
  onClose,
  onOpenInvoice,
  onUpdateStatus,
  onMarkAsPaid,
  onDeleteBooking
}) {
  if (!booking) return null;

  const [isEditingSizes, setIsEditingSizes] = useState(false);
  const [sizes, setSizes] = useState(booking.measurements || {
    lingkarDada: '96 cm',
    lingkarPinggang: '74 cm',
    lingkarPinggul: '98 cm',
    lingkarKetiak: '43 cm',
    lingkarLenganAtas: '28 cm',
    lingkarSiku: '24 cm',
    lingkarPergelangan: '17 cm',
    ukuranKamisol: 'M'
  });

  const isPaid = booking.paymentStatus === 'PAID';

  const getWaChatLink = () => {
    const text = encodeURIComponent(
      `Halo Kak ${booking.customerName},\nDari ${STUDIO_CONFIG.name} (${STUDIO_CONFIG.instagram}) Mojokerto mengonfirmasi reservasi sewa kebaya ${booking.kebayaName} (${booking.id}).\n\n` +
      `Jadwal Ambil: ${booking.pickupDate}\nJadwal Kembali: ${booking.returnDate}\nSisa Pelunasan: Rp${booking.remainingAmount.toLocaleString('id-ID')}.\n\n` +
      `Ditunggu kehadirannya di studio untuk fitting dan pengambilan ya Kak!`
    );
    return `https://api.whatsapp.com/send?phone=${booking.phone}&text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header directly matching frame 07 */}
        <div className="flex items-center gap-3 border-b border-rose-100 pb-4 mb-6">
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {booking.id} &mdash; {booking.kebayaId}
          </h3>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-[#7A1C30]">
            {booking.rentalType}
          </span>
        </div>

        {/* Booking Info 2-Column Grid matching frame 07 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-6">
          
          {/* Left Column: Customer & Dates */}
          <div className="space-y-3 bg-[#FAF8F6] p-4 rounded-2xl border border-stone-200/80">
            <div className="flex justify-between">
              <span className="text-stone-500">Customer:</span>
              <strong className="text-stone-900 text-sm">{booking.customerName}</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-stone-500">WhatsApp:</span>
              <a
                href={`https://api.whatsapp.com/send?phone=${booking.phone}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 font-mono font-bold flex items-center gap-1 hover:underline"
              >
                <Phone className="w-3 h-3" />
                <span>{booking.phone}</span>
              </a>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Kebaya:</span>
              <span className="font-semibold text-stone-800">{booking.kebayaName} ({booking.kebayaId})</span>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Tanggal Ambil:</span>
              <span className="font-bold text-stone-900">{booking.pickupDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Tanggal Kembali:</span>
              <span className="font-bold text-stone-900">{booking.returnDate}</span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-stone-200">
              <span className="text-stone-500">Status Sewa:</span>
              <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] bg-purple-100 text-purple-800">
                {booking.status}
              </span>
            </div>
          </div>

          {/* Right Column: Financials matching frame 07 */}
          <div className="space-y-3 bg-[#FAF8F6] p-4 rounded-2xl border border-stone-200/80">
            <div className="flex justify-between">
              <span className="text-stone-500">Harga Sewa:</span>
              <span className="font-semibold text-stone-800">Rp{booking.basePrice.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Diskon / Promo:</span>
              <span className="text-stone-600">-Rp{booking.discount.toLocaleString('id-ID')}</span>
            </div>

            {booking.shippingFee > 0 && (
              <div className="flex justify-between">
                <span className="text-stone-500">Ongkos Kirim:</span>
                <span className="text-stone-600">Rp{booking.shippingFee.toLocaleString('id-ID')}</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-sm text-stone-900 pt-1 border-t border-stone-200">
              <span>Total Tagihan:</span>
              <span className="text-[#7A1C30]">Rp{booking.totalPrice.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between font-semibold text-emerald-700">
              <span>Sudah Dibayar (DP):</span>
              <span>Rp{booking.paidAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between font-bold text-rose-700">
              <span>Sisa Pelunasan:</span>
              <span>Rp{booking.remainingAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-stone-200">
              <span className="text-stone-500">Payment Status:</span>
              <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {booking.paymentStatus}
              </span>
            </div>
          </div>

        </div>

        {/* Detail Ukuran & Catatan Fitting (Tanggal Sewa Ini) matching frame 07 */}
        <div className="bg-white rounded-2xl p-4 border border-[#ECD9DF] shadow-xs mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#7A1C30] flex items-center gap-1.5">
              <Ruler className="w-4 h-4" />
              Detail Ukuran & Catatan Fitting (Tanggal Sewa Ini)
            </h4>
            <button
              onClick={() => setIsEditingSizes(!isEditingSizes)}
              className="text-[11px] text-stone-500 hover:text-[#7A1C30] underline font-semibold"
            >
              {isEditingSizes ? 'Simpan Ukuran' : 'Ubah Ukuran'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-stone-500 block">Lingkar Dada:</span>
              {isEditingSizes ? (
                <input
                  type="text"
                  value={sizes.lingkarDada}
                  onChange={(e) => setSizes({ ...sizes, lingkarDada: e.target.value })}
                  className="w-full p-1 border rounded-md"
                />
              ) : (
                <strong className="text-stone-800">{sizes.lingkarDada}</strong>
              )}
            </div>

            <div>
              <span className="text-stone-500 block">Lingkar Pinggang:</span>
              {isEditingSizes ? (
                <input
                  type="text"
                  value={sizes.lingkarPinggang}
                  onChange={(e) => setSizes({ ...sizes, lingkarPinggang: e.target.value })}
                  className="w-full p-1 border rounded-md"
                />
              ) : (
                <strong className="text-stone-800">{sizes.lingkarPinggang}</strong>
              )}
            </div>

            <div>
              <span className="text-stone-500 block">Lingkar Pinggul:</span>
              {isEditingSizes ? (
                <input
                  type="text"
                  value={sizes.lingkarPinggul}
                  onChange={(e) => setSizes({ ...sizes, lingkarPinggul: e.target.value })}
                  className="w-full p-1 border rounded-md"
                />
              ) : (
                <strong className="text-stone-800">{sizes.lingkarPinggul}</strong>
              )}
            </div>

            <div>
              <span className="text-stone-500 block">Lingkar Ketiak:</span>
              <strong className="text-stone-800">{sizes.lingkarKetiak}</strong>
            </div>

            <div>
              <span className="text-stone-500 block">Lingkar Lengan Atas:</span>
              <strong className="text-stone-800">{sizes.lingkarLenganAtas}</strong>
            </div>

            <div>
              <span className="text-stone-500 block">Lingkar Siku:</span>
              <strong className="text-stone-800">{sizes.lingkarSiku}</strong>
            </div>

            <div>
              <span className="text-stone-500 block">Pergelangan Tangan:</span>
              <strong className="text-stone-800">{sizes.lingkarPergelangan}</strong>
            </div>

            <div>
              <span className="text-stone-500 block">Ukuran Kamisol:</span>
              <strong className="text-stone-800">{sizes.ukuranKamisol}</strong>
            </div>
          </div>

          {booking.fittingNotes && (
            <p className="mt-3 pt-2.5 border-t border-rose-100 text-[11px] text-stone-500 italic">
              Catatan fitting: {booking.fittingNotes}
            </p>
          )}
        </div>

        {/* Modal Action Buttons matching frame 07 */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200">
          
          {/* Tandai Diambil (-> Rented) */}
          {booking.status === 'Reserved' && (
            <button
              onClick={() => onUpdateStatus(booking.id, 'Rented')}
              className="px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase shadow-xs transition-colors"
            >
              Tandai Diambil (&rarr; Rented)
            </button>
          )}

          {booking.status === 'Rented' && (
            <button
              onClick={() => onUpdateStatus(booking.id, 'Completed')}
              className="px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase shadow-xs transition-colors"
            >
              Tandai Kembali (&rarr; Completed)
            </button>
          )}

          {/* Tandai Lunas (Green button) */}
          {!isPaid && (
            <button
              onClick={() => onMarkAsPaid(booking.id)}
              className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Tandai Lunas (Rp{booking.remainingAmount.toLocaleString('id-ID')})</span>
            </button>
          )}

          {/* Lihat Invoice */}
          <button
            onClick={() => onOpenInvoice(booking.id)}
            className="px-4 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat Invoice</span>
          </button>

          {/* Kirim WhatsApp */}
          <a
            href={getWaChatLink()}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Send className="w-4 h-4 text-emerald-600" />
            <span>Kirim WhatsApp</span>
          </a>

          {/* Hapus Booking */}
          <button
            onClick={() => {
              if (window.confirm(`Yakin ingin menghapus booking ${booking.id}?`)) {
                onDeleteBooking(booking.id);
                onClose();
              }
            }}
            className="px-3.5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold ml-auto transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>

        </div>

      </div>
    </div>
  );
}
