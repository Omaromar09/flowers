'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, ThermometerSnowflake, Clock, RefreshCw, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ShippingReturnsPage() {
  const { language } = useLanguage();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          Courier Protocols & Policy
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--color-obsidian)] mt-2">
          {language === 'ar' ? 'سياسة التوصيل المبرد وضمان النضارة' : 'Chilled Courier & Freshness Assurance'}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[var(--color-obsidian)]/70">
          Our uncompromising standards for temperature-controlled transit and 100% replacement pledge.
        </p>
      </div>

      <div className="space-y-12">
        {/* Pillar 1: Chilled Courier Standards */}
        <div className="p-8 rounded-2xl bg-white border border-[var(--color-stone)] shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-blush-silk)] text-[var(--color-burgundy)] flex items-center justify-center">
            <ThermometerSnowflake className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-medium text-[var(--color-obsidian)]">
            Climate-Controlled Transport (2°C – 6°C)
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-obsidian)]/75 leading-relaxed">
            Unlike standard delivery services, Jardin Vivant utilizes our proprietary fleet of refrigerated courier vans maintained precisely between 2°C and 6°C. This locks in the natural hydration of dawn-cut stems, prevents premature blooming, and shields delicate petals from ambient urban heat and wind friction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--color-stone)]/50 text-xs text-[var(--color-obsidian)]/80">
            <div>
              <p className="font-semibold text-[var(--color-obsidian)]">Standard Courier</p>
              <p className="text-[11px] text-[var(--color-obsidian)]/60">$25 flat rate (Complimentary on $200+)</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--color-obsidian)]">Time Slots</p>
              <p className="text-[11px] text-[var(--color-obsidian)]/60">Morning, Afternoon, Evening Window</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--color-obsidian)]">Hand Delivery</p>
              <p className="text-[11px] text-[var(--color-obsidian)]/60">Gloved courier hand-off to recipient</p>
            </div>
          </div>
        </div>

        {/* Pillar 2: 100% Fresh Arrival Guarantee */}
        <div className="p-8 rounded-2xl bg-white border border-[var(--color-stone)] shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-blush-silk)] text-[var(--color-burgundy)] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-medium text-[var(--color-obsidian)]">
            The 100% Fresh Arrival Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-obsidian)]/75 leading-relaxed">
            We stake our salon's reputation on every single blossom. If your arrangement arrives with compromised stems, damaged foliage, or does not meet our rigorous freshness criteria, we will immediately craft and hand-deliver an identical replacement creation within 24 hours at zero expense to you, or issue a full courtesy refund.
          </p>
        </div>

        {/* Pillar 3: Returns Policy on Perishable Goods */}
        <div className="p-8 rounded-2xl bg-[var(--color-parchment)] border border-[var(--color-stone)] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-white text-[var(--color-burgundy)] flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-medium text-[var(--color-obsidian)]">
            Perishable Botanical Policy & Claims
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-obsidian)]/75 leading-relaxed">
            Due to the living, ephemeral nature of fresh-cut flowers, bouquets cannot be returned after 48 hours from delivery. For any claim regarding flower condition or shipping discrepancies, simply email high-resolution photographs to concierge@jardin-vivant.com within 24 hours of delivery. Vases and non-perishable gift accessories may be exchanged within 14 days in their original packaging.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-[var(--color-burgundy)] text-white text-xs tracking-wider uppercase font-semibold"
        >
          <span>Select An Arrangement</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
