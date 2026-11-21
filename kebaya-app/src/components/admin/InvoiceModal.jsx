import React from 'react';
import { X, Printer, Send, CheckCircle2, FileText, Download } from 'lucide-react';
import { STUDIO_CONFIG } from '../../data/financialData';

export function InvoiceModal({ booking, onClose, onMarkAsPaid }) {
  if (!booking) return null;

  const isPaid = booking.paymentStatus === 'PAID';

  const handlePrint = () => {
    window.print();
  };

  const getWaInvoiceLink = () => {
    const text = encodeURIComponent(
      `*INVOICE SEWA KEBAYA — ${STUDIO_CONFIG.name.toUpperCase()}*\n` +
      `No. Invoice: ${booking.id}\n` +
      `Tanggal: ${booking.date}\n` +
      `----------------------------------------\n` +
      `*Customer:* ${booking.customerName}\n` +
      `*WhatsApp:* ${booking.phone}\n` +
      `*Kebaya:* ${booking.kebayaName} (${booking.kebayaId})\n` +
      `*Layanan:* ${booking.rentalType}\n` +
      `*Jadwal Ambil:* ${booking.pickupDate}\n` +
      `*Jadwal Kembali:* ${booking.returnDate}\n` +
      `----------------------------------------\n` +
      `*Total Tagihan:* Rp${booking.totalPrice.toLocaleString('id-ID')}\n` +
      `*Sudah Dibayar (DP):* Rp${booking.paidAmount.toLocaleString('id-ID')}\n` +
      `*Sisa Pelunasan:* Rp${booking.remainingAmount.toLocaleString('id-ID')}\n` +
      `*Status:* ${booking.paymentStatus}\n` +
      `----------------------------------------\n` +
      `_Syarat & Ketentuan: DP tidak dapat dikembalikan jika pembatalan sepihak._\n` +
      `Terima kasih telah mempercayakan busana kebaya Anda pada ${STUDIO_CONFIG.instagram}!`
    );
    return `https://api.whatsapp.com/send?phone=${booking.phone}&text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="no-print absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Title */}
        <div className="no-print border-b border-rose-100 pb-3 mb-6 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A1C30]">
            Invoice {booking.id}
          </span>
        </div>

        {/* PRINTABLE OFFICIAL INVOICE TEMPLATE (Directly matching frame 149s) */}
        <div id="printable-invoice" className="bg-white p-6 sm:p-8 border border-stone-200 rounded-2xl shadow-xs text-xs space-y-6">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-[#7A1C30] gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#7A1C30]">
                {STUDIO_CONFIG.handle}
              </h2>
              <p className="text-[11px] text-stone-600 font-medium">
                {STUDIO_CONFIG.tagline}
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">
                {STUDIO_CONFIG.address} &bull; WhatsApp: {STUDIO_CONFIG.whatsappDisplay}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="font-serif text-lg font-bold uppercase tracking-wider text-stone-900 block">
                INVOICE RENTAL
              </span>
              <p className="font-mono font-bold text-sm text-[#7A1C30]">
                {booking.id}
              </p>
              <p className="text-[11px] text-stone-400">
                Tanggal: {booking.date}
              </p>
            </div>
          </div>

          {/* Two Columns: Pemesan & Rincian Sewa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Column 1: PEMESAN / CUST */}
            <div className="space-y-1.5">
              <span className="font-bold text-[10px] tracking-widest uppercase text-[#7A1C30] block mb-1">
                PEMESAN / CUST
              </span>
              <p className="font-bold text-sm text-stone-900">{booking.customerName}</p>
              <p className="font-mono text-stone-600">WhatsApp: {booking.phone}</p>
              <p className="text-stone-500">Alamat: {booking.address || '-'}</p>
            </div>

            {/* Column 2: RINCIAN SEWA */}
            <div className="space-y-1.5 sm:text-right">
              <span className="font-bold text-[10px] tracking-widest uppercase text-[#7A1C30] block mb-1">
                RINCIAN SEWA
              </span>
              <p className="font-semibold text-stone-900">
                Kebaya: <strong>{booking.kebayaId} &mdash; {booking.kebayaName}</strong>
              </p>
              <p className="text-stone-600">
                Jenis Sewa: <span className="font-medium">{booking.rentalType}</span>
              </p>
              <p className="text-stone-600">
                Tgl Ambil: <strong>{booking.pickupDate}</strong>
              </p>
              <p className="text-stone-600">
                Tgl Kembali: <strong>{booking.returnDate}</strong>
              </p>
              <p className="text-stone-500">
                Durasi: {booking.durationDays} Hari
              </p>
            </div>

          </div>

          {/* Pricing Table matching frame 149s */}
          <div className="border-t border-stone-200 pt-4 space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>Harga Sewa Kebaya:</span>
              <span>Rp{booking.basePrice.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Uang Muka (DP Minimum 50%):</span>
              <span>Rp{booking.paidAmount.toLocaleString('id-ID')}</span>
            </div>

            {booking.discount > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Diskon / Potongan:</span>
                <span>-Rp{booking.discount.toLocaleString('id-ID')}</span>
              </div>
            )}

            {booking.shippingFee > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Ongkos Kirim Luar Kota:</span>
                <span>Rp{booking.shippingFee.toLocaleString('id-ID')}</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-base text-stone-900 border-t border-stone-200 pt-2">
              <span>Total Tagihan:</span>
              <span className="text-[#7A1C30]">Rp{booking.totalPrice.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between font-semibold text-emerald-700">
              <span>Pembayaran Diterima [{booking.paymentStatus}]:</span>
              <span>Rp{booking.paidAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between font-bold text-sm text-rose-700">
              <span>Sisa Pelunasan:</span>
              <span>Rp{booking.remainingAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${
                isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                STATUS: {booking.paymentStatus}
              </span>
            </div>
          </div>

          {/* Footer Terms from Video frame 149s */}
          <p className="text-[10px] text-stone-400 italic pt-2 border-t border-stone-100 leading-relaxed text-center sm:text-left">
            *Syarat & Ketentuan: Berlaku untuk reservasi & DP (Down Payment) tidak dapat ditarik kembali jika sewa dibatalkan sepihak oleh pelanggan.
          </p>

        </div>

        {/* Modal Action Buttons matching video frame 149s */}
        <div className="no-print flex flex-wrap items-center gap-2 pt-6 mt-2">
          
          {/* Tandai Lunas Button */}
          {!isPaid && (
            <button
              onClick={() => onMarkAsPaid(booking.id)}
              className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Tandai Lunas (Rp{booking.remainingAmount.toLocaleString('id-ID')})</span>
            </button>
          )}

          {/* Print / Download PDF */}
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Print / Download PDF</span>
          </button>

          {/* Send via WhatsApp */}
          <a
            href={getWaInvoiceLink()}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Send className="w-4 h-4 text-emerald-600" />
            <span>Send via WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs ml-auto"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
