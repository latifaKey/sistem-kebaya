import React from 'react';
import { Bell, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export function NotificationCenter({ notifications, onOpenInvoice }) {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold text-stone-900">
          Notification Center
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Semua permintaan reservasi baru, peringatan otomatis booking, pembayaran, dan inventory
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#7A1C30]" />
          <span>Peringatan & Notifikasi Sistem</span>
        </h3>

        <div className="divide-y divide-stone-100 text-xs">
          {notifications.map((n) => (
            <div key={n.id} className="py-3.5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                  n.urgent ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'
                }`} />
                <div>
                  <p className="font-semibold text-stone-800">{n.message}</p>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">{n.date}</span>
                </div>
              </div>

              {n.bookingId && (
                <button
                  onClick={() => onOpenInvoice(n.bookingId)}
                  className="px-3 py-1 rounded-lg bg-rose-50 hover:bg-[#7A1C30] text-[#7A1C30] hover:text-white text-[11px] font-bold transition-colors whitespace-nowrap"
                >
                  Buka Invoice &rarr;
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
