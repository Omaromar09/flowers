'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PRODUCTS, CATEGORIES_LIST } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

export default function CollectionPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language } = useLanguage();

  const categoryInfo = CATEGORIES_LIST.find(c => c.slug === slug);
  const products = PRODUCTS.filter(p => p.category === slug);

  if (!categoryInfo && slug !== 'all') {
    return (
      <div className="py-24 text-center">
        <h1 className="font-serif text-3xl">Collection Not Found</h1>
        <Link href="/shop" className="text-xs text-[var(--color-burgundy)] underline mt-4 inline-block">
          Return to All Collections
        </Link>
      </div>
    );
  }

  const categoryDescriptions: Record<string, { en: string; ar: string; heroImg: string }> = {
    roses: {
      en: 'High-altitude Colombian and Ecuadorian garden roses, celebrated for velvety density, rich scent, and 12-day vase life.',
      ar: 'ورود الحدائق الإكوادورية والكولومبية المزروعة في أعالي الجبال البركانية، وتتميز بكثافة بتلاتها وعمرها المديد.',
      heroImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85'
    },
    peonies: {
      en: 'The ephemeral jewel of Parisian spring. Hand-harvested French Sarah Bernhardt and coral charm peonies.',
      ar: 'جوهرة الربيع الباريسي الفاتنة. أزهار بيوني فرنسية نقية تُقطف يدوياً وتتفتح في طبقات حريرية أخّاذة.',
      heroImg: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=85'
    },
    tulips: {
      en: 'Directly sourced from the historic Keukenhof valley. Double-flowering, parrot, and fringed Dutch tulips that bend towards the sun.',
      ar: 'مستوردة مباشرة من سهول كيوكينهوف التاريخية في هولندا. تشكيلات فريدة تتراقص مع الضوء داخل المزهريات.',
      heroImg: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1600&q=85'
    },
    luxury: {
      en: 'Monumental floral sculptures designed for grand salon reception spaces, palatial tables, and diplomatic galas.',
      ar: 'منحوتات زهرية كبرى صُممت لقصور الضيافة وصالات الاستقبال والفعاليات الدبلوماسية الرفيعة.',
      heroImg: 'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1600&q=85'
    },
    wedding: {
      en: 'Pristine white orchids, calla lilies, and cascading gardenias engineered for timeless ceremonial elegance.',
      ar: 'أوركيد أبيض ناصع وزنابق الكالا والغردينيا المنسقة بأعلى معايير الأناقة لحفلات الزفاف الخالدة.',
      heroImg: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1600&q=85'
    },
    birthday: {
      en: 'Vibrant golden sunflowers, French buttercups, and joyful meadow blossoms to celebrate milestones and life.',
      ar: 'زهور عباد الشمس الذهبية المشمسة وأزهار المروج المبهجة للاحتفال بأجمل أعياد الميلاد ولحظات الفرح.',
      heroImg: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=85'
    },
    'vases-gifts': {
      en: 'Artisan blown crystal urns, matte porcelain vessels, and Grasse botanical scents to accompany your blooms.',
      ar: 'مزهريات كريستال منفوخة يدوياً وأواني البورسلين وعطور جراس النباتية الفاخرة لتكتمل هديتك.',
      heroImg: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?auto=format&fit=crop&w=1600&q=85'
    }
  };

  const desc = categoryDescriptions[slug] || {
    en: 'Limited harvests of architectural floral compositions.',
    ar: 'حصاد ناد ومحدود من أرقى التنسيقات الزهرية.',
    heroImg: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1600&q=85'
  };

  return (
    <div>
      {/* Category Editorial Hero */}
      <div className="relative py-24 bg-[var(--color-obsidian)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={desc.heroImg} alt="Collection Banner" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'العودة لجميع المجموعات' : 'All Collections'}</span>
          </Link>
          <span className="block text-[11px] font-mono tracking-widest uppercase text-[var(--color-butter-dahlia)]">
            Haute Botanique Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium mt-2">
            {language === 'ar' ? categoryInfo?.nameAr : categoryInfo?.name}
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            {language === 'ar' ? desc.ar : desc.en}
          </p>
        </div>
      </div>

      {/* Products list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p}>
              <ProductCard.Media />
              <ProductCard.Body />
              <ProductCard.Price />
              <ProductCard.Actions />
            </ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
}
