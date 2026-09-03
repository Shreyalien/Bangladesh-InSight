import React, { useState } from 'react';
import { Utensils, Award, MapPin, Search } from 'lucide-react';

export default function CulinaryHeritageView({ delicacies = [], isBengali }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'Sweets & Desserts', 'Traditional Cuisine', 'Beverages', 'Breads & Bakery'];

  const filtered = delicacies.filter(d => {
    const matchesCat = filterCategory === 'all' || d.category === filterCategory;
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch = !q || 
      d.name.toLowerCase().includes(q) || 
      d.district.toLowerCase().includes(q) ||
      d.districtBn.includes(q) ||
      d.desc.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-white/20 mb-3 shadow-md">
          <Utensils className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            {isBengali ? 'বাংলার রসনাবিলাস ও ভৌগোলিক নির্দেশক পণ্য (GI)' : 'Culinary Heritage & GI Products'}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-display mb-3">
          {isBengali ? 'অঞ্চলভিত্তিক বিখ্যাত ঐতিহ্যবাহী খাবার ও মিষ্টি' : 'Traditional Delicacies & Sweets'}
        </h2>
        <p className="text-sm text-slate-300">
          {isBengali 
            ? 'বগুড়ার দই, নাটোরের কাঁচাগোল্লা, মুক্তাগাছার মণ্ডা, পোড়াবাড়ীর চমচম থেকে মেজবানি মাংস — বাংলার শতবর্ষী রসনাতৃপ্তি' 
            : 'From Bogura Curd and Natore Kachagolla to Muktagacha Monda and Chittagong Mezban — the authentic century-old tastes of Bengal.'}
        </p>
      </div>

      {/* Filter and Search */}
      <div className="glass-panel rounded-3xl p-4 sm:p-5 mb-8 border border-white/15 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBengali ? 'মিষ্টি বা খাবারের নাম দিয়ে খুঁজুন...' : 'Search delicacy or sweet...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/80 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={filterCategory === cat
                ? 'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-white/10'}
            >
              {cat === 'all' ? (isBengali ? 'সকল খাবার' : 'All Foods') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Delicacies Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="h-48 w-full relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                {/* GI Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-md">
                    <Award className="w-3 h-3" />
                    <span>{item.giStatus}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 text-xs text-white drop-shadow font-bold">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isBengali ? item.districtBn : item.district}, {item.division}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {item.desc}
                </p>

                {/* Key Ingredients */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {isBengali ? 'মূল উপাদানসমূহ:' : 'Key Ingredients:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.keyIngredients?.map((ing, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-900/80 text-[10px] font-medium text-amber-200 border border-amber-500/20">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Origin */}
            <div className="px-5 py-3 border-t border-white/10 bg-slate-900/40 text-[11px] text-slate-400">
              <strong className="text-slate-300">{isBengali ? 'ঐতিহাসিক উৎপত্তি: ' : 'Origin: '}</strong>
              {item.origin}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}