import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { EventForm } from './components/EventForm';
import { BlueprintView } from './components/BlueprintView';
import { CrisisDoctorView } from './components/CrisisDoctorView';
import { InspirationGallery } from './components/InspirationGallery';
import { SavedEventsView } from './components/SavedEventsView';
import { EventPlan, EventFormState } from './types';
import { EVENT_PRESETS, EventPreset } from './data/eventThemes';
import { Sparkles, AlertOctagon, Calendar, Heart, Shield, Award, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'planner' | 'crisis' | 'inspiration' | 'saved'>('planner');
  const [formState, setFormState] = useState<EventFormState>({
    eventType: 'Milestone Birthday',
    theme: 'Gilded Golden Hour Soirée',
    guestCount: 65,
    budget: 7500,
    currency: '$',
    setting: 'Rooftop Terrace',
    vibe: 'Golden Hour Glamour, Velvet & Amber Warmth, House & Nu-Disco',
    notes: 'Prioritize artisanal signature cocktail, saxophone accompanist during sunset, and late-night slider bite.',
  });

  const [currentPlan, setCurrentPlan] = useState<EventPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPlans, setSavedPlans] = useState<EventPlan[]>([]);
  const blueprintRef = useRef<HTMLDivElement>(null);

  // Load saved plans from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('festiva_saved_blueprints');
      if (stored) {
        setSavedPlans(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load saved plans:', e);
    }
  }, []);

  // Save to localStorage when savedPlans changes
  const savePlansToStorage = (plans: EventPlan[]) => {
    try {
      localStorage.setItem('festiva_saved_blueprints', JSON.stringify(plans));
      setSavedPlans(plans);
    } catch (e) {
      console.warn('Failed to save plans:', e);
    }
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plan-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setCurrentPlan(data.data);
        // Scroll to blueprint preview smoothly
        setTimeout(() => {
          blueprintRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        throw new Error(data.error || 'Failed to generate plan.');
      }
    } catch (err) {
      console.error('Plan generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyPreset = (preset: EventPreset) => {
    setFormState({
      eventType: preset.category === 'Birthday' ? 'Milestone Birthday' : preset.name.includes('Wedding') ? 'Wedding & Reception' : preset.name,
      theme: preset.name,
      guestCount: preset.guestCount,
      budget: preset.budget,
      currency: preset.currency,
      setting: preset.setting,
      vibe: preset.vibe,
      notes: preset.notes,
    });
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveCurrentPlan = () => {
    if (!currentPlan) return;
    const existingIndex = savedPlans.findIndex((p) => p.theme.title === currentPlan.theme.title);
    if (existingIndex >= 0) {
      const updated = savedPlans.filter((_, i) => i !== existingIndex);
      savePlansToStorage(updated);
    } else {
      const updated = [currentPlan, ...savedPlans];
      savePlansToStorage(updated);
    }
  };

  const handleDeleteSavedPlan = (title: string) => {
    const updated = savedPlans.filter((p) => p.theme.title !== title);
    savePlansToStorage(updated);
  };

  const handleLoadSavedPlan = (plan: EventPlan) => {
    setCurrentPlan(plan);
    setActiveTab('planner');
    setTimeout(() => {
      blueprintRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  const isCurrentPlanSaved = Boolean(
    currentPlan && savedPlans.some((p) => p.theme.title === currentPlan.theme.title)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-amber-200">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedPlans.length}
        hasPlan={Boolean(currentPlan)}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
        {activeTab === 'planner' && (
          <div className="space-y-10">
            {/* Editorial Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-amber-950 to-stone-900 text-white p-8 sm:p-14 shadow-lg border border-amber-900/30">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Next-Generation Celebration & Event Architect</span>
                </div>

                <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Flawless Celebrations, <br />
                  <span className="italic font-normal text-amber-300">Synthesized by AI.</span>
                </h1>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Plan breathtaking weddings, milestone birthdays, and luxury galas. Festiva generates minute-by-minute run-of-shows, tailored budgets, custom menus, and bulletproof contingency plans in seconds.
                </p>

                {/* Trust Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-900/40 text-xs">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span className="text-stone-300 font-medium">Contingency-Engine Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-stone-300 font-medium">Bespoke Menus & Bar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span className="text-stone-300 font-medium">10 to 500+ Guests Scalable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Emergency Callout Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-rose-50 border border-rose-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-rose-950">
                    Need to Clear an Event Emergency Right Now?
                  </h3>
                  <p className="text-xs text-rose-800">
                    Caterer delayed? Severe weather forecast? Power or sound failure? Our AI Crisis Doctor deploys instant 5-minute tactical rescue solutions.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('crisis')}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-2xs flex-shrink-0 cursor-pointer"
              >
                Launch Crisis Doctor →
              </button>
            </div>

            {/* Form Component */}
            <EventForm
              formState={formState}
              setFormState={setFormState}
              onGenerate={handleGeneratePlan}
              isLoading={isLoading}
              onApplyPreset={handleApplyPreset}
            />

            {/* Blueprint Section (if plan exists) */}
            <div ref={blueprintRef}>
              {currentPlan ? (
                <BlueprintView
                  plan={currentPlan}
                  onSave={handleToggleSaveCurrentPlan}
                  isSaved={isCurrentPlanSaved}
                  onOpenCrisisDoctor={() => setActiveTab('crisis')}
                  onPrint={handlePrint}
                />
              ) : (
                <div className="text-center py-12 px-6 rounded-2xl border-2 border-dashed border-stone-300/80 bg-white/50 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-amber-700" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-800">
                    Your Master Blueprint Will Appear Here
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    Configure your celebration details above or pick a Fast-Start preset, then click "Generate Full Event Blueprint with AI".
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crisis Doctor Tab */}
        {activeTab === 'crisis' && (
          <CrisisDoctorView onBackToPlanner={() => setActiveTab('planner')} />
        )}

        {/* Inspirations Gallery Tab */}
        {activeTab === 'inspiration' && (
          <InspirationGallery onSelectPreset={handleApplyPreset} />
        )}

        {/* Saved Events Tab */}
        {activeTab === 'saved' && (
          <SavedEventsView
            savedPlans={savedPlans}
            onLoadPlan={handleLoadSavedPlan}
            onDeletePlan={handleDeleteSavedPlan}
            onNewCelebration={() => setActiveTab('planner')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-10 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold text-xs">
              F
            </div>
            <div>
              <p className="font-semibold text-stone-900">Festiva AI Studio</p>
              <p className="text-[11px] text-stone-400">Celebration & Event Intelligence System</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('planner')}
              className="hover:text-stone-900 transition cursor-pointer"
            >
              Event Studio
            </button>
            <button
              onClick={() => setActiveTab('crisis')}
              className="hover:text-stone-900 transition cursor-pointer"
            >
              Crisis Doctor
            </button>
            <button
              onClick={() => setActiveTab('inspiration')}
              className="hover:text-stone-900 transition cursor-pointer"
            >
              Inspirations
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className="hover:text-stone-900 transition cursor-pointer"
            >
              Saved ({savedPlans.length})
            </button>
          </div>

          <p className="text-center sm:text-right">
            Designed for memorable celebrations · Fully Responsive
          </p>
        </div>
      </footer>
    </div>
  );
}
