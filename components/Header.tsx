import React from 'react';
import { BookOpen, Sparkles, MessageSquareHeart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50 w-full">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="text-center md:text-left mb-3">
          <span className="bg-emerald-800 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Portal Edukasi Digital
          </span>
          <h1 className="text-xl md:text-3xl font-black mt-1 leading-tight">
            UMKM Cigondewah Hilir
          </h1>
          <p className="text-emerald-100 text-xs md:text-sm">
            Panduan Praktis & Asisten Pintar Jualan Online
          </p>
        </div>

        {/* Quick Nav */}
        <nav className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-600/50">
          <a
            href="#modul"
            className="flex flex-col items-center justify-center p-2 bg-emerald-800/80 hover:bg-emerald-600 rounded-lg text-center transition font-semibold text-xs md:text-sm"
          >
            <BookOpen className="w-5 h-5 mb-1 text-yellow-300" />
            <span>Modul Panduan</span>
          </a>
          <a
            href="#generator"
            className="flex flex-col items-center justify-center p-2 bg-emerald-800/80 hover:bg-emerald-600 rounded-lg text-center transition font-semibold text-xs md:text-sm"
          >
            <Sparkles className="w-5 h-5 mb-1 text-yellow-300" />
            <span>Auto Deskripsi</span>
          </a>
          <a
            href="#chat-section"
            className="flex flex-col items-center justify-center p-2 bg-emerald-800/80 hover:bg-emerald-600 rounded-lg text-center transition font-semibold text-xs md:text-sm"
          >
            <MessageSquareHeart className="w-5 h-5 mb-1 text-yellow-300" />
            <span>Tanya Mentor</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
