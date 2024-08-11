import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Hobbit - Extended Edition',
  description: 'The Legend Reborn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='font-size'>
      <body className='overflow-hidden'>{children}</body>
    </html>
  );
}
