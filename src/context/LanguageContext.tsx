'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.shop': 'Shop Catalog',
    'nav.collections': 'Collections',
    'nav.story': 'Our Story',
    'nav.custom': 'Bouquet Atelier',
    'nav.contact': 'Concierge',
    'nav.search': 'Search botanical creations...',
    'nav.cart': 'Cart',
    'nav.wishlist': 'Saved',

    // Hero
    'hero.badge': 'Haute Floral Architecture • Parisian Spring Harvest',
    'hero.title_part1': 'Where Flowers Speak',
    'hero.title_part2': 'A Living Language',
    'hero.subtitle': 'Enter a breathing botanical sanctuary. Handcrafted luxury bouquets, rare Colombian garden roses, and architectural floral sculptures curated for life’s most profound moments.',
    'hero.cta_shop': 'Explore The Collection',
    'hero.cta_atelier': 'Craft Bespoke Bouquet',
    'hero.banner_delivery': 'Guaranteed climate-controlled delivery in signature chilled silk boxes',
    'hero.stat_stems': 'Sustainably Farmed',
    'hero.stat_rating': 'Client Satisfaction',
    'hero.stat_cities': 'Same-Day Courier',

    // Features / Philosophy
    'philosophy.eyebrow': 'The Art of Floral Living',
    'philosophy.title': 'Not merely arranged flowers, but living poetry sculpted by masters.',
    'philosophy.desc': 'Every stem in Jardin Vivant is cut at dawn from certified ethical growers across Grasse, Ecuador, and the Keukenhof valley. Flown under precise climate control and arranged with Japanese Ikebana balance and French romanticism.',
    'philosophy.f1_title': 'Dawn-Cut Freshness',
    'philosophy.f1_desc': 'Harvested at optimal bud maturity for 10-14 days of radiant domestic vase longevity.',
    'philosophy.f2_title': 'Architectural Stem Selection',
    'philosophy.f2_desc': 'Proportionally calculated height, negative space, and natural gravity curves.',
    'philosophy.f3_title': 'Signature Silk-Touch Presentation',
    'philosophy.f3_desc': 'Hand-tied with French grosgrain ribbon in water-retaining biodegradable pouches.',

    // Catalog
    'catalog.title': 'Seasonal Masterpieces',
    'catalog.subtitle': 'Limited daily harvests, orchestrated into breathtaking compositions.',
    'catalog.filter_all': 'All Creations',
    'catalog.filter_roses': 'Garden Roses',
    'catalog.filter_peonies': 'Peonies',
    'catalog.filter_tulips': 'Dutch Tulips',
    'catalog.filter_luxury': 'Grand Sculptures',
    'catalog.sort_label': 'Sort By',
    'catalog.sort_featured': 'Curator’s Choice',
    'catalog.sort_price_low': 'Price: Modest to Grand',
    'catalog.sort_price_high': 'Price: Grand to Modest',
    'catalog.sort_rating': 'Highest Acclaim',
    'catalog.quick_view': 'Quick View',
    'catalog.add_to_cart': 'Acquire Bouquet',
    'catalog.stem_count': 'Flowers',

    // Product detail
    'product.included_vase': 'Signature Vase Included',
    'product.need_vase': 'Complimentary Silk Wrap',
    'product.add_vase': 'Add Artisan Vase',
    'product.size_classic': 'Classic (S)',
    'product.size_grand': 'Grand (M)',
    'product.size_majestic': 'Majestic (L)',
    'product.botanical_composition': 'Botanical Stem Composition',
    'product.scent_profile': 'Fragrance Profile',
    'product.dimensions': 'Arrangement Dimensions',
    'product.care_guide': 'Master Care Routine',
    'product.gift_message_label': 'Complimentary Calligraphy Gift Card',
    'product.gift_placeholder': 'Pen your heartfelt sentiment here... (Max 300 characters)',
    'product.delivery_date_label': 'Select Preferred Delivery Date',

    // Cart Drawer
    'cart.title': 'Your Botanical Selection',
    'cart.empty_title': 'Your Garden Basket is Empty',
    'cart.empty_desc': 'Discover our harvest of garden roses, peonies, and rare botanical blooms.',
    'cart.free_shipping_hint': 'Complimentary courier delivery on orders over $200',
    'cart.free_shipping_unlocked': '✓ Complimentary Chilled Courier Unlocked',
    'cart.subtotal': 'Arrangement Subtotal',
    'cart.shipping': 'Estimated Courier Delivery',
    'cart.discount': 'Botanical Privileges Applied',
    'cart.total': 'Total Investment',
    'cart.checkout_btn': 'Proceed to Luxury Checkout',
    'cart.continue': 'Continue Exploring',
    'cart.remove': 'Remove',

    // Checkout
    'checkout.title': 'Bespoke Order Completion',
    'checkout.step1': '1. Patron Information',
    'checkout.step2': '2. Delivery & Destination',
    'checkout.step3': '3. Payment & Confirmation',
    'checkout.fullname': 'Full Name',
    'checkout.email': 'Email Address',
    'checkout.phone': 'Phone Number (For Courier)',
    'checkout.city': 'City / Metropole',
    'checkout.address': 'Delivery Address',
    'checkout.date': 'Delivery Date',
    'checkout.time_slot': 'Courier Delivery Window',
    'checkout.instructions': 'Special Delivery Instructions',
    'checkout.is_gift': 'This arrangement is an anonymous or dedicated gift',
    'checkout.recipient_name': 'Recipient Name',
    'checkout.recipient_phone': 'Recipient Contact Number',
    'checkout.payment_card': 'Debit / Credit Card (Secure Gateway)',
    'checkout.payment_apple': 'Apple Pay / Digital Wallet',
    'checkout.payment_cod': 'Cash on Chilled Delivery (COD)',
    'checkout.place_order': 'Authorize & Finalize Order',
    'checkout.promo_placeholder': 'Enter Promo Code (e.g. JARDIN10)',
    'checkout.apply_promo': 'Apply',

    // Atelier / Custom
    'atelier.title': 'The Bespoke Floral Atelier',
    'atelier.subtitle': 'Compose your personalized floral sculpture stem by stem with our floral masters.',
    'atelier.step1': '1. Choose Volume & Stems',
    'atelier.step2': '2. Choose Signature Focal Bloom',
    'atelier.step3': '3. Complementary Accents',
    'atelier.step4': '4. Presentation & Wrapping',

    // Footer
    'footer.newsletter_title': 'Receive The Seasonal Floral Gazette',
    'footer.newsletter_desc': 'Exclusive early harvest invitations, care secrets from our botanists, and private floral announcements.',
    'footer.subscribe': 'Join The Circle',
    'footer.rights': 'All rights reserved. Designed with passion for living beauty.'
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر والكتالوج',
    'nav.collections': 'المجموعات',
    'nav.story': 'عن الدار',
    'nav.custom': 'صمم باقتك',
    'nav.contact': 'خدمة العملاء',
    'nav.search': 'ابحث في الباقات والزهور...',
    'nav.cart': 'السلة',
    'nav.wishlist': 'المفضلة',

    // Hero
    'hero.badge': 'أزهار طبيعية فاخرة قطاف الفجر • ربيع باريس',
    'hero.title_part1': 'حين تتحدث الزهور',
    'hero.title_part2': 'برقي الحضور ودفء المشاعر',
    'hero.subtitle': 'مرحباً بك في دار جاردان فيفان. نوفر لك أفخر باقات الورد الطبيعي المنتقاة بعناية فائقة، من الجوري الإكوادوري والبيوني الفرنسي النادر، منسقة بأيدي خبراء لتناسب أثمن لحظاتك.',
    'hero.cta_shop': 'استكشف الباقات الآن',
    'hero.cta_atelier': 'صمم باقتك الخاصة',
    'hero.banner_delivery': 'توصيل مبرد سريع ومضمون يضمن وصول الزهور طازجة وبكامل نضارتها',
    'hero.stat_stems': 'زهور طبيعية 100%',
    'hero.stat_rating': 'تقييم العملاء الممتاز',
    'hero.stat_cities': 'توصيل مبرد في نفس اليوم',

    // Philosophy
    'philosophy.eyebrow': 'فلسفة الدار',
    'philosophy.title': 'ليست مجرد زهور منسقة، بل رسائل حية تحكي أجمل المشاعر.',
    'philosophy.desc': 'تُقطف زهورنا مع نسمات الفجر الأولى من أفضل المزارع المعتمدة في هولندا وإكوادور وفرنسا، وتُنقل مبردة بدرجة حرارة مدروسة لتصلك بأعلى درجات النضارة وتدوم في منزلك حتى 14 يوماً.',
    'philosophy.f1_title': 'قطاف الفجر الطازج',
    'philosophy.f1_desc': 'تُحصد الزهور عند مرحلة النضوج المثلى لتدوم في المزهرية من 10 إلى 14 يوماً بنضارة كاملة.',
    'philosophy.f2_title': 'تنسيق يدوي متوازن',
    'philosophy.f2_desc': 'تناغم انسيابي مدروس بين أطوال السيقان وألوان البتلات وأوراق الأوكالبتوس العطرية.',
    'philosophy.f3_title': 'تغليف حريري فاخر',
    'philosophy.f3_desc': 'تُربط الباقات بأشرطة الحرير الفرنسية مع أكياس ترطيب مخصصة لحفظ السيقان أثناء التوصيل.',

    // Catalog
    'catalog.title': 'مختارات الموسم',
    'catalog.subtitle': 'تشكيلة باقات يومية منتقاة بعناية لجميع المناسبات واللحظات الخاصة.',
    'catalog.filter_all': 'جميع الباقات',
    'catalog.filter_roses': 'الورد الجوري',
    'catalog.filter_peonies': 'أزهار البيوني',
    'catalog.filter_tulips': 'التوليب الهولندي',
    'catalog.filter_luxury': 'الباقات الفاخرة الكبرى',
    'catalog.sort_label': 'ترتيب حسب:',
    'catalog.sort_featured': 'الأكثر تميزاً',
    'catalog.sort_price_low': 'السعر: من الأقل للأعلى',
    'catalog.sort_price_high': 'السعر: من الأعلى للأقل',
    'catalog.sort_rating': 'الأعلى تقييماً',
    'catalog.quick_view': 'نظرة سريعة',
    'catalog.add_to_cart': 'أضف إلى السلة',
    'catalog.stem_count': 'زهور',

    // Product detail
    'product.included_vase': 'المزهرية مشمولة مع الباقة',
    'product.need_vase': 'تغليف حريري فاخر',
    'product.add_vase': 'إضافة مزهرية فاخرة',
    'product.size_classic': 'حجم صغير (S)',
    'product.size_grand': 'حجم وسط (M)',
    'product.size_majestic': 'حجم كبير (L)',
    'product.botanical_composition': 'مكونات الباقة الطبيعية',
    'product.scent_profile': 'درجة العطر والشذى',
    'product.dimensions': 'أبعاد التنسيق',
    'product.care_guide': 'طريقة العناية بالباقة',
    'product.gift_message_label': 'بطاقة إهداء مكتوبة بخط يدوي (مجاناً)',
    'product.gift_placeholder': 'اكتب رسالتك وسنقوم بكتابتها على كارت فاخر بخط اليد...',
    'product.delivery_date_label': 'اختر موعد التوصيل المفضل',

    // Cart Drawer
    'cart.title': 'سلة المشتريات',
    'cart.empty_title': 'سلتك فارغة حالياً',
    'cart.empty_desc': 'تصفح باقات الورد الجوري والبيوني والتوليب واختر باقتك المفضلة.',
    'cart.free_shipping_hint': 'شحن مبرد مجاني للطلبات بقيمة 200$ أو أكثر',
    'cart.free_shipping_unlocked': '✓ مبروك! حصلت على توصيل مبرد مجاني',
    'cart.subtotal': 'المجموع',
    'cart.shipping': 'التوصيل المبرد',
    'cart.discount': 'الخصم المطبق',
    'cart.total': 'الإجمالي النهائي',
    'cart.checkout_btn': 'متابعة الدفع والطلب',
    'cart.continue': 'متابعة التسوق',
    'cart.remove': 'حذف',

    // Checkout
    'checkout.title': 'إتمام الطلب',
    'checkout.step1': '١. بيانات العميل',
    'checkout.step2': '٢. موعد وعنوان التوصيل',
    'checkout.step3': '٣. طريقة الدفع وتأكيد الطلب',
    'checkout.fullname': 'الاسم بالكامل',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.phone': 'رقم الجوال (للتنسيق مع المندوب)',
    'checkout.city': 'المدينة',
    'checkout.address': 'العنوان بالتفصيل (اسم الشارع، رقم المبنى)',
    'checkout.date': 'تاريخ التوصيل',
    'checkout.time_slot': 'فترة التوصيل المفضلة',
    'checkout.instructions': 'ملاحظات خاصة بالتوصيل (مثل: تركه بالاستقبال، أو موعد محدد)',
    'checkout.is_gift': 'إرسال الباقة كهدية مباشرة لشخص آخر',
    'checkout.recipient_name': 'اسم مستلم الهدية',
    'checkout.recipient_phone': 'رقم جوال المستلم',
    'checkout.payment_card': 'بطاقة بنكية (فيزا / ماستركارد / مدى)',
    'checkout.payment_apple': 'آبل باي / Apple Pay',
    'checkout.payment_cod': 'الدفع نقدياً عند الاستلام المبرد (COD)',
    'checkout.place_order': 'تأكيد واعتماد الطلب الآن',
    'checkout.promo_placeholder': 'رمز الكوبون (مثال: JARDIN10)',
    'checkout.apply_promo': 'تطبيق',

    // Atelier / Custom
    'atelier.title': 'استوديو تصميم الباقات الخاصة',
    'atelier.subtitle': 'اختر نوع الورد والزهور التكميلية والتغليف بنفسك، وسيقوم خبراؤنا بتنسيقها باحترافية.',
    'atelier.step1': '١. اختر الحجم وعدد الزهور',
    'atelier.step2': '٢. اختر الزهرة الأساسية للباقة',
    'atelier.step3': '٣. اختر الزهور الثانوية المكملة',
    'atelier.step4': '٤. أسلوب التغليف والتقديم',

    // Footer
    'footer.newsletter_title': 'النشرة البريدية لدار جاردان فيفان',
    'footer.newsletter_desc': 'اشترك ليصلك إشعار بالحصاد الأسبوعي الجديد وأسرار العناية بالزهور.',
    'footer.subscribe': 'اشتراك الآن',
    'footer.rights': 'جميع الحقوق محفوظة. صُمم بحب وشغف للجمال الطبيعي.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('jv_language') as Language;
    if (saved === 'en' || saved === 'ar') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jv_language', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
