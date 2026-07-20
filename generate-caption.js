import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Hanya izinkan method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nama, harga, detail, alamat } = req.body;

    if (!nama || !harga) {
      return res.status(400).json({ error: 'Nama produk dan harga wajib diisi' });
    }

    // Inisialisasi SDK Gemini dengan API Key dari Environment Variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API Key belum dikonfigurasi di server' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prompt yang mengarahkan AI membuat caption ramah UMKM
    const prompt = `
Kamu adalah seorang ahli pemasaran media sosial untuk UMKM lokal di Cigondewah Hilir, Bandung.
Buatlah caption promosi jualan yang menarik, ramah, persuasif, dan rapi untuk media sosial (Instagram/Facebook/WhatsApp).

Detail Produk:
- Nama Produk: ${nama}
- Harga: ${harga}
- Keunggulan/Detail: ${detail || 'Kualitas terjamin, nyaman dipakai'}
- Lokasi Toko: ${alamat || 'Cigondewah Hilir'}

Ketentuan Caption:
1. Pakai emoji yang relevan dan menarik.
2. Sertakan call-to-action (CTA) ajakan membeli via WhatsApp.
3. Buat kalimat yang singkat, padat, dan tidak bertele-tele.
4. Tambahkan hashtag relevan di akhir seperti #UMKMCigondewah #CigondewahHilir #BeliLokal dan hashtag sesuai produk.
5. Langsung berikan teks caption-nya saja tanpa penjelasan tambahan.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return res.status(200).json({ caption: responseText });
  } catch (error) {
    console.error('Error Generating Caption:', error);
    return res.status(500).json({ error: 'Gagal membuat caption via AI' });
  }
}