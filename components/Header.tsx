import React from 'react';
import { BookOpen, Sparkles, MessageSquareHeart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary-700 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="text-center md:text-left mb-3">
          <span className="bg-primary-800 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Portal Edukasi Digital
          </span>
          <h1 className="text-2xl md:text-3xl font-black mt-1 leading-tight">
            UMKM Cigondewah Hilir
          </h1>
          <p className="text-primary-100 text-sm md:text-base">
            Panduan Praktis & Asisten Pintar Jualan Online
          </p>
        </div>

        {/* Quick Nav */}
        <nav className="grid grid-cols-3 gap-2 pt-2 border-t border-primary-600">
          <a
            href="#modul"
            className="flex flex-col items-center justify-center p-2 bg-primary-800 hover:bg-primary-600 rounded-lg text-center transition font-semibold text-xs md:text-sm"
          >
            <BookOpen className="w-5 h-5 mb-1 text-yellow-300" />
            <span>Modul Panduan</span>
          </a>
          <a
            href="#generator"
            className="flex flex-col items-center justify-center p-2 bg-primary-800 hover:bg-primary-600 rounded-lg text-center transition font-semibold text-xs md:text-sm"
          >
            <Sparkles className="w-5 h-5 mb-1 text-yellow-300" />
            <span>Auto Deskripsi</span>
          </a>
          <a
            href="#chat-section"
            className="flex flex-col items-center justify-center p-2 bg-primary-800 hover:bg-primary-600 rounded-lg text-center transition font-semibold text-xs md:text-sm"
          >
            <MessageSquareHeart className="w-5 h-5 mb-1 text-yellow-300" />
            <span>Tanya Mentor</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
