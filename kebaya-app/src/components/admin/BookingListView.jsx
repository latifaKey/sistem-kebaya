import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Edit2,
  FileText,
  CreditCard,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export function BookingListView({
  bookings,
  kebebaList,
  onOpenBookingDetail,
  onOpenInvoice,
  onMarkAsPaid,
  onNewBookingClick
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [typeFilter, setTypeFilter] = useState('Semua Layanan');

  // Filter bookings
  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.kebayaName.toLowerCase().includes(search.toLowerCase()) ||
      b.kebayaId.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === 'Semua Status' || b.status.toLowerCase() === statusFilter.toLowerCase();

    const matchType =
      typeFilter === 'Semua Layanan' ||
      (typeFilter === 'Luar Kota' && b.rentalType.includes('Luar Kota')) ||
      (typeFilter === 'Dalam Kota' && b.rentalType.includes('Dalam Kota'));

    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6">
      
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Booking / Rental
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {filtered.length} dari {bookings.length} total booking tercatat di studio
          </p>
        </div>

        <button
          onClick={onNewBookingClick}
          className="px-5 py-2.5 rounded-full btn-glass-primary text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Booking Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar matching video frame 08 */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          
          <div className="sm:col-span-3">
            <label className="text-stone-500 block mb-1 font-medium">Status Booking</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-white outline-hidden focus:border-[#7A1C30]"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Reserved">Reserved</option>
              <option value="Rented">Sedang Disewa (Rented)</option>
              <option value="Completed">Selesai (Completed)</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="text-stone-500 block mb-1 font-medium">Layanan Wilayah</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-white outline-hidden focus:border-[#7A1C30]"
            >
              <option value="Semua Layanan">Semua Layanan</option>
              <option value="Dalam Kota">Dalam Kota (Studio)</option>
              <option value="Luar Kota">Luar Kota (Ekspedisi)</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <label className="text-stone-500 block mb-1 font-medium">Pencarian Cepat</label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari ID, customer, WhatsApp, kebaya..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 outline-hidden focus:border-[#7A1C30]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bookings Table matching video frame 08 */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6F7] text-stone-600 font-bold uppercase tracking-wider text-[10px] border-b border-rose-100">
              <tr>
                <th className="py-4 px-4">BOOKING</th>
                <th className="py-4 px-4">CUSTOMER</th>
                <th className="py-4 px-3">KEBAYA</th>
                <th className="py-4 px-3">SEWA</th>
                <th className="py-4 px-3">KEMBALI</th>
                <th className="py-4 px-3">TOTAL</th>
                <th className="py-4 px-3">STATUS</th>
                <th className="py-4 px-3">PEMBAYARAN</th>
                <th className="py-4 px-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((b) => {
                const isLuarKota = b.rentalType.includes('Luar Kota');
                const isPaid = b.paymentStatus === 'PAID';

                return (
                  <tr key={b.id} className="hover:bg-rose-50/40 transition-colors">
                    {/* Booking ID & Luar Kota Chip */}
                    <td className="py-3.5 px-4">
                      <p className="font-mono font-bold text-stone-900">{b.id}</p>
                      {isLuarKota ? (
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">
                          Luar Kota
                        </span>
                      ) : (
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-medium bg-stone-100 text-stone-600">
                          Studio
                        </span>
                      )}
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-stone-900">{b.customerName}</p>
                      <p className="text-[11px] text-stone-400 font-mono">{b.phone}</p>
                    </td>

                    {/* Kebaya info */}
                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-stone-800">{b.kebayaId}</p>
                      <p className="text-[10px] text-stone-400 truncate max-w-[120px]">{b.kebayaName}</p>
                    </td>

                    {/* Sewa Date */}
                    <td className="py-3.5 px-3">
                      <p className="font-medium text-stone-800">{b.pickupDate.split(' ')[0]}</p>
                      <span className="text-[10px] text-stone-400">{isLuarKota ? 'Kirim H-2' : 'Ambil H-1'}</span>
                    </td>

                    {/* Kembali Date */}
                    <td className="py-3.5 px-3">
                      <p className="font-medium text-stone-800">{b.returnDate.split(' ')[0]}</p>
                      <span className="text-[10px] text-stone-400">Balik H+1</span>
                    </td>

                    {/* Total Price */}
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-stone-900">Rp{b.totalPrice.toLocaleString('id-ID')}</p>
                      {b.remainingAmount > 0 && (
                        <p className="text-[10px] text-rose-600">Sisa: Rp{b.remainingAmount.toLocaleString('id-ID')}</p>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'Completed'
                          ? 'bg-stone-100 text-stone-700'
                          : b.status === 'Rented'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    {/* Payment Badge */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {b.paymentStatus}
                      </span>
                    </td>

                    {/* Actions Column matching video */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!isPaid && (
                          <button
                            onClick={() => onMarkAsPaid(b.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                            title="Tandai Sisa Pembayaran Lunas"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Tandai Lunas</span>
                          </button>
                        )}

                        <button
                          onClick={() => onOpenInvoice(b.id)}
                          className="px-2 py-1 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 text-[11px] font-medium"
                          title="Lihat Invoice"
                        >
                          Invoice
                        </button>

                        <button
                          onClick={() => onOpenBookingDetail(b)}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF0F3] hover:bg-[#7A1C30] text-[#7A1C30] hover:text-white text-[11px] font-bold transition-colors"
                        >
                          Detail &rarr;
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
