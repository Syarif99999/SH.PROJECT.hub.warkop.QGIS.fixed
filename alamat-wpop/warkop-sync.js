/**
 * WARKOP HUB → QGIS Auto-Sync
 * Modul: Alamat WPOP / PBB
 * File ini otomatis mengirim data baru (yang punya koordinat GPS) ke
 * Google Sheet setiap kali aplikasi dibuka & ada koneksi internet.
 * Data yang sudah pernah terkirim tidak dikirim ulang (anti-duplikat).
 */
(function () {
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0JBROodGxtoLYNcddsW3AoQsphZlh9UY0mzUwHTAtMZ2FpXnlejwjs36ewD8-DtIb/exec';
  var MODULE_KEY = 'alamat-wpop';
  var STORAGE_KEY = 'pbb-entries-v1';
  var SYNCED_KEY = STORAGE_KEY + '__qgis_synced';

  function getSyncedIds() {
    try { return JSON.parse(localStorage.getItem(SYNCED_KEY) || '[]'); } catch (e) { return []; }
  }
  function markSynced(ids) {
    var cur = getSyncedIds();
    localStorage.setItem(SYNCED_KEY, JSON.stringify(cur.concat(ids)));
  }
  function getEntries() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) { return []; }
  }

  window.syncToQGIS = function (silent) {
    if (!SCRIPT_URL || SCRIPT_URL.indexOf('PASTE_') === 0) return; // belum di-setup
    var entries = getEntries();
    var synced = getSyncedIds();
    var pending = entries.filter(function (e) {
      return e.lat && e.lng && synced.indexOf(e.id) === -1;
    });
    if (pending.length === 0) return;

    var items = pending.map(function (e) {
      return {
        id: e.id,
        nama: e.nama || '',
        alamat: e.alamat || e.alamat_wp || '',
        kecamatan: e.kecamatan || '',
        lat: e.lat,
        lng: e.lng,
        tanggal: e.tanggal || e.updated_at || '',
        petugas: e.petugas || e.petugas_nama || '',
        catatan: e.catatan || ''
      };
    });

    fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // hindari CORS preflight
      body: JSON.stringify({ modul: MODULE_KEY, items: items })
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json && json.ok) {
          markSynced(pending.map(function (e) { return e.id; }));
          if (!silent && typeof window.showToast === 'function') {
            window.showToast('🗺️ ' + json.added + ' data tersinkron ke QGIS');
          }
          console.log('[QGIS Sync] ' + json.added + ' data baru terkirim (' + MODULE_KEY + ')');
        }
      })
      .catch(function (err) { console.warn('[QGIS Sync] gagal:', err); });
  };

  // auto-sync diam-diam setiap kali app dibuka (delay biar tidak ganggu loading)
  window.addEventListener('load', function () {
    setTimeout(function () { window.syncToQGIS(true); }, 2000);
  });
})();
