'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Upload, Send } from 'lucide-react';

export default function DescriptionGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [promo, setPromo] = useState('');
  const [platform, setPlatform] = useState('WhatsApp Business');
  const [tone, setTone] = useState('Ramah & Santai');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) {
      alert('Silakan pilih atau ambil foto produk terlebih dahulu!');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: image,
          mimeType,
          productName,
          price,
          promo,
          platform,
          tone,
        }),
      });

      const data = await res.json();
      if (data.result) {
        setResult(data.result);
      } else {
        alert(data.error || 'Gagal membuat tulisan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="generator" className="py-8 px-4 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl border-2 border-primary-600 p-6 shadow-md">
        <div className="text-center mb-6">
          <span className="bg-primary-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase">
            Fitur Canggih AI
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mt-2">
            ✨ Auto Generator Deskripsi Jualan
          </h2>
          <p className="text-slate-600 text-base mt-1">
            Upload foto produk Anda, AI akan otomatis membuatkan kata-kata promosi menarik!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Inputs */}
          <div className="space-y-4">
            {/* Upload Box */}
            <div>
              <label className="block text-slate-800 font-bold mb-2 text-base">
                1. Unggah Foto Produk <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-primary-600 bg-white rounded-2xl p-4 text-center cursor-pointer hover:bg-primary-50 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="product-photo"
                />
                <label htmlFor="product-photo" className="cursor-pointer block">
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg object-contain"
                    />
                  ) : (
                    <div className="py-4">
                      <Upload className="w-10 h-10 text-primary-600 mx-auto mb-2" />
                      <p className="font-bold text-slate-700 text-base">Ketuk untuk Ambil/Pilih Foto</p>
                      <p className="text-xs text-slate-500 mt-1">Format: JPG, PNG, WEBP</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Metadata Fields */}
            <div>
              <label className="block text-slate-800 font-bold mb-1 text-sm">Nama Produk (Opsional)</label>
              <input
                type="text"
                placeholder="Contoh: Daster Rayon Motif Bunga"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 border-2 rounded-xl focus:border-primary-600 text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-800 font-bold mb-1 text-sm">Harga (Opsional)</label>
                <input
                  type="text"
                  placeholder="Rp 45.000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 border-2 rounded-xl focus:border-primary-600 text-base"
                />
              </div>
              <div>
                <label className="block text-slate-800 font-bold mb-1 text-sm">Promo (Opsional)</label>
                <input
                  type="text"
                  placeholder="Beli 3 Gratis 1"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="w-full p-3 border-2 rounded-xl focus:border-primary-600 text-base"
                />
              </div>
            </div>

            {/* Platform & Tone */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-800 font-bold mb-1 text-sm">Platform Medsos</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-3 border-2 rounded-xl bg-white text-base"
                >
                  <option value="WhatsApp Business">WhatsApp</option>
                  <option value="Instagram Feed/Reels">Instagram</option>
                  <option value="TikTok Shop">TikTok</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-800 font-bold mb-1 text-sm">Gaya Bahasa</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-3 border-2 rounded-xl bg-white text-base"
                >
                  <option value="Ramah & Santai">Ramah & Akrab</option>
                  <option value="Promosi Heboh / Diskon">Diskon Heboh</option>
                  <option value="Rapi & Profesional">Profesional</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-primary-700 hover:bg-primary-800 text-white font-black text-lg rounded-2xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Sedang Menganalisis Foto...</span>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  <span>Buat Tulisan Jualan Sekarang</span>
                </>
              )}
            </button>
          </div>

          {/* Result Output */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                📝 Hasil Tulisan Promosi:
              </h3>
              {result ? (
                <div className="p-4 bg-slate-50 rounded-xl whitespace-pre-wrap text-slate-800 leading-relaxed text-base border">
                  {result}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm">Hasil tulisan AI akan muncul di sini setelah Anda mengunggah foto dan menekan tombol buat.</p>
                </div>
              )}
            </div>

            {result && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base transition"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  <span>{copied ? 'Berhasil Disalin!' : 'Salin Semua Teks'}</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(result)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base transition block text-center"
                >
                  <Send className="w-5 h-5" />
                  <span>Bagikan Langsung ke WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
