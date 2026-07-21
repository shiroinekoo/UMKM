import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { imageBase64, mimeType, productName, price, promo, platform, tone } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'Foto produk wajib diunggah.' }, { status: 400 });
    }

    const promptText = `
Anda adalah pakar pemasaran digital untuk UMKM Konveksi dan Kuliner di Desa Cigondewah Hilir.
Tugas Anda: Buat deskripsi promosi penjualan berdasarkan gambar produk yang diunggah.

Informasi Tambahan dari Penjual:
- Nama Produk: ${productName || 'Tidak disebutkan (identifikasi dari foto)'}
- Harga: ${price || 'Hubungi penjual'}
- Promo/Diskon: ${promo || 'Tidak ada'}
- Platform Target: ${platform}
- Gaya Bahasa (Tone): ${tone}

Formulasikan deskripsi dengan struktur:
1. [Hook Penarik Perhatian] (Sesuai tone ${tone})
2. [Detail & Keunggulan Produk] (Hasil analisis visual foto + nama produk & promo)
3. [Call to Action / Cara Pesan] (Arahkan untuk kontak ke WhatsApp/DM)
4. [Hashtag Relevan] (Sertakan hashtag lokal seperti #UMKMCigondewah #KonveksiCigondewah #KulinerCigondewah)

Gunakan bahasa Indonesia yang jelas, menarik, dan menggunakan emoji secara pas.
`;

    // Pastikan pembersihan base64 bersih 100%
    const base64Data = imageBase64.includes(',') 
      ? imageBase64.split(',')[1] 
      : imageBase64;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        promptText,
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType || 'image/jpeg',
          },
        },
      ],
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error('Error generating description:', error);
    return NextResponse.json({ error: 'Gagal membuat deskripsi. Coba lagi nanti.' }, { status: 500 });
  }
}
