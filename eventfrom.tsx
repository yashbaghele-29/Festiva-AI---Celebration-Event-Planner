import React from 'react';
import { Sparkles, Users, DollarSign, MapPin, Music, Sliders, Wand2, Compass } from 'lucide-react';
import { EventFormState } from '../types';
import { EVENT_PRESETS, EventPreset } from '../data/eventThemes';

interface EventFormProps {
  formState: EventFormState;
  setFormState: React.Dispatch<React.SetStateAction<EventFormState>>;
  onGenerate: () => void;
  isLoading: boolean;
  onApplyPreset: (preset: EventPreset) => void;
}

const EVENT_TYPES = [
  'Milestone Birthday',
  'Wedding & Reception',
  'Corporate Gala',
  'Anniversary Celebration',
  'Cocktail Soirée',
  'Intimate Dinner Party',
  'Baby / Bridal Shower',
  'Festival & Theme Rave',
];

const SETTINGS = [
  'Rooftop Terrace',
  'Outdoor Botanical Garden',
  'Industrial Loft / Warehouse',
  'Grand Ballroom',
  'Beachside Pavilion',
  'Private Historic Residence',
  'Courtyard & Pergola',
  'Cozy Speakeasy / Cellar',
];

const VIBE_KEYWORDS = [
  'Golden Hour Glamour',
  'Velvet & Amber Warmth',
  'Ethereal Botanical',
  'Boho Acoustic',
  'Electric Cyber-Luxe',
  'Classic Black-Tie',
  'Tuscan Rustic Feast',
  'High-Energy Disco Fever',
  'Moody Speakeasy Jazz',
  'Minimalist Contemporary',
];

const CURRENCIES = [
  { symbol: '$', code: 'USD' },
  { symbol: '€', code: 'EUR' },
  { symbol: '£', code: 'GBP' },
  { symbol: '₹', code: 'INR' },
  { symbol: 'A$', code: 'AUD' },
  { symbol: 'C$', code: 'CAD' },
];

export const EventForm: React.FC<EventFormProps> = ({
  formState,
  setFormState,
  onGenerate,
  isLoading,
  onApplyPreset,
}) => {
  const handleVibeClick = (keyword: string) => {
    if (formState.vibe.includes(keyword)) {
      const updated = formState.vibe
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s && s !== keyword)
        .join(', ');
      setFormState({ ...formState, vibe: updated });
    } else {
      const current = formState.vibe.trim();
      setFormState({
        ...formState,
        vibe: current ? `${current}, ${keyword}` : keyword,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Header of Form */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span className="text-xs font-bold tracking-wider uppercase text-amber-900">
              Event Blueprint Architect
            </span>
          </div>
          <span className="text-xs text-stone-500">
            Powered by Generative AI
          </span>
        </div>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-stone-900">
          Design Your Celebration
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          Tell our generative AI architect about your celebration vision. We’ll synthesize timelines, budget allocations, custom menus, and crisis plans in seconds.
        </p>
      </div>

      {/* Quick Presets Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Fast-Start Presets:</span>
          </span>
          <span className="text-stone-600 hidden sm:inline">Click to prefill template</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {EVENT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-xs text-stone-800 transition-colors cursor-pointer text-left"
            >
              <img
                src={preset.image}
                alt={preset.name}
                className="w-5 h-5 rounded-md object-cover"
              />
              <span className="font-medium whitespace-nowrap">{preset.name.split(' ')[0]} {preset.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Type */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Celebration Type
          </label>
          <select
            value={formState.eventType}
            onChange={(e) => setFormState({ ...formState, eventType: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Celebration Theme / Title */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Theme Name or Title <span className="text-stone-600 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formState.theme}
              onChange={(e) => setFormState({ ...formState, theme: e.target.value })}
              placeholder="e.g. Golden 30th Glow, Midnight In Paris, Electric Disco"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition"
            />
          </div>
        </div>

        {/* Guest Count */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-500" />
              <span>Guest Headcount</span>
            </label>
            <span className="text-sm font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
              {formState.guestCount} guests
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={500}
            step={5}
            value={formState.guestCount}
            onChange={(e) => setFormState({ ...formState, guestCount: Number(e.target.value) })}
            className="w-full accent-amber-700 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-600">
            <span>Intimate (10)</span>
            <span>Gathering (75)</span>
            <span>Grand Gala (250+)</span>
          </div>
        </div>

        {/* Total Budget & Currency */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-stone-500" />
              <span>Total Planned Budget</span>
            </label>
            <span className="text-sm font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              {formState.currency}{formState.budget.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2">
            <select
              value={formState.currency}
              onChange={(e) => setFormState({ ...formState, currency: e.target.value })}
              className="w-20 px-2 py-2 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.symbol}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>

            <input
              type="number"
              min={500}
              max={500000}
              step={500}
              value={formState.budget}
              onChange={(e) => setFormState({ ...formState, budget: Math.max(100, Number(e.target.value)) })}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition"
            />
          </div>
          <p className="text-[11px] text-stone-600">
            Approx. {formState.currency}{Math.round(formState.budget / Math.max(1, formState.guestCount))} per guest
          </p>
        </div>

        {/* Setting / Environment */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            <span>Venue Setting</span>
          </label>
          <select
            value={formState.setting}
            onChange={(e) => setFormState({ ...formState, setting: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition"
          >
            {SETTINGS.map((setting) => (
              <option key={setting} value={setting}>
                {setting}
              </option>
            ))}
          </select>
        </div>

        {/* Atmosphere / Vibe Description */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-stone-500" />
            <span>Atmosphere & Aesthetic Notes</span>
          </label>
          <input
            type="text"
            value={formState.vibe}
            onChange={(e) => setFormState({ ...formState, vibe: e.target.value })}
            placeholder="e.g. Candlelit warmth, acoustic covers, festive dancing"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition"
          />
        </div>
      </div>

      {/* Clickable Vibe Tags */}
      <div className="space-y-2 pt-1">
        <label className="text-xs text-stone-600 font-medium flex items-center gap-1">
          <Sliders className="w-3 h-3 text-stone-500" />
          <span>Quick Aesthetic Accents (Click to add/remove):</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {VIBE_KEYWORDS.map((keyword) => {
            const isSelected = formState.vibe.includes(keyword);
            return (
              <button
                key={keyword}
                type="button"
                onClick={() => handleVibeClick(keyword)}
                className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-amber-700 text-amber-50 font-semibold shadow-2xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {isSelected ? `✓ ${keyword}` : `+ ${keyword}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Notes & Constraints */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Special Constraints, Dietary Needs & Must-Haves
        </label>
        <textarea
          rows={2}
          value={formState.notes}
          onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
          placeholder="e.g. Need gluten-free options, surprise birthday cake ceremony at 9:00 PM, outdoor lawn games for children, wheelchair ramp access required..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-base text-white shadow-md flex items-center justify-center gap-3 transition-all ${
            isLoading
              ? 'bg-amber-700/70 cursor-not-allowed'
              : 'bg-amber-700 hover:bg-amber-800 hover:shadow-lg active:scale-[0.99] cursor-pointer'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Architecting Celebration Blueprint with Gen AI...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 text-amber-200" />
              <span>Generate Full Event Blueprint with AI</span>
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-stone-600 mt-2">
          Produces minute-by-minute timeline, budget allocations, cocktail menus, and crisis contingency plans in seconds.
        </p>
      </div>
    </div>
  );
};
