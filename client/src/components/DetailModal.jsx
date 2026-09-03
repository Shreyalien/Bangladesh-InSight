import React from 'react';
import { X, Calendar, MapPin, Landmark, Droplets, Utensils, Mountain, Building2, Trees } from 'lucide-react';

export default function DetailModal({ item, onClose, isBengali, isNightMode }) {
  if (!item) return null;

  const hasCustomImage = item.image && !item.image.includes('dhaka_day') && item.image.startsWith('/');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: If item has its OWN genuine image, show it. Otherwise show clean graphic header (NO fake division photo) */}
        {hasCustomImage ? (
          <div className="relative h-60 w-full flex-shrink-0 bg-slate-950">
            <img
              src={item.image}
              alt={item.name || item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white backdrop-blur-md transition-all shadow-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider mb-1.5 inline-block shadow">
                {item.type || item.category || 'LANDMARK'}
              </span>
              <h2 className="text-2xl font-black text-white leading-tight drop-shadow-md font-display">
                {isBengali ? (item.nameBn || item.titleBn || item.name) : (item.name || item.title)}
              </h2>
            </div>
          </div>
        ) : (
          <div className="p-6 pb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-rose-600 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/20 uppercase tracking-wider backdrop-blur-md">
                {item.divisionId ? `${item.divisionId.toUpperCase()} DIVISION` : (item.type || 'DETAILS')}
              </span>
              {item.hq && (
                <span className="text-[11px] text-white/80">
                  HQ: {item.hq}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              {isBengali ? (item.nameBn || item.titleBn || item.name) : (item.name || item.title)}
            </h2>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2 flex items-center space-x-1.5">
              <Landmark className="w-4 h-4" />
              <span>{isBengali ? 'ঐতিহাসিক বিবরণ ও ভৌগোলিক তথ্য' : 'Overview & Heritage Details'}</span>
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {isBengali
                ? (item.detailsBn || item.overviewBn || item.descriptionBn || item.description || item.details)
                : (item.details || item.overview || item.description || item.heritage)}
            </p>
          </div>

          {/* Quick Specs Grid if available */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs">
            {item.area && (
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">{isBengali ? 'আয়তন' : 'Area'}</span>
                <span className="font-bold mt-0.5 text-emerald-500">{item.area}</span>
              </div>
            )}
            {item.population && (
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">{isBengali ? 'জনসংখ্যা' : 'Population'}</span>
                <span className="font-bold mt-0.5 text-sky-500">{item.population}</span>
              </div>
            )}
            {item.upazilas && (
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">{isBengali ? 'উপজেলা' : 'Upazilas'}</span>
                <span className="font-bold mt-0.5 text-amber-500">{Array.isArray(item.upazilas) ? item.upazilas.length : item.upazilas}</span>
              </div>
            )}
            {item.delicacy && (
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] font-semibold">{isBengali ? 'বিখ্যাত খাবার / মিষ্টি' : 'Famous Food'}</span>
                <span className="font-bold mt-0.5 text-amber-400">{item.delicacy}</span>
              </div>
            )}
            {item.rivers && (
              <div className="col-span-2 sm:col-span-3">
                <span className="text-slate-400 block text-[10px] font-semibold">{isBengali ? 'নদ-নদী' : 'Rivers'}</span>
                <span className="font-bold mt-0.5 text-blue-400">{Array.isArray(item.rivers) ? item.rivers.join(', ') : item.rivers}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
