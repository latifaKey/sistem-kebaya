# 👘 IVY ATTIRE — SISTEM SEWA KEBAYA & 3D INTERACTIVE FITTING STUDIO

Proyek prototipe sistem persewaan kebaya premium (*Haute Couture Atelier & Studio Management*) yang menggabungkan keunggulan alur bisnis sewa kebaya profesional (**`aiusewakebaya.com`** / **`web-kebaya.mp4`**) dengan pengalaman interaktif 3D mix-and-match kustomisasi pakaian (**`membersexperience-create.lacoste.com`**).

---

## 🌟 Latar Belakang & Konsep Penggabungan

Prototipe ini dirancang khusus untuk memecahkan tantangan industri persewaan kebaya modern:

1. **Dari Referensi 1 (`aiusewakebaya.com` & `web-kebaya.mp4`)**:
   - Sistem manajemen rental kebaya lengkap (*@ivyattire*).
   - **Kalender Ketersediaan Pasca Sewa (Maintenance Buffer)**: Memberikan jeda 1 hari (dalam kota) atau 2 hari (luar kota) setelah kebaya kembali untuk proses *dry cleaning*, perbaikan payet, dan setrika uap sebelum dapat disewa kembali.
   - **Pencatatan Ukuran Fitting Presisi**: Lingkar dada (LD), pinggang, pinggul, ketiak, lengan atas, siku, dan jenis kamisol.
   - **Studio Management Backoffice**: Dashboard KPI, data booking rental, invoice generator resmi berstandar cetak PDF, dan pencatatan kas/pembayaran (DP & pelunasan).

2. **Dari Referensi 2 (`membersexperience-create.lacoste.com`)**:
   - Pengalaman visual interaktif **3D Customizer / Fitting Room**.
   - Pelanggan dapat memadukan (*Mix & Match*) siluet kebaya, warna brokat *lace*, jenis *inner* kamisol/manset hijab, motif kain batik/songket nusantara, hingga bros dada keraton.
   - Fitur **Rotasi 360°**, pengaturan pencahayaan (*Studio*, *Ballroom*, *Sunset*), serta **Lookbook & Community Voting** di mana pelanggan dapat menyimpan kreasi dan saling memberikan *upvote* / *like*.

---

## 🚀 Fitur-Fitur Utama Aplikasi

### A. Portal Pelanggan (Website Publik)
- **Katalog Kebaya Real-Time**: Dilengkapi pencarian, filter kategori (*Modern, Kutubaru, Tradisional, Wisuda, Pengantin*), filter ukuran (LD), dan **Cek Ketersediaan berdasarkan Tanggal Acara**.
- **Detail Kebaya & Kalender Interaktif**: Visualisasi jadwal kebaya (Hari H Acara, Kirim/Ambil, Jeda Maintenance Pasca Sewa, Tersedia).
- **Form Reservasi Online**: Perhitungan otomatis durasi sewa, biaya tambahan hari, ongkir luar kota, dan nominal DP 50%.
- **Janji Temu Fitting Studio**: Penjadwalan sesi fitting 1-on-1 di studio dengan konfirmasi langsung ke WhatsApp admin.
- **Panduan Sewa & Syarat Ketentuan**: SOP lengkap sewa dalam dan luar kota.

### B. Atelier 3D Mix & Match Studio (Lacoste-Inspired)
- **Maneken Interaktif 3D**: Visualisasi gaun kebaya dinamis dengan tekstur brokat, kain batik wiron, inner satin, dan bros emas keraton.
- **Kontrol Sudut Pandang 360°**: Tampak Depan (0°), Serong (45°), Samping (90°), dan Belakang (180°).
- **Mode Pencahayaan Ambience**:
  - *Natural Studio Daylight*
  - *Evening Grand Ballroom* (latar malam mewah glamor)
  - *Golden Sunset* (hangat romantis)
- **Komponen Kustomisasi**:
  1. *Siluet Kebaya*: Kutubaru Modern, Kartini Ningrat, Asymmetric Peplum, Mermaid Slit, Bali Lilit Obi.
  2. *Warna & Tekstur*: Dusty Rose, Royal Denim, Midnight Obsidian, Burgundy Wine, Sage Mist, Ice Blue, Champagne Gold, Emerald Velvet.
  3. *Inner Pelapis*: Manset Hijab Spandex Silk, Bustier Tulang Penyangga, Kemben Katun Sutra.
  4. *Kain Bawahan*: Batik Parang Sogan Solo, Batik Kawung Emas Yogya, Songket Palembang Emas, Rok Lilit Silk Draped.
  5. *Aksesoris*: Selendang Organza Sampiran, Bros Dada Tiga Susun Gold, Obi Belt, Anting Melati.
- **Smart Sizing & Fit Advisor**: Rekomendasi otomatis ukuran badan (S/M/L/XL) berdasarkan input tinggi, berat, lingkar dada, dan preferensi hijab.
- **Community Lookbook & Vote**: Galeri paduan kebaya buatan para pelanggan dengan sistem voting *likes*.
- **Tombol "Sewa Look Ini"**: Langsung membawa seluruh kombinasi busana ke formulir booking rental.

### C. Studio Management Backoffice (Admin Dashboard)
- **Executive Dashboard**:
  - 8 Kartu KPI: Total Kebaya, Tersedia, Sedang Disewa, Maintenance, Booking Bulan Ini, Pendapatan, Total Piutang, Pengeluaran.
  - Kalender Rental Bulanan (November 2026) dengan label event kebaya.
  - Widget *Upcoming Pickup*, *Upcoming Return*, dan *Top Performing Kebaya*.
- **Notification Center**: Peringatan otomatis piutang belum lunas, pengembalian mendekati batas waktu, dan penyelesaian *dry clean*.
- **Manajemen Booking & Rental**:
  - Filter Dalam Kota / Luar Kota, Status (*Reserved, Rented, Completed*).
  - Modal Detail Booking dengan **Pencatatan 8 Titik Ukuran Fitting**.
  - Aksi Cepat: *Tandai Diambil (&rarr; Rented)*, *Tandai Kembali (&rarr; Completed)*, *Tandai Lunas*.
- **Official Invoice Generator**:
  - Format invoice profesional `@ivyattire` dengan kop studio, rincian biaya, dan status DP/Lunas.
  - Fitur cetak ramah printer / Simpan ke PDF (`window.print()`).
  - Tombol kirim invoice instan ke WhatsApp pelanggan.
- **Payment & Expense Management**: Pencatatan arus kas masuk (DP, pelunasan) dan biaya operasional (laundry, penjahit payet, kemasan).
- **Katalog Inventaris Studio**: Pengaturan status kebaya (*Available* &harr; *Maintenance*).

---

## 💻 Panduan Menjalankan Aplikasi

Aplikasi dibangun menggunakan **React 19, Vite, Tailwind CSS v4, Lucide Icons, dan Canvas Confetti**.

### 1. Jalankan Cepat (Sekali Klik)
Cukup klik ganda (double click) file:
```
d:\Project-Magang\SISTEM-KEBAYA\JALANKAN-SISTEM-KEBAYA.bat
```

### 2. Jalankan Melalui Terminal / PowerShell
```powershell
cd d:\Project-Magang\SISTEM-KEBAYA\kebaya-app
npm run dev
```

Buka peramban (browser) di alamat:
👉 **`http://localhost:5173/`**

---

## 🔄 Cara Beralih Antara Mode Publik dan Mode Admin
Di bagian pojok kanan atas bilah navigasi (Navbar), terdapat tombol sakelar cepat (**Mode Switcher**):
- Klik **"Website Publik"** untuk melihat antarmuka pelanggan dan 3D Customizer.
- Klik **"Studio Admin (Backoffice)"** untuk masuk ke sistem dashboard manajemen rental kebaya.
