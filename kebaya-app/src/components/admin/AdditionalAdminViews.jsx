import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Download,
  Send,
  Boxes,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  LineChart,
  User,
  History,
  Settings as SettingsIcon,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Plus,
  Eye,
  Check,
  Sparkles
} from 'lucide-react';
import { STUDIO_CONFIG } from '../../data/financialData';

// 1. APPOINTMENT ADMIN VIEW (Jadwal Janji Temu Fitting)
export function AppointmentAdminView({ onNavigateToBookings }) {
  const [filterStudio, setFilterStudio] = useState('all');

  const appointments = [
    {
      id: "APT-101",
      name: "Rani Maulida",
      phone: "081234567801",
      date: "2026-11-21",
      time: "10:00 - 11:30 WIB",
      studio: "The Trowulan Garden A07",
      purpose: "Wisuda Sarjana Unesa",
      dresses: ["BWZ-01 Ariana Rose Gold", "BWZ-04 Zizi Denim"],
      status: "Confirmed"
    },
    {
      id: "APT-102",
      name: "Siti Rahmawati",
      phone: "085712345678",
      date: "2026-11-21",
      time: "13:00 - 14:30 WIB",
      studio: "Sidomulyo VI/18 Prajurit Kulon",
      purpose: "Acara Lamaran & Engagement",
      dresses: ["BWZ-02 Selena Burgundy"],
      status: "Confirmed"
    },
    {
      id: "APT-103",
      name: "Dwi Astuti",
      phone: "081399887711",
      date: "2026-11-22",
      time: "10:30 - 12:00 WIB",
      studio: "The Trowulan Garden A07",
      purpose: "Prewedding Outdoor Trowulan",
      dresses: ["BWZ-11 Couple Set Selena & Beskap"],
      status: "Confirmed"
    },
    {
      id: "APT-104",
      name: "Bella Safitri",
      phone: "082155667788",
      date: "2026-11-22",
      time: "15:00 - 16:30 WIB",
      studio: "Sidomulyo VI/18 Prajurit Kulon",
      purpose: "Wisuda ITS Surabaya",
      dresses: ["BWZ-06 Alara Sage Green", "BWZ-09 Aisha Ice Blue"],
      status: "Completed"
    },
    {
      id: "APT-105",
      name: "Kartika Sari",
      phone: "085233441199",
      date: "2026-11-23",
      time: "16:30 - 18:00 WIB",
      studio: "The Trowulan Garden A07",
      purpose: "Kondangan Resepsi Keluarga",
      dresses: ["BWZ-07 Janggan Modern Hitam"],
      status: "Pending"
    }
  ];

  const filtered = appointments.filter(a => {
    if (filterStudio === 'trowulan') return a.studio.includes('Trowulan');
    if (filterStudio === 'sidomulyo') return a.studio.includes('Sidomulyo');
    return true;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Jadwal Janji Temu Fitting Studio
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Kelola sesi fitting 1-on-1 customer di Home Studio Trowulan &amp; Prajurit Kulon Mojokerto
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStudio}
            onChange={(e) => setFilterStudio(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-hidden"
          >
            <option value="all">Semua Lokasi Studio</option>
            <option value="trowulan">Studio The Trowulan Garden</option>
            <option value="sidomulyo">Studio Sidomulyo Prajurit Kulon</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 border-b border-stone-200/80 text-stone-500 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="py-3.5 px-4">No. Jadwal</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Waktu &amp; Sesi</th>
                <th className="py-3.5 px-4">Lokasi Studio</th>
                <th className="py-3.5 px-4">Keperluan &amp; Pilihan Kebaya</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-rose-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#7A1C30]">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-stone-900">{item.name}</p>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${item.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-emerald-700 font-mono hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{item.phone}</span>
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-stone-800">{item.date}</p>
                    <span className="text-[11px] text-stone-500">{item.time}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1 text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-[#7A1C30] flex-shrink-0" />
                      <span>{item.studio}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-stone-800">{item.purpose}</p>
                    <span className="text-[10px] text-stone-400 block mt-0.5">{item.dresses.join(', ')}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      item.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${item.phone}&text=Halo%20Kak%20${encodeURIComponent(item.name)},%20kami%20dari%20Bywazu%20Attire%20Mojokerto%20mengingatkan%20jadwal%20fitting%20Anda%20pada%20${item.date}%20jam%20${encodeURIComponent(item.time)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-[11px] border border-emerald-200"
                    >
                      <Send className="w-3 h-3 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
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

// 2. RENTAL CALENDAR ADMIN VIEW (Kalender Booking Lengkap)
export function RentalCalendarAdminView({ bookings, onOpenBookingDetail }) {
  const [currentMonth] = useState('November 2026');

  const days = [
    { day: 1, events: [{ code: 'BWZ-01', text: 'Kembali (Fitri)', type: 'return' }, { code: 'BWZ-04', text: 'Fitting (Tyas)', type: 'event' }] },
    { day: 2, events: [{ code: 'BWZ-02', text: 'Kembali (Alma)', type: 'return' }] },
    { day: 3, events: [{ code: 'BWZ-09', text: 'Ambil (Ita)', type: 'pickup' }] },
    { day: 4, events: [{ code: 'BWZ-11', text: 'Fitting (Viona)', type: 'event' }] },
    { day: 5, events: [{ code: 'BWZ-03', text: 'Kembali (Uzy)', type: 'return' }] },
    { day: 6, events: [{ code: 'BWZ-01', text: 'Fitting Wisuda', type: 'event' }] },
    { day: 7, events: [{ code: 'BWZ-07', text: 'Ambil (Anisa)', type: 'pickup' }] },
    { day: 8, events: [{ code: 'BWZ-01', text: 'Ambil Studio', type: 'pickup' }] },
    { day: 9, events: [{ code: 'BWZ-04', text: 'Ambil Paxel', type: 'pickup' }, { code: 'BWZ-02', text: 'Kembali', type: 'return' }] },
    { day: 10, events: [{ code: 'BWZ-01', text: 'Kembali Laundry', type: 'return' }] },
    { day: 11, events: [{ code: 'BWZ-01', text: 'Fitting Lamaran', type: 'event' }] },
    { day: 12, events: [{ code: 'BWZ-01', text: 'Ambil (Fitri)', type: 'pickup' }] },
    { day: 13, events: [{ code: 'BWZ-09', text: 'Fitting Studio', type: 'event' }] },
    { day: 14, events: [{ code: 'BWZ-01', text: 'Kembali Studio', type: 'return' }] },
    { day: 15, events: [] },
    { day: 16, events: [] },
    { day: 17, events: [] },
    { day: 18, events: [{ code: 'BWZ-06', text: 'Kirim JNE Klaten', type: 'pickup' }] },
    { day: 19, events: [] },
    { day: 20, events: [] },
    { day: 21, events: [] },
    { day: 22, events: [{ code: 'BWZ-06', text: 'Kembali Klaten', type: 'return' }] },
    { day: 23, events: [{ code: 'BWZ-03', text: 'Free Laundry', type: 'event' }] },
    { day: 24, events: [{ code: 'BWZ-02', text: 'Free Resize', type: 'event' }] },
    { day: 25, events: [] },
    { day: 26, events: [] },
    { day: 27, events: [] },
    { day: 28, events: [{ code: 'BWZ-11', text: 'Ambil Couple Set', type: 'pickup' }] },
    { day: 29, events: [] },
    { day: 30, events: [{ code: 'BWZ-11', text: 'Kembali Couple', type: 'return' }] },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Kalender Booking &amp; Ketersediaan Kebaya
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Jadwal reservasi sewa, tanggal pengiriman luar kota, dan jeda maintenance pasca sewa
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold bg-white px-3 py-1.5 rounded-xl border border-stone-200">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Ambil / Kirim</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pengembalian</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Fitting / Acara</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="font-serif font-bold text-lg text-stone-900">Bulan: {currentMonth}</h3>
          <span className="text-xs text-stone-500 font-medium">18 Agenda Sewa Aktif</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((d) => (
            <div key={d} className="text-center text-[11px] font-bold text-stone-400 py-1 uppercase tracking-wider">
              {d}
            </div>
          ))}

          {days.map((item) => (
            <div
              key={item.day}
              className={`min-h-[85px] p-2 rounded-2xl border transition-all ${
                item.events.length > 0 ? 'border-rose-200 bg-[#FFFDFD]' : 'border-stone-100 bg-stone-50/40 hover:bg-white'
              }`}
            >
              <span className="text-xs font-bold text-stone-800 block mb-1.5">{item.day}</span>
              <div className="space-y-1">
                {item.events.map((ev, idx) => {
                  let cls = "bg-rose-50 text-[#7A1C30] border-rose-200/60";
                  if (ev.type === 'return') cls = "bg-amber-50 text-amber-800 border-amber-200/60";
                  if (ev.type === 'pickup') cls = "bg-emerald-50 text-emerald-800 border-emerald-200/60";

                  return (
                    <div
                      key={idx}
                      className={`text-[9px] font-semibold p-1 rounded-md border truncate ${cls}`}
                      title={`${ev.code}: ${ev.text}`}
                    >
                      <strong className="block font-mono">{ev.code}</strong>
                      <span className="truncate">{ev.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. INVENTORY STATUS VIEW (Status Inventaris Kebaya Bywazu)
export function InventoryStatusView({ kebayas }) {
  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Status Inventaris &amp; Lokasi Fisik Kebaya
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Pelacakan posisi fisik kebaya (Rak Trowulan, Rak Prajurit Kulon, Dipakai Customer, atau Laundry)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-[#7A1C30] font-semibold text-xs border border-rose-100">
            Total {kebayas.length} Koleksi Terdaftar
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kebayas.map((k, idx) => {
          const loc = idx % 2 === 0 ? "Home Studio Trowulan (Garden A07)" : "Home Studio Sidomulyo (Prajurit Kulon)";
          const condition = idx === 3 ? "Perlu Setrika Uap" : "100% Sempurna";
          const times = k.timesRented || (20 + idx * 2);

          return (
            <div key={k.id} className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-all space-y-3">
              <div className="flex gap-3">
                <img
                  src={k.images && k.images[0] ? k.images[0] : '/images/bywazu/bywazu_ariana_rose_gold.jpg'}
                  alt={k.name}
                  className="w-16 h-20 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#7A1C30] text-xs">{k.code || k.id}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                      k.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {k.status === 'Available' ? 'Ready di Rak' : 'Disewa / Maintenance'}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 truncate mt-0.5">{k.name}</h4>
                  <p className="text-[11px] text-stone-500">LD: {k.measurements.bust} cm &bull; Warna: {k.color}</p>
                  <p className="text-[10px] text-stone-400 mt-1 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#7A1C30] flex-shrink-0" />
                    <span>{loc}</span>
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 grid grid-cols-3 gap-2 text-[10px] text-stone-600 text-center">
                <div className="bg-stone-50 p-1.5 rounded-lg">
                  <span className="text-stone-400 block">Sewa:</span>
                  <strong className="text-stone-800 font-bold">{times}x</strong>
                </div>
                <div className="bg-stone-50 p-1.5 rounded-lg">
                  <span className="text-stone-400 block">Kondisi:</span>
                  <strong className="text-emerald-700 font-bold">{condition}</strong>
                </div>
                <div className="bg-stone-50 p-1.5 rounded-lg">
                  <span className="text-stone-400 block">Tarif/3hr:</span>
                  <strong className="text-[#7A1C30] font-bold">{(k.rentalPrice / 1000)}k</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 4. MAINTENANCE & LAUNDRY VIEW
export function MaintenanceLaundryView() {
  const maintenanceStages = [
    {
      title: "1. Baru Selesai Sewa (H+1)",
      desc: "Kebaya diterima kembali dari customer, inspeksi fisik noda & payet",
      items: [
        { code: "BWZ-02", name: "Selena Burgundy", customer: "Alma (Selesai Wisuda)", tgl: "10 Nov 2026", note: "Noda bedak ringan di kerah, perlu pre-spotting" }
      ]
    },
    {
      title: "2. Proses Cuci Dry Clean Khusus",
      desc: "Pencucian higienis tanpa air keras agar serat brokat dan manik kristal awet",
      items: [
        { code: "BWZ-03", name: "Ginela Maroon", customer: "Uzy Anisaul (Lamaran)", tgl: "09 Nov 2026", note: "Sedang dalam siklus pembersihan dry-clean steril" }
      ]
    },
    {
      title: "3. Perbaikan Payet & Setrika Uap",
      desc: "Pengencangan payet kristal lepas dan steam press suhu terkontrol",
      items: [
        { code: "BWZ-07", name: "Janggan Modern Hitam", customer: "Anisa N (Formal)", tgl: "08 Nov 2026", note: "Steam finish & perbaikan kancing samping" }
      ]
    },
    {
      title: "4. QC Selesai & Ready Masuk Rak",
      desc: "QC 100% lolos, dimasukkan ke garment bag Bywazu siap dipesan kembali",
      items: [
        { code: "BWZ-01", name: "Ariana Rose Gold", customer: "Fitri Hidayati", tgl: "07 Nov 2026", note: "Lolos QC, tersimpan di Rak A01 Home Studio Trowulan" }
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Alur Maintenance &amp; Free Laundry Bywazu
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Proses pemeliharaan terstandarisasi untuk menjamin setiap kebaya diserahkan dalam kondisi 100% bersih, steril, dan wangi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {maintenanceStages.map((stage, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#7A1C30]" />
                <h3 className="font-serif font-bold text-sm text-stone-900">{stage.title}</h3>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed mb-4">{stage.desc}</p>

              <div className="space-y-3">
                {stage.items.map((it, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-[#7A1C30] text-[11px]">{it.code}</span>
                      <span className="text-[10px] text-stone-400">{it.tgl}</span>
                    </div>
                    <p className="font-bold text-stone-800">{it.name}</p>
                    <p className="text-[10px] text-stone-500">Cust: {it.customer}</p>
                    <p className="text-[10px] text-emerald-800 italic bg-emerald-50/80 p-1.5 rounded-lg border border-emerald-100">
                      {it.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-4 w-full py-2 rounded-xl text-xs font-semibold bg-rose-50 text-[#7A1C30] hover:bg-rose-100 transition-colors">
              Update Progres &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. CUSTOMERS CRM VIEW (Pelanggan / CRM)
export function CustomerCRMView({ bookings }) {
  const customers = [
    { name: "Fitri Hidayati", phone: "6285713003249", city: "Mojokerto (Trowulan)", totalRent: 3, totalSpend: 1170000, size: "LD 96cm, LP 74cm (M)", lastOrder: "RES-43068" },
    { name: "Tyas Rizky Amalia", phone: "6289512345678", city: "Surabaya", totalRent: 2, totalSpend: 850000, size: "LD 100cm, LP 80cm (L)", lastOrder: "RES-26640" },
    { name: "Alma", phone: "6281234567890", city: "Mojokerto (Magersari)", totalRent: 2, totalSpend: 780000, size: "LD 94cm, LP 72cm (S)", lastOrder: "RES-50872" },
    { name: "Anisa Nurhidayah", phone: "6282133445566", city: "Mojokerto (Prajurit Kulon)", totalRent: 1, totalSpend: 200000, size: "LD 98cm, LP 76cm (M)", lastOrder: "RES-65778" },
    { name: "Uzy Anisaul Jannah", phone: "6281722245566", city: "Mojokerto (Sooko)", totalRent: 1, totalSpend: 390000, size: "LD 100cm, LP 78cm (L)", lastOrder: "RES-45902" },
    { name: "Ita Umrisa", phone: "6285223344111", city: "Mojokerto (Mojosari)", totalRent: 1, totalSpend: 390000, size: "LD 96cm, LP 75cm (M)", lastOrder: "RES-13313" },
    { name: "Yunita Febriana", phone: "6285375008134", city: "Klaten (Luar Kota)", totalRent: 1, totalSpend: 425000, size: "LD 98cm, LP 76cm (M)", lastOrder: "RES-12697" },
    { name: "Viona", phone: "6281399887766", city: "Surabaya (Luar Kota)", totalRent: 1, totalSpend: 500000, size: "LD 104cm, LP 84cm (XL)", lastOrder: "BK-9985" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Database Pelanggan &amp; CRM Bywazu
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Riwayat fitting, ukuran tubuh tersimpan, dan data loyalitas pelanggan
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 border-b border-stone-200/80 text-stone-500 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Nama Customer</th>
                <th className="py-3.5 px-4">Domisili</th>
                <th className="py-3.5 px-4">Profil Ukuran Tubuh</th>
                <th className="py-3.5 px-4">Total Sewa</th>
                <th className="py-3.5 px-4">Total Belanja</th>
                <th className="py-3.5 px-4">Order Terakhir</th>
                <th className="py-3.5 px-4 text-right">Kontak WA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {customers.map((c, i) => (
                <tr key={i} className="hover:bg-rose-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-stone-900">{c.name}</p>
                    <span className="font-mono text-[11px] text-stone-400">{c.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-700">{c.city}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-1 rounded-md bg-stone-100 font-mono text-[11px] text-stone-700">
                      {c.size}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-800">{c.totalRent}x</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">Rp{c.totalSpend.toLocaleString('id-ID')}</td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">{c.lastOrder}</td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${c.phone}&text=Halo%20Kak%20${encodeURIComponent(c.name)},%20salam%20hangat%20dari%20Bywazu%20Attire%20Mojokerto.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-[11px] border border-emerald-200"
                    >
                      <Send className="w-3 h-3 text-emerald-600" />
                      <span>Chat</span>
                    </a>
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

// 6. INVOICE GENERATOR LIST VIEW
export function InvoiceGeneratorListView({ bookings, onOpenInvoice }) {
  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Invoice Generator &amp; Arsip Tagihan
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Daftar resmi invoice sewa Bywazu Attire, siap cetak PDF dan kirim langsung via WhatsApp
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50/80 border-b border-stone-200/80 text-stone-500 uppercase tracking-wider font-semibold text-[10px]">
            <tr>
              <th className="py-3.5 px-4">No. Invoice</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Kebaya Disewa</th>
              <th className="py-3.5 px-4">Jadwal Sewa</th>
              <th className="py-3.5 px-4">Total Tagihan</th>
              <th className="py-3.5 px-4">Status Bayar</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-rose-50/30 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-[#7A1C30]">
                  {b.invoiceNo || b.id}
                </td>
                <td className="py-3.5 px-4">
                  <p className="font-bold text-stone-900">{b.customerName}</p>
                  <span className="font-mono text-[10px] text-stone-400">{b.phone}</span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-stone-800">
                  {b.kebayaName} ({b.kebayaId})
                </td>
                <td className="py-3.5 px-4 text-stone-600">
                  <span>{b.pickupDate.split(' ')[0]} s/d {b.returnDate.split(' ')[0]}</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-stone-900">
                  Rp{b.totalPrice.toLocaleString('id-ID')}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    b.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {b.paymentStatus}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right space-x-1.5">
                  <button
                    onClick={() => onOpenInvoice(b.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#7A1C30] hover:bg-[#92243C] text-white text-[11px] font-semibold transition-colors"
                  >
                    Buka Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 7. BEP & ROI ANALYSIS VIEW (Analisis BEP & ROI)
export function BepAnalysisView({ kebayas }) {
  const bepData = [
    { code: "BWZ-01", name: "Ariana Rose Gold", modal: 1200000, revenue: 12480000, rented: 32, roi: 420, bepMet: true },
    { code: "BWZ-02", name: "Selena Burgundy", modal: 1200000, revenue: 10920000, rented: 28, roi: 360, bepMet: true },
    { code: "BWZ-04", name: "Zizi Denim Blue", modal: 1100000, revenue: 9360000, rented: 24, roi: 310, bepMet: true },
    { code: "BWZ-03", name: "Ginela Maroon", modal: 1200000, revenue: 7800000, rented: 20, roi: 260, bepMet: true },
    { code: "BWZ-06", name: "Alara Sage Green", modal: 1100000, revenue: 7020000, rented: 18, roi: 235, bepMet: true },
    { code: "BWZ-07", name: "Janggan Modern Hitam", modal: 850000, revenue: 3600000, rented: 18, roi: 210, bepMet: true },
    { code: "BWZ-11", name: "Couple Set Selena", modal: 1800000, revenue: 6000000, rented: 12, roi: 233, bepMet: true },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Analisis Break-Even Point (BEP) &amp; ROI Aset Kebaya
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Perhitungan pengembalian modal awal jahit &amp; beli bahan kebaya terhadap pendapatan sewa kumulatif
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Rata-Rata ROI Studio</span>
          <p className="text-3xl font-bold text-emerald-700 mt-1 font-sans">290%</p>
          <p className="text-xs text-stone-400 mt-0.5">Seluruh koleksi di atas titik impas</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Rata-Rata Payback Period</span>
          <p className="text-3xl font-bold text-stone-900 mt-1 font-sans">3.2 Sewa</p>
          <p className="text-xs text-stone-400 mt-0.5">Modal kembali pada sewa ke-4</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Koleksi Tercepat BEP</span>
          <p className="text-2xl font-bold text-[#7A1C30] mt-1 font-serif">BWZ-01 Ariana</p>
          <p className="text-xs text-stone-400 mt-0.5">Balik modal dalam 2 minggu rilis</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50/80 border-b border-stone-200/80 text-stone-500 uppercase tracking-wider font-semibold text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Koleksi Kebaya</th>
              <th className="py-3.5 px-4">Modal Awal Aset</th>
              <th className="py-3.5 px-4">Frekuensi Sewa</th>
              <th className="py-3.5 px-4">Total Pendapatan</th>
              <th className="py-3.5 px-4">ROI (%)</th>
              <th className="py-3.5 px-4">Status BEP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {bepData.map((b) => (
              <tr key={b.code} className="hover:bg-rose-50/30 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-mono font-bold text-[#7A1C30] text-[11px]">{b.code}</span>
                  <p className="font-bold text-stone-900">{b.name}</p>
                </td>
                <td className="py-3.5 px-4 text-stone-600">Rp{b.modal.toLocaleString('id-ID')}</td>
                <td className="py-3.5 px-4 font-bold text-stone-800">{b.rented}x sewa</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">Rp{b.revenue.toLocaleString('id-ID')}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    +{b.roi}%
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Lunas BEP</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 8. REPORTS VIEW (Laporan Keuangan & Operasional)
export function ReportsView() {
  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Laporan Finansial &amp; Laba Rugi Studio
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Ringkasan pendapatan sewa, beban operasional, dan laba bersih Bywazu Attire Mojokerto
          </p>
        </div>

        <button className="btn-glass-primary px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
          <Download className="w-3.5 h-3.5" />
          <span>Export Laporan Excel / CSV</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-2xs space-y-5">
        <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3">
          Laporan Laba Rugi Periode: November 2026
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-1 text-stone-700 font-semibold">
            <span>Pendapatan Sewa Kebaya Dalam Kota (Studio Mojokerto):</span>
            <span className="font-mono">Rp4.680.000</span>
          </div>
          <div className="flex justify-between py-1 text-stone-700 font-semibold">
            <span>Pendapatan Sewa Kebaya Luar Kota (Ekspedisi):</span>
            <span className="font-mono">Rp1.850.000</span>
          </div>
          <div className="flex justify-between py-2 border-t border-stone-200 font-bold text-sm text-emerald-700">
            <span>TOTAL PENDAPATAN KOTOR:</span>
            <span className="font-mono">Rp6.530.000</span>
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <span className="font-bold text-[10px] uppercase tracking-wider text-rose-800 block">
              Beban Pengeluaran Operasional Studio:
            </span>
            <div className="flex justify-between text-stone-600">
              <span>Beban Cuci Kering Khusus (Free Laundry Kebaya):</span>
              <span className="font-mono">-Rp320.000</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Perawatan Payet, Benang, &amp; Steam Press:</span>
              <span className="font-mono">-Rp125.000</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Kemasan Totebag &amp; Garment Bag Bywazu:</span>
              <span className="font-mono">-Rp80.000</span>
            </div>
            <div className="flex justify-between py-2 border-t border-stone-200 font-bold text-xs text-rose-700">
              <span>TOTAL BEBAN OPERASIONAL:</span>
              <span className="font-mono">-Rp525.000</span>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-[#7A1C30] flex justify-between items-center text-base font-bold text-stone-900">
            <span>LABA BERSIH BERSIH STUDIO (NET PROFIT):</span>
            <span className="font-mono text-xl text-[#7A1C30]">Rp6.005.000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. ACTIVITY LOG VIEW (Audit Log Aktivitas Studio)
export function ActivityLogView() {
  const logs = [
    { time: "2026-11-20 10:45", user: "Admin Owner", action: "Konfirmasi Pelunasan RES-50872 (Alma - Selena Burgundy) sebesar Rp390.000 via BCA", type: "payment" },
    { time: "2026-11-20 09:15", user: "Customer Web", action: "Reservasi online baru RES-43068 oleh Fitri Hidayati (Ariana Rose Gold)", type: "booking" },
    { time: "2026-11-19 16:30", user: "Staff Atelier", action: "Selesai QC & Laundry kebaya BWZ-01 siap masuk Rak A01 Home Studio Trowulan", type: "maintenance" },
    { time: "2026-11-19 14:00", user: "Admin Owner", action: "Generate Invoice resmi RES-26640 Tyas Rizky Amalia & dikirim via WhatsApp", type: "invoice" },
    { time: "2026-11-19 11:20", user: "Admin Owner", action: "Penjadwalan fitting baru APT-101 Rani Maulida di Studio Trowulan", type: "appointment" },
    { time: "2026-11-18 17:00", user: "Staff Atelier", action: "Pencatatan ukuran Free Resize custom LD 96cm untuk reservasi wisuda", type: "sizing" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Activity &amp; Audit Log Sistem
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Catatan riwayat transaksi, perubahan data reservasi, dan aktivitas staf studio secara otomatis
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs p-6 space-y-4">
        {logs.map((lg, i) => (
          <div key={i} className="flex items-start gap-3 pb-3 border-b border-stone-100 last:border-0 last:pb-0 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#7A1C30] flex-shrink-0 mt-1.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-stone-800 leading-relaxed">{lg.action}</p>
              <div className="flex items-center gap-3 text-[10px] text-stone-400 mt-1">
                <span>Waktu: <strong className="text-stone-600 font-mono">{lg.time}</strong></span>
                <span>&bull;</span>
                <span>Oleh: <strong className="text-stone-600">{lg.user}</strong></span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold bg-stone-100 text-stone-600">
              {lg.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 10. SETTINGS VIEW (Pengaturan Studio Bywazu)
export function SettingsView() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Pengaturan Studio Bywazu Attire
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Konfigurasi nomor WhatsApp, alamat studio fitting Mojokerto, aturan uang muka (DP), dan ketentuan operasional
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan berhasil disimpan dan langsung diperbarui di website publik!</span>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="space-y-6 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-2xs text-xs">
        
        {/* Identitas Brand */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
            Identitas Brand &amp; Studio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Nama Brand / Usaha</label>
              <input type="text" defaultValue={STUDIO_CONFIG.name} className="w-full p-2.5 rounded-xl border border-stone-200" />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Akun Instagram</label>
              <input type="text" defaultValue={STUDIO_CONFIG.instagram} className="w-full p-2.5 rounded-xl border border-stone-200" />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Nomor WhatsApp Resmi (Notifikasi)</label>
              <input type="text" defaultValue={STUDIO_CONFIG.whatsappDisplay} className="w-full p-2.5 rounded-xl border border-stone-200 font-mono" />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Besaran DP Keep Kebaya (Rp)</label>
              <input type="number" defaultValue={STUDIO_CONFIG.dpAmount} className="w-full p-2.5 rounded-xl border border-stone-200 font-mono" />
            </div>
          </div>
        </div>

        {/* Lokasi Studio */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
            Lokasi Home Studio Mojokerto
          </h3>
          <div className="space-y-3">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Studio 1 (Trowulan)</label>
              <input type="text" defaultValue="The Trowulan Garden A07, Jatipasar, Trowulan, Mojokerto" className="w-full p-2.5 rounded-xl border border-stone-200" />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Studio 2 (Prajurit Kulon)</label>
              <input type="text" defaultValue="Sidomulyo VI/18, Prajurit Kulon, Kota Mojokerto" className="w-full p-2.5 rounded-xl border border-stone-200" />
            </div>
          </div>
        </div>

        {/* Kebijakan Layanan */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
            Kebijakan Layanan &amp; Ketentuan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
            <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-100 bg-stone-50 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#7A1C30]" />
              <span>Fasilitas Free Resize (Penyesuaian Ukuran Gratis)</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-100 bg-stone-50 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#7A1C30]" />
              <span>Fasilitas Free Laundry (Terima Bersih Pasca Sewa)</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-100 bg-stone-50 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#7A1C30]" />
              <span>Pengiriman Luar Kota via Paxel / JNE YES</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-100 bg-stone-50 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#7A1C30]" />
              <span>Wajib Foto e-KTP Asli Sebagai Jaminan</span>
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="btn-glass-primary px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer shadow-md"
          >
            Simpan Perubahan Pengaturan
          </button>
        </div>

      </form>
    </div>
  );
}

