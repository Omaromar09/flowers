'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(p => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.botanicalName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colorTone.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[var(--color-obsidian)]/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl bg-[var(--color-alabaster)] rounded-2xl shadow-2xl border border-[var(--color-stone)] overflow-hidden text-[var(--color-obsidian)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center p-4 border-b border-[var(--color-stone)]">
          <Search className="w-5 h-5 text-[var(--color-burgundy)] mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ابحث بالاسم، نوع الورد، المناسبة أو اللون...'
                : 'Search by bloom, occasion, color palette, or botanical name...'
            }
            className="w-full text-base bg-transparent focus:outline-none placeholder:text-[var(--color-obsidian)]/40 font-serif"
            autoFocus
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 hover:text-[var(--color-burgundy)] mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="text-xs tracking-wider uppercase px-2.5 py-1 rounded bg-[var(--color-parchment)] hover:bg-[var(--color-stone)] font-medium cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-4 bg-[var(--color-parchment)]/50 border-b border-[var(--color-stone)] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--color-obsidian)]/50 font-medium">
            {language === 'ar' ? 'اقتراحات سريعة:' : 'Popular Inquiries:'}
          </span>
          {['Crimson Roses', 'Versailles Peonies', 'Dutch Tulips', 'Wedding Lilies', 'Amber Glow'].map(
            chip => (
              <button
                key={chip}
                type="button"
                onClick={() => setQuery(chip)}
                className="px-2.5 py-1 rounded-full bg-white border border-[var(--color-stone)] hover:border-[var(--color-burgundy)] hover:text-[var(--color-burgundy)] text-[11px] transition-colors cursor-pointer"
              >
                {chip}
              </button>
            )
          )}
        </div>

        {/* Search Results Area */}
        <div className="max-h-96 overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[var(--color-obsidian)]/50">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-[var(--color-sage)]" />
              <span>
                {language === 'ar'
                  ? 'ابدأ بالكتابة لاستكشاف مجموعتنا من الزهور النادرة'
                  : 'Type to discover our botanical sculptures, seasonal harvests, and garden bouquets'}
              </span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--color-obsidian)]/60">
              <p className="font-serif text-base text-[var(--color-obsidian)] mb-1">
                {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No Botanical Matches Found'}
              </p>
              <p>
                {language === 'ar'
                  ? `لم نعثر على زهور تطابق "${query}". جرب البحث عن "ورود" أو "بيوني".`
                  : `We could not find creations matching "${query}". Try searching "Roses" or "Peonies".`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProducts.map(p => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[var(--color-parchment)] transition-colors group cursor-pointer"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[var(--color-stone)]"
                  />
                  <div className="flex-1">
                    <p className="text-[10px] font-mono text-[var(--color-sage)] uppercase">
                      {p.botanicalName}
                    </p>
                    <h4 className="font-serif text-base font-medium text-[var(--color-obsidian)] group-hover:text-[var(--color-burgundy)] transition-colors">
                      {language === 'ar' ? p.nameAr : p.name}
                    </h4>
                    <p className="text-xs text-[var(--color-obsidian)]/60">
                      {p.stemCount} Stems • {p.scentProfile}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="font-serif text-base font-semibold text-[var(--color-burgundy)]">
                      ${p.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[var(--color-obsidian)]/40 group-hover:translate-x-1 group-hover:text-[var(--color-burgundy)] transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
