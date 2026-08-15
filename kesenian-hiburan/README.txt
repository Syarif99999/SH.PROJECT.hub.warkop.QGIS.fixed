PENDATAAN WAJIB PAJAK PBJT KESENIAN & HIBURAN — BAPENDA KABUPATEN PASER
=========================================================================

Isi paket (format sama dengan pwa-mblb-v1):
- index.html    -> aplikasi utama
- manifest.json -> konfigurasi PWA
- sw.js         -> service worker (offline app-shell)
- icon-192.png, icon-512.png -> ikon aplikasi

DASAR HUKUM & RUMUS
--------------------
Perda PBJT Kabupaten Paser:
- Pasal 23: Jenis Jasa Kesenian dan Hiburan (16 jenis dimasukkan ke pilihan
  "Jenis Jasa Kesenian & Hiburan" — huruf a s.d. k, ditambah huruf l yang
  dipecah menjadi 5 pilihan: Diskotek, Karaoke, Kelab Malam, Bar, Mandi
  Uap/Spa)
- Pasal 27:
  ayat (1) Tarif PBJT umum = 10%
  ayat (2) Tarif khusus untuk diskotek, karaoke, kelab malam, bar, dan
           mandi uap/spa = 40%

Tarif OTOMATIS terisi begitu jenis jasa dipilih (10% untuk huruf a-k, 40%
untuk 5 jenis hiburan malam/spa), tetap bisa diedit manual bila ada
perubahan Perbup.

Rumus:
  Pajak Terutang = Omzet Bruto (Dasar Pengenaan Pajak) x Tarif Pajak

FITUR
-----
1. Input Data
   - Biodata WP: nama, NIK, nama usaha, NPWPD, HP, petugas, kecamatan
   - Peta lokasi usaha dengan ALAMAT OTOMATIS: begitu titik di peta
     diketuk/digeser atau GPS diaktifkan, aplikasi otomatis mencari alamat
     lewat layanan OpenStreetMap (Nominatim) dan mengisi kolom alamat —
     tetap bisa diedit manual bila kurang tepat.
   - Data objek pajak (bisa >1 jenis/periode per WP): pilih periode, jenis
     jasa kesenian/hiburan (tarif otomatis 10%/40%), omzet bruto -> pajak
     terhitung otomatis.
2. Daftar Data — tabel seluruh data + tanda tarif (10%/40%) + total potensi
   pajak + Export Excel
3. Laporan Bulanan — pilih tahun, rekap per bulan + Export Excel
4. Laporan Tahunan — rekap per tahun + Export Excel

CATATAN ALAMAT OTOMATIS
------------------------
- Membutuhkan koneksi internet aktif (memanggil nominatim.openstreetmap.org).
- Jika sinyal lemah/lokasi terpencil, alamat mungkin tidak akurat atau gagal
  ditemukan — dalam kondisi itu, isi alamat secara manual seperti biasa.
- Koordinat GPS tetap tersimpan meskipun alamat otomatis gagal.

CARA MENJALANKAN
-----------------
1. Cepat: ekstrak zip, buka index.html langsung di browser HP/laptop.
2. Terbaik: upload folder ini ke hosting statis (GitHub Pages, Netlify,
   Firebase Hosting, atau hosting kantor), buka lewat browser HP, lalu
   "Tambahkan ke Layar Utama" / "Install App" agar bisa dipakai offline.
3. Uji coba lokal (perlu Python): `python -m http.server 8000` di folder
   ini, lalu buka http://localhost:8000

PENYIMPANAN DATA
-----------------
Semua data tersimpan di localStorage browser (lokal di HP masing-masing),
tidak terkirim ke server manapun. Gunakan tombol Export Excel secara rutin
untuk backup/gabungan data antar petugas lapangan.
