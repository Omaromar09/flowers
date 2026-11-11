'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, SlidersHorizontal, ArrowUpDown, Sparkles, X } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { PRODUCTS, CATEGORIES_LIST } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { FlowerCategory, ColorTone, FlowerOccasion } from '@/types';

export default function ShopPage() {
  const { language, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Synchronous filtering & sorting (derived per vercel-react-best-practices)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchCol = selectedColor === 'all' || p.colorTone === selectedColor;
      const matchOcc = selectedOccasion === 'all' || p.occasion.includes(selectedOccasion as FlowerOccasion);
      const matchPrice = p.price <= maxPrice;
      return matchCat && matchCol && matchOcc && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedColor, selectedOccasion, maxPrice, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedOccasion('all');
    setMaxPrice(350);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedColor !== 'all' ||
    selectedOccasion !== 'all' ||
    maxPrice < 350;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          {language === 'ar' ? 'الكتالوج الكامل' : 'The Botanical Catalog'}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--color-obsidian)] mt-2">
          {language === 'ar' ? 'مجموعة الزهور الفاخرة' : 'Haute Floral Compositions'}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[var(--color-obsidian)]/70">
          {language === 'ar'
            ? 'تصفح باقاتنا المصممة بعناية، من ورود الحدائق المخملية إلى منحوتات الأعراس والبيوني النادر.'
            : 'Explore our full compendium of dawn-cut blossoms, architectural centerpieces, and rare botanical varietals.'}
        </p>
      </div>

      {/* Control Bar (Total counts, Filter toggle, Sort dropdown) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[var(--color-stone)] gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden inline-flex items-center gap-2 py-2 px-3.5 rounded-lg border border-[var(--color-stone)] bg-white text-xs font-medium cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
            <span>{language === 'ar' ? 'تصفية المنتجات' : 'Filter Collections'}</span>
          </button>
          <span className="text-xs text-[var(--color-obsidian)]/60 font-mono">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Creation' : 'Creations'} Found
          </span>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-[var(--color-burgundy)] underline font-medium cursor-pointer ml-2"
            >
              {language === 'ar' ? 'إعادة ضبط' : 'Clear Filters'}
            </button>
          ) : null}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-[var(--color-obsidian)]/70 whitespace-nowrap">
            {language === 'ar' ? 'ترتيب حسب:' : 'Sort By:'}
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="py-1.5 px-3 rounded-lg border border-[var(--color-stone)] bg-white text-xs font-medium focus:outline-none focus:border-[var(--color-burgundy)] cursor-pointer"
          >
            <option value="featured">{language === 'ar' ? 'مختارات المنسق' : 'Curator’s Choice'}</option>
            <option value="price-asc">{language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
            <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            <option value="rating">{language === 'ar' ? 'الأعلى تقييماً' : 'Highest Acclaim'}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filters (Desktop 3 Cols) */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            isMobileFilterOpen
              ? 'block fixed inset-0 z-50 bg-[var(--color-alabaster)] p-6 overflow-y-auto'
              : 'hidden lg:block bg-white p-6 rounded-2xl border border-[var(--color-stone)]'
          }`}
        >
          {isMobileFilterOpen ? (
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-stone)] lg:hidden">
              <h3 className="font-serif text-lg font-medium">Filter Flora</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full border border-[var(--color-stone)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : null}

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-obsidian)] mb-3">
              {language === 'ar' ? 'المجموعات' : 'Floral Category'}
            </h4>
            <div className="space-y-1.5 text-xs">
              {CATEGORIES_LIST.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
                  }}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-left flex justify-between cursor-pointer transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--color-blush-silk)] text-[var(--color-burgundy)] font-semibold'
                      : 'text-[var(--color-obsidian)]/80 hover:bg-[var(--color-parchment)]'
                  }`}
                >
                  <span>{language === 'ar' ? cat.nameAr : cat.name}</span>
                  <span className="text-[10px] text-[var(--color-obsidian)]/40 font-mono">
                    {cat.id === 'all'
                      ? PRODUCTS.length
                      : PRODUCTS.filter(p => p.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="pt-4 border-t border-[var(--color-stone)]">
            <div className="flex justify-between items-center mb-2 text-xs">
              <h4 className="font-semibold tracking-wider uppercase text-[var(--color-obsidian)]">
                {language === 'ar' ? 'أقصى سعر' : 'Maximum Investment'}
              </h4>
              <span className="font-serif font-bold text-[var(--color-burgundy)] text-sm">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="350"
              step="10"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--color-burgundy)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--color-obsidian)]/50 mt-1">
              <span>$100</span>
              <span>$350</span>
            </div>
          </div>

          {/* Occasion Filter */}
          <div className="pt-4 border-t border-[var(--color-stone)]">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-obsidian)] mb-2.5">
              {language === 'ar' ? 'المناسبة' : 'Occasion'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All', labelAr: 'الكل' },
                { id: 'romance', label: 'Romance', labelAr: 'رومانسية' },
                { id: 'wedding', label: 'Weddings', labelAr: 'أعراس' },
                { id: 'birthday', label: 'Celebration', labelAr: 'احتفال' },
                { id: 'anniversary', label: 'Anniversary', labelAr: 'ذكرى سنوية' },
                { id: 'corporate', label: 'Corporate', labelAr: 'رسمي' }
              ].map(occ => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => {
                    setSelectedOccasion(occ.id);
                    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
                  }}
                  className={`text-[11px] py-1 px-2.5 rounded-md border cursor-pointer transition-all ${
                    selectedOccasion === occ.id
                      ? 'border-[var(--color-burgundy)] bg-[var(--color-burgundy)] text-white'
                      : 'border-[var(--color-stone)] bg-[var(--color-alabaster)] text-[var(--color-obsidian)]/80 hover:border-[var(--color-stone)]/80'
                  }`}
                >
                  {language === 'ar' ? occ.labelAr : occ.label}
                </button>
              ))}
            </div>
          </div>

          {isMobileFilterOpen ? (
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-[var(--color-burgundy)] text-white text-xs uppercase font-semibold rounded-xl"
            >
              Apply & View {filteredProducts.length} Results
            </button>
          ) : null}
        </aside>

        {/* Product Catalog Grid (9 Cols) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[var(--color-stone)]">
              <Sparkles className="w-8 h-8 text-[var(--color-sage)] mx-auto mb-3" />
              <h3 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
                {language === 'ar' ? 'لا توجد نتائج تطابق الفلاتر' : 'No Creations Match Your Criteria'}
              </h3>
              <p className="text-xs text-[var(--color-obsidian)]/60 mt-1 max-w-sm mx-auto">
                {language === 'ar'
                  ? 'جرب توسيع نطاق السعر أو اختيار فئة زهرية أخرى.'
                  : 'Try adjusting your maximum price or removing specific occasion filters.'}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 py-2.5 px-6 rounded-lg bg-[var(--color-burgundy)] text-white text-xs font-medium cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p}>
                  <ProductCard.Media />
                  <ProductCard.Body />
                  <ProductCard.Price />
                  <ProductCard.Actions />
                </ProductCard>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
