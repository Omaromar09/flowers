'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import Link from 'next/link';
import { Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCardContextType {
  product: Product;
}

const ProductCardContext = createContext<ProductCardContextType | undefined>(undefined);

function useProductCardContext() {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error('ProductCard compound components must be within <ProductCard>');
  }
  return context;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  children: ReactNode;
}

export function ProductCard({ product, className = '', children }: ProductCardProps) {
  return (
    <ProductCardContext.Provider value={{ product }}>
      <article
        className={`group relative flex flex-col bg-white border border-[var(--color-stone)]/70 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-[var(--color-burgundy)]/40 ${className}`}
      >
        {children}
      </article>
    </ProductCardContext.Provider>
  );
}

// Subcomponent: Media
export function ProductCardMedia({ className = '' }: { className?: string }) {
  const { product } = useProductCardContext();
  const { setQuickViewProduct } = useCart();
  const { language } = useLanguage();

  return (
    <div className={`relative w-full aspect-[1/1] sm:aspect-[4/4] bg-[var(--color-parchment)] overflow-hidden image-zoom-container p-3 flex items-center justify-center ${className}`}>
      <Link href={`/product/${product.id}`} className="block w-full h-full overflow-hidden rounded-xl">
        <img
          src={product.images[0]}
          alt={language === 'ar' ? product.nameAr : product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Seasonal / Bestseller Badge */}
      {product.badge ? (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-[var(--color-obsidian)] text-[var(--color-alabaster)] shadow-sm">
            <Sparkles className="w-2.5 h-2.5 text-[var(--color-butter-dahlia)]" />
            {language === 'ar' && product.badgeAr ? product.badgeAr : product.badge}
          </span>
        </div>
      ) : null}

      {/* Quick View Floating Action */}
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
        <button
          type="button"
          onClick={() => setQuickViewProduct(product)}
          className="w-full py-2.5 px-4 bg-white/95 hover:bg-white text-[var(--color-obsidian)] text-[11px] tracking-widest uppercase font-medium rounded-lg shadow-md backdrop-blur-md border border-[var(--color-stone)] flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
          <span>{language === 'ar' ? 'نظرة سريعة' : 'QUICK VIEW'}</span>
        </button>
      </div>
    </div>
  );
}

// Subcomponent: Body
export function ProductCardBody({ className = '' }: { className?: string }) {
  const { product } = useProductCardContext();
  const { language } = useLanguage();

  const title = language === 'ar' ? product.nameAr : product.name;
  const description = language === 'ar' ? product.shortDescriptionAr : product.shortDescription;

  return (
    <div className={`p-5 flex-1 flex flex-col justify-between ${className}`}>
      <div>
        <p className="text-[10px] tracking-widest uppercase text-[var(--color-sage)] font-mono mb-1">
          {product.botanicalName}
        </p>
        <h3 className="font-serif text-lg font-medium text-[var(--color-obsidian)] uppercase line-clamp-1 hover:text-[var(--color-burgundy)] transition-colors">
          <Link href={`/product/${product.id}`}>{title}</Link>
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-obsidian)]/70 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--color-stone)]/50 flex items-center justify-between text-xs text-[var(--color-obsidian)]/60">
        <span className="font-mono text-[11px]">{product.stemCount} {language === 'ar' ? 'ساق' : 'Flowers'}</span>
        <span className="flex items-center gap-1 font-medium text-[var(--color-obsidian)]">
          ★ {product.rating} <span className="text-[10px] text-[var(--color-obsidian)]/40">({product.reviewCount})</span>
        </span>
      </div>
    </div>
  );
}

// Subcomponent: Price
export function ProductCardPrice({ className = '' }: { className?: string }) {
  const { product } = useProductCardContext();
  const { language } = useLanguage();

  return (
    <div className={`px-5 pb-2 flex items-baseline gap-2 ${className}`}>
      <span className="text-xl font-serif font-medium text-[var(--color-obsidian)]">
        ${product.price}
      </span>
      {product.originalPrice ? (
        <span className="text-xs text-[var(--color-obsidian)]/40 line-through">
          ${product.originalPrice}
        </span>
      ) : null}
      <span className="text-[10px] tracking-wider uppercase text-[var(--color-sage)] font-mono ml-auto">
        {product.vaseIncluded
          ? language === 'ar'
            ? 'المزهرية مشمولة'
            : 'Vase Included'
          : language === 'ar'
          ? 'باقة حريرية'
          : 'Silk Wrapped'}
      </span>
    </div>
  );
}

// Subcomponent: Actions
export function ProductCardActions({ className = '' }: { className?: string }) {
  const { product } = useProductCardContext();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  return (
    <div className={`p-5 pt-1 ${className}`}>
      <button
        type="button"
        onClick={() => addToCart(product, 1, 'Classic', false, 0)}
        className="w-full py-2.5 px-4 bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-[0.98] text-white text-xs tracking-widest uppercase font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>{language === 'ar' ? 'أضف إلى السلة' : 'Acquire Bouquet'}</span>
      </button>
    </div>
  );
}

ProductCard.Media = ProductCardMedia;
ProductCard.Body = ProductCardBody;
ProductCard.Price = ProductCardPrice;
ProductCard.Actions = ProductCardActions;
