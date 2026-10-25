import React, { useState } from 'react';
import { Sparkles, Users, DollarSign, MapPin, ArrowUpRight } from 'lucide-react';
import { EVENT_PRESETS, EventPreset } from '../data/eventThemes';

interface InspirationGalleryProps {
  onSelectPreset: (preset: EventPreset) => void;
}

export const InspirationGallery: React.FC<InspirationGalleryProps> = ({ onSelectPreset }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Birthday', 'Wedding', 'Corporate', 'Anniversary', 'Party', 'Dinner'];

  const filteredPresets =
    selectedCategory === 'All'
      ? EVENT_PRESETS
      : EVENT_PRESETS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Event Visual Library</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          Celebration Inspirations
        </h1>
        <p className="text-sm text-stone-600">
          Explore world-class celebrations, aesthetic color palettes, and curated environments. Select any concept to load its architecture into the blueprint engine.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Inspiration Cards with Verified High-Res Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPresets.map((preset) => (
          <div
            key={preset.id}
            className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-amber-400 transition-all duration-300 flex flex-col"
          >
            {/* Image Container with Hover Zoom */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
              <img
                src={preset.image}
                alt={preset.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-xs text-white border border-white/20">
                  {preset.category}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-mono text-amber-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {preset.setting}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif-luxury text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                  {preset.name}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {preset.tagline}
                </p>
              </div>

              {/* Color Swatches */}
              <div className="space-y-1.5 pt-1 border-t border-stone-100">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>Color Harmony</span>
                  <span>{preset.colorPalette.length} shades</span>
                </div>
                <div className="flex gap-1.5">
                  {preset.colorPalette.map((c, i) => (
                    <div
                      key={i}
                      className="flex-1 h-3 rounded-xs border border-black/10"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Specs & Action Button */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-stone-500 space-y-0.5">
                  <div className="flex items-center gap-1 text-stone-700 font-medium">
                    <Users className="w-3 h-3 text-stone-400" />
                    <span>{preset.guestCount} guests</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-900 font-bold font-mono">
                    <DollarSign className="w-3 h-3 text-amber-700" />
                    <span>{preset.currency}{preset.budget.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPreset(preset)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-2xs group-hover:shadow-sm transition cursor-pointer"
                >
                  <span>Use Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
