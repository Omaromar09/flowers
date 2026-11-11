'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[var(--color-obsidian)] text-[var(--color-alabaster)] pt-20 pb-12 border-t border-[var(--color-stone)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Brand Statement Banner */}
        <div className="pb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-butter-dahlia)]" />
              {t('footer.newsletter_title')}
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-medium mt-2 leading-tight">
              {language === 'ar'
                ? 'استقبل إشعارات الحصاد المبكر وأسرار العناية بالزهور'
                : 'Receive Dawn-Cut Invitations & Master Botanist Notes'}
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[var(--color-alabaster)]/70 max-w-lg leading-relaxed">
              {t('footer.newsletter_desc')}
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-[var(--color-butter-dahlia)] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>
                  {language === 'ar'
                    ? 'شكراً لانضمامك إلى دائرة جاردان فيفان الخاصة!'
                    : 'Welcome to the Jardin Vivant Salon. Your seasonal gazette will arrive at dawn.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني الراقي...' : 'Enter your email address...'}
                  required
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/20 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-rose-velvet)] focus:bg-white/10 transition-colors"
                />
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-hover)] active:scale-95 text-white text-xs tracking-wider uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('footer.subscribe')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Multi-Column Directory */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-tight font-medium text-white block">
                JARDIN VIVANT
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-sans text-[var(--color-sage)] block">
                {language === 'ar' ? 'دار الزهور الفاخرة • باريس' : 'Haute Botanique • Paris'}
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed text-xs max-w-sm">
              {language === 'ar'
                ? 'دار فرنسية عريقة متخصصة في تنسيق الزهور الطبيعية النادرة، تجمع بين روح الفن المعماري والقطاف العضوي المستدام.'
                : 'A Parisian botanical house dedicated to living floral architecture, sustainably farmed garden blooms, and temperature-controlled white glove delivery.'}
            </p>
            <div className="pt-2 flex items-center gap-3 text-[11px] text-white/50">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-[var(--color-sage)]" /> 100% Ethical Growers
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-sage)]" /> Freshness Guaranteed
              </span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-4">
              {language === 'ar' ? 'المجموعات الزهرية' : 'Curated Flora'}
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <Link href="/collections/roses" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'ورود الحدائق الإكوادورية' : 'Ecuadorian Roses'}
                </Link>
              </li>
              <li>
                <Link href="/collections/peonies" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'زهور البيوني الفرنسية' : 'French Peonies'}
                </Link>
              </li>
              <li>
                <Link href="/collections/tulips" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'توليب قنوات كيوكينهوف' : 'Keukenhof Tulips'}
                </Link>
              </li>
              <li>
                <Link href="/collections/wedding" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'أعراس ومناسبات كبرى' : 'Grand Celebrations'}
                </Link>
              </li>
              <li>
                <Link href="/collections/luxury" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'منحوتات الزهور الكبرى' : 'Masterpiece Sculptures'}
                </Link>
              </li>
            </ul>
          </div>

          {/* The Atelier & Care */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-4">
              {language === 'ar' ? 'الدار والكونسيرج' : 'Atelier & Concierge'}
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'قصتنا وتراثنا' : 'Our Artisanal Heritage'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'خدمة الكونسيرج' : 'Private Concierge'}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Inquired'}
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-white transition-colors">
                  {language === 'ar' ? 'سياسة التوصيل المبرد' : 'Climate Courier & Care'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Salons & Locations */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-4">
              {language === 'ar' ? 'معارضنا' : 'Boutique Salons'}
            </h4>
            <div className="space-y-3 text-white/70">
              <div>
                <p className="font-semibold text-white">Paris Place Vendôme</p>
                <p className="text-[11px] text-white/50">24 Place Vendôme, 75001 Paris</p>
              </div>
              <div>
                <p className="font-semibold text-white">London Mayfair</p>
                <p className="text-[11px] text-white/50">14 Mount Street, Mayfair, London</p>
              </div>
              <div>
                <p className="font-semibold text-white">Dubai Downtown</p>
                <p className="text-[11px] text-white/50">Boulevard Plaza, Downtown Dubai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>© {new Date().getFullYear()} Jardin Vivant Haute Botanique. {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
            <span>Verified SSL 256-Bit Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
