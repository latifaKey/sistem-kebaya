// Official Financial and Operational Data for Bywazu Attire (@bywazu.attire) — Mojokerto

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "payment",
    title: "Pembayaran Belum Lunas",
    message: "Pembayaran Fitri Hidayati (RES-43068) belum lunas — sisa Rp200.000.",
    date: "7 Nov 2026",
    urgent: true,
    bookingId: "RES-43068"
  },
  {
    id: "notif-2",
    type: "payment",
    title: "Pembayaran Belum Lunas",
    message: "Pembayaran Tyas Rizky Amalia (RES-26640) belum lunas — sisa Rp200.000.",
    date: "9 Nov 2026",
    urgent: true,
    bookingId: "RES-26640"
  },
  {
    id: "notif-3",
    type: "payment",
    title: "Pembayaran Belum Lunas",
    message: "Pembayaran Uzy Anisaul Jannah (RES-45902) belum lunas — sisa Rp200.000.",
    date: "4 Nov 2026",
    urgent: false,
    bookingId: "RES-45902"
  },
  {
    id: "notif-4",
    type: "payment",
    title: "Pembayaran Belum Lunas",
    message: "Pembayaran Ita Umrisa (RES-13313) belum lunas — sisa Rp200.000.",
    date: "2 Nov 2026",
    urgent: false,
    bookingId: "RES-13313"
  },
  {
    id: "notif-5",
    type: "payment",
    title: "Pembayaran Belum Lunas",
    message: "Pembayaran Viona (BK-9985) belum lunas — sisa Rp450.000.",
    date: "18 Okt 2026",
    urgent: true,
    bookingId: "BK-9985"
  },
  {
    id: "notif-6",
    type: "maintenance",
    title: "Maintenance Selesai",
    message: "Kebaya IV001 telah selesai dry cleaning & siap dibooking kembali.",
    date: "11 Nov 2026",
    urgent: false,
    bookingId: null
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: "PAY-1001",
    date: "10 Nov 2026",
    bookingId: "BK-9953",
    customerName: "Mutia F",
    isLuarKota: true,
    type: "Pelunasan",
    amount: 100000,
    shippingFee: 20000,
    status: "PAID"
  },
  {
    id: "PAY-1002",
    date: "9 Nov 2026",
    bookingId: "RES-26640",
    customerName: "Tyas Rizky Amalia",
    isLuarKota: true,
    type: "DP",
    amount: 200000,
    shippingFee: 0,
    status: "PAID"
  },
  {
    id: "PAY-1003",
    date: "9 Nov 2026",
    bookingId: "RES-43068",
    customerName: "Fitri Hidayati",
    isLuarKota: false,
    type: "DP",
    amount: 200000,
    shippingFee: 0,
    status: "PAID"
  },
  {
    id: "PAY-1004",
    date: "8 Nov 2026",
    bookingId: "RES-99835",
    customerName: "Rizky Anggraeni",
    isLuarKota: true,
    type: "Pelunasan",
    amount: 220000,
    shippingFee: 20000,
    status: "PAID"
  },
  {
    id: "PAY-1005",
    date: "6 Nov 2026",
    bookingId: "RES-77525",
    customerName: "Elysia Ananda Meigie",
    isLuarKota: true,
    type: "Pelunasan",
    amount: 320000,
    shippingFee: 20000,
    status: "PAID"
  },
  {
    id: "PAY-1006",
    date: "6 Nov 2026",
    bookingId: "RES-50872",
    customerName: "Alma",
    isLuarKota: false,
    type: "Pelunasan",
    amount: 150000,
    shippingFee: 0,
    status: "PAID"
  },
  {
    id: "PAY-1007",
    date: "6 Nov 2026",
    bookingId: "BK-9956",
    customerName: "Diana",
    isLuarKota: false,
    type: "Pelunasan",
    amount: 420000,
    shippingFee: 0,
    status: "PAID"
  }
];

export const INITIAL_EXPENSES = [
  {
    id: "EXP-01",
    date: "11 Nov 2026",
    category: "Laundry & Dry Clean",
    description: "Dry Clean Premium 3 Pcs Kebaya Brokat (IV001, IV004, IV010)",
    relatedKebaya: "IV001, IV004",
    amount: 150000
  },
  {
    id: "EXP-02",
    date: "08 Nov 2026",
    category: "Packaging & Garment Bag",
    description: "Pembelian Garment Cover Bag Berlogo Gold Foil (20 pcs)",
    relatedKebaya: "Umum",
    amount: 280000
  },
  {
    id: "EXP-03",
    date: "04 Nov 2026",
    category: "Perbaikan Payet & Jahit",
    description: "Restorasi payet bahu & penggantian kancing kait",
    relatedKebaya: "IV010",
    amount: 95000
  }
];

export const STUDIO_CONFIG = {
  name: "Bywazu Attire",
  handle: "@bywazu.attire",
  tagline: "Persewaan Kebaya Modern Mojokerto & Luar Kota",
  address: "The Trowulan Garden A07, Trowulan & Sidomulyo VI/18, Mojokerto",
  city: "Mojokerto, Jawa Timur",
  whatsappNumber: "6281312193765",
  whatsappDisplay: "+62 813-1219-3765",
  instagram: "@bywazu.attire",
  instagramUrl: "https://www.instagram.com/bywazu.attire",
  tiktok: "@bywazu.attire",
  catalogUrl: "https://msha.ke/bywazu.attire",
  openingHours: "Senin - Minggu: 09:00 - 18:00 WIB (Fitting by Appointment)",
  downPaymentDefault: 150000,
  terms: [
    "Sewa standar adalah 3 hari (H-1 Pengambilan/Kirim, Hari H Pemakaian, H+1 Pengembalian).",
    "Keep wajib per kebaya dengan Down Payment (DP) Rp150.000 untuk mengunci jadwal.",
    "Paket All Include: 1 set kebaya + selendang/tile + hijab (opsional) + rok songket/batik.",
    "Fasilitas Gratis: Free Resize (penyesuaian ukuran) dan Free Laundry (terima bersih).",
    "Area Mojokerto & Sekitarnya: Fitting langsung di home studio (by appointment) & pickup Gosend / Paxel.",
    "Luar Kota (Jawa, Madura, Bali): Dikirim H-2 menggunakan Paxel / JNE YES agar tiba tepat waktu.",
    "Perawatan: Dilarang menyemprot parfum ke kebaya, dilarang menyetrika kebaya/rok songket, dan jangan gunakan peniti/jarum pada kebaya."
  ]
};
