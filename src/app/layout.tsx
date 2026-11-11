import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Amiri, Cairo } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import Toast from '@/components/ui/Toast';
import JardinIntro from '@/components/ui/JardinIntro';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
});

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Jardin Vivant — Haute Botanique & Living Floral Architecture',
  description:
    'Experience an immersive botanical sanctuary. Handcrafted luxury floral sculptures, dawn-cut Colombian garden roses, and climate-controlled courier delivery.',
  keywords: [
    'luxury flowers',
    'garden roses',
    'peonies',
    'wedding flowers',
    'haute botanique',
    'bespoke bouquets',
    'floral delivery'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${jakarta.variable} ${amiri.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-alabaster)] text-[var(--color-obsidian)] font-sans">
        <JardinIntro />
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <CartDrawer />
            <QuickViewModal />
            <Toast />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
