import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web Edukasi Digital UMKM Cigondewah Hilir',
  description: 'Platform edukasi jualan online dan otomatisasi deskripsi produk untuk UMKM Desa Cigondewah Hilir.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased selection:bg-primary-100 selection:text-primary-800">
        {children}
      </body>
    </html>
  );
}
