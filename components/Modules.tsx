import React from 'react';
import { Camera, Palette, Share2, Smartphone } from 'lucide-react';

export default function Modules() {
  const modules = [
    {
      id: 1,
      title: '1. Foto Produk Pakai HP',
      icon: <Camera className="w-6 h-6 text-primary-700" />,
      beforeImg: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80',
      afterImg: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
      tips: [
        'Gunakan Sinar Matahari Pagi (Jam 08.00 - 10.00) di dekat jendela.',
        'Gunakan latar kain putih polos atau karton manila bersih.',
        'Pegang HP dengan 2 tangan atau senderkan ke tumpukan buku agar tidak goyang/buram.',
      ],
    },
    {
      id: 2,
      title: '2. Desain Gambar di Canva',
      icon: <Palette className="w-6 h-6 text-primary-700" />,
      beforeImg: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80',
      afterImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      tips: [
        'Gunakan ukuran Persegi (1:1) untuk Instagram & Banner WA.',
        'Pilih maksimal 2 warna tulisan agar tidak terlalu ramai.',
        'Pastikan harga dan nomor HP terlihat jelas dengan ukuran font besar.',
      ],
    },
    {
      id: 3,
      title: '3. Jam Posting & Kata Penjualan',
      icon: <Share2 className="w-6 h-6 text-primary-700" />,
      beforeImg: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80',
      afterImg: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=80',
      tips: [
        'Jam ramai pembeli (Prime Time): 12.00 siang & 19.00 malam.',
        'Rumus Tulisan: Kalimat Lucu/Menarik + Keunggulan Produk + Cara Pesan.',
        'Gunakan hashtag lokal: #CigondewahHilir #KonveksiBandung #KulinerCigondewah.',
      ],
    },
    {
      id: 4,
      title: '4. Jualan via WA Business',
      icon: <Smartphone className="w-6 h-6 text-primary-700" />,
      beforeImg: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=400&q=80',
      afterImg: 'https://images.unsplash.com/photo-1556742111-a3010de674d3?auto=format&fit=crop&w=400&q=80',
      tips: [
        'Buat Katalog Produk dengan foto bersih dan harga yang jelas.',
        'Pasang fitur Pesan Otomatis saat Anda sedang sibuk/istirahat.',
        'Tempelkan Link WhatsApp langsung di bio Instagram dan TikTok.',
      ],
    },
  ];

  return (
    <section id="modul" className="py-8 px-4 max-w-5xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          📚 Modul Panduan Praktis
        </h2>
        <p className="text-slate-600 text-base mt-1">
          Pelajari cara jualan online langkah demi langkah dengan contoh visual.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4 border-b pb-3">
              <div className="p-2 bg-primary-100 rounded-lg">{m.icon}</div>
              <h3 className="text-xl font-bold text-slate-800">{m.title}</h3>
            </div>

            {/* Visual Before vs After */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-center">
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                  Kurang Pas
                </span>
                <img
                  src={m.beforeImg}
                  alt="Contoh Kurang Pas"
                  className="w-full h-32 object-cover rounded-lg mt-2 grayscale opacity-75 border"
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                  Sangat Bagus
                </span>
                <img
                  src={m.afterImg}
                  alt="Contoh Bagus"
                  className="w-full h-32 object-cover rounded-lg mt-2 border-2 border-primary-600"
                />
              </div>
            </div>

            {/* Practical Tips */}
            <div className="bg-slate-50 p-3 rounded-xl">
              <h4 className="font-bold text-slate-700 text-sm mb-2">💡 Tips Penting:</h4>
              <ul className="space-y-2 text-slate-700 text-sm">
                {m.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
