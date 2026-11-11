'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FAQItem {
  q: string;
  qAr: string;
  a: string;
  aAr: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: 'Ordering & Harvest',
    q: 'How does the dawn-cut harvesting model work?',
    qAr: 'كيف يعمل نموذج قطاف الفجر المحدود؟',
    a: 'Every stem is harvested at early dawn when the plant moisture and turgidity are at their physical peak. Flowers are immediately placed in chilled botanical nutrient solutions and air-transported under 4°C climate control directly to our Paris, London, and Dubai salons.',
    aAr: 'تُقطف كل ساق مع إشراقة الفجر الأولى حين تكون العصارة الطبيعية والترطيب في ذروتهما، ثم تُنقل مبردة عند ٤ درجات مئوية لتصل إلى صالاتنا بأعلى درجات النضارة.',
  },
  {
    category: 'Ordering & Harvest',
    q: 'Can I select a delivery date up to 6 months in advance?',
    qAr: 'هل يمكنني جدولة تاريخ التوصيل مسبقاً حتى ٦ أشهر؟',
    a: 'Yes. Our reservation system permits booking for anniversaries, birthdays, and matrimonial celebrations up to 180 days ahead. We will reserve your specific bloom cultivars with our growers.',
    aAr: 'نعم، يتيح نظام الحجز المسبق لدينا تحديد مواعيد التوصيل حتى ١٨٠ يوماً مقدماً للأعراس والمناسبات والذكرى السنوية لضمان توفير أنواع الزهور المطلوبة بدقة.',
  },
  {
    category: 'Chilled Courier',
    q: 'How are the flowers protected during transit?',
    qAr: 'كيف تتم حماية الزهور أثناء رحلة التوصيل؟',
    a: 'Each bouquet arrives in our signature insulated matte black or cream presentation case. The stems rest inside a temporary water-retaining organic gel pouch, tied with French grosgrain ribbon and nestled in custom silk cushions.',
    aAr: 'تصل كل باقة داخل صندوق تقديم فاخر معزول حرارياً، وتستقر السيقان في كيس جل عضوي مرطب يحافظ على رطوبتها طوال الرحلة.',
  },
  {
    category: 'Chilled Courier',
    q: 'What happens if the recipient is not present during delivery?',
    qAr: 'ماذا يحدث إذا لم يكن المستلم متواجداً وقت التوصيل؟',
    a: 'Our couriers contact the patron or designated recipient 30 minutes prior to arrival. If unattended, the chilled box is left with the residence concierge or front-desk porter in a climate-controlled area, and photo confirmation is sent immediately.',
    aAr: 'يتواصل مندوب التوصيل مع المستلم قبل ٣٠ دقيقة من الوصول. وفي حال عدم تواجده، يُسلم الصندوق المبرد لأمن المبنى أو كونسيرج الاستقبال مع إرسال تأكيد مصور فوري.',
  },
  {
    category: 'Care & Longevity',
    q: 'How can I ensure my flowers last 10 to 14 days?',
    qAr: 'كيف أضمن بقاء الزهور نضرة لمدة ١٠ إلى ١٤ يوماً؟',
    a: 'Always recut stem tips at a 45-degree angle under lukewarm water before arranging. Change water every 48 hours, add our provided botanical nutrient packet, and display away from direct heat sources and ripening fruits.',
    aAr: 'قم بقص أطراف السيقان بزاوية ٤٥ درجة تحت ماء فاتر، وجدد ماء المزهرية كل ٤٨ ساعة مع إضافة المغذي المرفق، وأبعد الزهور عن الحرارة المباشرة وسلال الفواكه.',
  },
  {
    category: 'Care & Longevity',
    q: 'Why do my peonies or roses arrive in semi-closed bud form?',
    qAr: 'لماذا تصل أزهار البيوني والورد كبراعم نصف مفتوحة؟',
    a: 'This is our hallmark of genuine freshness. Shipping fully-blown flowers shortens domestic vase life. Buds will gently open over 48 to 72 hours, revealing layered petal choreography before your eyes.',
    aAr: 'هذا هو المعيار الفعلي للنضارة المطلقة؛ فالزهور المتفتحة بالكامل تفقد أياماً من عمرها في المزهرية. ستشاهد البراعم تتفتح بطبقاتها الحريرية تدريجياً خلال ٤٨ ساعة.',
  }
];

export default function FAQPage() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filteredFaqs = FAQ_DATA.filter(f => {
    const q = search.toLowerCase();
    return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.qAr.includes(q);
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--color-sage)]">
          {language === 'ar' ? 'الأسئلة الشائعة والمعلومات' : 'Frequently Inquired'}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--color-obsidian)] mt-2">
          {language === 'ar' ? 'كل ما تود معرفته عن خدماتنا' : 'Botanical Protocols & Inquiries'}
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[var(--color-obsidian)]/70">
          Everything regarding our ethical growers, temperature-controlled transit, and master care.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-10 max-w-xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search inquiries (e.g. Courier, Vase life, Peonies)..."
          className="w-full text-xs py-3 px-4 rounded-xl border border-[var(--color-stone)] bg-white focus:outline-none focus:border-[var(--color-burgundy)] shadow-xs"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const question = language === 'ar' ? faq.qAr : faq.q;
          const answer = language === 'ar' ? faq.aAr : faq.a;

          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[var(--color-stone)] overflow-hidden transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--color-parchment)]/40 transition-colors"
              >
                <span className="font-serif text-base sm:text-lg font-medium text-[var(--color-obsidian)]">
                  {question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--color-burgundy)] flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen ? (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--color-obsidian)]/75 leading-relaxed border-t border-[var(--color-stone)]/40 bg-[var(--color-alabaster)]/40">
                  {answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Need more help */}
      <div className="mt-16 p-8 rounded-2xl bg-[var(--color-parchment)] border border-[var(--color-stone)] text-center">
        <h3 className="font-serif text-xl font-medium text-[var(--color-obsidian)]">
          Have an inquiry not cataloged here?
        </h3>
        <p className="mt-2 text-xs text-[var(--color-obsidian)]/70">
          Our senior botanical concierge is accessible daily via live correspondence or telephone.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[var(--color-burgundy)] text-white text-xs tracking-wider uppercase font-semibold"
          >
            <span>Consult Concierge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
