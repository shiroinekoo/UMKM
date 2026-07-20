import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemInstruction = `
    Anda adalah 'Kang/Teteh Mentor UMKM Cigondewah Hilir', asisten AI yang ramah, sopan, sabar, dan menggunakan bahasa Indonesia yang sangat mudah dipahami oleh pelaku UMKM awam/lansia.
    Tugas Anda adalah memberikan jawaban ringkas, praktis, dan bertahap seputar:
    1. Cara foto produk menggunakan HP.
    2. Cara posting dan waktu terbaik di medsos.
    3. Penggunaan aplikasi Canva sederhana.
    4. Penggunaan WhatsApp Business dan pembuatan katalog.
    Hindari istilah teknis yang rumit. Gunakan analogi sederhana dan poin-poin yang jelas.
    `;

    // Format riwayat percakapan untuk SDK
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      contents: contents,
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Maaf, terjadi masalah koneksi.' }, { status: 500 });
  }
}
