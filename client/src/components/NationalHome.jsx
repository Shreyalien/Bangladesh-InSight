import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Compass, Landmark, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Shield, Award, Map, BookOpen, Check, X, MapPin, Calendar, HelpCircle, Info } from 'lucide-react';

const DIVISION_SLIDES = [
  { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা', tagline: 'Capital & 400-Year Mughal Heartland', day: '/panoramas/dhaka_day.jpg', night: '/panoramas/dhaka_night.jpg', color: '#e11d48', pill1: 'Padma Bridge', pill2: 'Buriganga River', pill3: 'Lalbagh Fort' },
  { id: 'chattogram', name: 'Chittagong', nameBn: 'চট্টগ্রাম', tagline: 'Port Gateway & Bay of Bengal Crown', day: '/panoramas/chattogram_day.jpg', night: '/panoramas/chattogram_night.jpg', color: '#0ea5e9', pill1: "Cox's Bazar Beach", pill2: 'Chittagong Port', pill3: 'Karnaphuli River' },
  { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী', tagline: 'Silk Metropolis, Ancient Viharas & Mangoes', day: '/panoramas/rajshahi_day.jpg', night: '/panoramas/rajshahi_night.jpg', color: '#f59e0b', pill1: 'Padma River', pill2: 'Somapura Vihara', pill3: 'Silk Weaving' },
  { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা', tagline: 'Sundarbans Mangrove & Riverine Delta', day: '/panoramas/khulna_day.jpg', night: '/panoramas/khulna_night.jpg', color: '#10b981', pill1: 'Sundarbans Forest', pill2: 'Rupsha Bridge', pill3: 'Sixty Dome Mosque' },
  { id: 'barishal', name: 'Barishal', nameBn: 'বরিশাল', tagline: 'Venice of Bengal, Riverways & Floating Markets', day: '/panoramas/barishal_day.jpg', night: '/panoramas/barishal_night.jpg', color: '#8b5cf6', pill1: 'Launch Fleet', pill2: 'Kirtankhola River', pill3: 'Kirtankhola Bridge' },
  { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট', tagline: 'Emerald Tea Gardens & Sacred Shrines', day: '/panoramas/sylhet_day.jpg', night: '/panoramas/sylhet_night.jpg', color: '#84cc16', pill1: 'Tea Gardens', pill2: 'Surma River', pill3: 'Bholaganj Rock River' },
  { id: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর', tagline: 'Palace Heritage of the Northern Plains', day: '/panoramas/rangpur_day.jpg', night: '/panoramas/rangpur_night.jpg', color: '#f97316', pill1: 'Tajhat Palace', pill2: 'Ghaghat River', pill3: 'Barendra Plain' },
  { id: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ', tagline: "Brahmaputra's Folk Ballads & Green Valleys", day: '/panoramas/mymensingh_day.jpg', night: '/panoramas/mymensingh_night.jpg', color: '#06b6d4', pill1: 'Brahmaputra River', pill2: 'Shashi Lodge', pill3: 'Central Park' },
];

const NATIONAL_STATS = [
  { val: '8', label: 'Divisions', labelBn: 'বিভাগ', color: '#e11d48' },
  { val: '64', label: 'Districts', labelBn: 'জেলা', color: '#10b981' },
  { val: '495', label: 'Upazilas', labelBn: 'উপজেলা', color: '#0ea5e9' },
  { val: '700+', label: 'Rivers', labelBn: 'নদী', color: '#3b82f6' },
  { val: '100+', label: 'Landmarks', labelBn: 'নিদর্শন', color: '#8b5cf6' },
  { val: '170M', label: 'Population', labelBn: 'জনসংখ্যা', color: '#f59e0b' },
];

const NATIONAL_SYMBOLS_DATA = [
  {
    id: 'animal',
    image: '/symbols/tiger.jpg',
    name: 'Royal Bengal Tiger',
    nameBn: 'রয়েল বেঙ্গল টাইগার',
    scientific: 'Panthera tigris tigris',
    label: 'National Animal',
    labelBn: 'জাতীয় পশু',
    color: '#f97316',
    why: 'Chosen as the national animal to symbolize the fierce bravery, indomitable spirit, and sovereign majesty of the Bangladeshi people. The tiger is the apex guardian of the world’s largest mangrove forest.',
    whyBn: 'বাঙালি জাতির অদম্য সাহস, বীরত্ব, শৌর্য ও সার্বভৌম মর্যাদার প্রতীক হিসেবে রয়েল বেঙ্গল টাইগারকে জাতীয় পশু নির্বাচন করা হয়েছে। এটি সুন্দরবন ম্যানগ্রোভের শীর্ষ রক্ষক।',
    howWhen: 'Adopted immediately following the Liberation War of Bangladesh in 1971 as the national animal, and immortalized on the insignia of the Bangladesh National Cricket Team and Armed Forces.',
    howWhenBn: '১৯৭১ সালের মহান স্বাধীনতা যুদ্ধের পর জাতির বীরত্ব ও সাহসের প্রতীক হিসেবে একে জাতীয় পশু মনোনীত করা হয়। এটি বাংলাদেশ জাতীয় ক্রিকেট দল ও সশস্ত্র বাহিনীর প্রতীকে স্থান পেয়েছে।',
    whereFound: 'Exclusively found in the mangrove wilderness of the Sundarbans across Bagerhat, Khulna, and Satkhira districts, roaming through saline rivers and sundari-gewa tree canopies.',
    whereFoundBn: 'বাংলাদেশের দক্ষিণ-পশ্চিমাঞ্চলের সুন্দরবনের গহিন ম্যানগ্রোভ বনভূমিতে (বাগেরহাট, খুলনা ও সাতক্ষীরা জেলা) এটি এককভাবে বিচরণ করে।',
    culturalImpact: 'Embodied in Bengali folklore, bravery proverbs, national postage stamps, currency, and as the worldwide sporting identity "The Tigers".',
    culturalImpactBn: 'বাংলা লোকগাথা, সাহস ও শক্তির প্রবাদে মিশে থাকা এই বাঘ বিশ্ব ক্রীড়াঙ্গনে বাংলাদেশের পরিচিতি "দ্য টাইগার্স" তৈরি করেছে।'
  },
  {
    id: 'bird',
    image: '/symbols/doel.jpg',
    name: 'Oriental Magpie-Robin (Doel)',
    nameBn: 'দোয়েল',
    scientific: 'Copsychus saularis',
    label: 'National Bird',
    labelBn: 'জাতীয় পাখি',
    color: '#0284c7',
    why: 'Beloved for its sweet morning whistle, gentle beauty, and resilience. The black and white contrast mirrors the clean simplicity and musical soul of rural Bangladesh.',
    whyBn: 'ভোরের মিষ্টি সুমধুর শিষ, নিরীহ সৌন্দর্য এবং আবহমান বাংলার পল্লীপ্রকৃতির সাথে গভীর আত্মিক সম্পর্কের কারণে দোয়েলকে জাতীয় পাখি করা হয়েছে।',
    howWhen: 'Declared the national bird of Bangladesh in 1971. Enshrined on the two-taka national currency banknote and at the iconic Doel Chattar sculpture at Dhaka University.',
    howWhenBn: '১৯৭১ সালে স্বাধীনতার পরপরই দোয়েলকে জাতীয় পাখি ঘোষণা করা হয়। বাংলাদেশের দুই টাকার নোটে এবং ঢাকা বিশ্ববিদ্যালয়ের কার্জন হলের সামনে ঐতিহাসিক দোয়েল চত্বর এর স্মারক।',
    whereFound: 'Ubiquitous across all 64 districts—found hopping on village courtyards, bamboo groves, tea garden bushes, urban gardens, and rural homesteads.',
    whereFoundBn: 'বাংলাদেশের ৬৪টি জেলার প্রতিটি গ্রাম, বাগান, বাঁশঝাড়, ফলের গাছ এবং শহুরে উদ্যানে দোয়েল অত্যন্ত ঘনিষ্ঠভাবে মানুষের কাছাকাছি বসবাস করে।',
    culturalImpact: 'Celebrated in Bengali romantic poetry, nursery rhymes ("দোয়েল দোলে বনবাদাড়ে"), and folk songs welcoming dawn.',
    culturalImpactBn: 'শিশুতোষ ছড়া, পল্লীগীতি ও আধুনিক কবিতায় ভোরের জাগরণ ও মিষ্টি সুরের প্রতীক হিসেবে দোয়েল চিরস্মরণীয়।'
  },
  {
    id: 'flower',
    image: '/symbols/shapla.jpg',
    name: 'White Water Lily (Shapla)',
    nameBn: 'সাদা শাপলা',
    scientific: 'Nymphaea nouchali',
    label: 'National Flower',
    labelBn: 'জাতীয় ফুল',
    color: '#10b981',
    why: 'Blooms naturally and abundantly across Bangladesh’s thousands of rivers, canals, beels, and haors without cultivation. The pure white petals symbolize peace, purity, simplicity, and the aquatic soul of the delta.',
    whyBn: 'কোনো পরিচর্যা ছাড়াই নদীমাতৃক বাংলাদেশের নদী, নালা, বিল ও হাওরে প্রাকৃতিকভাবে ফোটে। এর শুভ্র পাপড়ি শান্তি, পবিত্রতা ও সাধারণ মানুষের জীবনধারার প্রতীক।',
    howWhen: 'Adopted in 1971; enshrined as the central emblem on the National Emblem of Bangladesh (বাংলাদেশ সরকারের জাতীয় প্রতীক) flanked by paddy ears and tea leaves.',
    howWhenBn: '১৯৭১ সালে জাতীয় ফুল হিসেবে গ্রহণ করা হয়। এটি বাংলাদেশ সরকারের মূল জাতীয় প্রতীকের কেন্দ্রস্থলে ধানের শীষ ও পাটপাতার মাঝে শোভা পায়।',
    whereFound: 'Flourishes across wetlands, haors, beels, and seasonal ponds in every district, with monumental red and white water lily blooms in Gopalganj, Barishal, and Sunamganj.',
    whereFoundBn: 'দেশের ৬৪ জেলার সমস্ত হাওর, বিল ও পুকুরে দেখা যায়। বিশেষ করে গোপালগঞ্জের জলজ বিল ও বরিশালের সাতলা বিল "শাপলার গ্রাম" হিসেবে খ্যাত।',
    culturalImpact: 'Represented on currency coins, national awards, passport covers, government seals, and immortalized in timeless Bengali literature.',
    culturalImpactBn: 'মুদ্রা, ধাতব কয়েন, পাসপোর্ট, সরকারি সিলমোহর এবং অমর সাহিত্যে শাপলা রূপসী বাংলার প্রতীক।'
  },
  {
    id: 'fruit',
    image: '/symbols/jackfruit.jpg',
    name: 'Jackfruit (Kanthal)',
    nameBn: 'কাঁঠাল',
    scientific: 'Artocarpus heterophyllus',
    label: 'National Fruit',
    labelBn: 'জাতীয় ফল',
    color: '#84cc16',
    why: 'The largest tree-borne fruit in the world, renowned for extraordinary nutritional value, massive yield, and affordability. Every part—the sweet flesh, nutritious seeds, and leaves for livestock—serves the common people.',
    whyBn: 'বিশ্বের বৃহত্তম বৃক্ষজাত ফল, যাতে রয়েছে প্রচুর পুষ্টিগুণ। এর মিষ্টি কোষ, পুষ্টিকর বীজ এবং গবাদি পশুর খাদ্য হিসেবে পাতা—সবকিছুই সাধারণ মানুষের পরম উপকারী।',
    howWhen: 'Designated the national fruit upon Bangladesh’s independence in 1971 as a symbol of self-reliance, abundance, and agrarian bounty.',
    howWhenBn: '১৯৭১ সালে স্বাধীনতার পর পুষ্টি, সহজলভ্যতা এবং সমৃদ্ধির প্রতীক হিসেবে কাঁঠালকে জাতীয় ফল ঘোষণা করা হয়।',
    whereFound: 'Abundantly cultivated across Bangladesh, flourishing especially on the elevated red clay soils of Gazipur, Madhupur, Narsingdi, Mymensingh, and the Chittagong Hill Tracts.',
    whereFoundBn: 'গাজীপুর, নরসিংদী, টাঙ্গাইলের মধুপুর গড়, ময়মনসিংহ এবং পাহাড়ি অঞ্চলের লাল মাটিতে সবচেয়ে বেশি ও সুস্বাদু কাঁঠাল উৎপাদিত হয়।',
    culturalImpact: 'Celebrated during Bengali summer festivals; jackfruit seed curries and roasted snacks are quintessential rural culinary treasures.',
    culturalImpactBn: 'গ্রীষ্মের মধুর ফল হিসেবে এবং কাঁঠালের বিচির তরকারি বা ভর্তা বাঙালির লোকজ রান্নার অবিচ্ছেদ্য অঙ্গ।'
  },
  {
    id: 'fish',
    image: '/symbols/ilish.jpg',
    name: 'Hilsa / Ilish',
    nameBn: 'ইলিশ',
    scientific: 'Tenualosa ilisha',
    label: 'National Fish',
    labelBn: 'জাতীয় মাছ',
    color: '#06b6d4',
    why: 'The undisputed sovereign of Bengali gastronomy, famed for exquisite aroma, silky oily texture, and unrivaled taste. It is an economic powerhouse supporting hundreds of thousands of fishermen.',
    whyBn: 'স্বাদ, গন্ধ ও পুষ্টিতে অনন্য মাছের রাজা। বঙ্গোপসাগর থেকে মিঠাপানির নদীতে এসে এর অতুলনীয় তৈলাক্ত স্বাদ তৈরি হয় এবং এটি দেশের অর্থনীতি ও লাখো জেলের জীবিকার প্রধান উৎস।',
    howWhen: 'Designated the national fish in 1971; granted official Geographical Indication (GI) certification recognizing Bangladesh as the global heart of Hilsa.',
    howWhenBn: 'স্বাধীনতার পর জাতীয় মাছ হিসেবে ঘোষিত এবং পরবর্তীতে বাংলাদেশের ভৌগোলিক নির্দেশক (GI) পণ্য হিসেবে বিশ্বস্বীকৃতি লাভ করে।',
    whereFound: 'Migrates from the Bay of Bengal into the Padma, Meghna, Tetulia, Jamuna, and Kirtankhola rivers, with world-famous sanctuaries at Chandpur, Bhola, and Barishal.',
    whereFoundBn: 'পদ্মা, মেঘনা, তেঁতুলিয়া, কীর্তনখোলা নদী ও মোহনায় পাওয়া যায়। বিশেষ করে চাঁদপুর ও ভোলা ইলিশের সবচেয়ে বড় প্রাকৃতিক প্রজনন ও আহরণ কেন্দ্র।',
    culturalImpact: 'Inseparable from Pahela Baishakh feasts (Panta Ilish), wedding celebrations, and Bengali identity ("মাছে-ভাতে বাঙালি").',
    culturalImpactBn: 'পহেলা বৈশাখের পান্তা-ইলিশ উৎসব, সামাজিক আপ্যায়ন এবং "মাছে ভাতে বাঙালি" পরিচয়ের শ্রেষ্ঠ রূপ।'
  },
  {
    id: 'tree',
    image: '/symbols/mangotree.jpg',
    name: 'Mango Tree (Aam Gach)',
    nameBn: 'আম গাছ',
    scientific: 'Mangifera indica',
    label: 'National Tree',
    labelBn: 'জাতীয় গাছ',
    color: '#16a34a',
    why: 'Cherished for cooling shade, delicious summer fruit harvests, and eternal cultural sentiment. Immortalized in Rabindranath Tagore’s National Anthem: "ও মা, ফাগুনে তোর আমের বনে ঘ্রাণে পাগল করে".',
    whyBn: 'চিরসবুজ ছায়া, গ্রীষ্মের রসাল ফল এবং জাতীয় সঙ্গীতের অমর পঙ্‌ক্তি "ও মা, ফাগুনে তোর আমের বনে ঘ্রাণে পাগল করে"—এর সাথে চিরকাল জুড়ে থাকার কারণে এটি নির্বাচিত।',
    howWhen: 'Officially declared the National Tree of Bangladesh by the Cabinet of the Government of Bangladesh in November 2010.',
    howWhenBn: '২০১০ সালের ১৫ নভেম্বর গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের মন্ত্রিসভার বৈঠকে আনুষ্ঠানিকভাবে আম গাছকে জাতীয় বৃক্ষ হিসেবে স্বীকৃতি দেওয়া হয়।',
    whereFound: 'Grown across every village and town of Bangladesh, with majestic high-yielding historic orchards in Chapainawabganj, Rajshahi, Naogaon, Dinajpur, and Satkhira.',
    whereFoundBn: 'সারাদেশের প্রায় প্রতিটি বাড়ির আঙিনায় দেখা যায়। বিশেষ করে রাজশাহী, চাঁপাইনবাবগঞ্জ, মেহেরপুর ও দিনাজপুরে বিস্তীর্ণ আমবাগান রয়েছে।',
    culturalImpact: 'Symbol of spring blossom (মুকুল), summer abundance, festive celebrations, and deeply tied to the national ethos of Bangladesh.',
    culturalImpactBn: 'বসন্তে আমের মুকুলের পাগল করা সুবাস এবং গ্রীষ্মের উৎসবমুখর দিন বাঙালির সংস্কৃতির চিরন্তন অঙ্গ।'
  }
];

export default function NationalHome({ nationalData, divisions = [], onSelectDivision, isNightMode, isBengali, onNavigateTab }) {
  const [slide, setSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const dragStartX = useRef(0);

  const goToSlide = useCallback((idx) => {
    if (idx < 0) idx = DIVISION_SLIDES.length - 1;
    if (idx >= DIVISION_SLIDES.length) idx = 0;
    setProgress(0);
    setSlide(idx);
  }, []);

  const next = useCallback(() => goToSlide(slide + 1), [slide, goToSlide]);
  const prev = useCallback(() => goToSlide(slide - 1), [slide, goToSlide]);

  // Automatic slide progression
  useEffect(() => {
    const intervalTime = 4000;
    const tickTime = 50;

    const timer = setInterval(next, intervalTime);
    const progressTimer = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + (100 / (intervalTime / tickTime))));
    }, tickTime);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [next]);

  const handleHeroClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      prev();
    } else {
      next();
    }
  };

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    const diff = e.clientX - dragStartX.current;
    if (diff > 40) {
      prev();
    } else if (diff < -40) {
      next();
    }
  };

  const cur = DIVISION_SLIDES[slide];
  const bg = isNightMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const sub = isNightMode ? 'text-slate-300' : 'text-slate-600';
  const cardBg = isNightMode ? 'bg-slate-800/60 border-white/8 hover:bg-slate-800/90' : 'bg-white border-slate-200 hover:shadow-xl';

  return (
    <div className={`w-full ${bg} transition-colors duration-500`}>

      {/* ═══ CINEMATIC HERO SLIDER STAGE ═══ */}
      <section
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleHeroClick}
        className="relative w-full h-screen min-h-[620px] max-h-[920px] overflow-hidden select-none cursor-pointer"
      >
        {/* Crossfade Slides */}
        {DIVISION_SLIDES.map((s, idx) => {
          const sImg = isNightMode ? s.night : s.day;
          const isActive = idx === slide;
          return (
            <div
              key={s.id}
              className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <img
                src={sImg}
                alt={s.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-1000"
                style={{
                  transform: isActive ? 'scale(1)' : 'scale(1.04)',
                }}
              />
            </div>
          );
        })}

        {/* Ambient Gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-28 sm:top-32 left-4 sm:left-10 z-20 flex items-center gap-2 pointer-events-none">
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-xl backdrop-blur-xl"
            style={{ background: 'rgba(0,0,0,0.7)', border: `1.5px solid ${cur.color}` }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: cur.color }} />
            <span className="font-mono text-xs">{slide + 1}/8</span>
            <span className="text-white/40">·</span>
            <span className="tracking-wide font-bold">{isBengali ? cur.nameBn : cur.name}</span>
          </div>

          <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-white/80 bg-black/50 backdrop-blur-md border border-white/10">
            <span>{isBengali ? 'ক্লিক বা সোয়াইপ করে ছবি পরিবর্তন করুন' : 'Click or swipe to change view'}</span>
          </span>
        </div>

        {/* ── UNIFIED HERO INFORMATION BLOCK ── */}
        <div
          className="absolute inset-x-4 sm:inset-x-12 bottom-16 z-20 max-w-4xl flex flex-col items-start gap-3 pointer-events-none"
          onClick={e => e.stopPropagation()}
        >
          {/* Top Tag & Location Pills Row */}
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-white shadow-lg"
              style={{ background: cur.color, boxShadow: `0 4px 18px ${cur.color}70` }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBengali ? `${cur.nameBn} বিভাগ` : `${cur.name} Division`}</span>
            </div>

            {[cur.pill1, cur.pill2, cur.pill3].map((pill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-md backdrop-blur-md border border-white/20 bg-black/60"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Grand Title */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl tracking-tight">
              {isBengali ? 'বাংলাদেশ' : 'Bangladesh'}
              <span
                className="ml-3 font-black"
                style={{ color: cur.color, textShadow: `0 0 32px ${cur.color}90` }}
              >
                {isBengali ? 'ইনসাইট ৩৬০°' : 'InSight 360°'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/95 max-w-2xl leading-relaxed drop-shadow-md font-medium">
              {isBengali ? `${cur.nameBn} — ${cur.tagline}` : `${cur.name} — ${cur.tagline}`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1 pointer-events-auto">
            <button
              onClick={() => { const div = divisions.find(d => d.id === cur.id); if (div) onSelectDivision(div); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white text-xs sm:text-sm font-black shadow-xl hover:scale-105 transition-all"
              style={{ background: `linear-gradient(135deg, ${cur.color}, ${cur.color}cc)`, boxShadow: `0 6px 20px ${cur.color}60` }}
            >
              <Compass className="w-4 h-4" />
              <span>{isBengali ? 'বিভাগ ঘুরে দেখুন' : 'Explore Division Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('landmarks')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white hover:scale-105 transition-all bg-black/60 backdrop-blur-md border border-white/25 shadow-lg"
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>{isBengali ? 'জাতীয় নিদর্শনকোষ' : 'Landmarks Archive'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('gk')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white hover:scale-105 transition-all bg-emerald-600/80 backdrop-blur-md border border-emerald-400/30 shadow-lg"
            >
              <Award className="w-4 h-4 text-yellow-300" />
              <span>{isBengali ? 'জ্ঞানকোষ ও রেকর্ডস' : 'National Records'}</span>
            </button>
          </div>
        </div>

        {/* Slide Left / Right Arrows */}
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={e => { e.stopPropagation(); next(); }}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Minimal Live Neon Progress Strip */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
          <div className="w-36 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden shadow-lg backdrop-blur-md">
            <div
              className="h-full transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progress}%`, background: cur.color, boxShadow: `0 0 10px ${cur.color}` }}
            />
          </div>
        </div>
      </section>

      {/* ═══ NATIONAL STATS BAR ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 -mt-10 mb-14">
        <div
          className="rounded-3xl p-6 sm:p-8 grid grid-cols-3 sm:grid-cols-6 gap-4 text-center"
          style={{
            background: isNightMode ? 'rgba(15,23,42,0.96)' : 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(24px)',
            border: isNightMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
            boxShadow: isNightMode ? '0 30px 70px rgba(0,0,0,0.7)' : '0 25px 60px rgba(0,0,0,0.1)',
          }}
        >
          {NATIONAL_STATS.map((s, i) => (
            <div key={i} className={`p-3.5 rounded-2xl transition-transform hover:scale-105 ${isNightMode ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className="text-2xl sm:text-3xl font-black font-mono tracking-tight" style={{ color: s.color }}>{s.val}</p>
              <p className={`text-[11px] font-bold mt-1 uppercase tracking-wider ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isBengali ? s.labelBn : s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 8 DIVISION GATEWAYS ═══ */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-8 rounded-full bg-rose-500" />
          <div>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
              {isBengali ? 'বাংলাদেশের ৮টি বিভাগীয় প্রবেশদ্বার' : 'All 8 Division Gateways'}
            </h2>
            <p className={`text-sm mt-0.5 ${sub}`}>
              {isBengali ? 'ঢাকা · চট্টগ্রাম · রাজশাহী · খুলনা · বরিশাল · সিলেট · রংপুর · ময়মনসিংহ' : 'Dhaka · Chittagong · Rajshahi · Khulna · Barishal · Sylhet · Rangpur · Mymensingh'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIVISION_SLIDES.map((div, idx) => {
            const divObj = divisions.find(d => d.id === div.id);
            return (
              <div
                key={div.id}
                onClick={() => { if (divObj) onSelectDivision(divObj); }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ border: `1.5px solid ${div.color}25` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={isNightMode ? div.night : div.day}
                    alt={div.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Sequence badge */}
                  <span
                    className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-md backdrop-blur-md"
                    style={{ background: div.color }}
                  >
                    {idx + 1}
                  </span>

                  {/* District count badge */}
                  {divObj && (
                    <span
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-md"
                      style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${div.color}70` }}
                    >
                      {divObj.stats?.districts || '--'} {isBengali ? 'জেলা' : 'Districts'}
                    </span>
                  )}

                  {/* Division name on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-black text-white drop-shadow-lg group-hover:text-yellow-300 transition-colors">
                      {isBengali ? div.nameBn : div.name}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 line-clamp-1">{div.tagline}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className={`p-4 border-t ${cardBg}`}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[div.pill1, div.pill2].map((pill, pi) => (
                      <span key={pi} className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${isNightMode ? 'bg-white/8 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                        {pill}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex items-center justify-between text-xs font-black"
                    style={{ color: div.color }}
                  >
                    <span>{isBengali ? 'পূর্ণাঙ্গ বিবরণ দেখুন' : 'Explore Full Portal'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ NATIONAL SYMBOLS & SACRED HERITAGE (WITH REAL AUTHENTIC PHOTOS) ═══ */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div
          className="rounded-3xl p-6 sm:p-10"
          style={{
            background: isNightMode ? 'rgba(15,23,42,0.65)' : 'rgba(248,250,252,1)',
            border: isNightMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h2 className={`text-2xl font-black ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
              {isBengali ? 'জাতীয় প্রতীক ও চিরন্তন ঐতিহ্য' : 'National Symbols & Sacred Heritage'}
            </h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/15 text-rose-500 w-fit">
              {isBengali ? 'বিস্তারিত জানতে যেকোনো প্রতীকে ক্লিক করুন' : 'Click any symbol for full details'}
            </span>
          </div>
          <p className={`text-sm mb-8 ${sub}`}>
            {isBengali ? 'বাংলাদেশের সার্বভৌম পরিচয় ও অহংকারের প্রতীকসমূহ—কেন, কীভাবে ও কোথায় পাওয়া যায় তা জানতে ক্লিক করুন।' : 'The timeless emblems defining the soul of Bangladesh. Click on any card to explore why, how, and where.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {NATIONAL_SYMBOLS_DATA.map((sym) => (
              <div
                key={sym.id}
                onClick={() => setSelectedSymbol(sym)}
                className={`rounded-3xl overflow-hidden border cursor-pointer hover:scale-105 transition-all duration-300 shadow-md hover:shadow-2xl group ${
                  isNightMode ? 'bg-slate-900/80 border-white/10 hover:border-white/25' : 'bg-white border-slate-200'
                }`}
                style={{
                  borderBottom: `4px solid ${sym.color}`
                }}
              >
                {/* Authentic Real Image Container */}
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={sym.image}
                    alt={sym.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <span
                    className="absolute top-3 left-3 text-[10px] font-black px-2.5 py-0.5 rounded-full text-white shadow-md backdrop-blur-md"
                    style={{ background: sym.color }}
                  >
                    {isBengali ? sym.labelBn : sym.label}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 text-center space-y-1">
                  <h3 className={`text-sm font-black ${isNightMode ? 'text-white' : 'text-slate-900'} group-hover:text-rose-500 transition-colors`}>
                    {isBengali ? sym.nameBn : sym.name}
                  </h3>
                  <p className="text-[10px] italic text-slate-400 font-mono">
                    {sym.scientific}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-500 pt-1">
                    <Info className="w-3 h-3" />
                    <span>{isBengali ? 'কেন ও কীভাবে দেখুন' : 'View Full Story'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NATIONAL SYMBOL POPUP MODAL (WITH LARGE PHOTO & DEEP DETAILS) ═══ */}
      {selectedSymbol && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedSymbol(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl space-y-5"
            style={{
              background: isNightMode ? '#0f172a' : '#ffffff',
              border: `2px solid ${selectedSymbol.color}70`,
              boxShadow: `0 25px 60px -15px ${selectedSymbol.color}50`,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top Image Banner */}
            <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-950">
              <img
                src={selectedSymbol.image}
                alt={selectedSymbol.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedSymbol(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-black/60 text-white hover:bg-rose-600 transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Symbol Title overlay */}
              <div className="absolute bottom-4 left-6 right-6">
                <span
                  className="text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider text-white shadow-md inline-block mb-1.5"
                  style={{ background: selectedSymbol.color }}
                >
                  {isBengali ? selectedSymbol.labelBn : selectedSymbol.label}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                  {isBengali ? selectedSymbol.nameBn : selectedSymbol.name}
                </h3>
                <p className="text-xs italic text-slate-300 font-mono mt-0.5">
                  {selectedSymbol.scientific}
                </p>
              </div>
            </div>

            {/* Content Sections: Why, How/When, Where, Cultural Impact */}
            <div className="p-6 pt-0 space-y-4 max-h-[50vh] overflow-y-auto pr-2 text-xs sm:text-sm">
              {/* WHY */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-1.5 border border-slate-200 dark:border-white/5">
                <h4 className="font-black text-rose-500 flex items-center gap-1.5 text-sm">
                  <HelpCircle className="w-4 h-4" />
                  <span>{isBengali ? 'কেন এটি জাতীয় প্রতীক হিসেবে নির্বাচিত?' : 'Why is this the National Symbol?'}</span>
                </h4>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                  {isBengali ? selectedSymbol.whyBn : selectedSymbol.why}
                </p>
              </div>

              {/* HOW & WHEN */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-1.5 border border-slate-200 dark:border-white/5">
                <h4 className="font-black text-amber-500 flex items-center gap-1.5 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{isBengali ? 'কখন ও কীভাবে স্বীকৃতি লাভ করেছে?' : 'When and How was it Designated?'}</span>
                </h4>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                  {isBengali ? selectedSymbol.howWhenBn : selectedSymbol.howWhen}
                </p>
              </div>

              {/* WHERE FOUND */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-1.5 border border-slate-200 dark:border-white/5">
                <h4 className="font-black text-emerald-500 flex items-center gap-1.5 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{isBengali ? 'বাংলাদেশে কোথায় ও কীভাবে পাওয়া যায়?' : 'Where is it Found in Bangladesh?'}</span>
                </h4>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                  {isBengali ? selectedSymbol.whereFoundBn : selectedSymbol.whereFound}
                </p>
              </div>

              {/* CULTURAL IMPACT */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-1.5 border border-slate-200 dark:border-white/5">
                <h4 className="font-black text-purple-500 flex items-center gap-1.5 text-sm">
                  <Award className="w-4 h-4" />
                  <span>{isBengali ? 'সাংস্কৃতিক ও জাতীয় তাৎপর্য:' : 'Cultural & National Significance:'}</span>
                </h4>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                  {isBengali ? selectedSymbol.culturalImpactBn : selectedSymbol.culturalImpact}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-200 dark:border-white/10 text-xs text-slate-400">
              <span>Bangladesh InSight · Official National Heritage Archive</span>
              <button
                onClick={() => setSelectedSymbol(null)}
                className="px-5 py-2 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-lg"
              >
                {isBengali ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer className={`w-full border-t py-10 px-4 transition-colors ${isNightMode ? 'border-white/10 bg-slate-950/80 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-black tracking-wide flex items-center justify-center sm:justify-start gap-1.5">
              <Shield className="w-4 h-4 text-rose-500 inline" />
              <span>Bangladesh InSight · Digital Heritage Atlas of Bangladesh</span>
            </p>
            <p className="text-xs mt-1 text-slate-500">
              © 2026 RimasumIT / Shreyalien. All Rights Reserved. Proprietary Digital Architecture.
            </p>
          </div>
          <div className="text-xs space-x-3 font-semibold">
            <span>Commercial Copying Prohibited</span>
            <span>·</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
