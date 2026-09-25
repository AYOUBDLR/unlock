import React from 'react';
import { Search, Cpu, Bell, Check, ShieldCheck, Zap, Lock } from 'lucide-react';
import { ThemeColor, Language } from '../types';
import { themes } from '../utils/theme';
import { translations } from '../utils/translations';

interface StatsAndHowItWorksProps {
  currentTheme: ThemeColor;
  language: Language;
}

export const StatsAndHowItWorks: React.FC<StatsAndHowItWorksProps> = ({
  currentTheme,
  language,
}) => {
  const t = translations[language];
  const activeTheme = themes[currentTheme];

  const stats = [
    { value: '1.8M+', label: t.statAccounts },
    { value: '240K+', label: t.statReviews },
    { value: '4.8/5', label: t.statRating, highlight: true },
    { value: '65+', label: t.statCountries },
  ];

  const steps = [
    {
      step: '01',
      icon: Search,
      title: t.step1Title,
      desc: t.step1Desc,
    },
    {
      step: '02',
      icon: Cpu,
      title: t.step2Title,
      desc: t.step2Desc,
    },
    {
      step: '03',
      icon: Bell,
      title: t.step3Title,
      desc: t.step3Desc,
    },
  ];

  return (
    <div className="w-full">
      {/* Social Proof Stats Bar (Screenshot 2) */}
      <section className="border-y border-slate-800/90 bg-slate-900/60 backdrop-blur-md py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-0.5">
                  {stat.value.split('/')[0]}
                  {stat.value.includes('/') && (
                    <span className={activeTheme.accentText}>/5</span>
                  )}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section (Screenshot 2) */}
      <section id="how-it-works" className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className={`h-0.5 w-6 ${activeTheme.progressFill}`} />
            <span className={`text-xs font-bold tracking-widest uppercase ${activeTheme.accentText}`}>
              {t.howItWorksEyebrow}
            </span>
            <span className={`h-0.5 w-6 ${activeTheme.progressFill}`} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {t.howItWorksTitle}
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            {language === 'fr'
              ? 'Pas besoin de mot de passe, pas de trace, pas d’installation compliquée. Analyse immédiate via nos passerelles chiffrées.'
              : 'Zero password required, no trace left behind, no installation. Instant analysis via our encrypted gateways.'}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative group p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${activeTheme.accentText} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-700/80 group-hover:text-slate-500 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Check className={`w-3.5 h-3.5 ${activeTheme.accentText}`} />
                  <span>
                    {idx === 0
                      ? (language === 'fr' ? '100% sans connexion' : 'No login required')
                      : idx === 1
                      ? (language === 'fr' ? 'Proxy résidentiel indétectable' : 'Undetectable proxy network')
                      : (language === 'fr' ? 'Notifications temps réel' : 'Real-time notifications')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
