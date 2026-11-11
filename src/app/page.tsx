'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Leaf, Heart, Clock, Compass } from 'lucide-react';
import FloralScene3D from '@/components/3d/FloralScene3D';
import { ProductCard } from '@/components/ui/ProductCard';
import BouquetCustomizer from '@/components/ui/BouquetCustomizer';
import { PRODUCTS, CATEGORIES_LIST } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { ColorTone } from '@/types';

export default function HomePage() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedColorFilter, setSelectedColorFilter] = useState<ColorTone | 'all'>('all');
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const hasIntroRun = typeof window !== 'undefined' && sessionStorage.getItem('jv-intro');
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasIntroRun || prefersReduced) {
      setHeroRevealed(true);
      return;
    }

    const onIntroDone = () => setHeroRevealed(true);
    window.addEventListener('jardin:intro-done', onIntroDone);

    // Fallback timer so content is never stuck
    const fallbackTimer = setTimeout(() => setHeroRevealed(true), 9800);

    return () => {
      window.removeEventListener('jardin:intro-done', onIntroDone);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchColor = selectedColorFilter === 'all' || p.colorTone === selectedColorFilter;
    return matchCategory && matchColor;
  });

  const colorTones: { tone: ColorTone; label: string; labelAr: string; hex: string }[] = [
    { tone: 'crimson', label: 'Velvet Crimson', labelAr: 'مخمل قرمزي', hex: '#4F1321' },
    { tone: 'blush', label: 'Blush Silk', labelAr: 'وردي حريري', hex: '#F6E7E4' },
    { tone: 'white', label: 'Alabaster White', labelAr: 'أبيض مرمر', hex: '#FDFBF7' },
    { tone: 'peach', label: 'Apricot Peach', labelAr: 'خوخي مشمس', hex: '#EFA688' },
    { tone: 'sunlit', label: 'Honey Gold', labelAr: 'عسلي ذهبي', hex: '#F6D06E' },
    { tone: 'burgundy', label: 'Cassis Noir', labelAr: 'عنابي ليلي', hex: '#3B0D18' },
    { tone: 'lavender', label: 'Lavender Mist', labelAr: 'غسق اللافندر', hex: '#D5C4DC' }
  ];

  return (
    <div className="relative">
      {/* =========================================================================
          01. CINEMATIC 3D HERO SECTION
      ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--color-alabaster)] via-[var(--color-parchment)] to-[var(--color-alabaster)] px-4 sm:px-6 lg:px-8">
        {/* Background 3D Floating Botanical Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <FloralScene3D intensity={1.1} />
        </div>

        {/* Tactile Texture Layer */}
        <div className="absolute inset-0 tactile-grain pointer-events-none z-1" />

        {/* Hero Content Container */}
        <div
          className={`relative z-10 max-w-5xl mx-auto text-center py-20 pointer-events-none transition-all duration-1000 ease-out ${
            heroRevealed ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-6 blur-xs'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[var(--color-stone)] backdrop-blur-md shadow-xs mb-8 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[var(--color-burgundy)] animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[var(--color-obsidian)]/80">
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[var(--color-obsidian)] leading-[1.08] drop-shadow-xs">
            <span className="block">{t('hero.title_part1')}</span>
            <span className="block font-serif italic text-[var(--color-burgundy)] mt-1">
              {t('hero.title_part2')}
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-xs sm:text-base md:text-lg text-[var(--color-obsidian)]/75 leading-relaxed font-sans">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <Link
              href="/shop"
              className="w-full sm:w-auto py-4 px-8 bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-95 text-[var(--color-alabaster)] text-xs sm:text-sm tracking-widest uppercase font-semibold rounded-full shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>{t('hero.cta_shop')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#atelier"
              className="w-full sm:w-auto py-4 px-8 bg-white/80 hover:bg-white active:scale-95 text-[var(--color-obsidian)] border border-[var(--color-stone)] text-xs sm:text-sm tracking-widest uppercase font-semibold rounded-full shadow-sm backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[var(--color-butter-dahlia)]" />
              <span>{t('hero.cta_atelier')}</span>
            </a>
          </div>

          {/* Luxury Credential Tickers */}
          <div className="mt-14 pt-8 border-t border-[var(--color-stone)]/60 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center pointer-events-auto">
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-obsidian)]">
                100%
              </p>
              <p className="text-[10px] sm:text-xs text-[var(--color-obsidian)]/60 mt-0.5">
                {t('hero.stat_stems')}
              </p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-burgundy)]">
                4.98 ★
              </p>
              <p className="text-[10px] sm:text-xs text-[var(--color-obsidian)]/60 mt-0.5">
                {t('hero.stat_rating')}
              </p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-obsidian)]">
                Chilled
              </p>
              <p className="text-[10px] sm:text-xs text-[var(--color-obsidian)]/60 mt-0.5">
                {t('hero.stat_cities')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. BOTANICAL PHILOSOPHY & ARTISANAL ARCHITECTURE
      ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-stone)] bg-[var(--color-parchment)] relative group">
              <img
                src="/images/products/flower-peach-macro.jpg"
                alt="Dawn cut Colombian garden roses"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-butter-dahlia)]">
                  Place Vendôme Atelier
                </span>
                <p className="font-serif text-lg font-medium mt-1">
                  "Flowers are fleeting, but the emotion of true botanical architecture remains forever."
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
              {t('philosophy.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[var(--color-obsidian)] leading-tight">
              {t('philosophy.title')}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-obsidian)]/75 leading-relaxed">
              {t('philosophy.desc')}
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[var(--color-stone)]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--color-blush-silk)] flex items-center justify-center text-[var(--color-burgundy)] mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-[var(--color-obsidian)]">
                  {t('philosophy.f1_title')}
                </h3>
                <p className="text-xs text-[var(--color-obsidian)]/65 mt-1 leading-relaxed">
                  {t('philosophy.f1_desc')}
                </p>
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--color-blush-silk)] flex items-center justify-center text-[var(--color-burgundy)] mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-[var(--color-obsidian)]">
                  {t('philosophy.f2_title')}
                </h3>
                <p className="text-xs text-[var(--color-obsidian)]/65 mt-1 leading-relaxed">
                  {t('philosophy.f2_desc')}
                </p>
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--color-blush-silk)] flex items-center justify-center text-[var(--color-burgundy)] mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-[var(--color-obsidian)]">
                  {t('philosophy.f3_title')}
                </h3>
                <p className="text-xs text-[var(--color-obsidian)]/65 mt-1 leading-relaxed">
                  {t('philosophy.f3_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03. PRODUCT SHOWCASE (DYNAMIC FILTER & CARDS)
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
              {t('catalog.title')}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--color-obsidian)] mt-2">
              {language === 'ar' ? 'إبداعات الموسم النادرة' : 'Daily Harvest Editions'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--color-obsidian)]/70">
              {t('catalog.subtitle')}
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[var(--color-burgundy)] hover:text-[var(--color-burgundy-hover)] transition-colors group"
          >
            <span>{language === 'ar' ? 'عرض الكتالوج كاملاً' : 'View Complete Collection'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES_LIST.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2 px-4 rounded-full text-xs tracking-wider uppercase font-medium whitespace-nowrap cursor-pointer transition-all ${
                activeCategory === cat.id
                  ? 'bg-[var(--color-burgundy)] text-[var(--color-alabaster)] shadow-sm'
                  : 'bg-white border border-[var(--color-stone)] text-[var(--color-obsidian)]/75 hover:border-[var(--color-burgundy)]/50'
              }`}
            >
              {language === 'ar' ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product}>
              <ProductCard.Media />
              <ProductCard.Body />
              <ProductCard.Price />
              <ProductCard.Actions />
            </ProductCard>
          ))}
        </div>
      </section>

      {/* =========================================================================
          04. COLOR MOOD SPECTRUM (EXPLORE BY PALETTE)
      ========================================================================= */}
      <section className="py-20 bg-[var(--color-parchment)]/70 border-y border-[var(--color-stone)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
              {language === 'ar' ? 'لوحة الألوان والمزاج' : 'Curated Color Harmony'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[var(--color-obsidian)] mt-2">
              {language === 'ar' ? 'استكشف الزهور حسب اللون والدرجة' : 'Discover Flowers by Palette'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--color-obsidian)]/70">
              {language === 'ar'
                ? 'انقر على أي درجة لونية لتصفية الباقات التي تتناسب مع هوية مناسبتك'
                : 'Filter our arrangements by specific floral undertones to match your setting'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setSelectedColorFilter('all')}
              className={`py-2 px-5 rounded-full text-xs font-medium cursor-pointer transition-all border ${
                selectedColorFilter === 'all'
                  ? 'bg-[var(--color-obsidian)] text-white border-[var(--color-obsidian)] shadow-sm'
                  : 'bg-white text-[var(--color-obsidian)] border-[var(--color-stone)] hover:border-[var(--color-obsidian)]/40'
              }`}
            >
              {language === 'ar' ? 'جميع الألوان' : 'All Palettes'}
            </button>

            {colorTones.map(ct => (
              <button
                key={ct.tone}
                type="button"
                onClick={() => setSelectedColorFilter(ct.tone)}
                className={`flex items-center gap-2 py-2 px-4 rounded-full text-xs font-medium cursor-pointer transition-all border ${
                  selectedColorFilter === ct.tone
                    ? 'bg-white border-[var(--color-burgundy)] text-[var(--color-burgundy)] ring-2 ring-[var(--color-burgundy)]/20 shadow-sm'
                    : 'bg-white text-[var(--color-obsidian)]/80 border-[var(--color-stone)] hover:border-[var(--color-obsidian)]/40'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                  style={{ backgroundColor: ct.hex }}
                />
                <span>{language === 'ar' ? ct.labelAr : ct.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          05. BESPOKE ATELIER (CUSTOM BOUQUET BUILDER)
      ========================================================================= */}
      <div id="atelier">
        <BouquetCustomizer />
      </div>

      {/* =========================================================================
          06. EDITORIAL STORY BANNER
      ========================================================================= */}
      <section className="relative py-28 bg-[var(--color-obsidian)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/images/products/flower-giant-peonies.jpg"
            alt="Artisanal French floral salon"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-butter-dahlia)]">
            {language === 'ar' ? 'فلسفة دار جاردان فيفان' : 'The Living Garden Manifesto'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium mt-4 leading-tight">
            {language === 'ar'
              ? 'نحن لا نبيع باقات، بل نصنع لحظات خالدة تسكن الذاكرة.'
              : 'Flowers are not mere gifts. They are living architectural emotions.'}
          </h2>
          <p className="mt-6 text-xs sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'من مزارع جبال الإكوادور المرتفعة إلى سهول جراس العطرية، ننتقي كل زهرة لتكون تحفة فنية تتنفس في مساحتك.'
              : 'From high-altitude Andean volcanic soils to Grasse perfume valleys, we nurture each bloom to become a breathing presence in your sacred spaces.'}
          </p>
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full border border-white/30 bg-white/10 hover:bg-white hover:text-[var(--color-obsidian)] text-xs tracking-wider uppercase font-semibold transition-all backdrop-blur-md cursor-pointer"
            >
              <span>{language === 'ar' ? 'اكتشف قصة دارنا' : 'Read Our Full Heritage'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
