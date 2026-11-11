'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, Sparkles, Globe, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import SearchModal from '@/components/layout/SearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItemCount, setIsCartOpen } = useCart();
  const { language, setLanguage, isRTL, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/shop', label: t('nav.shop') },
    { href: '/collections/roses', label: language === 'ar' ? 'الورود' : 'Garden Roses' },
    { href: '/collections/peonies', label: language === 'ar' ? 'البيوني' : 'Peonies' },
    { href: '/collections/luxury', label: language === 'ar' ? 'المجموعات الفاخرة' : 'Grand Centerpieces' },
    { href: '/about', label: t('nav.story') },
    { href: '/contact', label: t('nav.contact') }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--color-alabaster)]/95 backdrop-blur-md shadow-xs border-b border-[var(--color-stone)] py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Top subtle announcement bar on top of page */}
        {!isScrolled ? (
          <div className="hidden lg:block pb-2.5 mb-2 border-b border-[var(--color-obsidian)]/10 text-center">
            <p className="text-[11px] tracking-widest uppercase font-mono text-[var(--color-obsidian)]/70 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-velvet)]" />
              {t('hero.banner_delivery')}
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-velvet)]" />
            </p>
          </div>
        ) : null}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger & Search (Left on LTR) */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-[var(--color-obsidian)] hover:bg-[var(--color-parchment)] transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[var(--color-obsidian)] hover:text-[var(--color-burgundy)] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Navigation Links (Left) */}
            <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[var(--color-obsidian)]/80">
              {navLinks.slice(0, 4).map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors relative py-1 hover:text-[var(--color-burgundy)] ${
                      isActive ? 'text-[var(--color-burgundy)] font-semibold' : ''
                    }`}
                  >
                    {link.label}
                    {isActive ? (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-burgundy)]" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            {/* Brand Logo (Center) */}
            <Link
              href="/"
              className="text-center group transition-transform duration-300 hover:scale-[1.01]"
            >
              <span className="block font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-obsidian)] group-hover:text-[var(--color-burgundy)] transition-colors">
                JARDIN VIVANT
              </span>
              <span className="block text-[9px] tracking-[0.28em] uppercase font-sans text-[var(--color-sage)] -mt-0.5">
                {language === 'ar' ? 'دار الزهور الفاخرة • باريس' : 'Haute Botanique • Paris'}
              </span>
            </Link>

            {/* Right Action Icons (Language, Search, Cart) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Secondary Links */}
              <nav className="hidden xl:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-[var(--color-obsidian)]/80 mr-2">
                {navLinks.slice(4).map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors py-1 hover:text-[var(--color-burgundy)] ${
                      pathname === link.href ? 'text-[var(--color-burgundy)] font-semibold' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--color-stone)] bg-white/70 hover:bg-white text-xs font-medium text-[var(--color-obsidian)] transition-colors cursor-pointer shadow-2xs"
                title={language === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
                <span className="font-sans text-[11px]">{language === 'en' ? 'العربية' : 'EN'}</span>
              </button>

              {/* Search Modal Trigger (Desktop) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-stone)] bg-white/70 hover:bg-white text-xs text-[var(--color-obsidian)]/70 hover:text-[var(--color-obsidian)] transition-colors cursor-pointer shadow-2xs"
              >
                <Search className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
                <span className="text-[11px] font-sans">{language === 'ar' ? 'بحث...' : 'Search'}</span>
                <kbd className="hidden sm:inline-block text-[9px] font-mono text-[var(--color-obsidian)]/40 px-1 py-0.5 rounded bg-[var(--color-stone)]/40">
                  ⌘K
                </kbd>
              </button>

              {/* Shopping Cart Button with Live Counter */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[var(--color-burgundy)] text-[var(--color-alabaster)] hover:bg-[var(--color-burgundy-hover)] active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center"
                aria-label="Open cart drawer"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemCount > 0 ? (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-butter-dahlia)] text-[var(--color-obsidian)] text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in">
                    {totalItemCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen ? (
          <div className="lg:hidden fixed inset-0 top-[65px] bg-[var(--color-alabaster)] z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-4">
              <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
                {language === 'ar' ? 'فهرس الدار النباتية' : 'Botanical Directory'}
              </p>
              <nav className="flex flex-col space-y-3">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-2xl text-[var(--color-obsidian)] hover:text-[var(--color-burgundy)] transition-colors py-1 border-b border-[var(--color-stone)]/50"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-4">
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 px-4 bg-[var(--color-burgundy)] text-[var(--color-alabaster)] text-xs tracking-wider uppercase font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[var(--color-butter-dahlia)]" />
                  <span>{t('hero.cta_shop')}</span>
                </Link>
              </div>
            </div>

            <div className="pt-8 border-t border-[var(--color-stone)] text-xs text-[var(--color-obsidian)]/60 space-y-2">
              <p>Jardin Vivant • 24 Place Vendôme, Paris</p>
              <p>Chilled Courier Concierge: +33 1 42 68 00 00</p>
            </div>
          </div>
        ) : null}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
