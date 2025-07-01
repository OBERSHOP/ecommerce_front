import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthInitializer } from '@/components/AuthInitializer'; // ⬅️ adicionado
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OBER Shop',
  description: 'Obershop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthInitializer />{' '}
        {/* ⬅️ necessário para manter Zustand atualizado com cookies */}
        {children}
      </body>
    </html>
  );
}
