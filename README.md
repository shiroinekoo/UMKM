# Panduan Digital UMKM Cigondewah Hilir

Landing page / web app single-file (HTML + Tailwind CDN + vanilla JS), mobile-first,
untuk materi seminar/pelatihan KKN.

## Cara Deploy ke Vercel

**Opsi 1 — Drag & drop (paling cepat)**
1. Buka https://vercel.com/new
2. Pilih "Deploy" lalu drag folder ini (atau file `index.html`)
3. Selesai — tidak perlu build command apa pun (Framework Preset: "Other")

**Opsi 2 — Vercel CLI**
```bash
npm i -g vercel
cd umkm-cigondewah-hilir
vercel --prod
```

**Opsi 3 — GitHub**
1. Push folder ini ke repo GitHub
2. Import repo di https://vercel.com/new
3. Framework Preset: "Other" — Build Command & Output Directory dikosongkan
4. Deploy

## Struktur
- `index.html` — seluruh halaman (HTML, styling Tailwind via CDN, JS interaktif)
- `vercel.json` — konfigurasi minimal (clean URLs)

## Kustomisasi cepat
- Nomor WA: cari `6280000000000` di `index.html`, ganti dengan nomor WA resmi (format `62`, tanpa `0` di depan)
- Warna: ubah token warna di `tailwind.config` bagian `<script>` atas (`navy`, `accent`, `benang`)
- Konten tiap modul ada di section `#modul-1` s/d `#modul-4`
