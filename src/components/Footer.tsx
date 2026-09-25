import React from 'react';
import { Activity, ShieldCheck, Lock } from 'lucide-react';
import { ThemeColor, Language } from '../types';
import { themes } from '../utils/theme';
import { translations } from '../utils/translations';

interface FooterProps {
  currentTheme: ThemeColor;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentTheme, language }) => {
  const t = translations[language];
  const activeTheme = themes[currentTheme];

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Activity className={`w-4 h-4 ${activeTheme.accentText}`} />
            </div>
            <div>
              <span className="font-bold text-white text-base">TracePulse</span>
              <p className="text-[11px] text-slate-500">
                {language === 'fr' ? 'Technologie d’analyse d’activités publiques' : 'Public activity detection technology'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400 text-xs">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'fr' ? 'Audit Sécurité 2026' : 'Security Audited 2026'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-violet-400" />
              <span>{language === 'fr' ? 'Zéro Données Privées Stockées' : 'No Private Data Stored'}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 TracePulse Inc. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <p className="max-w-lg text-center sm:text-right">
            {language === 'fr'
              ? 'Avertissement : TracePulse n’est affilié ni sponsorisé par Meta ou Instagram. Ce service utilise des indexations publiques à des fins d’analyse.'
              : 'Disclaimer: TracePulse is not affiliated with or endorsed by Meta or Instagram. All metrics are calculated from publicly queryable graphs.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
