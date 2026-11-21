import React from 'react';
import { Download, Search, FileSpreadsheet } from 'lucide-react';

export function TransactionView({ bookings }) {
  const exportCsv = () => {
    const headers = ["Invoice", "Customer", "Kebaya", "Sewa", "Kembali", "Total", "Dibayar", "Sisa", "Payment Status"];
    const rows = bookings.map(b => [
      b.id,
      b.customerName,
      b.kebayaId,
      b.pickupDate.split(' ')[0],
      b.returnDate.split(' ')[0],
      b.totalPrice,
      b.paidAmount,
      b.remainingAmount,
      b.paymentStatus
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Transaksi_BywazuAttire_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      
      {/* Header matching frame 09 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Transaction Management
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {bookings.length} transaksi rental tercatat rapi
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Excel (Rapih)</span>
        </button>
      </div>

      {/* Transactions Table directly matching video frame 09 */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6F7] text-stone-600 font-bold uppercase tracking-wider text-[10px] border-b border-rose-100">
              <tr>
                <th className="py-4 px-4">INVOICE</th>
                <th className="py-4 px-4">CUSTOMER</th>
                <th className="py-4 px-3">KEBAYA</th>
                <th className="py-4 px-3">SEWA - KEMBALI</th>
                <th className="py-4 px-3">TOTAL</th>
                <th className="py-4 px-3">DIBAYAR</th>
                <th className="py-4 px-3">SISA</th>
                <th className="py-4 px-4 text-right">PAYMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-900">{b.id}</td>
                  <td className="py-3.5 px-4 font-bold text-stone-900">{b.customerName}</td>
                  <td className="py-3.5 px-3 font-semibold text-stone-800">{b.kebayaId}</td>
                  <td className="py-3.5 px-3 text-stone-600">
                    {b.pickupDate.split(' ')[0]} &rarr; {b.returnDate.split(' ')[0]}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-stone-900">
                    Rp{b.totalPrice.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-emerald-700">
                    Rp{b.paidAmount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-rose-700">
                    Rp{b.remainingAmount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                      b.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {b.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
