import React, { useState } from 'react';
import { Sparkles, AlertOctagon, Image as ImageIcon, Bookmark, Menu, X, Printer, Share2, Check } from 'lucide-react';

interface HeaderProps {
  activeTab: 'planner' | 'crisis' | 'inspiration' | 'saved';
  setActiveTab: (tab: 'planner' | 'crisis' | 'inspiration' | 'saved') => void;
  savedCount: number;
  hasPlan: boolean;
  onPrint?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  hasPlan,
  onPrint,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('planner');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-700 text-amber-50 flex items-center justify-center shadow-sm group-hover:bg-amber-800 transition-colors">
                <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                    Festiva
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                    AI Studio
                  </span>
                </div>
                <p className="text-xs text-stone-700 hidden sm:block font-medium">
                  Celebration & Event Architect
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200/60">
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'planner'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Blueprint Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('crisis')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'crisis'
                  ? 'bg-rose-50 text-rose-900 border border-rose-200 shadow-sm'
                  : 'text-stone-600 hover:text-rose-900'
              }`}
            >
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Crisis Doctor</span>
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            </button>

            <button
              onClick={() => setActiveTab('inspiration')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'inspiration'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-700" />
              <span>Inspirations</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'saved'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-700" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="text-xs px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 font-semibold">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {hasPlan && onPrint && (
              <button
                onClick={onPrint}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors shadow-2xs"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-100/80 border border-amber-200/80 rounded-lg hover:bg-amber-100 transition-colors shadow-2xs"
              title="Share event link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-stone-100 text-stone-700"
              aria-label="Share"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF7F2] px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => {
              setActiveTab('planner');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium ${
              activeTab === 'planner'
                ? 'bg-amber-100/70 text-amber-950 font-semibold'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <span>Blueprint Studio</span>
            </div>
            <span className="text-xs text-stone-500 font-normal">Plan Celebration</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('crisis');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium ${
              activeTab === 'crisis'
                ? 'bg-rose-100 text-rose-950 font-semibold'
                : 'text-stone-700 hover:bg-rose-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <span>Crisis Doctor</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-rose-200 text-rose-800 font-semibold">
              Emergency Fix
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('inspiration');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium ${
              activeTab === 'inspiration'
                ? 'bg-amber-100/70 text-amber-950 font-semibold'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-amber-700" />
              <span>Inspirations & Themes</span>
            </div>
            <span className="text-xs text-stone-500 font-normal">Gallery</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('saved');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium ${
              activeTab === 'saved'
                ? 'bg-amber-100/70 text-amber-950 font-semibold'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-5 h-5 text-amber-700" />
              <span>Saved Events</span>
            </div>
            {savedCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {hasPlan && onPrint && (
            <div className="pt-2">
              <button
                onClick={() => {
                  onPrint();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-stone-900 text-stone-100 text-sm font-semibold"
              >
                <Printer className="w-4 h-4" />
                <span>Print or Save Plan (PDF)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
