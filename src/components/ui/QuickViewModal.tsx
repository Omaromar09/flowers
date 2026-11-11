'use client';

import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { VASE_OPTIONS } from '@/data/products';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const { language } = useLanguage();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'Classic' | 'Grand' | 'Majestic'>('Classic');
  const [includeVase, setIncludeVase] = useState(false);
  const [selectedVaseId, setSelectedVaseId] = useState(VASE_OPTIONS[1].id);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      setSelectedSize('Classic');
      setIncludeVase(quickViewProduct.vaseIncluded);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentVase = VASE_OPTIONS.find(v => v.id === selectedVaseId) || VASE_OPTIONS[1];
  const vasePrice = includeVase && !quickViewProduct.vaseIncluded ? currentVase.price : 0;

  let multiplier = 1.0;
  if (selectedSize === 'Grand') multiplier = 1.3;
  if (selectedSize === 'Majestic') multiplier = 1.7;

  const unitPrice = Math.round(quickViewProduct.price * multiplier) + vasePrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      quickViewProduct,
      quantity,
      selectedSize,
      includeVase && !quickViewProduct.vaseIncluded,
      vasePrice
    );
    setQuickViewProduct(null);
  };

  const title = language === 'ar' ? quickViewProduct.nameAr : quickViewProduct.name;
  const fullDesc = language === 'ar' ? quickViewProduct.fullDescriptionAr : quickViewProduct.fullDescription;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--color-obsidian)]/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={() => setQuickViewProduct(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--color-alabaster)] rounded-2xl shadow-2xl border border-[var(--color-stone)] flex flex-col md:flex-row overflow-hidden text-[var(--color-obsidian)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--color-alabaster)]/90 hover:bg-white text-[var(--color-obsidian)] border border-[var(--color-stone)] cursor-pointer transition-colors shadow-sm"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[var(--color-parchment)]/50">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-inner bg-[var(--color-parchment)]">
            <img
              src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
              alt={title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {quickViewProduct.badge ? (
              <span className="absolute top-3 left-3 px-3 py-1 bg-[var(--color-obsidian)] text-[var(--color-alabaster)] text-[10px] tracking-wider uppercase font-medium rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[var(--color-butter-dahlia)]" />
                {quickViewProduct.badge}
              </span>
            ) : null}
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 ? (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[var(--color-burgundy)] scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Details Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-[var(--color-sage)]">
              {quickViewProduct.botanicalName}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[var(--color-obsidian)] mt-1">
              {title}
            </h2>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-[var(--color-burgundy)]">
                ${unitPrice}
              </span>
              {quickViewProduct.originalPrice ? (
                <span className="text-sm text-[var(--color-obsidian)]/40 line-through">
                  ${Math.round(quickViewProduct.originalPrice * multiplier)}
                </span>
              ) : null}
              <span className="text-xs text-[var(--color-obsidian)]/60 ml-auto">
                {quickViewProduct.stemCount} {language === 'ar' ? 'ساق زهرية' : 'Curated Stems'}
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[var(--color-obsidian)]/80 line-clamp-3">
              {fullDesc}
            </p>

            {/* Size Selector */}
            <div className="mt-6">
              <label className="block text-xs font-medium tracking-wider uppercase text-[var(--color-obsidian)]/70 mb-2">
                {language === 'ar' ? 'اختر الحجم' : 'Bouquet Volume / Size'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Classic', 'Grand', 'Majestic'] as const).map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border cursor-pointer transition-all ${
                      selectedSize === size
                        ? 'border-[var(--color-burgundy)] bg-[var(--color-blush-silk)] text-[var(--color-burgundy)] font-semibold shadow-xs'
                        : 'border-[var(--color-stone)] bg-white text-[var(--color-obsidian)]/80 hover:border-[var(--color-obsidian)]/40'
                    }`}
                  >
                    {size === 'Classic'
                      ? language === 'ar'
                        ? 'كلاسيك'
                        : 'Classic'
                      : size === 'Grand'
                      ? language === 'ar'
                        ? 'جراند (+30%)'
                        : 'Grand (+30%)'
                      : language === 'ar'
                      ? 'ماجستيك'
                      : 'Majestic'}
                  </button>
                ))}
              </div>
            </div>

            {/* Vase Pairing Options */}
            {!quickViewProduct.vaseIncluded ? (
              <div className="mt-5 p-3 rounded-xl bg-[var(--color-parchment)]/60 border border-[var(--color-stone)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--color-obsidian)]">
                    {language === 'ar' ? 'إضافة مزهرية يدوية فاخرة' : 'Pair With Artisan Vase'}
                  </span>
                  <input
                    type="checkbox"
                    checked={includeVase}
                    onChange={e => setIncludeVase(e.target.checked)}
                    id="include-vase-quick"
                    className="w-4 h-4 accent-[var(--color-burgundy)] cursor-pointer"
                  />
                </div>
                {includeVase ? (
                  <div className="mt-3 flex gap-2">
                    {VASE_OPTIONS.slice(1).map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVaseId(v.id)}
                        className={`flex-1 py-1.5 px-2 text-[11px] rounded border cursor-pointer transition-all ${
                          selectedVaseId === v.id
                            ? 'border-[var(--color-burgundy)] bg-white font-medium text-[var(--color-burgundy)]'
                          : 'border-[var(--color-stone)] bg-transparent text-[var(--color-obsidian)]/70'
                        }`}
                      >
                        {language === 'ar' ? v.nameAr : v.name} (+${v.price})
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mt-5 flex items-center gap-2 text-xs text-[var(--color-moss-forest)] font-medium">
                <Check className="w-4 h-4 text-[var(--color-moss-forest)]" />
                <span>
                  {language === 'ar'
                    ? 'هذا التنسيق الفاخر يشمل المزهرية الخاصة به مجاناً'
                    : 'Curated Artisan Vase Included with this masterpiece'}
                </span>
              </div>
            )}

            {/* Stem breakdown preview */}
            <div className="mt-5 pt-4 border-t border-[var(--color-stone)] text-xs text-[var(--color-obsidian)]/70">
              <span className="font-medium text-[var(--color-obsidian)]">
                {language === 'ar' ? 'المكونات الزهرية:' : 'Botanical Stems:'}{' '}
              </span>
              {quickViewProduct.stems.map(s => `${s.count}× ${s.name}`).join(' • ')}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[var(--color-stone)] flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center border border-[var(--color-stone)] rounded-lg bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-sm text-[var(--color-obsidian)] hover:bg-[var(--color-parchment)] transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-3 py-2 text-xs font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-sm text-[var(--color-obsidian)] hover:bg-[var(--color-parchment)] transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3 px-6 bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-[0.98] text-[var(--color-alabaster)] text-xs tracking-wider uppercase font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {language === 'ar' ? `أضف إلى السلة • $${totalPrice}` : `Acquire Arrangement • $${totalPrice}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
