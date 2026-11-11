'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
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
    progressToFreeShipping,
    freeShippingThreshold
  } = useCart();

  const { language } = useLanguage();
  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[var(--color-obsidian)]/60 backdrop-blur-sm transition-opacity"
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside
          className="w-screen max-w-md bg-[var(--color-alabaster)] shadow-2xl flex flex-col justify-between text-[var(--color-obsidian)]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--color-stone)] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-medium tracking-tight text-[var(--color-obsidian)]">
                {language === 'ar' ? 'سلة المقتنيات الزهرية' : 'Botanical Selection'}
              </h2>
              <p className="text-xs text-[var(--color-obsidian)]/60 mt-0.5">
                {items.length} {items.length === 1 ? 'Creation' : 'Creations'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-[var(--color-parchment)] transition-colors cursor-pointer border border-[var(--color-stone)]"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5 text-[var(--color-obsidian)]" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="px-6 py-3.5 bg-[var(--color-parchment)] border-b border-[var(--color-stone)]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span>
                {remainingForFreeShipping === 0
                  ? language === 'ar'
                    ? '✓ تم تفعيل التوصيل المبرد المجاني!'
                    : '✓ Complimentary Chilled Courier Unlocked!'
                  : language === 'ar'
                  ? `أضف $${remainingForFreeShipping} للحصول على توصيل مجاني`
                  : `Add $${remainingForFreeShipping} for Complimentary Chilled Courier`}
              </span>
              <span className="font-mono text-[11px] text-[var(--color-burgundy)] font-semibold">
                {progressToFreeShipping}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--color-stone)] overflow-hidden">
              <div
                className="h-full bg-[var(--color-burgundy)] transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[var(--color-blush-silk)] flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-[var(--color-burgundy)]" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
                  {language === 'ar' ? 'سلة مقتنياتك فارغة' : 'Your Basket is Empty'}
                </h3>
                <p className="mt-2 text-xs text-[var(--color-obsidian)]/60 max-w-xs">
                  {language === 'ar'
                    ? 'استكشف باقاتنا من ورود الحدائق والبيوني والتوليب النادر'
                    : 'Discover our limited daily harvest of rare garden roses, peonies, and living sculptures.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 py-2.5 px-6 bg-[var(--color-burgundy)] text-[var(--color-alabaster)] text-xs tracking-wider uppercase font-medium rounded-lg hover:bg-[var(--color-burgundy-hover)] transition-colors cursor-pointer"
                >
                  <Link href="/shop">{language === 'ar' ? 'استعراض الكتالوج' : 'Explore The Garden'}</Link>
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                let basePrice = item.product.price;
                if (item.selectedSize === 'Grand') basePrice = Math.round(basePrice * 1.3);
                if (item.selectedSize === 'Majestic') basePrice = Math.round(basePrice * 1.7);
                const itemUnitPrice = basePrice + (item.includeVase ? item.vasePrice : 0);
                const itemTotal = itemUnitPrice * item.quantity;

                const name = language === 'ar' ? item.product.nameAr : item.product.name;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.includeVase}-${idx}`}
                    className="flex gap-4 p-4 rounded-xl bg-white border border-[var(--color-stone)] shadow-xs"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[var(--color-parchment)] flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif text-sm font-semibold text-[var(--color-obsidian)] line-clamp-1">
                            {name}
                          </h4>
                          <p className="text-[11px] text-[var(--color-sage)] font-mono mt-0.5">
                            {item.selectedSize} • {item.product.stemCount} Stems
                          </p>
                          {item.includeVase ? (
                            <p className="text-[10px] text-[var(--color-burgundy)] font-medium mt-0.5">
                              + Artisan Porcelain Vase (${item.vasePrice})
                            </p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.includeVase)}
                          className="p-1 text-[var(--color-obsidian)]/40 hover:text-[var(--color-burgundy)] transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--color-muted-border)]">
                        <div className="flex items-center border border-[var(--color-stone)] rounded bg-[var(--color-alabaster)]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.includeVase,
                                item.quantity - 1
                              )
                            }
                            className="px-2 py-0.5 text-xs text-[var(--color-obsidian)] hover:bg-[var(--color-parchment)] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.includeVase,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-0.5 text-xs text-[var(--color-obsidian)] hover:bg-[var(--color-parchment)] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-serif text-sm font-semibold text-[var(--color-burgundy)]">
                          ${itemTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 ? (
            <div className="p-6 border-t border-[var(--color-stone)] bg-white space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder={language === 'ar' ? 'رمز الخصم (مثال: JARDIN10)' : 'Privilege Code (e.g. JARDIN10)'}
                    className="w-full text-xs py-2 pl-3 pr-8 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)] uppercase font-mono"
                  />
                  <Tag className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[var(--color-obsidian)]/40 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="py-2 px-3 text-xs font-medium uppercase tracking-wider rounded-lg border border-[var(--color-stone)] hover:bg-[var(--color-parchment)] transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'تطبيق' : 'Apply'}
                </button>
              </form>

              {appliedPromo ? (
                <div className="flex items-center justify-between text-xs p-2 rounded bg-[var(--color-blush-silk)] text-[var(--color-burgundy)]">
                  <span>
                    ✓ {appliedPromo.code} ({appliedPromo.discountPercent}% off applied)
                  </span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-[11px] underline cursor-pointer hover:text-[var(--color-burgundy-hover)]"
                  >
                    Remove
                  </button>
                </div>
              ) : null}

              {promoError ? (
                <p className="text-xs text-red-600 font-medium">{promoError}</p>
              ) : null}

              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-[var(--color-obsidian)]/80">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'المجموع الفرعي' : 'Arrangement Subtotal'}</span>
                  <span className="font-medium text-[var(--color-obsidian)]">${subtotal}</span>
                </div>
                {discountAmount > 0 ? (
                  <div className="flex justify-between text-[var(--color-burgundy)]">
                    <span>{language === 'ar' ? 'الخصم الخاص' : 'Privilege Discount'}</span>
                    <span>-${discountAmount}</span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'التوصيل المبرد' : 'Chilled Courier Delivery'}</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-[var(--color-moss-forest)] font-semibold">
                        {language === 'ar' ? 'مجاناً' : 'Complimentary'}
                      </span>
                    ) : (
                      `$${shippingCost}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-semibold text-[var(--color-obsidian)] pt-2 border-t border-[var(--color-stone)]">
                  <span>{language === 'ar' ? 'الإجمالي' : 'Total Investment'}</span>
                  <span className="text-[var(--color-burgundy)] font-serif text-lg">
                    ${totalAmount}
                  </span>
                </div>
              </div>

              {/* Direct Checkout Button */}
              <div className="pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-6 bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-[0.99] text-[var(--color-alabaster)] text-xs tracking-widest uppercase font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{language === 'ar' ? 'المتابعة لإتمام الطلب' : 'Proceed to Luxury Checkout'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] text-[var(--color-obsidian)]/50 tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-moss-forest)]" />
                  <span>Climate-Chilled Courier • Guaranteed 100% Fresh Arrival</span>
                </div>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
