import React, { useState } from 'react';
import {
  Clock,
  DollarSign,
  Utensils,
  Sparkles,
  CheckSquare,
  Mail,
  ShieldAlert,
  Copy,
  Check,
  Bookmark,
  Share2,
  Printer,
  GlassWater,
  Palette,
  Lightbulb,
  Music,
  MapPin,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { EventPlan, TimelineItem } from '../types';

interface BlueprintViewProps {
  plan: EventPlan;
  onSave: () => void;
  isSaved: boolean;
  onOpenCrisisDoctor: () => void;
  onPrint: () => void;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({
  plan,
  onSave,
  isSaved,
  onOpenCrisisDoctor,
  onPrint,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'aesthetic' | 'timeline' | 'budget' | 'catering' | 'decor' | 'checklist' | 'invitation' | 'crisis'
  >('aesthetic');

  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({});
  const [budgetMultiplier, setBudgetMultiplier] = useState(1);
  const [invitationMode, setInvitationMode] = useState<'formal' | 'casualChic'>('formal');

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const toggleMilestone = (idx: number) => {
    setCompletedMilestones((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleChecklistItem = (key: string) => {
    setCompletedChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Checklist completion calculation
  const totalChecklistItems = plan.checklists.reduce((acc, phase) => acc + phase.items.length, 0);
  const checkedChecklistItems = Object.values(completedChecklist).filter(Boolean).length;
  const checklistProgress = totalChecklistItems > 0 ? Math.round((checkedChecklistItems / totalChecklistItems) * 100) : 0;

  const currentTotalBudget = Math.round(plan.budget.totalEstimate * budgetMultiplier);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Synthesized Celebration Blueprint</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-300">
                {plan.meta?.source || 'Festiva Intelligence'}
              </span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {plan.theme.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 mt-1 max-w-3xl">
              {plan.theme.tagline}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onSave}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isSaved
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved to Library' : 'Save Blueprint'}</span>
            </button>

            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700 transition-colors"
              title="Print or Export PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Spec Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-700/60 text-xs">
          <div>
            <span className="text-stone-400 block">Dress Code</span>
            <span className="font-semibold text-stone-200 truncate block mt-0.5">{plan.theme.dressCode}</span>
          </div>
          <div>
            <span className="text-stone-400 block">Total Budget Allocation</span>
            <span className="font-semibold text-amber-300 block mt-0.5">
              {plan.budget.currency}{currentTotalBudget.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">Signature Drink</span>
            <span className="font-semibold text-stone-200 block truncate mt-0.5">
              {plan.catering.signatureCocktail.name}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">Soundscape Arc</span>
            <span className="font-semibold text-stone-200 block truncate mt-0.5">
              {plan.theme.musicalVibe.split(',')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="border-b border-stone-200 bg-stone-50/80 px-4 sm:px-8 overflow-x-auto scrollbar-none no-scrollbar">
        <div className="flex gap-2 py-3 min-w-max">
          {[
            { id: 'aesthetic', label: 'Theme & Aesthetic', icon: Palette },
            { id: 'timeline', label: 'Run of Show', icon: Clock },
            { id: 'budget', label: 'Budget Allocator', icon: DollarSign },
            { id: 'catering', label: 'Menu & Bar', icon: Utensils },
            { id: 'decor', label: 'Spatial & Decor', icon: Sparkles },
            { id: 'checklist', label: `Checklist (${checklistProgress}%)`, icon: CheckSquare },
            { id: 'invitation', label: 'Invitation Suite', icon: Mail },
            { id: 'crisis', label: 'Crisis Contingency', icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-8">
        {/* 1. THEME & AESTHETIC */}
        {activeSubTab === 'aesthetic' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Concept Narrative */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80">
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mb-2">
                The Creative Concept
              </h3>
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                {plan.theme.concept}
              </p>
            </div>

            {/* Curated Color Swatches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-700" />
                  <span>Curated Celebration Color Palette</span>
                </h4>
                <span className="text-xs text-stone-500">Click any code to copy HEX</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {plan.theme.colorPalette.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(color.hex, `hex-${idx}`)}
                    className="p-3 rounded-xl border border-stone-200 bg-white hover:border-amber-400 hover:shadow-xs transition text-left group cursor-pointer"
                  >
                    <div
                      className="w-full h-14 rounded-lg shadow-inner mb-2 border border-black/10 group-hover:scale-[1.02] transition-transform"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-900 truncate block">
                        {color.name}
                      </span>
                      {copiedSection === `hex-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-stone-500 block">
                      {color.hex}
                    </span>
                    {color.role && (
                      <span className="text-[10px] text-stone-400 truncate block mt-0.5">
                        {color.role}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sensory & Atmospheric Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Dress Code Directive</span>
                </div>
                <p className="text-sm font-semibold text-stone-900">
                  {plan.theme.dressCode}
                </p>
                <p className="text-xs text-stone-600">
                  Advise guests via invitation to adhere to this palette and style for a cohesive celebration photo aesthetic.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Music className="w-4 h-4" />
                  <span>Musical Vibe & Soundscape</span>
                </div>
                <p className="text-sm font-semibold text-stone-900">
                  {plan.theme.musicalVibe}
                </p>
                <p className="text-xs text-stone-600">
                  Arc moves from ambient acoustic/jazz in earlier hours to dynamic dance energy post-dinner.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>Lighting & Luminary Mood</span>
                </div>
                <p className="text-sm font-semibold text-stone-900">
                  {plan.theme.lightingMood}
                </p>
                <p className="text-xs text-stone-600">
                  Maintain 2700K warm incandescent glow; avoid harsh overhead fluorescent bulbs at all costs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. RUN OF SHOW TIMELINE */}
        {activeSubTab === 'timeline' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                  Run of Show & Minute-by-Minute Schedule
                </h3>
                <p className="text-xs text-stone-600">
                  Chronological schedule designed to balance energy, food service, speeches, and revelry without dead air.
                </p>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    plan.timeline.map((t) => `${t.time} - ${t.title}: ${t.description}`).join('\n\n'),
                    'timeline-full'
                  )
                }
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700 hover:bg-stone-100"
              >
                {copiedSection === 'timeline-full' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Schedule Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Schedule</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              {plan.timeline.map((item, idx) => {
                const isChecked = completedMilestones[idx];
                return (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-xl border transition-all ${
                      isChecked
                        ? 'bg-stone-50/60 border-stone-200 opacity-60'
                        : 'bg-white border-stone-200 shadow-2xs hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleMilestone(idx)}
                        className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-stone-300 hover:border-amber-600'
                        }`}
                        title="Mark milestone complete"
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </button>

                      {/* Time Badge */}
                      <div className="flex-shrink-0 w-16 sm:w-20 pt-0.5">
                        <span className="font-mono text-xs sm:text-sm font-bold text-amber-900 bg-amber-100/70 px-2 py-1 rounded-md block text-center">
                          {item.time}
                        </span>
                      </div>

                      {/* Milestone Details */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4
                            className={`text-sm sm:text-base font-bold text-stone-900 ${
                              isChecked ? 'line-through text-stone-500' : ''
                            }`}
                          >
                            {item.title}
                          </h4>
                          {item.vendorInvolved && (
                            <span className="text-[11px] text-stone-500 font-medium bg-stone-100 px-2 py-0.5 rounded-md self-start sm:self-auto">
                              Vendor: {item.vendorInvolved}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {item.description}
                        </p>
                        {item.proTip && (
                          <div className="mt-2 text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 flex items-start gap-2">
                            <Info className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
                            <span><strong>Pro-Tip:</strong> {item.proTip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. BUDGET ALLOCATOR */}
        {activeSubTab === 'budget' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Budget Summary Card & Dynamic Simulator */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                    Budget Allocation & Cost Model
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Recommended allocation benchmarked against high-end celebration standards.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">Total Budget Target</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono">
                    {plan.budget.currency}{currentTotalBudget.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Dynamic Budget Slider */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                    <span>Simulate Budget Scaling:</span>
                  </span>
                  <span className="font-mono font-bold text-amber-900">
                    {Math.round(budgetMultiplier * 100)}% of original ({plan.budget.currency}{currentTotalBudget.toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.0}
                  step={0.05}
                  value={budgetMultiplier}
                  onChange={(e) => setBudgetMultiplier(Number(e.target.value))}
                  className="w-full accent-amber-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-600">
                  <span>-50% Lean Model</span>
                  <span>100% Target Plan</span>
                  <span>+100% Luxury Upgrade</span>
                </div>
              </div>
            </div>

            {/* Itemized Categories */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Itemized Department Allocations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.budget.categories.map((cat, idx) => {
                  const scaledAmount = Math.round(cat.estimatedAmount * budgetMultiplier);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-300 transition space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900">{cat.name}</span>
                        <div className="text-right">
                          <span className="text-sm font-bold font-mono text-stone-900">
                            {plan.budget.currency}{scaledAmount.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-stone-500 ml-1">({cat.percentage}%)</span>
                        </div>
                      </div>

                      {/* Percentage Bar */}
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-700 h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, cat.percentage * 2)}%` }}
                        />
                      </div>

                      <p className="text-xs text-stone-600">{cat.notes}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cost Saving Insider Hacks */}
            {plan.budget.costSavingTips && plan.budget.costSavingTips.length > 0 && (
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <TrendingDown className="w-4 h-4 text-amber-700" />
                  <span>Veteran Cost-Optimization Strategies</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
                  {plan.budget.costSavingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-amber-700">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 4. CATERING & SIGNATURE BAR */}
        {activeSubTab === 'catering' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Signature Cocktail Card */}
            <div className="bg-gradient-to-br from-amber-950 to-stone-900 text-amber-50 p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-bold">
                  <GlassWater className="w-4 h-4" />
                  <span>Bespoke Celebration Cocktail</span>
                </div>
                <span className="text-xs bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded border border-amber-700">
                  Signature Recipe
                </span>
              </div>

              <div>
                <h3 className="font-serif-luxury text-3xl font-bold text-white">
                  {plan.catering.signatureCocktail.name}
                </h3>
                <p className="text-xs text-amber-200/80 mt-1">
                  Garnish: {plan.catering.signatureCocktail.garnish}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-amber-800/60 text-xs">
                <div>
                  <span className="font-bold text-amber-300 uppercase tracking-wider block mb-2">
                    Cocktail Formulation:
                  </span>
                  <ul className="space-y-1 text-stone-200">
                    {plan.catering.signatureCocktail.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/20 p-4 rounded-xl border border-amber-700/40">
                  <span className="font-bold text-amber-300 uppercase tracking-wider block mb-1">
                    Inclusive Mocktail Counterpart:
                  </span>
                  <p className="text-stone-300 leading-relaxed">
                    {plan.catering.signatureCocktail.mocktailAlternative}
                  </p>
                </div>
              </div>
            </div>

            {/* Cocktail Hour & Passed Drinks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Welcome & Cocktail Hour Libations
              </h4>
              <div className="flex flex-wrap gap-2">
                {plan.catering.cocktailHourDrinks.map((drink, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 rounded-xl bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200"
                  >
                    🥂 {drink}
                  </span>
                ))}
              </div>
            </div>

            {/* Multi-Course Dinner Menu */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Curated Dinner Courses
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Appetizers */}
                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    Course I · Appetizers
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {plan.catering.dinnerMenu.appetizers.map((item, idx) => (
                      <li key={idx} className="leading-snug">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mains */}
                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    Course II · Entrées & Mains
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {plan.catering.dinnerMenu.mains.map((item, idx) => (
                      <li key={idx} className="leading-snug">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Desserts */}
                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    Course III · Desserts & Sweets
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {plan.catering.dinnerMenu.dessert.map((item, idx) => (
                      <li key={idx} className="leading-snug">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Late Night Bite & Dietary Guarantee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  🌙 Late-Night Energy Bite
                </span>
                <p className="text-xs sm:text-sm text-amber-950">
                  {plan.catering.lateNightBite}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  🥗 Dietary Accommodations Note
                </span>
                <p className="text-xs text-stone-600">
                  {plan.catering.dinnerMenu.dietaryInclusions}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. SPATIAL & DECOR DESIGN */}
        {activeSubTab === 'decor' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                Spatial Styling & Focal Points
              </h3>
              <p className="text-xs text-stone-600">
                Visual focal points and styling architectures designed to create viral photo moments and immersive hospitality.
              </p>
            </div>

            {/* Focal Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Hero Photo & Arrival Moments
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plan.decorAndVisuals.focalPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 transition space-y-2"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                      0{idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tablescapes & Lighting Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Tablescape Architecture</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {plan.decorAndVisuals.tablescapes}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  <span>Lighting Rig & Ambiance Plan</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {plan.decorAndVisuals.lightingDesign}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 6. CHECKLIST & MILESTONES */}
        {activeSubTab === 'checklist' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                  Countdown Action Checklist
                </h3>
                <p className="text-xs text-stone-600">
                  Step-by-step phases to organize your celebration without last-minute scrambling.
                </p>
              </div>

              {/* Progress Pill */}
              <div className="flex items-center gap-3 bg-stone-100 p-2.5 rounded-xl border border-stone-200">
                <div className="w-24 bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${checklistProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-stone-800 font-mono">
                  {checkedChecklistItems} / {totalChecklistItems} ({checklistProgress}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plan.checklists.map((phase, pIdx) => (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="font-bold text-sm text-amber-950 font-serif-luxury">
                      {phase.phase}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {phase.items.length} tasks
                    </span>
                  </div>

                  <div className="space-y-2">
                    {phase.items.map((item, iIdx) => {
                      const itemKey = `${pIdx}-${iIdx}`;
                      const isDone = completedChecklist[itemKey];
                      return (
                        <label
                          key={iIdx}
                          className={`flex items-start gap-3 p-2.5 rounded-lg transition cursor-pointer select-none ${
                            isDone ? 'bg-stone-50 text-stone-400 line-through' : 'hover:bg-amber-50/50 text-stone-800'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(isDone)}
                            onChange={() => toggleChecklistItem(itemKey)}
                            className="mt-0.5 accent-amber-700 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm leading-snug">{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. INVITATION SUITE */}
        {activeSubTab === 'invitation' && (
          <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
            <div className="text-center space-y-1">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
                Luxury Digital & Print Invitation Suite
              </h3>
              <p className="text-xs text-stone-600">
                Ready-to-send wording tailored to your celebration theme and dress code.
              </p>
            </div>

            {/* Toggle Formal / Casual */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200">
                <button
                  onClick={() => setInvitationMode('formal')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    invitationMode === 'formal'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Formal & Classic
                </button>
                <button
                  onClick={() => setInvitationMode('casualChic')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    invitationMode === 'casualChic'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Playful & Casual-Chic
                </button>
              </div>
            </div>

            {/* Realistic Invitation Mock Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF7F2] border-2 border-stone-300 shadow-lg relative overflow-hidden text-center space-y-6">
              {/* Decorative inner foil border */}
              <div className="absolute inset-3 border border-amber-300/80 rounded-2xl pointer-events-none" />

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-amber-800 font-semibold">
                  You Are Cordially Invited
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                  {plan.theme.title}
                </h2>
              </div>

              <div className="max-w-xl mx-auto py-2">
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic font-serif-luxury">
                  "{invitationMode === 'formal' ? plan.invitationWording.formal : plan.invitationWording.casualChic}"
                </p>
              </div>

              <div className="pt-4 border-t border-amber-200/60 max-w-sm mx-auto grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Dress Attire</span>
                  <span className="font-semibold text-stone-900 block mt-0.5">{plan.theme.dressCode}</span>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase tracking-wider text-[10px]">RSVP Advice</span>
                  <span className="font-semibold text-stone-900 block mt-0.5">{plan.invitationWording.rsvpDateAdvice}</span>
                </div>
              </div>

              {/* Copy Wording Button */}
              <div className="pt-2">
                <button
                  onClick={() =>
                    copyToClipboard(
                      invitationMode === 'formal' ? plan.invitationWording.formal : plan.invitationWording.casualChic,
                      'invitation-copy'
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm transition"
                >
                  {copiedSection === 'invitation-copy' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Invitation Text</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. CRISIS CONTINGENCY PLAYBOOK */}
        {activeSubTab === 'crisis' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-rose-50 p-6 rounded-2xl border border-rose-200">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-rose-950">
                    Proactive Contingency Playbook
                  </h3>
                  <p className="text-xs text-rose-900 mt-1 max-w-2xl">
                    Every world-class event anticipates complications before they happen. Below are pre-calculated mitigation protocols for your celebration.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenCrisisDoctor}
                className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition"
              >
                <span>Launch Live Crisis Doctor</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {plan.crisisPlaybook.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 transition space-y-2 shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-800 text-xs flex items-center justify-center font-mono">
                      !
                    </span>
                    <span>Worst-Case Risk: {item.scenario}</span>
                  </div>
                  <div className="pl-8 text-xs sm:text-sm text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                    <span className="font-bold text-emerald-800 block mb-0.5">Tactical AI Solution:</span>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
