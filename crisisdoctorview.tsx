import React, { useState } from 'react';
import {
  AlertOctagon,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  PhoneCall,
  Sparkles,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { CRISIS_SCENARIOS } from '../data/eventThemes';
import { CrisisSolution } from '../types';

interface CrisisDoctorViewProps {
  onBackToPlanner?: () => void;
}

export const CrisisDoctorView: React.FC<CrisisDoctorViewProps> = ({ onBackToPlanner }) => {
  const [crisisText, setCrisisText] = useState('');
  const [eventType, setEventType] = useState('Celebration');
  const [guestCount, setGuestCount] = useState(60);
  const [currentPhase, setCurrentPhase] = useState('Planning (1-2 Weeks Out)');
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<CrisisSolution | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectScenario = (scenario: typeof CRISIS_SCENARIOS[0]) => {
    setCrisisText(scenario.preview);
  };

  const handleSolveCrisis = async () => {
    if (!crisisText.trim()) {
      setErrorMsg('Please describe your event planning problem or emergency.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/solve-crisis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crisisDescription: crisisText,
          eventType,
          guestCount,
          currentPhase,
        }),
      });

      const data = await response.json();
      if (data.success && data.solution) {
        setSolution(data.solution);
      } else {
        throw new Error(data.error || 'Failed to resolve emergency.');
      }
    } catch (err: any) {
      console.error('Crisis solver error:', err);
      setErrorMsg(err.message || 'Unable to solve crisis at this moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyScript = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-rose-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Event Problem Resolution Center</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Event Planning Crisis Doctor
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Encountered an emergency or problem during event planning time? Describe what went wrong and our AI Incident Commander will deploy an immediate 5-minute tactical rescue plan.
            </p>
          </div>

          {onBackToPlanner && (
            <button
              onClick={onBackToPlanner}
              className="self-start sm:self-auto text-xs font-semibold text-stone-300 hover:text-white px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              ← Back to Event Studio
            </button>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-stone-900 mb-1">
            Describe The Problem or Emergency
          </h2>
          <p className="text-xs text-stone-500">
            Select a high-frequency disaster scenario below or type your exact issue.
          </p>
        </div>

        {/* 1-Click Common Scenarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {CRISIS_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleSelectScenario(scenario)}
              className="p-3 text-left rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-rose-50 hover:border-rose-300 transition text-xs cursor-pointer group"
            >
              <div className="font-semibold text-stone-800 group-hover:text-rose-900 flex items-center justify-between">
                <span>{scenario.title}</span>
                <span className="text-[10px] text-stone-500 group-hover:text-rose-600">Select</span>
              </div>
              <p className="text-[11px] text-stone-600 line-clamp-1 mt-1">
                {scenario.preview}
              </p>
            </button>
          ))}
        </div>

        {/* Context Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Celebration Type
            </label>
            <input
              type="text"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              placeholder="e.g. Wedding, 30th Birthday, Gala"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Guest Count
            </label>
            <input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Timeframe / Urgency
            </label>
            <select
              value={currentPhase}
              onChange={(e) => setCurrentPhase(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            >
              <option value="HAPPENING RIGHT NOW (Day-of Event)">🚨 HAPPENING RIGHT NOW (Day-Of)</option>
              <option value="T-Minus 24 to 48 Hours">T-Minus 24 to 48 Hours</option>
              <option value="Planning (1-2 Weeks Out)">Planning (1-2 Weeks Out)</option>
              <option value="Early Planning Stage">Early Planning Stage</option>
            </select>
          </div>
        </div>

        {/* Custom Text Area */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
            What is the emergency or problem?
          </label>
          <textarea
            rows={3}
            value={crisisText}
            onChange={(e) => setCrisisText(e.target.value)}
            placeholder="e.g. The caterer just notified us that their oven failed and they will arrive 90 minutes late. 120 hungry guests are already arriving for cocktail hour..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-600 transition"
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-600 font-semibold">{errorMsg}</p>
        )}

        <button
          onClick={handleSolveCrisis}
          disabled={isLoading}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer ${
            isLoading
              ? 'bg-rose-400 cursor-not-allowed'
              : 'bg-rose-600 hover:bg-rose-700 active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Emergency & Assembling Tactical Rescue...</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 text-rose-200" />
              <span>Clear The Problem Now (Deploy AI Triage)</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Solution Display */}
      {solution && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6 animate-fadeIn">
          {/* Triage Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Triage Status: {solution.triageLevel} PRIORITY
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-900 mt-0.5">
                  "{solution.calmingMessage}"
                </p>
              </div>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Action Plan Active
            </span>
          </div>

          {/* Next 5 Minutes Immediate Action */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-rose-600" />
              <span>{solution.immediateAction.timeline} · Immediate Triage</span>
            </div>
            <div className="space-y-2">
              {solution.immediateAction.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 15-30 Min Strategic Mitigation */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{solution.mitigationTactic.timeline} · Strategic Recovery Pivot</span>
            </div>
            <p className="text-xs text-stone-600 font-medium">
              Strategy: {solution.mitigationTactic.strategy}
            </p>
            <div className="space-y-2 pt-1">
              {solution.mitigationTactic.actions.map((act, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                  <span className="font-bold text-amber-700">•</span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Facing Cover Script & Vendor Script */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guest Cover */}
            <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                  <span>Guest-Facing Cover Script</span>
                </span>
                <button
                  onClick={() => copyScript(solution.guestExperienceCover)}
                  className="text-xs text-amber-900 hover:text-amber-800 flex items-center gap-1 font-semibold"
                >
                  {copiedScript ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedScript ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 bg-stone-50 p-3 rounded-lg border border-stone-200/60 italic leading-relaxed">
                "{solution.guestExperienceCover}"
              </p>
              <p className="text-[11px] text-stone-500">
                Deliver this with relaxed confidence; guests will feel treated rather than delayed.
              </p>
            </div>

            {/* Vendor Negotiation Script */}
            <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                <span>Vendor Negotiation & Backup Resource</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-800 bg-stone-50 p-3 rounded-lg border border-stone-200/60 leading-relaxed">
                {solution.vendorNegotiationOrBackup}
              </p>
              <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200/60">
                <strong>Secret Trade Tip:</strong> {solution.proTip}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
