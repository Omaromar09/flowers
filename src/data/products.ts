import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'jv-01',
    name: "TENDERNESS",
    nameAr: "تيندرنس — رقة الرانونكولوس",
    botanicalName: "Ranunculus asiaticus × Rosa 'Juliet'",
    slug: "tenderness",
    category: "bouquets",
    price: 180,
    originalPrice: 205,
    rating: 4.98,
    reviewCount: 168,
    badge: "Bestseller",
    badgeAr: "الأكثر طلباً",
    shortDescription: "A charming, delicate bouquet of ranunculus, roses, complemented by fresh meadow flowers and olive foliage.",
    shortDescriptionAr: "باقة رقيقة وساحرة من أزهار الرانونكولوس والورد الإنجليزي الفاخر مع لمسات من أزهار المروج وأوراق الزيتون.",
    fullDescription: "A charming, delicate bouquet of ranunculus, roses, complemented by meadow flowers. This bouquet will melt the heart of any flower lover. Fresh flowers plus a flourish of festive foliage. Expect focal flowers like garden roses, spray roses, and Italian ranunculus nestled in silk wrapping.",
    fullDescriptionAr: "باقة رقيقة وساحرة تفيض بالنعومة والمشاعر الصادقة، تجمع بين ورود الحديقة الإنجليزية وأزهار الرانونكولوس الإيطالية الفاخرة مع أوراق الأوكالبتوس العطرة في تغليف حريري ساحر.",
    images: [
      "/images/products/flower-peach-macro.jpg",
      "/images/products/flower-spring-mix.jpg",
      "/images/products/flower-floating-cream.jpg"
    ],
    colorTone: "peach",
    occasion: ["romance", "anniversary", "birthday", "congratulations"],
    stemCount: 32,
    stems: [
      { name: "Peach Cloni Ranunculus", count: 12, origin: "Sanremo, Italy" },
      { name: "Juliet Garden Roses", count: 10, origin: "Hampshire, UK" },
      { name: "White Spray Garden Roses", count: 6, origin: "Ecuador" },
      { name: "Silver Dollar Eucalyptus", count: 4, origin: "Italy" }
    ],
    dimensions: "55cm H × 45cm W",
    scentProfile: "Delicate & Fresh",
    scentProfileAr: "رقيق ومنعش",
    careInstructions: [
      "All you need to do is unpack the arrangement and give the stems a quick 2cm diagonal trim.",
      "Pop it into a decorative vase with lukewarm water and release the tie or tape holding the design in place.",
      "Pro tip: Don't forget to replace water daily and keep away from direct heating drafts."
    ],
    careInstructionsAr: [
      "قم بإخراج الباقة وقص أطراف السيقان بزاوية مائلة بمقدار 2 سم.",
      "ضعها في مزهرية بها ماء فاتر نظيف وفك الشريط برفق لتتنفس الزهور.",
      "نصيحة الخبراء: احرص على تجديد الماء يومياً وإبعادها عن أشعة الشمس المباشرة."
    ],
    inStock: true,
    vaseIncluded: false,
    featured: true
  },
  {
    id: 'jv-02',
    name: "L'ÉTERNEL VELVET CRIMSON",
    nameAr: "المخمل القرمزي الخالد",
    botanicalName: "Rosa Damascena × Anemone Coronaria",
    slug: "leternel-velvet-crimson",
    category: "roses",
    price: 195,
    originalPrice: 220,
    rating: 4.96,
    reviewCount: 142,
    badge: "Exclusive",
    badgeAr: "حصري فاخر",
    shortDescription: "Thirty-six deep velvet crimson blossoms with dewdrop luster, wrapped in signature dark botanical silk paper.",
    shortDescriptionAr: "ست وثلاثون وردة قرمزية مخملية عميقة بندى الصباح، ملفوفة في حرير نباتي داكن فاخر.",
    fullDescription: "Our signature romantic statement. Features dramatic crimson garden petals with velvety luster, evoking Flemish still-life paintings. Hand-spiraled with dark plum foliage and fragrant eucalyptus.",
    fullDescriptionAr: "التحفة الرومانسية الكبرى لدار جاردان فيفان. بتلات قرمزية داكنة فائقة النعومة مع لمسات من أوراق الشجر الداكنة وأغصان الكينا العطرية.",
    images: [
      "/images/products/flower-crimson-water.jpg",
      "/images/products/flower-peach-macro.jpg"
    ],
    colorTone: "crimson",
    occasion: ["romance", "anniversary", "wedding"],
    stemCount: 36,
    stems: [
      { name: "Black Baccara Crimson Roses", count: 20, origin: "Cotopaxi, Ecuador" },
      { name: "Velvet Red Anemones", count: 10, origin: "France" },
      { name: "Seeded Plum Eucalyptus", count: 6, origin: "Italy" }
    ],
    dimensions: "60cm H × 50cm W",
    scentProfile: "Rich & Velvet",
    scentProfileAr: "غني ومخملي",
    careInstructions: [
      "Recut stems diagonally 2cm under lukewarm water upon arrival.",
      "Place in cool, indirect sunlight away from direct drafts.",
      "Refresh water every 48 hours and add the botanical nutrients provided."
    ],
    careInstructionsAr: [
      "قص أطراف السيقان بزاوية مائلة بمقدار 2 سم تحت ماء فاتر.",
      "ضع الزهور في مكان بارد وضوء غير مباشر بعيداً عن مجاري الهواء.",
      "قم بتغيير الماء كل 48 ساعة وأضف المغذي النباتي المرفق."
    ],
    inStock: true,
    vaseIncluded: false,
    featured: true
  },
  {
    id: 'jv-03',
    name: "JARDIN DE VERSAILLES PEONY CLOUD",
    nameAr: "سحابة بيوني فرساي الملكية",
    botanicalName: "Paeonia lactiflora 'Sarah Bernhardt'",
    slug: "jardin-de-versailles-peony-cloud",
    category: "peonies",
    price: 260,
    rating: 5.0,
    reviewCount: 114,
    badge: "Seasonal",
    badgeAr: "موسمي حصري",
    shortDescription: "Magnificent oversized pink double peonies in cloud volume, hand-tied in frosted blush parchment.",
    shortDescriptionAr: "باقة ضخمة من أزهار البيوني الوردية المزدوجة المتفتحة، مربوطة يدوياً بحرير ناعم وأشرطة بروفانس.",
    fullDescription: "An ephemeral luxury available only during the peak spring harvest. Features magnificent 15cm double-flowered Sarah Bernhardt peonies that unfurl into soft cascades of delicate silk petals, held by our master florists.",
    fullDescriptionAr: "فخامة استثنائية من حصاد مزارع اللوار الفرنسية. باقة عملاقة من زهور البيوني الفاخرة ذات البتلات الحريرية التي تتفتح بطبقات مذهلة تملأ المكان بعبير أنثوي آسر.",
    images: [
      "/images/products/flower-giant-peonies.jpg",
      "/images/products/flower-purple-tulips-wrap.jpg"
    ],
    colorTone: "blush",
    occasion: ["romance", "anniversary", "birthday", "wedding"],
    stemCount: 38,
    stems: [
      { name: "Sarah Bernhardt Pink Peonies", count: 24, origin: "Loire Valley, France" },
      { name: "Blush Garden Spray Roses", count: 8, origin: "Ecuador" },
      { name: "Silky French Astilbe", count: 6, origin: "Netherlands" }
    ],
    dimensions: "65cm H × 55cm W",
    scentProfile: "Delicate & Fresh",
    scentProfileAr: "رقيق ومنعش",
    careInstructions: [
      "Peonies arrive in semi-closed bud form to maximize domestic vase life (10–14 days).",
      "Warm water accelerates blooming; cool water preserves the buds.",
      "Gently mist outer petals once daily with clean water."
    ],
    careInstructionsAr: [
      "تصل أزهار البيوني كبراعم نصف مفتوحة لضمان عمر أطول في المزهرية (10-14 يوماً).",
      "الماء الفاتر يسرع التفتح، والماء البارد يحافظ على البراعم.",
      "رش البتلات الخارجية برذاذ خفيف من الماء مرة يومياً."
    ],
    inStock: true,
    vaseIncluded: true,
    featured: true
  },
  {
    id: 'jv-04',
    name: "AMSTERDAM DAWN TULIPS & PEONIES",
    nameAr: "توليب وبيوني الفجر البنفسجي",
    botanicalName: "Tulipa gesneriana × Paeonia",
    slug: "amsterdam-dawn-tulips-peonies",
    category: "tulips",
    price: 165,
    originalPrice: 190,
    rating: 4.92,
    reviewCount: 95,
    badge: "Seasonal",
    badgeAr: "موسمي",
    shortDescription: "Dutch violet tulips, blush peonies, and cream roses wrapped in lavender crepe with grosgrain ribbon.",
    shortDescriptionAr: "توليب بنفسجي هولندي مع ورود بيضاء وأزهار بيوني وردية في غلاف لافندر راقٍ.",
    fullDescription: "A breathtaking presentation of Keukenhof spring blossoms. Fresh purple tulips, soft blush peonies, and buttery cream roses are presented in a stylish dusky lavender wrap. As with all living tulips, stems will gracefully curve towards the morning light in your vase.",
    fullDescriptionAr: "تناغم بديع يجمع بين التوليب الهولندي البنفسجي والبيوني الوردي والورود البيضاء العطرة، ملفوفة في ورق كريب بنفسجي أنيق مع أشرطة فرنسية فاخرة.",
    images: [
      "/images/products/flower-purple-tulips-wrap.jpg",
      "/images/products/flower-round-pastels.jpg"
    ],
    colorTone: "lavender",
    occasion: ["birthday", "congratulations", "everyday", "romance"],
    stemCount: 35,
    stems: [
      { name: "Royal Purple Dutch Tulips", count: 15, origin: "Lisse, Netherlands" },
      { name: "Soft Blush Peonies", count: 10, origin: "France" },
      { name: "Cream Vendela Roses", count: 10, origin: "Ecuador" }
    ],
    dimensions: "50cm H × 45cm W",
    scentProfile: "Green & Crisp",
    scentProfileAr: "نضر وعشبي",
    careInstructions: [
      "Tulips thrive best in very cold water; add a couple of ice cubes on warm afternoons.",
      "Keep water level at only 5-7cm to prevent stem softening.",
      "Trim 1cm every other day."
    ],
    careInstructionsAr: [
      "ينمو التوليب بشكل أفضل في الماء البارد جداً؛ يمكن إضافة مكعبات ثلج في الأيام الدافئة.",
      "املأ المزهرية بمقدار 5-7 سم فقط من الماء لتجنب ليونة السيقان.",
      "قص 1 سم من السيقان كل يومين."
    ],
    inStock: true,
    vaseIncluded: false,
    featured: true
  },
  {
    id: 'jv-05',
    name: "CELESTIAL HARMONY PASTEL SPHERE",
    nameAr: "هارموني الباستيل الدائري الفاخر",
    botanicalName: "Rosa × Tulipa × Dianthus",
    slug: "celestial-harmony-pastel-sphere",
    category: "luxury",
    price: 225,
    rating: 4.97,
    reviewCount: 82,
    badge: "Signature",
    badgeAr: "بصمة الدار",
    shortDescription: "A dense, spherical dome arrangement of white peonies, purple spray roses, peach ranunculus, and yellow tulips.",
    shortDescriptionAr: "تنسيق كروي ملكي كثيف يضم أزهار البيوني البيضاء، والورود البنفسجية، ورانونكولوس الخوخ، والتوليب الأصفر.",
    fullDescription: "An artisanal dome composition inspired by high Parisian soirees. Each bloom is hand-placed into a dense circular geometry where every angle presents a new harmony of pastel colors and textures.",
    fullDescriptionAr: "تحفة هندسية كروية مستوحاة من حفلات القصور الفرنسية. تنسيق متكامل من كل الزوايا يجمع بين تدرجات البنفسجي، الوردي، الأصفر الخافت، والأبيض الناصع.",
    images: [
      "/images/products/flower-round-pastels.jpg",
      "/images/products/flower-spring-mix.jpg"
    ],
    colorTone: "pastel",
    occasion: ["anniversary", "birthday", "corporate", "wedding"],
    stemCount: 42,
    stems: [
      { name: "White Bowl Peonies", count: 8, origin: "France" },
      { name: "Lavender Moon Garden Roses", count: 12, origin: "Ecuador" },
      { name: "Peach Buttercup Ranunculus", count: 12, origin: "Italy" },
      { name: "Golden Keukenhof Tulips", count: 10, origin: "Netherlands" }
    ],
    dimensions: "48cm H × 48cm W",
    scentProfile: "Subtle Sweet",
    scentProfileAr: "حلو هادئ",
    careInstructions: [
      "Maintain water levels daily as dome arrangements consume hydration rapidly.",
      "Recut stems diagonally every 3 days.",
      "Keep away from direct heat and air conditioning vents."
    ],
    careInstructionsAr: [
      "تحقق من مستوى الماء يومياً؛ فالتنسيقات الكثيفة تستهلك الماء بسرعة.",
      "قص السيقان بزاوية مائلة كل 3 أيام.",
      "احفظ الباقة بعيداً عن مجاري التكييف ومصادر الحرارة."
    ],
    inStock: true,
    vaseIncluded: true,
    featured: true
  },
  {
    id: 'jv-06',
    name: "SPRING RADIANCE & WHITE ENGLISH ROSE",
    nameAr: "إشراقة الربيع والورد الإنجليزي",
    botanicalName: "Rosa alba × Paeonia lactiflora",
    slug: "spring-radiance-white-english-rose",
    category: "birthday",
    price: 175,
    originalPrice: 195,
    rating: 4.89,
    reviewCount: 76,
    badge: "New",
    badgeAr: "جديدنا",
    shortDescription: "A vibrant sun-kissed mix of pure white garden roses, yellow spray roses, butter carnations, and pink peonies.",
    shortDescriptionAr: "مزيج ربيعي مبهج من الورود البيضاء الملكية، والورد الأصفر الناعم، والقرنفل الزبدي، والبيوني الوردي.",
    fullDescription: "Radiant, joyful, and fresh. This composition brings the optimism of blooming French country gardens straight into your living space, combining voluminous white garden roses with sunny yellow accents and fresh eucalyptus.",
    fullDescriptionAr: "باقة مفعمة بالبهجة والضياء، تمزج بين نقاء الورد الأبيض الملكي ودفء الأصفر الربيعي مع أزهار القرنفل والبيوني وأوراق الكينا النضرة.",
    images: [
      "/images/products/flower-spring-mix.jpg",
      "/images/products/flower-peach-macro.jpg"
    ],
    colorTone: "sunlit",
    occasion: ["birthday", "congratulations", "everyday"],
    stemCount: 30,
    stems: [
      { name: "White O'Hara Garden Roses", count: 8, origin: "Ecuador" },
      { name: "Soft Yellow Spray Roses", count: 10, origin: "Kenya" },
      { name: "Butter Cream Carnations", count: 6, origin: "Spain" },
      { name: "Pink Peonies & Eucalyptus", count: 6, origin: "France" }
    ],
    dimensions: "50cm H × 45cm W",
    scentProfile: "Delicate & Fresh",
    scentProfileAr: "رقيق ومنعش",
    careInstructions: [
      "Trim 2cm from stems under lukewarm running water.",
      "Display in a sunny room with indirect natural daylight.",
      "Change vase water every 48 hours."
    ],
    careInstructionsAr: [
      "قص 2 سم من السيقان تحت ماء جارٍ فاتر.",
      "ضع الباقة في غرفة مضيئة بضوء طبيعي غير مباشر.",
      "قم بتغيير الماء كل يومين."
    ],
    inStock: true,
    vaseIncluded: false,
    featured: false
  },
  {
    id: 'jv-07',
    name: "PASTEL PETAL DREAM RANUNCULUS",
    nameAr: "حلم الرانونكولوس الحريري",
    botanicalName: "Ranunculus Cloni 'Hanoi & Butterfly'",
    slug: "pastel-petal-dream-ranunculus",
    category: "bouquets",
    price: 190,
    rating: 4.95,
    reviewCount: 88,
    badge: "Bestseller",
    badgeAr: "الأكثر طلباً",
    shortDescription: "Layers of translucent cream, peach, and coral cloni ranunculus petals floating in effortless grace.",
    shortDescriptionAr: "طبقات من بتلات الرانونكولوس الشفافة بدرجات الكريمي والخوخي والمرجان تطفو بأناقة فائقة.",
    fullDescription: "A surreal, ethereal bouquet celebrating the delicate translucent layers of Hanoi ranunculus. As the flowers open, their spiraling golden centers create a breathing architectural presence that captures morning and sunset light beautifully.",
    fullDescriptionAr: "باقة ساحرة تحتفي برقة بتلات الرانونكولوس الهانوي الإيطالي. تلتف بتلاتها الحريرية بطبقات متموجة تمنح المكان فخامة استثنائية وهدوءاً بصرياً رائعاً.",
    images: [
      "/images/products/flower-floating-cream.jpg",
      "/images/products/flower-peach-macro.jpg"
    ],
    colorTone: "peach",
    occasion: ["romance", "anniversary", "birthday"],
    stemCount: 28,
    stems: [
      { name: "Hanoi Cloni Ranunculus", count: 14, origin: "Sanremo, Italy" },
      { name: "Butterfly Peach Ranunculus", count: 8, origin: "Italy" },
      { name: "White Sweet Peas", count: 6, origin: "Japan" }
    ],
    dimensions: "45cm H × 40cm W",
    scentProfile: "Delicate & Fresh",
    scentProfileAr: "رقيق ومنعش",
    careInstructions: [
      "Hollow ranunculus stems appreciate water topped with nutrient sachet.",
      "Recut 1cm every 2 days with sharp bypass shears.",
      "Vase life typically spans 10 to 14 days under proper hydration."
    ],
    careInstructionsAr: [
      "سيقان الرانونكولوس المجوفة تستفيد بشكل ممتاز من المغذي النباتي المرفق.",
      "قص 1 سم من السيقان كل يومين بمقص حاد.",
      "يدوم عمر الباقة في المزهرية بين 10 إلى 14 يوماً مع العناية المنتظمة."
    ],
    inStock: true,
    vaseIncluded: false,
    featured: true
  },
  {
    id: 'jv-08',
    name: "ALABASTER GARDENIA & PEACH CASCADE",
    nameAr: "شلال المرمر والغردينيا الملكي",
    botanicalName: "Gardenia jasminoides × Rosa 'Patience'",
    slug: "alabaster-gardenia-peach-cascade",
    category: "wedding",
    price: 240,
    originalPrice: 275,
    rating: 4.98,
    reviewCount: 62,
    badge: "Exclusive",
    badgeAr: "حصري للأعراس",
    shortDescription: "Pure fragrant gardenias, English patience garden roses, and delicate peach buds with Italian foliage.",
    shortDescriptionAr: "غردينيا فواحة مع ورود الحدائق الإنجليزية وبراعم الخوخ الرقيقة وأغصان الزيتون الإيطالية.",
    fullDescription: "Curated specifically for grand weddings, luxury matrimonial tables, and diplomatic salons. Combines intensely fragrant white gardenias with ruffled English garden roses and soft peach secondary blooms.",
    fullDescriptionAr: "صُممت خصيصاً للأعراس الفاخرة وأرقى قاعات الضيافة. تجمع بين عبير الغردينيا الفواح وورود الحديقة الإنجليزية المورقة بتناغم لوني يخطف الأنظار.",
    images: [
      "/images/products/flower-peach-macro.jpg",
      "/images/products/flower-spring-mix.jpg"
    ],
    colorTone: "white",
    occasion: ["wedding", "anniversary", "corporate"],
    stemCount: 36,
    stems: [
      { name: "Fragrant White Gardenias", count: 10, origin: "France" },
      { name: "Patience White English Roses", count: 14, origin: "Hampshire, UK" },
      { name: "Peach Spray Roses", count: 8, origin: "Ecuador" },
      { name: "Italian Olive Ruscus", count: 4, origin: "Tuscany, Italy" }
    ],
    dimensions: "60cm H × 50cm W",
    scentProfile: "Rich & Velvet",
    scentProfileAr: "غني ومخملي",
    careInstructions: [
      "Keep away from direct heating units and ripening fruit.",
      "Trim 1cm every 3 days to sustain hydration.",
      "Mist outer foliage gently."
    ],
    careInstructionsAr: [
      "احفظ الباقة بعيداً عن مصادر الحرارة المباشرة وسلال الفواكه.",
      "قص 1 سم من السيقان كل 3 أيام للحفاظ على ترطيب الزهور.",
      "رش الأوراق الخارجية برذاذ ماء نقي."
    ],
    inStock: true,
    vaseIncluded: true,
    featured: false
  }
];

export const CATEGORIES_LIST = [
  { id: 'all', name: 'All Flowers', nameAr: 'جميع الزهور', count: 8, slug: 'all' },
  { id: 'bouquets', name: 'Bouquets', nameAr: 'باقات البوتيك', count: 2, slug: 'bouquets' },
  { id: 'roses', name: 'Garden Roses', nameAr: 'ورود الحدائق', count: 1, slug: 'roses' },
  { id: 'peonies', name: 'Peonies', nameAr: 'زهور البيوني', count: 2, slug: 'peonies' },
  { id: 'tulips', name: 'Dutch Tulips', nameAr: 'التوليب الهولندي', count: 1, slug: 'tulips' },
  { id: 'luxury', name: 'Luxury Editions', nameAr: 'المجموعات الفاخرة', count: 1, slug: 'luxury' },
  { id: 'wedding', name: 'Weddings', nameAr: 'الأعراس والمناسبات', count: 1, slug: 'wedding' },
  { id: 'birthday', name: 'Birthday & Joy', nameAr: 'أعياد الميلاد', count: 1, slug: 'birthday' }
];

export const VASE_OPTIONS = [
  {
    id: 'vase-none',
    name: 'Silk Paper Wrapping (Included)',
    nameAr: 'تغليف حريري نباتي فاخر (مشمول)',
    price: 0,
    color: '#F7F3EC'
  },
  {
    id: 'vase-sand',
    name: 'Sand Ceramic Fluted Vase',
    nameAr: 'مزهرية سيراميك رملية مضلعة',
    price: 35,
    color: '#D8CBB9'
  },
  {
    id: 'vase-sky',
    name: 'Sky Blue Glazed Porcelain',
    nameAr: 'بورسلين أزرق سماوي لامع',
    price: 35,
    color: '#8BA9B5'
  },
  {
    id: 'vase-emerald',
    name: 'Emerald Forest Matte Urn',
    nameAr: 'إناء أخضر زمردي مطفأ',
    price: 20,
    color: '#1E3E32'
  },
  {
    id: 'vase-crystal',
    name: 'Fluted Mint Crystal Glass',
    nameAr: 'كريستال نعناعي مضلع منفوخ',
    price: 30,
    color: '#A2C4B8'
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'JARDIN10': { discountPercent: 10, description: '10% off your premier order' },
  'SPRING20': { discountPercent: 20, description: '20% seasonal botanical celebration' },
  'VIPLUXE': { discountPercent: 15, description: '15% VIP concierge floral privilege' }
};

export const DELIVERY_SLOTS = [
  '09:00 AM - 01:00 PM (Morning Courier)',
  '02:00 PM - 06:00 PM (Afternoon Freshness)',
  '06:30 PM - 09:30 PM (Evening Sunset Delivery)'
];

export const DELIVERY_SLOTS_AR = [
  '٠٩:٠٠ صباحاً - ٠١:٠٠ ظهراً (توصيل الصباح الباكر)',
  '٠٢:٠٠ ظهراً - ٠٦:٠٠ مساءً (توصيل منتصف اليوم)',
  '٠٦:٣٠ مساءً - ٠٩:٣٠ مساءً (توصيل الغروب والسهرة)'
];
