'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, ArrowRight, Sparkles, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingCost,
    totalAmount,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
    progressToFreeShipping
  } = useCart();

  const { language } = useLanguage();
  const [promoInput, setPromoInput] = useState('');

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-24 px-4 max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--color-blush-silk)] flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-[var(--color-burgundy)]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[var(--color-obsidian)]">
          {language === 'ar' ? 'سلة المقتنيات فارغة' : 'Your Garden Basket is Empty'}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[var(--color-obsidian)]/65 max-w-md mx-auto leading-relaxed">
          {language === 'ar'
            ? 'لم تقم بإضافة أي باقات زهرية بعد. استكشف مجموعتنا من ورود الحدائق والبيوني والتوليب النادر.'
            : 'You have not reserved any floral compositions yet. Explore our limited daily harvest of rare garden roses, peonies, and living sculptures.'}
        </p>
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-[var(--color-burgundy)] text-[var(--color-alabaster)] text-xs tracking-wider uppercase font-semibold hover:bg-[var(--color-burgundy-hover)] transition-colors shadow-md"
          >
            <span>{language === 'ar' ? 'استعراض الكتالوج' : 'Explore The Garden'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="pb-8 mb-8 border-b border-[var(--color-stone)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
            Review Your Reservations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[var(--color-obsidian)] mt-1">
            {language === 'ar' ? 'سلة المقتنيات الزهرية' : 'Botanical Shopping Cart'}
          </h1>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] font-medium hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}</span>
        </Link>
      </div>

      {/* Free Shipping Meter */}
      <div className="p-4 mb-8 rounded-xl bg-[var(--color-parchment)] border border-[var(--color-stone)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-[var(--color-obsidian)]">
            {remainingForFreeShipping === 0
              ? '✓ Complimentary Chilled Courier Unlocked!'
              : `Add $${remainingForFreeShipping} more to qualify for Complimentary Chilled Courier`}
          </span>
          <p className="text-[11px] text-[var(--color-obsidian)]/60 mt-0.5">
            Standard chilled courier is $25; orders $200+ are delivered complimentary.
          </p>
        </div>
        <div className="w-full sm:w-48 h-2 rounded-full bg-[var(--color-stone)] overflow-hidden">
          <div
            className="h-full bg-[var(--color-burgundy)] rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Items Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item, idx) => {
            let basePrice = item.product.price;
            if (item.selectedSize === 'Grand') basePrice = Math.round(basePrice * 1.3);
            if (item.selectedSize === 'Majestic') basePrice = Math.round(basePrice * 1.7);
            const unitPrice = basePrice + (item.includeVase ? item.vasePrice : 0);
            const itemTotal = unitPrice * item.quantity;

            return (
              <div
                key={`${item.product.id}-${item.selectedSize}-${idx}`}
                className="p-5 rounded-2xl bg-white border border-[var(--color-stone)] shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-5"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl object-cover bg-[var(--color-parchment)] flex-shrink-0"
                />

                <div className="flex-1">
                  <p className="text-[10px] font-mono text-[var(--color-sage)] uppercase">
                    {item.product.botanicalName}
                  </p>
                  <h3 className="font-serif text-lg font-medium text-[var(--color-obsidian)]">
                    <Link href={`/product/${item.product.id}`} className="hover:text-[var(--color-burgundy)]">
                      {language === 'ar' ? item.product.nameAr : item.product.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-[var(--color-obsidian)]/60 mt-1">
                    Size: <span className="font-semibold">{item.selectedSize}</span> •{' '}
                    {item.product.stemCount} Stems
                  </p>
                  {item.includeVase ? (
                    <p className="text-xs text-[var(--color-burgundy)] font-medium mt-0.5">
                      + Artisan Porcelain Vase Included (${item.vasePrice})
                    </p>
                  ) : null}
                  {item.giftCardMessage ? (
                    <p className="text-[11px] text-[var(--color-obsidian)]/70 italic mt-1.5 p-2 rounded bg-[var(--color-parchment)]/60">
                      Card: "{item.giftCardMessage}"
                    </p>
                  ) : null}
                  {item.deliveryDate ? (
                    <p className="text-[11px] text-[var(--color-moss-forest)] font-mono mt-1">
                      Scheduled Delivery: {item.deliveryDate} ({item.deliverySlot || 'Morning'})
                    </p>
                  ) : null}
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--color-stone)]">
                  <span className="font-serif text-lg font-bold text-[var(--color-burgundy)]">
                    ${itemTotal}
                  </span>

                  <div className="flex items-center border border-[var(--color-stone)] rounded-lg overflow-hidden bg-[var(--color-alabaster)]">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedSize, item.includeVase, item.quantity - 1)
                      }
                      className="px-2.5 py-1 text-xs text-[var(--color-obsidian)] hover:bg-[var(--color-parchment)] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedSize, item.includeVase, item.quantity + 1)
                      }
                      className="px-2.5 py-1 text-xs text-[var(--color-obsidian)] hover:bg-[var(--color-parchment)] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.includeVase)}
                    className="text-[11px] text-[var(--color-obsidian)]/40 hover:text-[var(--color-burgundy)] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إزالة' : 'Remove'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Order Investment Summary (4 Cols) */}
        <aside className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[var(--color-stone)] shadow-md space-y-6">
          <h2 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
            {language === 'ar' ? 'ملخص الاستثمار' : 'Investment Summary'}
          </h2>

          {/* Promo code form */}
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={e => setPromoInput(e.target.value)}
              placeholder="Promo Code (JARDIN10)"
              className="flex-1 text-xs py-2 px-3 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:outline-none focus:border-[var(--color-burgundy)] uppercase font-mono"
            />
            <button
              type="submit"
              className="py-2 px-3 rounded-lg border border-[var(--color-stone)] text-xs font-medium uppercase tracking-wider hover:bg-[var(--color-parchment)] cursor-pointer"
            >
              Apply
            </button>
          </form>

          {appliedPromo ? (
            <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-[var(--color-blush-silk)] text-[var(--color-burgundy)]">
              <span>
                ✓ {appliedPromo.code} ({appliedPromo.discountPercent}% Off)
              </span>
              <button
                type="button"
                onClick={removePromoCode}
                className="text-[10px] underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          ) : null}

          {promoError ? (
            <p className="text-xs text-red-600 font-medium">{promoError}</p>
          ) : null}

          {/* Breakdown */}
          <div className="space-y-2 text-xs text-[var(--color-obsidian)]/80 pt-2 border-t border-[var(--color-stone)]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[var(--color-obsidian)]">${subtotal}</span>
            </div>
            {discountAmount > 0 ? (
              <div className="flex justify-between text-[var(--color-burgundy)] font-medium">
                <span>Privilege Discount</span>
                <span>-${discountAmount}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>Chilled Courier Delivery</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-[var(--color-moss-forest)] font-semibold">Complimentary</span>
                ) : (
                  `$${shippingCost}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-[var(--color-obsidian)] pt-3 border-t border-[var(--color-stone)]">
              <span>Total Investment</span>
              <span className="text-[var(--color-burgundy)] text-xl">${totalAmount}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 px-6 rounded-xl bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-[0.98] text-[var(--color-alabaster)] text-xs tracking-widest uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Luxury Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[var(--color-obsidian)]/50 tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-moss-forest)]" />
            <span>Guaranteed 100% Chilled Fresh Arrival</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
