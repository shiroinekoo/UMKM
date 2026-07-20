import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web Edukasi Digital UMKM Cigondewah Hilir',
  description: 'Platform edukasi jualan online UMKM Desa Cigondewah Hilir.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
