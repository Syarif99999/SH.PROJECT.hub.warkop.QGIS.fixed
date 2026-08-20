-- =====================================================================
-- SETUP DATABASE SUPABASE — Aplikasi Pendataan Pajak BAPENDA Paser
-- =====================================================================
-- Cara pakai:
-- 1. Buka project Supabase Anda
-- 2. Klik menu "SQL Editor" di sidebar kiri
-- 3. Klik "New query"
-- 4. Copy-paste SELURUH isi file ini
-- 5. Klik "Run" (atau Ctrl+Enter)
-- Aman dijalankan berkali-kali (pakai "if not exists").
-- =====================================================================

-- 1. Tabel data Hotel
create table if not exists hotel_entries (
  id text primary key,
  petugas_nama text not null,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. Tabel data Reklame
create table if not exists reklame_entries (
  id text primary key,
  petugas_nama text not null,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 3. Tabel data MBLB
create table if not exists mblb_entries (
  id text primary key,
  petugas_nama text not null,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 4. Tabel data PBJT Kesenian & Hiburan
create table if not exists kesenian_hiburan_entries (
  id text primary key,
  petugas_nama text not null,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Index untuk mempercepat pencarian per petugas
create index if not exists idx_hotel_petugas on hotel_entries(petugas_nama);
create index if not exists idx_reklame_petugas on reklame_entries(petugas_nama);
create index if not exists idx_mblb_petugas on mblb_entries(petugas_nama);
create index if not exists idx_kesenian_petugas on kesenian_hiburan_entries(petugas_nama);

-- =====================================================================
-- ROW LEVEL SECURITY: hanya orang yang sudah login (akun kantor) yang
-- boleh baca/tulis. Orang luar yang tidak login TIDAK BISA akses data
-- sama sekali, walau tahu Project URL & anon key-nya.
-- =====================================================================
alter table hotel_entries enable row level security;
alter table reklame_entries enable row level security;
alter table mblb_entries enable row level security;
alter table kesenian_hiburan_entries enable row level security;

drop policy if exists "hanya login boleh akses" on hotel_entries;
create policy "hanya login boleh akses" on hotel_entries
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "hanya login boleh akses" on reklame_entries;
create policy "hanya login boleh akses" on reklame_entries
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "hanya login boleh akses" on mblb_entries;
create policy "hanya login boleh akses" on mblb_entries
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "hanya login boleh akses" on kesenian_hiburan_entries;
create policy "hanya login boleh akses" on kesenian_hiburan_entries
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- =====================================================================
-- SELESAI. Langkah selanjutnya (lakukan di UI Supabase, bukan di SQL Editor):
--
-- A. Buat 1 akun bersama untuk petugas lapangan:
--    Menu "Authentication" > "Users" > "Add user" > "Create new user"
--    Email   : petugas@bapenda-paser.local
--    Password: (buat password kantor, ini yang akan diketik petugas
--               setiap login di aplikasi)
--    Centang "Auto Confirm User" lalu simpan.
--
-- B. Ambil Project URL & anon public key:
--    Menu "Settings" > "API"
--    - "Project URL"      -> ini SUPABASE_URL
--    - "anon" "public" key -> ini SUPABASE_ANON_KEY
--    Isikan kedua nilai ini ke bagian atas <script> di index.html
--    tiap 4 aplikasi (cari teks 'ISI_PROJECT_URL_ANDA' dan
--    'ISI_ANON_PUBLIC_KEY_ANDA'), lalu upload ulang ke GitHub.
--
-- C. Untuk memantau semua data dari kantor:
--    Menu "Table Editor" di sidebar Supabase -> pilih salah satu tabel
--    (hotel_entries / reklame_entries / mblb_entries /
--    kesenian_hiburan_entries) -> semua data dari semua petugas & semua
--    HP akan tampil di sana, bisa difilter/disort/export CSV langsung
--    dari situ. Login ke Supabase pakai akun Anda sendiri (bukan akun
--    petugas bersama), jadi hanya Anda yang punya akses ini.
-- =====================================================================
