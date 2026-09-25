import React, { useState } from 'react';
import { Search, Instagram, CheckCircle2, Shield, Sparkles, ArrowRight, X } from 'lucide-react';
import { ThemeColor, Language } from '../types';
import { themes } from '../utils/theme';
import { translations } from '../utils/translations';

interface HeroSectionProps {
  currentTheme: ThemeColor;
  language: Language;
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  language,
  onSearch,
  isLoading,
}) => {
  const [username, setUsername] = useState(language === 'en' ? 'my_partner' : 'ton mec');
  const t = translations[language];
  const activeTheme = themes[currentTheme];

  const quickPicks = language === 'en' 
    ? ['my_partner', 'sophie.miller', 'david_fit', 'alex_creatives']
    : ['ton mec', 'clara_paris', 'lucas_dzn', 'emma.fitness'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || isLoading) return;
    onSearch(username.trim());
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Dynamic Background Glow matching the new theme color */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-40 transition-colors duration-700 ${activeTheme.heroGlow}`}
      />
      
      {/* Subtle grid backdrop */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Anti-Slop Quiet Top Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-6 backdrop-blur-sm shadow-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${activeTheme.accentText} bg-current animate-ping`} />
          <span className="font-semibold text-white">
            {language === 'fr' ? 'Nouveau Moteur de Détection v2.6' : 'New Detection Engine v2.6'}
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">
            {language === 'fr' ? 'Précision à la minute' : 'Minute-level accuracy'}
          </span>
        </div>

        {/* Hero Title (Screenshot 1: "Traque ses Nouveaux Follows & Followers 🤔") */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
          {language === 'fr' ? (
            <>
              Traque ses Nouveaux{' '}
              <span className={`bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400`}>
                Follows & Followers
              </span>{' '}
              <span className="inline-block transform hover:rotate-12 transition-transform cursor-default">
                🤔
              </span>
            </>
          ) : (
            <>
              Track Their New{' '}
              <span className={`bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400`}>
                Follows & Followers
              </span>{' '}
              <span className="inline-block transform hover:rotate-12 transition-transform cursor-default">
                🤔
              </span>
            </>
          )}
        </h1>

        {/* Hero Subtitle (Screenshot 1) */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300/90 leading-relaxed font-normal mb-10">
          {t.heroSubtitle}
        </p>

        {/* Search Input Bar (Screenshot 1) */}
        <div className="max-w-xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className={`relative flex items-center p-2 sm:p-2.5 rounded-full bg-white dark:bg-slate-900 border-2 ${activeTheme.pillBorder} shadow-2xl shadow-black/40 transition-all duration-300 focus-within:ring-4 ${activeTheme.glowRing}`}
          >
            {/* Instagram Camera Logo */}
            <div className="flex items-center pl-3 pr-2 text-pink-500">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[2px] flex items-center justify-center shadow-sm">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-pink-500" />
                </div>
              </div>
            </div>

            {/* @ Prefix */}
            <span className="text-slate-400 font-bold text-lg select-none pl-1">
              @
            </span>

            {/* Input field */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="flex-1 bg-transparent px-2 text-base sm:text-lg font-semibold text-slate-900 dark:text-white placeholder:text-slate-400/80 focus:outline-none"
              autoComplete="off"
              spellCheck="false"
            />

            {/* Clear Button */}
            {username && (
              <button
                type="button"
                onClick={() => setUsername('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mr-1"
                aria-label="Effacer le champ"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Submit Button (Screenshot 1: "Rechercher") */}
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className={`px-6 sm:px-8 py-3 rounded-full font-bold text-sm sm:text-base tracking-wide transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${activeTheme.searchBtn}`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{language === 'fr' ? 'Analyse...' : 'Scanning...'}</span>
                </div>
              ) : (
                <>
                  <span>{t.searchButton}</span>
                  <ArrowRight className="w-4 h-4 hidden sm:inline-block" />
                </>
              )}
            </button>
          </form>

          {/* Quick Examples Selection */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400 flex-wrap">
            <span className="text-slate-500">{t.quickPicks}</span>
            {quickPicks.map((pick) => (
              <button
                key={pick}
                type="button"
                onClick={() => {
                  setUsername(pick);
                  onSearch(pick);
                }}
                className="px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                @{pick}
              </button>
            ))}
          </div>

          {/* Trust Badges (Screenshot 1: "✔ Essaie maintenant. Aucune connexion Instagram requise.") */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-xs sm:text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">{t.tryNowBadge}</span>
            </div>
            <span className="hidden sm:inline text-slate-600">·</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{t.anonymousBadge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
