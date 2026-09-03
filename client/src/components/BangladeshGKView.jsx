import React, { useState, useMemo } from 'react';
import { Search, Trophy, Globe, MapPin, Building2, Droplets, Mountain, Landmark, Trees, Anchor, Award, Sparkles, Navigation, Compass, Calendar, Sun, Check, ExternalLink } from 'lucide-react';

const EXTREME_POINTS = [
  { direction: 'North', directionBn: 'উত্তর', place: 'Jaigirjot, Banglabandha', placeBn: 'জায়গীরজোত, বাংলাবান্ধা', upazila: 'Tetulia, Panchagarh', upazilaBn: 'তেঁতুলিয়া, পঞ্চগড়', coord: "26°38' N", desc: 'Northernmost tip of Bangladesh overlooking the Himalayas and Kanchenjunga.', descBn: 'হিমালয়ের কোল ঘেঁষে দেশের সর্বউত্তরের স্থান ও জিরো পয়েন্ট।' },
  { direction: 'South', directionBn: 'দক্ষিণ', place: "Chhera Dwip, St. Martin's", placeBn: 'ছেঁড়াদ্বীপ, সেন্টমার্টিন', upazila: 'Teknaf, Cox\'s Bazar', upazilaBn: 'টেকনাফ, কক্সবাজার', coord: "20°34' N", desc: 'Southernmost isolated coral reef point; Shah Porir Dwip on the mainland.', descBn: 'বঙ্গোপসাগরে দেশের সর্বদক্ষিণের প্রবাল দ্বীপ (মূল ভূখণ্ডে শাহপরীর দ্বীপ)।' },
  { direction: 'East', directionBn: 'পূর্ব', place: 'Akhainthong, Dumdumia', placeBn: 'আখাইনঠং / দুমদুমিয়া', upazila: 'Thanchi, Bandarban', upazilaBn: 'থানচি, বান্দরবান', coord: "92°41' E", desc: 'Easternmost alpine frontier among the rugged Mowdok mountain range.', descBn: 'মওদক পর্বতমালায় মিয়ানমার সীমান্ত সংলগ্ন দেশের সর্বপূর্বের স্থান।' },
  { direction: 'West', directionBn: 'পশ্চিম', place: 'Monaksha', placeBn: 'মনাকশা', upazila: 'Shibganj, Chapainawabganj', upazilaBn: 'শিবগঞ্জ, চাঁপাইনবাবগঞ্জ', coord: "88°01' E", desc: 'Westernmost point bordering West Bengal along the Padma riverbed.', descBn: 'পদ্মা তীরবর্তী দেশের সর্বপশ্চিমের সীমান্ত স্থান।' },
];

const UNESCO_HERITAGE = [
  { id: 'u1', year: '1999', title: 'International Mother Language Day', titleBn: '২১শে ফেব্রুয়ারি - আন্তর্জাতিক মাতৃভাষা দিবস', category: 'Global Recognition', categoryBn: 'আন্তর্জাতিক দিবস', icon: Globe, color: '#ef4444', desc: 'Declared by UNESCO on 17 November 1999 to honor the 1952 Language Martyrs of Bangladesh, celebrated worldwide.', descBn: '১৯৫২ সালের ভাষা শহীদদের স্মরণে ইউনেস্কো কর্তৃক স্বীকৃতিপ্রাপ্ত বিশ্বজুড়ে উদযাপিত আন্তর্জাতিক দিবস।' },
  { id: 'u2', year: '2016', title: 'Mangal Shobhajatra on Pahela Baishakh', titleBn: 'পহেলা বৈশাখ ও মঙ্গল শোভাযাত্রা', category: 'Intangible Cultural Heritage', categoryBn: 'ইউনেস্কো অধরা ঐতিহ্য', icon: Sparkles, color: '#f59e0b', desc: 'Inscribed by UNESCO in 2016 as Intangible Cultural Heritage of Humanity, symbolizing secular unity and peace.', descBn: '২০১৬ সালে ইউনেস্কো বিশ্ব সাংস্কৃতিক ঐতিহ্য হিসেবে স্বীকৃতিপ্রাপ্ত অসাম্প্রদায়িক চেতনার প্রতীক।' },
  { id: 'u3', year: '2013', title: 'Traditional Art of Jamdani Weaving', titleBn: 'ঐতিহ্যবাহী জামদানি বয়নশিল্প', category: 'Intangible Cultural Heritage', categoryBn: 'ইউনেস্কো অধরা ঐতিহ্য', icon: Award, color: '#10b981', desc: 'Bangladesh\'s first Geographical Indication (GI) product and UNESCO intangible cultural treasure of Shitalakshya.', descBn: 'শীতলক্ষ্যার তীরের প্রাচীন মসলিন ঐতিহ্যের জীবন্ত রূপ ও ইউনেস্কো স্বীকৃত কারুশিল্প।' },
  { id: 'u4', year: '2023', title: 'Dhaka Rickshaws & Rickshaw Painting', titleBn: 'ঢাকা ও বাংলাদেশের রিকশা এবং রিকশাচিত্র', category: 'Intangible Cultural Heritage', categoryBn: 'ইউনেস্কো অধরা ঐতিহ্য', icon: Navigation, color: '#8b5cf6', desc: 'Inscribed in Dec 2023 at the 18th session of UNESCO, celebrating urban folk iconography, colors, and craftsmanship.', descBn: '২০২৩ সালে ইউনেস্কো বিশ্ব ঐতিহ্য হিসেবে অন্তর্ভুক্ত লোকশিল্প, বর্ণিল মোটিফ ও নগরবাহন সংস্কৃতি।' },
  { id: 'u5', year: '2017', title: 'Traditional Art of Shital Pati', titleBn: 'সিলেটের ঐতিহ্যবাহী শীতলপাটি বয়ন', category: 'Intangible Cultural Heritage', categoryBn: 'ইউনেস্কো অধরা ঐতিহ্য', icon: Trees, color: '#06b6d4', desc: 'Centuries-old artisanal craft of weaving smooth natural cane reeds (Murta) across Sylhet, recognized in 2017.', descBn: '২০১৭ সালে ইউনেস্কো স্বীকৃতিপ্রাপ্ত মোর্তা বেতির ঠান্ডা ও কোমল লোকজ বয়নশিল্প।' },
  { id: 'u6', year: '2005', title: 'Baul Songs & Mysticism of Lalon', titleBn: 'বাউল সংগীত ও মরমি দর্শন', category: 'Masterpiece of Oral Heritage', categoryBn: 'মৌখিক বিশ্ব ঐতিহ্য', icon: Landmark, color: '#ec4899', desc: 'Inscribed in 2005/2008 by UNESCO as a Masterpiece of Oral and Intangible Heritage, the mystic music of Bengal.', descBn: 'বাউল সম্রাট ফকির লালন শাহের আধ্যাত্মিক মানবতাবাদী গান ও বিশ্বস্বীকৃত দর্শন।' },
  { id: 'u7', year: '1997', title: 'The Sundarbans Mangrove Sanctuary', titleBn: 'সুন্দরবন বিশ্ব প্রাকৃতিক ঐতিহ্য', category: 'World Natural Heritage', categoryBn: 'প্রাকৃতিক বিশ্ব ঐতিহ্য', icon: Trees, color: '#059669', desc: 'Inscribed in 1997 under UNESCO World Heritage convention, largest contiguous tidal halophytic mangrove forest.', descBn: '১৯৯৭ সালে ইউনেস্কো ঘোষিত বিশ্ব প্রাকৃতিক ঐতিহ্য ও রয়েল বেঙ্গল টাইগারের বিশ্বসেরা আবাস।' },
  { id: 'u8', year: '1985', title: 'Historic Mosque City of Bagerhat', titleBn: 'ঐতিহাসিক মসজিদ শহর বাগেরহাট ও ষাট গম্বুজ', category: 'World Cultural Heritage', categoryBn: 'সাংস্কৃতিক বিশ্ব ঐতিহ্য', icon: Landmark, color: '#d97706', desc: 'Inscribed in 1985, featuring Khan Jahan Ali\'s 15th-century Sixty Dome Mosque and brick engineering.', descBn: '১৯৮৫ সালে ইউনেস্কো স্বীকৃত পঞ্চদশ শতাব্দীর অনন্য পোড়ামাটির স্থাপত্য ও খাঞ্জেলী নগরী।' },
  { id: 'u9', year: '1985', title: 'Ruins of the Buddhist Vihara at Paharpur', titleBn: 'পাহাড়পুর সোমপুর মহাবিহার', category: 'World Cultural Heritage', categoryBn: 'সাংস্কৃতিক বিশ্ব ঐতিহ্য', icon: Landmark, color: '#b45309', desc: 'Inscribed in 1985, one of the greatest Buddhist monastic universities in Asia from the Pala Empire (Naogaon).', descBn: '১৯৮৫ সালে ইউনেস্কো ঘোষিত এশিয়ার অন্যতম বৃহত্তম প্রাচীন বৌদ্ধ বিশ্ববিদ্যালয় ও স্থাপত্য।' },
  { id: 'u10', year: '1971', title: 'Independence Day & Victory Day', titleBn: '২৬শে মার্চ স্বাধীনতা দিবস ও ১৬ই ডিসেম্বর বিজয় দিবস', category: 'National Sovereign Days', categoryBn: 'জাতীয় গৌরবোজ্জ্বল দিবস', icon: Trophy, color: '#e11d48', desc: 'The defining national milestones commemorating the sovereign birth of the People\'s Republic of Bangladesh.', descBn: 'মুক্তিযুদ্ধের মাধ্যমে রক্তস্নাত স্বাধীন বাংলাদেশের সার্বভৌম অস্তিত্বের প্রধান জাতীয় দিবস।' },
];

const NATIONAL_SUPERLATIVES = [
  { title: 'Largest District by Area', titleBn: 'আয়তনে সবচেয়ে বড় জেলা', value: 'Rangamati (6,116 km²)', valueBn: 'রাঙ্গামাটি (৬,১১৬ বর্গ কিমি)', div: 'Chattogram' },
  { title: 'Smallest District by Area', titleBn: 'আয়তনে সবচেয়ে ছোট জেলা', value: 'Narayanganj (684 km²)', valueBn: 'নারায়ণগঞ্জ (৬৮৪ বর্গ কিমি)', div: 'Dhaka' },
  { title: 'Largest Village in Bangladesh & Asia', titleBn: 'বাংলাদেশ ও এশিয়ার বৃহত্তম গ্রাম', value: 'Baniachong (Habiganj)', valueBn: 'বানিয়াচং (হবিগঞ্জ জেলা)', div: 'Sylhet' },
  { title: 'Largest Upazila by Area', titleBn: 'আয়তনে বৃহত্তম উপজেলা', value: 'Shyamnagar (1,968 km²)', valueBn: 'শ্যামনগর (সাতক্ষীরা, ১,৯৬৮ বর্গ কিমি)', div: 'Khulna' },
  { title: 'Smallest Upazila by Area', titleBn: 'আয়তনে ক্ষুদ্রতম উপজেলা', value: 'Bandar (55.8 km²)', valueBn: 'বন্দর (নারায়ণগঞ্জ, ৫৫.৮ বর্গ কিমি)', div: 'Dhaka' },
  { title: 'Largest Union by Area', titleBn: 'আয়তনে বৃহত্তম ইউনিয়ন', value: 'Sajek Union (Baghaichhari)', valueBn: 'সাজেক ইউনিয়ন (বাঘাইছড়ি, রাঙ্গামাটি)', div: 'Chattogram' },
  { title: 'District with Most Rivers Flowing', titleBn: 'সর্বাধিক নদীপ্রবাহিত জেলা', value: 'Kurigram (16 Rivers)', valueBn: 'কুড়িগ্রাম (ব্রহ্মপুত্র, তিস্তা সহ ১৬টি নদী)', div: 'Rangpur' },
  { title: 'Highest Mountain Peak', titleBn: 'সর্বোচ্চ পর্বতশৃঙ্গ', value: 'Saka Haphong (1,052 m / 3,451 ft)', valueBn: 'সাকা হাফং (১,০৫২ মিটার, বান্দরবান)', div: 'Chattogram' },
  { title: 'Highest Rainfall Region', titleBn: 'সর্বাধিক বৃষ্টিপাতের স্থান', value: 'Lalakhal (Jaintiapur, Sylhet)', valueBn: 'লালখাল (জৈন্তাপুর, সিলেট - ৫,৫০০ মিমি)', div: 'Sylhet' },
  { title: 'Lowest Rainfall / Hottest Place', titleBn: 'সর্বনিম্ন বৃষ্টিপাত ও উষ্ণতম স্থান', value: 'Lalpur (Natore)', valueBn: 'লালপুর (নাটোর জেলা - ১৩৮ সেমি বৃষ্টি)', div: 'Rajshahi' },
  { title: 'Coldest Region in Winter', titleBn: 'শীতকালে শীতলতম স্থান', value: 'Sreemangal (Moulvibazar)', valueBn: 'শ্রীমঙ্গল (মৌলভীবাজার - ৫° সেলসিয়াস)', div: 'Sylhet' },
  { title: 'World\'s Longest Natural Beach', titleBn: 'বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্রসৈকত', value: "Cox's Bazar (120 km)", valueBn: 'কক্সবাজার সমুদ্রসৈকত (১২০ কিমি)', div: 'Chattogram' },
  { title: 'Largest Haor Wetland (Ramsar)', titleBn: 'বৃহত্তম হাওর ও রামসার সাইট', value: 'Tanguar & Hakaluki Haor', valueBn: 'টাঙ্গুয়ার ও হাকালুকি হাওর (সুনামগঞ্জ/মৌলভীবাজার)', div: 'Sylhet' },
  { title: 'Largest Island of Bangladesh', titleBn: 'বাংলাদেশের বৃহত্তম দ্বীপ', value: 'Bhola Island (3,403 km²)', valueBn: 'ভোলা দ্বীপ (৩,৪০৩ বর্গ কিমি)', div: 'Barishal' },
  { title: 'Only Coral Island in Bangladesh', titleBn: 'একমাত্র প্রবাল দ্বীপ', value: "St. Martin's Island", valueBn: 'সেন্টমার্টিন্স দ্বীপ (নারিকেল জিঞ্জিরা)', div: 'Chattogram' },
  { title: 'Longest Bridge in Bangladesh', titleBn: 'বাংলাদেশের দীর্ঘতম বহুমুখী সেতু', value: 'Padma Bridge (6.15 km mainline)', valueBn: 'পদ্মা বহুমুখী সেতু (৬.১৫ কিমি মূল সেতু)', div: 'Dhaka/Khulna' },
];

export default function BangladeshGKView({ districts = [], divisions = [], isNightMode, isBengali }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('extremes'); // 'extremes' | 'unesco' | 'records' | 'districts'
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState('all');

  const filteredDistricts = useMemo(() => {
    return districts.filter(d => {
      const matchDiv = selectedDivisionFilter === 'all' ||
        d.division?.toLowerCase() === selectedDivisionFilter.toLowerCase() ||
        d.divisionId?.toLowerCase() === selectedDivisionFilter.toLowerCase();
      const q = searchTerm.toLowerCase();
      const matchSearch = searchTerm === '' ||
        d.name?.toLowerCase().includes(q) ||
        d.nameBn?.includes(searchTerm) ||
        d.hq?.toLowerCase().includes(q) ||
        d.delicacy?.toLowerCase().includes(q);
      return matchDiv && matchSearch;
    });
  }, [districts, selectedDivisionFilter, searchTerm]);

  const bg = isNightMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';
  const cardBg = isNightMode ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200 shadow-sm';
  const sub = isNightMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className={`w-full min-h-screen ${bg} pt-32 pb-24 px-4 sm:px-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ═══ HERO BANNER ═══ */}
        <div
          className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border shadow-xl"
          style={{
            background: isNightMode
              ? 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.85))'
              : 'linear-gradient(135deg, #ffffff, #f1f5f9)',
            borderColor: isNightMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
          }}
        >
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>{isBengali ? 'বাংলাদেশ জাতীয় জ্ঞানকোষ ও বিশ্বস্বীকৃত ঐতিহ্য' : 'Bangladesh National Knowledge & UNESCO Heritage'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
              {isBengali ? 'প্রান্তবিন্দু, জাতীয় রেকর্ড ও বিশ্বস্বীকৃত ঐতিহ্য' : 'Extreme Points, National Records & World Recognitions'}
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed ${sub}`}>
              {isBengali
                ? 'বাংলাদেশের সর্বউত্তর-দক্ষিণ-পূর্ব-পশ্চিমের প্রান্তবিন্দু, ইউনেস্কো স্বীকৃত সাংস্কৃতিক ঐতিহ্য, আন্তর্জাতিক মাতৃভাষা দিবস, পহেলা বৈশাখ, ৬৪ জেলার তথ্যকোষ এবং শীর্ষ রেকর্ডসমূহ।'
                : 'Verified encyclopedia of Bangladesh’s extreme geographic borders, UNESCO Intangible Cultural Heritage, International Mother Language Day, superlatives, and 64 districts matrix.'}
            </p>

            {/* Quick Search */}
            <div className="relative pt-2 max-w-xl">
              <Search className="absolute left-4 top-5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isBengali ? 'যেকোনো স্থান, ঐতিহ্য, জেলা বা নদী খুঁজুন...' : 'Search any point, UNESCO heritage, district or river...'}
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-medium border outline-none transition-all shadow-sm ${
                  isNightMode
                    ? 'bg-slate-800/80 border-white/10 text-white focus:border-emerald-500'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-600'
                }`}
              />
            </div>
          </div>
        </div>

        {/* ═══ SECTION TABS ═══ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-white/10 no-scrollbar">
          {[
            { id: 'extremes', label: 'Extreme Points', labelBn: '৪টি প্রান্তবিন্দু', icon: Navigation },
            { id: 'unesco', label: 'UNESCO & World Heritage', labelBn: 'বিশ্বস্বীকৃত ঐতিহ্য ও উৎসব', icon: Sparkles },
            { id: 'records', label: 'National Records (Superlatives)', labelBn: 'বৃহত্তম ও ক্ষুদ্রতম রেকর্ড', icon: Award },
            { id: 'districts', label: '64 Districts Matrix', labelBn: '৬৪ জেলার তথ্যসারণী', icon: Building2 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                    : isNightMode
                      ? 'bg-slate-900 border border-white/8 text-slate-300 hover:bg-slate-800'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isBengali ? tab.labelBn : tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ═══ 1. EXTREME GEOGRAPHIC POINTS (প্রান্তবিন্দু) ═══ */}
        {activeTab === 'extremes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black font-display text-emerald-500">
                {isBengali ? 'বাংলাদেশের চারটি ভৌগোলিক প্রান্তবিন্দু' : 'The Four Extreme Geographic Borders of Bangladesh'}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali ? 'সর্বউত্তর, সর্বদক্ষিণ, সর্বপূর্ব ও সর্বপশ্চিমের সুনির্দিষ্ট মানচিত্রীয় সীমানা' : 'Exact cardinal coordinates, upazilas, and geographic endpoints'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXTREME_POINTS.map((pt, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border ${cardBg} space-y-3 hover:-translate-y-1 transition-all duration-300`}
                  style={{ borderTop: '4px solid #10b981' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-black text-white bg-emerald-600 shadow">
                      {isBengali ? `সর্ব${pt.directionBn}` : pt.direction}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">{pt.coord}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black mt-2 text-emerald-400">
                      {isBengali ? pt.placeBn : pt.place}
                    </h3>
                    <p className="text-xs font-bold text-slate-300 mt-0.5">
                      {isBengali ? pt.upazilaBn : pt.upazila}
                    </p>
                  </div>
                  <p className={`text-xs leading-relaxed ${sub}`}>
                    {isBengali ? pt.descBn : pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ 2. UNESCO & WORLD RECOGNIZED HERITAGE (বিশ্বস্বীকৃত ঐতিহ্য) ═══ */}
        {activeTab === 'unesco' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black font-display text-amber-500">
                {isBengali ? 'ইউনেস্কো ও বিশ্বস্বীকৃত ঐতিহ্য এবং জাতীয় দিবসসমূহ' : 'UNESCO Recognitions & World Cultural Heritage'}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali ? 'আন্তর্জাতিক মাতৃভাষা দিবস, পহেলা বৈশাখ মঙ্গল শোভাযাত্রা, জামদানি, শীতলপাটি, রিকশাচিত্র ও বিশ্ব ঐতিহ্যসমূহ' : 'Global milestones defining the cultural pride and sovereign soul of Bangladesh'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {UNESCO_HERITAGE.map((u) => {
                const Icon = u.icon;
                return (
                  <div
                    key={u.id}
                    className={`p-6 rounded-3xl border ${cardBg} space-y-3 hover:-translate-y-1.5 transition-all duration-300`}
                    style={{ borderLeft: `4px solid ${u.color}` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: u.color + '20' }}>
                        <Icon className="w-5 h-5" style={{ color: u.color }} />
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: u.color }}>
                        {u.year}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isBengali ? u.categoryBn : u.category}
                      </span>
                      <h3 className="text-base font-black mt-1" style={{ color: u.color }}>
                        {isBengali ? u.titleBn : u.title}
                      </h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${sub}`}>
                      {isBengali ? u.descBn : u.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ 3. NATIONAL SUPERLATIVES & RECORDS (বৃহত্তম ও ক্ষুদ্রতম) ═══ */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black font-display text-rose-500">
                {isBengali ? 'বাংলাদেশের ক্ষুদ্রতম ও বৃহত্তম রেকর্ডসমূহ' : 'National Superlatives & Extremes'}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                {isBengali ? 'সবচেয়ে বড় গ্রাম, উপজেলা, জেলা, নদী, পাহাড় ও মেগা স্থাপনার প্রামাণ্য তালিকা' : 'Comprehensive records from largest village to longest bridge'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {NATIONAL_SUPERLATIVES.map((rec, i) => (
                <div key={i} className={`p-5 rounded-3xl border ${cardBg} space-y-2 hover:-translate-y-1 transition-all`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isBengali ? rec.titleBn : rec.title}
                  </span>
                  <p className="text-base font-black text-rose-500">
                    {isBengali ? rec.valueBn : rec.value}
                  </p>
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400">
                    {rec.div}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ 4. 64 DISTRICTS MATRIX ═══ */}
        {activeTab === 'districts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black font-display text-indigo-500">
                  {isBengali ? 'বাংলাদেশের ৬৪ জেলার তথ্যসারণী' : '64 Districts Master Encyclopedia'}
                </h2>
                <p className={`text-xs sm:text-sm mt-1 ${sub}`}>
                  {isBengali ? 'আয়তন, সদর দপ্তর, নদ-নদী ও ঐতিহ্যবাহী খাবার' : 'Headquarters, area, rivers, and delicacies'}
                </p>
              </div>

              {/* Division Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {['all', 'dhaka', 'chattogram', 'rajshahi', 'khulna', 'barishal', 'sylhet', 'rangpur', 'mymensingh'].map(divKey => (
                  <button
                    key={divKey}
                    onClick={() => setSelectedDivisionFilter(divKey)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                      selectedDivisionFilter === divKey
                        ? 'bg-indigo-600 text-white shadow'
                        : isNightMode
                          ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {divKey}
                  </button>
                ))}
              </div>
            </div>

            <div className={`rounded-3xl border overflow-hidden shadow-lg ${cardBg}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className={`border-b ${isNightMode ? 'bg-slate-800/80 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                      <th className="p-4 font-black">#</th>
                      <th className="p-4 font-black">{isBengali ? 'জেলা' : 'District'}</th>
                      <th className="p-4 font-black">{isBengali ? 'বিভাগ' : 'Division'}</th>
                      <th className="p-4 font-black">{isBengali ? 'আয়তন' : 'Area'}</th>
                      <th className="p-4 font-black">{isBengali ? 'প্রধান নদ-নদী' : 'Rivers'}</th>
                      <th className="p-4 font-black">{isBengali ? 'বিখ্যাত খাবার / মিষ্টি' : 'Famous Food'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {filteredDistricts.slice(0, 64).map((d, idx) => (
                      <tr key={d.id} className="hover:bg-emerald-500/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-400">{idx + 1}</td>
                        <td className="p-4 font-black text-sm">
                          <span className="text-emerald-500">{isBengali ? d.nameBn : d.name}</span>
                          <span className="block text-[10px] font-medium text-slate-400">{d.hq ? `HQ: ${d.hq}` : ''}</span>
                        </td>
                        <td className="p-4 font-semibold">{d.division || d.divisionId}</td>
                        <td className="p-4 font-mono">{d.area || '--'}</td>
                        <td className="p-4 text-blue-400 font-medium">{d.rivers ? d.rivers.slice(0, 2).join(', ') : '--'}</td>
                        <td className="p-4 text-amber-500 font-semibold">{d.delicacy || '--'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
