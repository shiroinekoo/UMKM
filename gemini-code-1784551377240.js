export default async function handler(req, res) {
  // Hanya menerima HTTP Method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nama, harga, detail } = req.body;

  // Mengambil API Key dari Environment Variable Vercel / .env
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key belum dikonfigurasi di server.' });
  }

  if (!nama || !harga) {
    return res.status(400).json({ error: 'Nama produk dan harga wajib diisi!' });
  }

  const promptText = `Buatkan caption promosi media sosial yang menarik, ramah, dan menjual untuk produk UMKM berikut:
- Nama Produk: ${nama}
- Harga: Rp ${harga}
- Detail/Keunggulan: ${detail || 'Tidak ada'}

Sertakan emoji yang relevan dan hashtag di bagian akhir. Gunakan bahasa Indonesia yang santai dan menarik pembeli.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Error server:', err);
    return res.status(500).json({ error: 'Gagal terhubung ke layanan AI.' });
  }
}