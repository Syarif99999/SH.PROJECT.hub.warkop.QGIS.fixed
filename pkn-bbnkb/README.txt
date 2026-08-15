PENCATATAN OPSEN PKB & BBNKB — BAPENDA KABUPATEN PASER
========================================================

Isi paket:
- index.html    -> aplikasi utama
- manifest.json -> konfigurasi PWA
- sw.js         -> service worker (offline app-shell)
- icon-192.png, icon-512.png -> ikon aplikasi

DASAR HUKUM & RUMUS
--------------------
UU No. 1 Tahun 2022 tentang HKPD & PP No. 35 Tahun 2023:
Opsen PKB dan Opsen BBNKB dipungut oleh Kabupaten/Kota sebesar 66% dari
pajak terutang (PKB/BBNKB) yang dipungut oleh Provinsi, dan langsung
menjadi pendapatan Kabupaten/Kota tempat kendaraan terdaftar (bukan lagi
skema bagi hasil/DBH seperti sebelumnya).

Rumus:
  Opsen Kabupaten/Kota = Pokok Pajak Terutang (di Provinsi) x Tarif Opsen (66%)

FITUR
-----
1. Catat — input perhitungan opsen:
   - Wilayah Kabupaten/Kota (dropdown 10 kab/kota se-Kalimantan Timur,
     baku "Kabupaten Paser")
   - Jenis pajak (PKB/BBNKB), periode laporan, tanggal pencatatan
   - Pokok pajak terutang provinsi, tarif opsen (baku 66%)
   - Opsen terhitung otomatis
   (Aplikasi ini fokus ke perhitungan opsen saja — tidak ada input biodata
   wajib pajak/kendaraan maupun peta lokasi.)
2. Riwayat — daftar semua catatan, bisa difilter per bulan/wilayah/jenis
   pajak, hapus per baris, total sesuai filter, Export Excel
3. Laporan Bulanan — pilih tahun & wilayah, rekap per bulan (jumlah,
   opsen PKB, opsen BBNKB, total), Export Excel
4. Laporan Tahunan — rekap per tahun (bisa difilter per wilayah),
   Export Excel

CARA MENJALANKAN
-----------------
1. Cepat: ekstrak zip, buka index.html langsung di browser HP/laptop.
2. Terbaik: upload folder ini ke hosting statis (GitHub Pages, Netlify,
   Firebase Hosting, atau hosting kantor), buka lewat browser HP, lalu
   "Tambahkan ke Layar Utama" / "Install App" agar offline penuh.
3. Uji coba lokal (perlu Python): `python -m http.server 8000` di folder
   ini, lalu buka http://localhost:8000

PENYIMPANAN DATA
-----------------
Semua data tersimpan di localStorage browser (lokal di HP masing-masing),
tidak terkirim ke server manapun. Gunakan tombol Export Excel secara rutin
untuk backup/gabungan data antar petugas atau lintas kab/kota.
