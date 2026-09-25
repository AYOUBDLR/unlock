import React from 'react';
import { Activity, Globe, Palette } from 'lucide-react';
import { ThemeColor, Language } from '../types';
import { themes } from '../utils/theme';
import { translations } from '../utils/translations';

interface NavbarProps {
  currentTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  setTheme,
  language,
  setLanguage,
}) => {
  const t = translations[language];
  const activeTheme = themes[currentTheme];

  const colorOptions: { id: ThemeColor; label: string; colorClass: string }[] = [
    { id: 'violet', label: language === 'en' ? 'Electric Violet (Default)' : 'Violet (Défaut)', colorClass: 'bg-violet-500' },
    { id: 'emerald', label: language === 'en' ? 'Emerald Mint' : 'Emerald Mint', colorClass: 'bg-emerald-500' },
    { id: 'sapphire', label: language === 'en' ? 'Sapphire Blue' : 'Sapphire Bleu', colorClass: 'bg-blue-500' },
    { id: 'amber', label: language === 'en' ? 'Sunset Coral' : 'Sunset Corail', colorClass: 'bg-amber-500' },
    { id: 'slate', label: language === 'en' ? 'Obsidian Noir' : 'Obsidian Noir', colorClass: 'bg-slate-300' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 shadow-inner group">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 opacity-20 group-hover:opacity-40 transition-opacity" />
            <Activity className={`w-5 h-5 ${activeTheme.accentText} animate-pulse`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
                {t.brandName}
                <span className={`inline-block w-2 h-2 rounded-full ${activeTheme.accentText} bg-current`} />
              </span>
              <span className="hidden md:inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                v2.6 Radar
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block -mt-0.5">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Live Counter & Navigation Items */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">
              <span className="font-bold text-white">1,842</span> {t.liveScans}
            </span>
          </div>

          <a href="#how-it-works" className="hover:text-white transition-colors">
            {t.navHowItWorks}
          </a>
        </div>

        {/* Theme and Language Controls */}
        <div className="flex items-center gap-3">
          {/* Color Switcher */}
          <div 
            className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800" 
            title={language === 'en' ? 'Change color theme' : 'Changer le thème de couleur'}
          >
            <Palette className="w-3.5 h-3.5 text-slate-400 ml-1 hidden sm:block" />
            {colorOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                title={opt.label}
                className={`w-5 h-5 rounded-full ${opt.colorClass} transition-transform ${
                  currentTheme === opt.id
                    ? 'scale-125 ring-2 ring-white shadow-sm'
                    : 'opacity-50 hover:opacity-100 hover:scale-110'
                }`}
                aria-label={opt.label}
              />
            ))}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title={language === 'en' ? 'Switch to French' : 'Changer en Anglais'}
          >
            <Globe className="w-3 h-3 text-slate-400" />
            <span>{language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
