'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Check,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, VASE_OPTIONS, DELIVERY_SLOTS, DELIVERY_SLOTS_AR } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<'Classic' | 'Grand' | 'Majestic'>('Classic');
  const [selectedVaseId, setSelectedVaseId] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState(DELIVERY_SLOTS[0]);

  // Size calculation: Classic (S), Grand (M), Majestic (L)
  let sizeMultiplier = 1.0;
  if (selectedSize === 'Grand') sizeMultiplier = 1.3;
  if (selectedSize === 'Majestic') sizeMultiplier = 1.7;

  const currentVase = VASE_OPTIONS.find(v => v.id === selectedVaseId);
  const vasePrice = currentVase ? currentVase.price : 0;
  const unitPrice = Math.round(product.price * sizeMultiplier) + vasePrice;

  const handleAddToCart = () => {
    addToCart(
      product,
      1,
      selectedSize,
      !!currentVase,
      vasePrice,
      giftMessage,
      deliveryDate,
      deliverySlot
    );
  };

  const title = language === 'ar' ? product.nameAr : product.name;
  const otherBestsellers = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-[var(--color-alabaster)] text-[var(--color-obsidian)] min-h-screen">
      {/* =========================================================================
          01. EDITORIAL HEADER & BREADCRUMB (AS IN REFERENCE)
      ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="text-xs text-[var(--color-obsidian)]/50 tracking-wider font-sans flex items-center gap-2">
          <Link href="/shop" className="hover:text-[var(--color-burgundy)]">
            Catalog
          </Link>
          <span>/</span>
          <Link href={`/collections/${product.category}`} className="hover:text-[var(--color-burgundy)] capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--color-obsidian)] font-medium">Bouquet {product.name.toLowerCase()}</span>
        </nav>
      </div>

      {/* =========================================================================
          02. MAIN PRODUCT VIEW (FAITHFUL TO REFERENCE IMAGE)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Clean Bouquet Imagery */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-[4/4] sm:aspect-[4/4] rounded-2xl overflow-hidden bg-white border border-[var(--color-stone)]/50 shadow-xs flex items-center justify-center p-4">
              <img
                src={product.images[0]}
                alt={title}
                className="w-full h-full object-contain sm:object-cover rounded-xl transition-transform duration-700 hover:scale-102"
              />

              {/* Top-Right Wishlist Heart */}
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-xs ${
                  isWishlisted
                    ? 'bg-[var(--color-burgundy)] text-white border-[var(--color-burgundy)]'
                    : 'bg-white/90 text-[var(--color-obsidian)]/70 hover:text-[var(--color-burgundy)] border-[var(--color-stone)] hover:bg-white'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Stem breakdown note below image (as in reference: *S - 24 flowers M - 34 flowers L - 48 flowers) */}
            <p className="text-[11px] font-mono tracking-wider text-[var(--color-obsidian)]/60 pt-1">
              *S — {Math.round(product.stemCount * 0.75)} flowers &nbsp;&nbsp; M — {product.stemCount} flowers &nbsp;&nbsp; L — {Math.round(product.stemCount * 1.5)} flowers
            </p>
          </div>

          {/* Right Column: Title, Sizes, Price, Bullet Points & Vases */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[var(--color-obsidian)] uppercase">
                {title}
              </h1>

              {/* Size Selector: Size* (S) (M) (L) */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs font-serif tracking-wider text-[var(--color-obsidian)]/80">
                  Size*
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'Classic', label: 'S' },
                    { id: 'Grand', label: 'M' },
                    { id: 'Majestic', label: 'L' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSize(s.id as any)}
                      className={`w-8 h-8 rounded-full text-xs font-serif flex items-center justify-center border cursor-pointer transition-all ${
                        selectedSize === s.id
                          ? 'border-[var(--color-obsidian)] bg-[var(--color-obsidian)] text-white font-semibold'
                          : 'border-[var(--color-stone)] bg-white text-[var(--color-obsidian)] hover:border-[var(--color-obsidian)]/60'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Cart Inline CTA (as in reference: $180 • CART •) */}
              <div className="mt-6 flex items-center gap-4">
                <span className="font-serif text-3xl font-medium text-[var(--color-obsidian)]">
                  ${unitPrice}
                </span>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3 px-8 rounded-full bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-95 text-white text-xs tracking-widest uppercase font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>• {language === 'ar' ? 'أضف للسلة' : 'CART'} •</span>
                </button>
              </div>
            </div>

            {/* Editorial Bullet Points (Faithful to Reference Copy) */}
            <div className="space-y-3 pt-4 border-t border-[var(--color-stone)]/70 text-xs text-[var(--color-obsidian)]/75 leading-relaxed font-sans">
              <p className="flex items-start gap-2">
                <span className="text-[var(--color-burgundy)] font-bold text-sm leading-none">•</span>
                <span>
                  {language === 'ar'
                    ? product.shortDescriptionAr
                    : `A charming, delicate bouquet of ranunculus, roses, complemented by meadow flowers and seasonal foliage. This bouquet will melt the heart of any flower lover.`}
                </span>
              </p>

              <p className="flex items-start gap-2">
                <span className="text-[var(--color-burgundy)] font-bold text-sm leading-none">•</span>
                <span>
                  {language === 'ar'
                    ? `زهور طازجة مع أوراق خضراء طبيعية مبهجة. تضم زهوراً محورية مثل: ${product.stems.map(s => s.name).join('، ')}.`
                    : `Fresh dawn-cut flowers plus a flourish of festive foliage. Expect focal blooms like ${product.stems.map(s => s.name).join(', ')}.`}
                </span>
              </p>

              <p className="flex items-start gap-2">
                <span className="text-[var(--color-burgundy)] font-bold text-sm leading-none">•</span>
                <span>
                  {language === 'ar'
                    ? `كل ما عليك فعله هو إخراج الباقة وقص السيقان بمقدار 2 سم بزاوية مائلة، ووضعها في المزهرية مع فك الشريط بلطف. نصيحة الخبراء: لا تنسَ تغيير الماء يومياً.`
                    : `All you need to do is unpack the arrangement, give the stems a quick 2cm diagonal trim, pop it into the decorative vase with fresh water, and release the tie holding the design in place. Pro tip: Don't forget to replace the water daily or as often as you can remember!`}
                </span>
              </p>
            </div>

            {/* "You can add a vase to your order" Section (as in Reference) */}
            <div className="pt-6 border-t border-[var(--color-stone)]/70">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-serif tracking-wider text-[var(--color-obsidian)] uppercase font-semibold">
                  {language === 'ar' ? 'يمكنك إضافة مزهرية لطلبك' : 'You can add a vase to your order'}
                </h3>
                <div className="flex items-center gap-1.5 text-[var(--color-obsidian)]/60">
                  <button
                    type="button"
                    onClick={() => setSelectedVaseId(null)}
                    className="text-[10px] underline hover:text-[var(--color-burgundy)] mr-2 cursor-pointer"
                  >
                    {language === 'ar' ? 'بدون مزهرية' : 'None'}
                  </button>
                  <button
                    type="button"
                    className="w-5 h-5 rounded-full border border-[var(--color-stone)] flex items-center justify-center hover:bg-white text-xs cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="w-5 h-5 rounded-full border border-[var(--color-stone)] flex items-center justify-center hover:bg-white text-xs cursor-pointer"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Vase Tiles with Color Circles & Prices */}
              <div className="grid grid-cols-4 gap-2.5">
                {VASE_OPTIONS.slice(1).map(vase => {
                  const isSelected = selectedVaseId === vase.id;
                  return (
                    <button
                      key={vase.id}
                      type="button"
                      onClick={() => setSelectedVaseId(isSelected ? null : vase.id)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                        isSelected
                          ? 'border-[var(--color-burgundy)] bg-[var(--color-blush-silk)]/60 ring-2 ring-[var(--color-burgundy)]/30'
                          : 'border-[var(--color-stone)] bg-white hover:border-[var(--color-obsidian)]/40'
                      }`}
                    >
                      {/* Stylized Vase Icon/Color Vessel */}
                      <div
                        className="w-8 h-10 rounded-t-lg rounded-b-md shadow-xs mb-1.5 border border-black/10 flex items-center justify-center"
                        style={{ backgroundColor: vase.color }}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 text-white" /> : null}
                      </div>
                      <span className="text-[10px] font-mono text-[var(--color-obsidian)] font-semibold">
                        ${vase.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Gift Message & Delivery Window */}
            <div className="pt-4 border-t border-[var(--color-stone)]/70">
              <button
                type="button"
                onClick={() => setShowGiftMessage(!showGiftMessage)}
                className="text-xs text-[var(--color-burgundy)] underline font-medium cursor-pointer"
              >
                {showGiftMessage
                  ? language === 'ar'
                    ? 'إخفاء بطاقة الإهداء والجدولة'
                    : 'Hide Gift Card & Delivery Scheduler'
                  : language === 'ar'
                  ? '+ إضافة بطاقة إهداء مكتوبة بخط يدوي وتاريخ توصيل'
                  : '+ Add Handwritten Gift Card & Choose Delivery Date'}
              </button>

              {showGiftMessage ? (
                <div className="mt-3 space-y-3 p-4 rounded-xl bg-white border border-[var(--color-stone)] text-xs">
                  <div>
                    <label className="block text-[11px] font-medium mb-1">
                      {language === 'ar' ? 'رسالة الإهداء (تُكتب بخط اليد)' : 'Calligraphy Card Message'}
                    </label>
                    <textarea
                      rows={2}
                      value={giftMessage}
                      onChange={e => setGiftMessage(e.target.value)}
                      placeholder="Write your sweet words here..."
                      className="w-full p-2.5 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1">
                      {language === 'ar' ? 'تاريخ التوصيل' : 'Preferred Delivery Date'}
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={e => setDeliveryDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 rounded-lg border border-[var(--color-stone)] bg-[var(--color-alabaster)]"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03. "HOW TO KEEP FLOWERS FRESH?" EDITORIAL SECTION (AS IN REFERENCE)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[var(--color-stone)]/80">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[var(--color-obsidian)] uppercase mb-10">
          HOW TO KEEP FLOWERS FRESH?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Card 1: Florist in Workshop */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[var(--color-stone)] shadow-xs">
              <img
                src="/images/products/flower-spring-mix.jpg"
                alt="Florist carefully arranging stems"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-[var(--color-obsidian)]/70 leading-relaxed font-sans">
              Every morning our florists select only the healthiest stems with intact water conduits. Cut flowers need dedicated care from the moment they arrive at your home.
            </p>
          </div>

          {/* Card 2: Fresh Flowers & Advice Text */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[var(--color-stone)] shadow-xs">
              <img
                src="/images/products/flower-purple-tulips-wrap.jpg"
                alt="Fresh bouquet hydration"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs text-[var(--color-obsidian)]/80 leading-relaxed font-sans">
              <p>
                We recommend changing the water every day so that the flowers please you as long as possible. For the freshness of cut flowers, you need to put them in a wide vase, trim the stems by 2 cm, remove part of the leaves, and do not put many flowers in one vase.
              </p>
              <p className="font-serif italic text-sm text-[var(--color-burgundy)]">
                "As a child needs mother's care, so flowers need fresh water, space, and a comfortable temperature."
              </p>
              <div>
                <Link
                  href="/shipping-returns"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-obsidian)] hover:text-[var(--color-burgundy)] transition-colors"
                >
                  <span>→ GO TO CARE GUIDE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04. "BESTSELLERS" SECTION WITH EDITORIAL QUOTE TILE (AS IN REFERENCE)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 border-t border-[var(--color-stone)]/80 pt-16">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[var(--color-obsidian)] uppercase mb-10">
          BESTSELLERS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Tile 1: Product */}
          <Link
            href={`/product/${otherBestsellers[0].id}`}
            className="group flex flex-col justify-between bg-white p-4 rounded-2xl border border-[var(--color-stone)] shadow-2xs hover:shadow-md transition-all"
          >
            <div className="aspect-[1/1] w-full rounded-xl overflow-hidden bg-[var(--color-parchment)] mb-4">
              <img
                src={otherBestsellers[0].images[0]}
                alt={otherBestsellers[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="font-serif text-base uppercase font-medium text-[var(--color-obsidian)] group-hover:text-[var(--color-burgundy)] transition-colors">
                {otherBestsellers[0].name}
              </h3>
              <p className="font-serif text-sm font-semibold text-[var(--color-burgundy)] mt-1">
                ${otherBestsellers[0].price}
              </p>
            </div>
          </Link>

          {/* Tile 2: Editorial Quote Card (as seen in Marsano layout) */}
          <div className="p-6 rounded-2xl bg-[#E8EFEA] border border-[#D0DDD4] flex flex-col justify-center items-center text-center">
            <p className="font-serif text-sm sm:text-base tracking-widest uppercase text-[var(--color-obsidian)] font-medium leading-relaxed">
              "WE SELL WHAT WE LOVE. THIS IS HOW CREATED A STYLE JARDIN VIVANT"
            </p>
            <span className="w-8 h-0.5 bg-[var(--color-obsidian)]/30 mt-4" />
          </div>

          {/* Tile 3: Product */}
          <Link
            href={`/product/${otherBestsellers[1].id}`}
            className="group flex flex-col justify-between bg-white p-4 rounded-2xl border border-[var(--color-stone)] shadow-2xs hover:shadow-md transition-all"
          >
            <div className="aspect-[1/1] w-full rounded-xl overflow-hidden bg-[var(--color-parchment)] mb-4">
              <img
                src={otherBestsellers[1].images[0]}
                alt={otherBestsellers[1].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="font-serif text-base uppercase font-medium text-[var(--color-obsidian)] group-hover:text-[var(--color-burgundy)] transition-colors">
                {otherBestsellers[1].name}
              </h3>
              <p className="font-serif text-sm font-semibold text-[var(--color-burgundy)] mt-1">
                ${otherBestsellers[1].price}
              </p>
            </div>
          </Link>

          {/* Tile 4: Product */}
          <Link
            href={`/product/${otherBestsellers[2].id}`}
            className="group flex flex-col justify-between bg-white p-4 rounded-2xl border border-[var(--color-stone)] shadow-2xs hover:shadow-md transition-all"
          >
            <div className="aspect-[1/1] w-full rounded-xl overflow-hidden bg-[var(--color-parchment)] mb-4">
              <img
                src={otherBestsellers[2].images[0]}
                alt={otherBestsellers[2].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="font-serif text-base uppercase font-medium text-[var(--color-obsidian)] group-hover:text-[var(--color-burgundy)] transition-colors">
                {otherBestsellers[2].name}
              </h3>
              <p className="font-serif text-sm font-semibold text-[var(--color-burgundy)] mt-1">
                ${otherBestsellers[2].price}
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
