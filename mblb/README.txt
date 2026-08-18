PENDATAAN WAJIB PAJAK MBLB — BAPENDA KABUPATEN PASER
======================================================

Isi paket:
- index.html   -> aplikasi utama
- manifest.json -> konfigurasi PWA
- sw.js        -> service worker (offline app-shell)
- icon-192.png, icon-512.png -> ikon aplikasi

DASAR HUKUM & RUMUS
--------------------
Perda Pajak MBLB Kabupaten Paser:
- Pasal 5: Tarif pajak MBLB = 20%
- Pasal 6: Nilai Jual per M3 untuk sebagian jenis mineral bukan logam & batuan

Undang-Undang No. 1 Tahun 2022 tentang Hubungan Keuangan Pusat dan Daerah (HKPD):
- Pasal 81 huruf c: Opsen dikenakan atas pajak terutang dari Pajak MBLB dan
  dipungut oleh Pemerintah Provinsi bersamaan dengan Pajak MBLB.
- Pasal 83: Tarif Opsen Pajak MBLB = 25% dari Pajak MBLB Terutang (bukan dari
  nilai objek pajak/Dasar Pengenaan Pajak, melainkan dari Pajak Terutang itu
  sendiri).

Rumus:
  Dasar Pengenaan Pajak = Volume Produksi (M3) x Nilai Jual per M3
  Pajak MBLB Terutang    = Dasar Pengenaan Pajak x Tarif Pajak (20%)
  Opsen MBLB Terutang    = Pajak MBLB Terutang x Tarif Opsen (25%, Ps. 83 UU HKPD)
  Total Tagihan WP       = Pajak MBLB Terutang + Opsen MBLB Terutang

Daftar 46 jenis mineral bukan logam & batuan (sesuai Pasal 2 a-kk) sudah
dimasukkan ke pilihan "Jenis Mineral". Untuk jenis yang nilai jualnya sudah
diatur di Pasal 6 (Pasir Kuarsa, Kalsit, Batu Gunung, Tanah, Bentonit, Pasir
& Krikil, dll), Nilai Jual per M3 otomatis terisi. Untuk jenis lain yang
belum ada harga bakunya (ditandai "harga survei pasar"), petugas mengisi
manual berdasarkan harga pasar setempat.

Aplikasi menghitung dan menampilkan Pajak Terutang, Opsen MBLB Terutang, dan
Total Tagihan (Pajak + Opsen) secara otomatis di setiap objek pajak, di
Daftar Data, serta di rekap Laporan Bulanan & Tahunan. Tarif opsen (default
25%) tetap bisa disesuaikan pada form bila ada perubahan ketentuan.

FITUR UTAMA
-----------
1. Input Data
   - Biodata WP: nama, NIK, nama usaha/perusahaan, NPWPD, HP, jenis izin
     (IUP OP/SIPB/Belum Berizin), petugas, kecamatan
   - Peta lokasi tambang dengan ALAMAT OTOMATIS: begitu titik di peta
     diketuk/digeser atau GPS diaktifkan, aplikasi otomatis mencari alamat
     lewat layanan OpenStreetMap (Nominatim) dan mengisi kolom alamat —
     tetap bisa diedit manual bila kurang tepat.
   - Data objek pajak (bisa >1 jenis/periode per WP): pilih periode, jenis
     mineral, volume produksi, nilai jual per M3 (auto/manual), tarif pajak
     -> pajak terhitung otomatis.
2. Daftar Data — tabel seluruh data + total potensi pajak + Export Excel
3. Laporan Bulanan — pilih tahun, rekap per bulan + Export Excel
4. Laporan Tahunan — rekap per tahun + Export Excel

CATATAN ALAMAT OTOMATIS
------------------------
- Membutuhkan koneksi internet aktif (memanggil nominatim.openstreetmap.org).
- Jika sinyal lemah/lokasi terpencil, alamat mungkin tidak akurat atau gagal
  ditemukan — dalam kondisi itu, isi alamat secara manual seperti biasa.
- Koordinat GPS tetap tersimpan meskipun alamat otomatis gagal, sehingga
  titik lokasi di peta (link Google Maps) selalu bisa diandalkan.

CARA MENJALANKAN
-----------------
1. Cepat: ekstrak zip, buka index.html langsung di browser HP/laptop.
   (Alamat otomatis & fitur offline penuh butuh dibuka lewat server, bukan
   file:// langsung — tapi perhitungan pajak & input data tetap normal.)
2. Terbaik: upload folder ini ke hosting statis (GitHub Pages, Netlify,
   Firebase Hosting, atau hosting kantor), buka lewat browser HP, lalu
   "Tambahkan ke Layar Utama" / "Install App" agar bisa dipakai offline.
3. Uji coba lokal (perlu Python): jalankan `python -m http.server 8000` di
   folder ini, lalu buka http://localhost:8000

PENYIMPANAN DATA
-----------------
Semua data tersimpan di localStorage browser (lokal di HP masing-masing),
tidak terkirim ke server manapun. Gunakan tombol Export Excel secara rutin
untuk backup/gabungan data antar petugas lapangan.
