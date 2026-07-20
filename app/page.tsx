import Header from '@/components/Header';
import Modules from '@/components/Modules';
import DescriptionGenerator from '@/components/DescriptionGenerator';
import MentorChatbox from '@/components/MentorChatbox';

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Header />
      <Modules />
      <DescriptionGenerator />
      <MentorChatbox />

      {/* Footer */}
      <footer className="mt-12 py-6 bg-slate-800 text-white text-center text-sm">
        <p>© 2026 Program Edukasi Digital UMKM Desa Cigondewah Hilir.</p>
        <p className="text-slate-400 text-xs mt-1">Ditenagai oleh Next.js & Google Gemini API</p>
      </footer>
    </main>
  );
}
