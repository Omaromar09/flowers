'use client';

import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, Layers, Flower, Palette } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/types';

export default function BouquetCustomizer() {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  const [baseFlower, setBaseFlower] = useState('Crimson Garden Roses');
  const [tier, setTier] = useState<'Petite' | 'Signature' | 'Grand'>('Signature');
  const [accents, setAccents] = useState<string[]>(['Blush Peonies', 'Italian Ranunculus']);
  const [greenery, setGreenery] = useState('Seeded Eucalyptus & Olive Leaves');
  const [packaging, setPackaging] = useState('French Silk Paper & Grosgrain Ribbon');
  const [giftCard, setGiftCard] = useState('');

  const tiers = [
    { id: 'Petite', name: 'Petite Harvest (18 Stems)', nameAr: 'باقة بيتي (١٨ ساق)', price: 135 },
    { id: 'Signature', name: 'Signature Volume (32 Stems)', nameAr: 'باقة الدار الخاصة (٣٢ ساق)', price: 215 },
    { id: 'Grand', name: 'Grand Splendor (50 Stems)', nameAr: 'الفخامة الملكية (٥٠ ساق)', price: 340 }
  ];

  const baseFlowerOptions = [
    {
      name: 'Crimson Garden Roses',
      nameAr: 'الورد الجوري القرمزي المخملي',
      origin: 'Ecuador',
      image: '/images/products/flower-crimson-water.jpg'
    },
    {
      name: 'Loire Valley Peonies',
      nameAr: 'زهور البيوني الفرنسية الفاخرة',
      origin: 'France',
      image: '/images/products/flower-giant-peonies.jpg'
    },
    {
      name: 'Dutch Keukenhof Tulips',
      nameAr: 'توليب كيوكينهوف الهولندي الملكي',
      origin: 'Netherlands',
      image: '/images/products/flower-purple-tulips-wrap.jpg'
    },
    {
      name: 'Spring Gardenia & Ranunculus',
      nameAr: 'رانونكولوس الربيع والغردينيا البيضاء',
      origin: 'Italy & France',
      image: '/images/products/flower-spring-mix.jpg'
    }
  ];

  const accentOptions = [
    'Blush Peonies',
    'Italian Ranunculus',
    'Grasse Lavender Bundles',
    'Golden Craspedia Spheres',
    'Feathered Astilbe',
    'Chamomile Stars'
  ];

  const currentTierObj = tiers.find(t => t.id === tier) || tiers[1];

  const toggleAccent = (acc: string) => {
    setAccents(prev =>
      prev.includes(acc) ? prev.filter(a => a !== acc) : prev.length < 3 ? [...prev, acc] : prev
    );
  };

  const handleAddCustomBouquet = () => {
    const customProduct: Product = {
      id: `custom-jv-${Date.now()}`,
      name: `Bespoke Creation: ${baseFlower}`,
      nameAr: `تصميم خاص: ${baseFlower}`,
      botanicalName: `Custom Flora Atelier • ${tier}`,
      slug: `custom-bouquet-${Date.now()}`,
      category: 'custom',
      price: currentTierObj.price,
      rating: 5.0,
      reviewCount: 1,
      badge: 'Exclusive',
      shortDescription: `Curated with ${baseFlower}, harmonized with ${accents.join(', ')} and ${greenery}.`,
      shortDescriptionAr: `تنسيق خاص من ${baseFlower} مع لمسات من ${accents.join(' و ')}.`,
      fullDescription: `A one-of-a-kind floral sculpture designed via the Jardin Vivant Atelier. Handcrafted by master florists with dawn-cut stems and wrapped in ${packaging}.`,
      fullDescriptionAr: `تحفة زهرية فريدة صُممت خصيصاً في استوديو جاردان فيفان بأيدي كبار المنسقين.`,
      images: [
        baseFlowerOptions.find(b => b.name === baseFlower)?.image ||
          '/images/products/flower-peach-macro.jpg'
      ],
      colorTone: 'pastel',
      occasion: ['romance', 'anniversary', 'birthday'],
      stemCount: tier === 'Petite' ? 18 : tier === 'Signature' ? 32 : 50,
      stems: [
        { name: baseFlower, count: tier === 'Petite' ? 12 : tier === 'Signature' ? 20 : 32 },
        { name: accents.join(' & '), count: tier === 'Petite' ? 4 : tier === 'Signature' ? 8 : 12 },
        { name: greenery, count: tier === 'Petite' ? 2 : tier === 'Signature' ? 4 : 6 }
      ],
      dimensions: '55cm H × 45cm W',
      scentProfile: 'Delicate & Fresh',
      scentProfileAr: 'رقيق ومنعش',
      careInstructions: [
        'Place in cool room with fresh water.',
        'Trim stems diagonally every 48 hours.'
      ],
      careInstructionsAr: ['ضع الباقة في مكان بارد مع تجديد الماء كل يومين.'],
      inStock: true,
      vaseIncluded: false
    };

    addToCart(customProduct, 1, 'Classic', false, 0, giftCard);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          {language === 'ar' ? 'استوديو التصميم الخاص' : 'The Bespoke Floral Atelier'}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-obsidian)] mt-2">
          {language === 'ar' ? 'ابتكر باقتك الاستثنائية' : 'Sculpt Your Signature Composition'}
        </h2>
        <p className="mt-4 text-xs md:text-sm text-[var(--color-obsidian)]/70 leading-relaxed">
          {language === 'ar'
            ? 'اختر الزهور المحورية، وتدرجات الألوان، وطراز التغليف، ليقوم فنانونا بنحت باقة تحاكي ذوقك الرفيع.'
            : 'Select focal stems, harmonizing accents, and artisan wrapping. Our master florists will hand-bind your vision into a living sculpture.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Configuration Steps (8 Cols) */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[var(--color-stone)] shadow-sm">
          {/* Step 1: Volume / Stem Tier */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-obsidian)] flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[var(--color-burgundy)] text-white text-[10px] flex items-center justify-center font-mono">
                1
              </span>
              {language === 'ar' ? 'اختر حجم وعدد السيقان' : 'Select Volume & Stem Count'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tiers.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTier(t.id as any)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    tier === t.id
                      ? 'border-[var(--color-burgundy)] bg-[var(--color-blush-silk)]/60 text-[var(--color-burgundy)] shadow-xs'
                      : 'border-[var(--color-stone)] bg-[var(--color-alabaster)] hover:border-[var(--color-stone)]/80 text-[var(--color-obsidian)]'
                  }`}
                >
                  <p className="text-xs font-semibold">
                    {language === 'ar' ? t.nameAr : t.name}
                  </p>
                  <p className="font-serif text-base font-bold mt-1 text-[var(--color-burgundy)]">
                    ${t.price}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Focal Flower */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-obsidian)] flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[var(--color-burgundy)] text-white text-[10px] flex items-center justify-center font-mono">
                2
              </span>
              {language === 'ar' ? 'حدد الزهرة المحورية الأساسية' : 'Choose Your Signature Focal Bloom'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {baseFlowerOptions.map(b => (
                <button
                  key={b.name}
                  type="button"
                  onClick={() => setBaseFlower(b.name)}
                  className={`group relative rounded-xl overflow-hidden border text-left cursor-pointer transition-all ${
                    baseFlower === b.name
                      ? 'border-[var(--color-burgundy)] ring-2 ring-[var(--color-burgundy)]/20 shadow-md'
                      : 'border-[var(--color-stone)] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--color-parchment)]">
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-2.5 bg-white">
                    <p className="text-[11px] font-medium text-[var(--color-obsidian)] line-clamp-1">
                      {language === 'ar' ? b.nameAr : b.name}
                    </p>
                    <p className="text-[9px] text-[var(--color-sage)] font-mono">{b.origin}</p>
                  </div>
                  {baseFlower === b.name ? (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-burgundy)] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Complementary Accents */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-obsidian)] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--color-burgundy)] text-white text-[10px] flex items-center justify-center font-mono">
                  3
                </span>
                {language === 'ar' ? 'الزهور الثانوية المكملة (اختر حتى ٣)' : 'Complementary Accents (Up to 3)'}
              </h3>
              <span className="text-[10px] text-[var(--color-sage)] font-mono">{accents.length}/3 Selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {accentOptions.map(acc => {
                const isSelected = accents.includes(acc);
                return (
                  <button
                    key={acc}
                    type="button"
                    onClick={() => toggleAccent(acc)}
                    className={`py-1.5 px-3 rounded-full text-xs font-medium border cursor-pointer transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'border-[var(--color-burgundy)] bg-[var(--color-burgundy)] text-[var(--color-alabaster)] shadow-xs'
                        : 'border-[var(--color-stone)] bg-[var(--color-alabaster)] text-[var(--color-obsidian)]/80 hover:border-[var(--color-obsidian)]/30'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3" /> : null}
                    <span>{acc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Presentation & Packaging */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-obsidian)] flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[var(--color-burgundy)] text-white text-[10px] flex items-center justify-center font-mono">
                4
              </span>
              {language === 'ar' ? 'طراز التغليف والتقديم' : 'Artisan Presentation & Ribbon'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                'French Silk Paper & Grosgrain Ribbon',
                'Natural Organic Linen & Raw Botanical Twine',
                'Signature Jardin Vivant Obsidian Gift Box',
                'Pre-arranged in Water Reservoir Travel Vase'
              ].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPackaging(opt)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    packaging === opt
                      ? 'border-[var(--color-burgundy)] bg-[var(--color-blush-silk)]/60 text-[var(--color-burgundy)] font-medium'
                      : 'border-[var(--color-stone)] bg-[var(--color-alabaster)] text-[var(--color-obsidian)]/80'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Calligraphy Card Message */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-[var(--color-obsidian)] mb-2">
              {language === 'ar' ? 'رسالة الإهداء بالخط اليدوي' : 'Handwritten Calligraphy Card Message'}
            </label>
            <textarea
              value={giftCard}
              onChange={e => setGiftCard(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'اكتب رسالتك وسيقوم خطاط الدار بكتابتها على ورق قطني فاخر...'
                  : 'Enter your heartfelt message to be penned on deckled cotton paper by our calligrapher...'
              }
              rows={3}
              maxLength={250}
              className="w-full p-3 text-xs rounded-xl border border-[var(--color-stone)] bg-[var(--color-alabaster)] focus:bg-white focus:outline-none focus:border-[var(--color-burgundy)]"
            />
          </div>
        </div>

        {/* Live Recipe & Summary Card (5 Cols Sticky) */}
        <div className="lg:col-span-5 sticky top-24 bg-[var(--color-parchment)] p-6 sm:p-8 rounded-2xl border border-[var(--color-stone)] shadow-md">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
            Live Atelier Recipe
          </span>
          <h3 className="font-serif text-2xl font-medium text-[var(--color-obsidian)] mt-1">
            {baseFlower}
          </h3>
          <p className="text-xs text-[var(--color-obsidian)]/60 mt-0.5">
            {currentTierObj.name} • {packaging}
          </p>

          <div className="my-6 aspect-[4/3] rounded-xl overflow-hidden shadow-inner border border-[var(--color-stone)]">
            <img
              src={baseFlowerOptions.find(b => b.name === baseFlower)?.image}
              alt={baseFlower}
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>

          {/* Stem composition preview */}
          <div className="space-y-2 border-t border-[var(--color-stone)] pt-4 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--color-obsidian)]/70">Focal Flower:</span>
              <span className="font-medium text-[var(--color-obsidian)]">{baseFlower}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-obsidian)]/70">Selected Accents:</span>
              <span className="font-medium text-[var(--color-obsidian)]">{accents.join(', ') || 'None'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-obsidian)]/70">Packaging:</span>
              <span className="font-medium text-[var(--color-obsidian)]">{packaging}</span>
            </div>
            {giftCard ? (
              <div className="pt-2 text-[11px] italic text-[var(--color-burgundy)] border-t border-[var(--color-muted-border)]">
                "{giftCard}"
              </div>
            ) : null}
          </div>

          {/* Pricing & CTA */}
          <div className="mt-6 pt-4 border-t border-[var(--color-stone)] flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-obsidian)]/50">
                Total Custom Investment
              </p>
              <p className="font-serif text-2xl font-semibold text-[var(--color-burgundy)]">
                ${currentTierObj.price}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddCustomBouquet}
              className="py-3 px-6 bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-[0.98] text-[var(--color-alabaster)] text-xs tracking-wider uppercase font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{language === 'ar' ? 'اقتناء هذا التنسيق' : 'Commission Creation'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
