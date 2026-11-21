import React, { useState } from 'react';
import { Search, Plus, CheckCircle2, MessageSquare, FileText, Trash2 } from 'lucide-react';
import { INITIAL_PAYMENTS, STUDIO_CONFIG } from '../../data/financialData';

export function PaymentView({ onOpenInvoice }) {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [search, setSearch] = useState('');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // New payment form state
  const [newCust, setNewCust] = useState('');
  const [newBookingId, setNewBookingId] = useState('');
  const [newType, setNewType] = useState('Pelunasan');
  const [newAmount, setNewAmount] = useState('200000');
  const [newShipping, setNewShipping] = useState('0');
  const [isLuarKota, setIsLuarKota] = useState(false);

  const totalRecorded = payments.reduce((sum, p) => sum + p.amount + (p.shippingFee || 0), 15088725);

  const filtered = payments.filter(p =>
    p.customerName.toLowerCase().includes(search.toLowerCase()) ||
    p.bookingId.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!newCust || !newBookingId) return;

    const newEntry = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      bookingId: newBookingId,
      customerName: newCust,
      isLuarKota,
      type: newType,
      amount: parseInt(newAmount) || 0,
      shippingFee: parseInt(newShipping) || 0,
      status: 'PAID'
    };

    setPayments([newEntry, ...payments]);
    setIsRecordModalOpen(false);
    setNewCust('');
    setNewBookingId('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Payment Management
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Total penerimaan tercatat: <strong className="text-emerald-700 font-serif text-sm">Rp{totalRecorded.toLocaleString('id-ID')}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="px-5 py-2.5 rounded-full btn-glass-primary text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Catat Pembayaran</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs max-w-md relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari booking, nama, nominal, jenis..."
          className="w-full pl-9 pr-3 py-1.5 text-xs outline-hidden"
        />
      </div>

      {/* Payments Table directly matching video frame 10 */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6F7] text-stone-600 font-bold uppercase tracking-wider text-[10px] border-b border-rose-100">
              <tr>
                <th className="py-4 px-4">TANGGAL</th>
                <th className="py-4 px-4">BOOKING</th>
                <th className="py-4 px-4">CUSTOMER</th>
                <th className="py-4 px-3">JENIS</th>
                <th className="py-4 px-3">NOMINAL</th>
                <th className="py-4 px-3">ONGKIR</th>
                <th className="py-4 px-3">STATUS</th>
                <th className="py-4 px-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-600">{p.date}</td>
                  
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-stone-900">{p.bookingId}</span>
                    {p.isLuarKota && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">
                        Luar Kota
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-stone-900">{p.customerName}</td>
                  
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.type === 'DP' ? 'bg-purple-100 text-purple-800' : 'bg-rose-100 text-[#7A1C30]'
                    }`}>
                      {p.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-bold text-stone-900">
                    Rp{p.amount.toLocaleString('id-ID')}
                  </td>

                  <td className="py-3.5 px-3 text-stone-500">
                    {p.shippingFee > 0 ? `Rp${p.shippingFee.toLocaleString('id-ID')}` : '-'}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {p.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://api.whatsapp.com/send?phone=${STUDIO_CONFIG.whatsappNumber}&text=Kwitansi%20pembayaran%20${p.bookingId}%20telah%20diverifikasi.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-semibold"
                      >
                        WA Tagihan
                      </a>
                      <button
                        onClick={() => onOpenInvoice(p.bookingId)}
                        className="px-2 py-1 rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 text-[10px]"
                      >
                        Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100">
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
              Catat Pembayaran Masuk
            </h3>

            <form onSubmit={handleAddPayment} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 block mb-1">ID Booking / Invoice *</label>
                <input
                  type="text"
                  required
                  placeholder="RES-..."
                  value={newBookingId}
                  onChange={(e) => setNewBookingId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 font-mono"
                />
              </div>

              <div>
                <label className="text-stone-600 block mb-1">Nama Customer *</label>
                <input
                  type="text"
                  required
                  value={newCust}
                  onChange={(e) => setNewCust(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-600 block mb-1">Jenis Pembayaran</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="DP">Uang Muka (DP)</option>
                    <option value="Pelunasan">Pelunasan</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-600 block mb-1">Nominal (Rp)</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#7A1C30] text-white font-bold text-xs uppercase"
                >
                  Simpan Pembayaran
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-3 rounded-full border border-stone-200 text-stone-600 text-xs"
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
