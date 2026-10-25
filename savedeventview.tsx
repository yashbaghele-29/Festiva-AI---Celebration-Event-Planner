import React from 'react';
import { Bookmark, Trash2, ArrowRight, Calendar, DollarSign, Users, Sparkles } from 'lucide-react';
import { EventPlan } from '../types';

interface SavedEventsViewProps {
  savedPlans: EventPlan[];
  onLoadPlan: (plan: EventPlan) => void;
  onDeletePlan: (title: string) => void;
  onNewCelebration: () => void;
}

export const SavedEventsView: React.FC<SavedEventsViewProps> = ({
  savedPlans,
  onLoadPlan,
  onDeletePlan,
  onNewCelebration,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Library</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Saved Celebration Blueprints
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Access your previously crafted celebration designs, budgets, and timelines.
          </p>
        </div>

        <button
          onClick={onNewCelebration}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm transition"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Architect New Event</span>
        </button>
      </div>

      {savedPlans.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
              No Saved Celebrations Yet
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              When you generate a celebration plan, click "Save Blueprint" to store it here for future reference or offline event management.
            </p>
          </div>
          <button
            onClick={onNewCelebration}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
          >
            <span>Start Your First Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedPlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs hover:border-amber-400 hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {plan.theme.dressCode}
                  </span>
                  <button
                    onClick={() => onDeletePlan(plan.theme.title)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="Delete blueprint"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 leading-snug">
                  {plan.theme.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {plan.theme.tagline}
                </p>
              </div>

              {/* Specs */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-1 font-mono font-bold text-stone-900">
                  <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                  <span>{plan.budget.currency}{plan.budget.totalEstimate.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{plan.timeline.length} Schedule Milestones</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onLoadPlan(plan)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition"
              >
                <span>Open Master Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
