'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Leaf, Award, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          {language === 'ar' ? 'قصتنا وتراثنا' : 'Artisanal Heritage'}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-medium text-[var(--color-obsidian)] mt-2">
          {language === 'ar' ? 'فلسفة حديقة الحياة' : 'The Living Garden Manifesto'}
        </h1>
        <p className="mt-4 text-xs sm:text-base text-[var(--color-obsidian)]/75 leading-relaxed">
          {language === 'ar'
            ? 'تأسست دار جاردان فيفان في باريس برؤية واحدة: الارتقاء بتنسيق الزهور من مجرد تجارة إلى فن معماري حي يخاطب الوجدان.'
            : 'Founded in Paris, Jardin Vivant was conceived with an uncompromising ambition: transforming floral arranging from simple commerce into living architecture that endures in human emotion.'}
        </p>
      </div>

      {/* Hero Image Showcase */}
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-stone)] mb-20">
        <img
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1800&q=85"
          alt="Jardin Vivant French Atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)]/70 via-transparent to-transparent flex items-end p-8 sm:p-12">
          <p className="font-serif text-xl sm:text-3xl text-white max-w-2xl font-light">
            "We do not merely assemble stems. We curate the natural breathing tension between negative space and blossoming majesty."
          </p>
        </div>
      </div>

      {/* 3 Chapters of Craftsmanship */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        <div className="space-y-3 p-6 rounded-2xl bg-white border border-[var(--color-stone)]">
          <span className="font-mono text-xs text-[var(--color-burgundy)] font-bold">01 / DAWN HARVEST</span>
          <h3 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
            {language === 'ar' ? 'قطاف الفجر الإكوادوري' : 'High-Altitude Volcanic Terroir'}
          </h3>
          <p className="text-xs text-[var(--color-obsidian)]/70 leading-relaxed">
            Our garden roses are harvested at 2,800 meters above sea level on the volcanic slopes of the Andes. Intense natural sunlight and cool nocturnal temperatures cultivate blooms with twice the petal count of ordinary floristry.
          </p>
        </div>

        <div className="space-y-3 p-6 rounded-2xl bg-white border border-[var(--color-stone)]">
          <span className="font-mono text-xs text-[var(--color-burgundy)] font-bold">02 / IKEBANA HARMONY</span>
          <h3 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
            {language === 'ar' ? 'فلسفة التوازن المعماري' : 'French Romanticism & Japanese Line'}
          </h3>
          <p className="text-xs text-[var(--color-obsidian)]/70 leading-relaxed">
            Our florists study under master floral architects in Tokyo and Grasse, balancing the wild asymmetry of natural branch curves with the lush abundance of European royal salon centerpieces.
          </p>
        </div>

        <div className="space-y-3 p-6 rounded-2xl bg-white border border-[var(--color-stone)]">
          <span className="font-mono text-xs text-[var(--color-burgundy)] font-bold">03 / SUSTAINABILITY</span>
          <h3 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
            {language === 'ar' ? 'الاستدامة والمسؤولية' : 'Zero Floral Waste & Biodegradability'}
          </h3>
          <p className="text-xs text-[var(--color-obsidian)]/70 leading-relaxed">
            We operate on a strictly limited pre-ordered daily harvest model to eliminate flower wastage. All floral wraps, silk ribbons, and hydration pouches are 100% compostable and certified ocean-safe.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-12 rounded-3xl bg-[var(--color-parchment)] border border-[var(--color-stone)] text-center max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl font-medium text-[var(--color-obsidian)]">
          {language === 'ar' ? 'اختبر تجربة جاردان فيفان اليوم' : 'Experience The Living Garden In Your Home'}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[var(--color-obsidian)]/70 max-w-lg mx-auto">
          Reserve your dawn-cut bouquet today or consult our floral concierges for bespoke wedding and private salon commissions.
        </p>
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-[var(--color-burgundy)] text-white text-xs tracking-wider uppercase font-semibold hover:bg-[var(--color-burgundy-hover)] transition-colors shadow-md"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
