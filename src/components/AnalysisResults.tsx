import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Bell,
  Download,
} from 'lucide-react';
import { TargetProfile, ThemeColor, Language, FollowEvent } from '../types';
import { themes } from '../utils/theme';
import { translations } from '../utils/translations';

interface AnalysisResultsProps {
  profile: TargetProfile;
  currentTheme: ThemeColor;
  language: Language;
  onReset: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  profile,
  currentTheme,
  language,
  onReset,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'girls' | 'guys'>('all');
  const [activeTab, setActiveTab] = useState<'timeline' | 'admirers' | 'unfollows' | 'heatmap'>('timeline');
  const [simulatedAlertSent, setSimulatedAlertSent] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<FollowEvent | null>(null);

  const t = translations[language];
  const activeTheme = themes[currentTheme];
  const REDIRECT_URL = 'https://appcomplete.org/cl/i/n6en9v';

  const handleUnlock = () => {
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = REDIRECT_URL;
      } else {
        window.location.href = REDIRECT_URL;
      }
    } catch {
      window.location.href = REDIRECT_URL;
    }
  };

  const handleTriggerSimulatedAlert = () => {
    setSimulatedAlertSent(true);
    setTimeout(() => setSimulatedAlertSent(false), 5000);
  };

  const filteredFollows = profile.recentFollows.filter((f) => {
    if (selectedFilter === 'girls') return f.gender === 'girl';
    if (selectedFilter === 'guys') return f.gender === 'guy';
    return true;
  });

  return (
    <section id="results" className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Simulated Live Alert Banner if triggered */}
      {simulatedAlertSent && (
        <div className="mb-6 p-4 rounded-xl bg-violet-950/80 border border-violet-500/50 shadow-lg text-white flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-white animate-spin" />
            </div>
            <div>
              <p className="text-sm font-bold">
                {language === 'fr' ? '🔔 TracePulse Alerte (Simulée)' : '🔔 TracePulse Live Alert (Simulated)'}
              </p>
              <p className="text-xs text-slate-300">
                {language === 'fr'
                  ? `@${profile.username} vient de follow @${profile.recentFollows[0].targetUsername} (il y a 2 min) !`
                  : `@${profile.username} just followed @${profile.recentFollows[0].targetUsername} (2m ago)!`}
              </p>
            </div>
          </div>
          <span className="text-xs text-violet-300 font-semibold uppercase">
            {language === 'fr' ? 'Reçue sur Push' : 'Push Notification'}
          </span>
        </div>
      )}

      {!isUnlocked ? (
        /* TEASER / PAYWALL CARD VIEW (Original dark theme design) */
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-white flex items-center justify-center gap-2">
              {t.resultsTitle}
            </h2>
            <p className="text-slate-400 font-medium text-base mt-2">
              {language === 'fr' ? (
                <>Follows récents de <span className="text-white font-bold">@{profile.username}</span></>
              ) : (
                <><span className="text-white font-bold">@{profile.username}</span>'s recent follows</>
              )}
            </p>
          </div>

          {/* Card 1: Girls Card */}
          <a
            href={REDIRECT_URL}
            target="_top"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleUnlock();
            }}
            className="block group relative cursor-pointer overflow-hidden rounded-3xl p-5 mb-4 bg-gradient-to-r from-pink-500/20 via-rose-500/15 to-purple-600/20 border-2 border-pink-500/40 hover:border-pink-400 transition-all duration-300 shadow-xl shadow-pink-950/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  👩
                </div>
                <div>
                  <span className="text-2xl font-black text-white tracking-tight">
                    {profile.genderBreakdown.girlsCount} {t.girlsLabel}
                  </span>
                  <p className="text-xs text-pink-300/80 font-medium">
                    {language === 'fr' ? 'Détectées ces dernières 48h' : 'Detected in last 48h'}
                  </p>
                </div>
              </div>

              {/* Blurred Overlapping Profile Circles */}
              <div className="flex items-center -space-x-3">
                {profile.recentFollows
                  .filter((f) => f.gender === 'girl')
                  .slice(0, 3)
                  .map((girl, idx) => (
                    <div
                      key={idx}
                      className="relative w-11 h-11 rounded-full border-2 border-slate-900 overflow-hidden shadow-md"
                    >
                      <img
                        src={girl.avatarUrl}
                        alt="blurred target"
                        className="w-full h-full object-cover filter blur-[6px] scale-125"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </a>

          {/* Card 2: Guys Card */}
          <a
            href={REDIRECT_URL}
            target="_top"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleUnlock();
            }}
            className="block group relative cursor-pointer overflow-hidden rounded-3xl p-5 mb-8 bg-gradient-to-r from-sky-500/20 via-blue-500/15 to-indigo-600/20 border-2 border-blue-500/40 hover:border-blue-400 transition-all duration-300 shadow-xl shadow-blue-950/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  👨
                </div>
                <div>
                  <span className="text-2xl font-black text-white tracking-tight">
                    {profile.genderBreakdown.guysCount} {t.guysLabel}
                  </span>
                  <p className="text-xs text-sky-300/80 font-medium">
                    {language === 'fr' ? 'Nouveaux contacts et amis' : 'New contacts & friends'}
                  </p>
                </div>
              </div>

              {/* Blurred Overlapping Profile Circles + Counter Badge */}
              <div className="flex items-center -space-x-3">
                {profile.recentFollows
                  .filter((f) => f.gender === 'guy')
                  .slice(0, 3)
                  .map((guy, idx) => (
                    <div
                      key={idx}
                      className="relative w-11 h-11 rounded-full border-2 border-slate-900 overflow-hidden shadow-md"
                    >
                      <img
                        src={guy.avatarUrl}
                        alt="blurred target"
                        className="w-full h-full object-cover filter blur-[6px] scale-125"
                      />
                    </div>
                  ))}
                <div className="relative w-11 h-11 rounded-full border-2 border-slate-900 bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  +{profile.genderBreakdown.guysCount - 3}
                </div>
              </div>
            </div>
          </a>

          {/* Bullet Points with Checkmarks */}
          <div className="space-y-3.5 mb-8 px-2">
            {[t.bullet1, t.bullet2, t.bullet3, t.bullet4].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-200">
                <div className="w-5 h-5 rounded-full bg-pink-500/20 border border-pink-500/60 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 stroke-[2.5]" />
                </div>
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* Big Unlock Button */}
          <a
            href={REDIRECT_URL}
            target="_top"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleUnlock();
            }}
            className={`w-full py-4 rounded-full font-black text-lg sm:text-xl tracking-wide uppercase transition-all transform hover:scale-[1.02] active:scale-98 shadow-2xl flex items-center justify-center gap-2 cursor-pointer ${activeTheme.primaryButton}`}
          >
            <span>{t.unlockButton}</span>
          </a>

          {/* Subtext info */}
          <p className="text-center text-xs text-slate-500 mt-4">
            🔒 {language === 'fr' ? 'Chiffrement 256-bit SSL · Garantie anonyme · Zéro trace' : '256-bit SSL Encrypted · 100% Anonymous'}
          </p>
        </div>
      ) : (
        /* FULL UNLOCKED FORENSIC DASHBOARD */
        <div className="space-y-8 animate-fade-in text-white">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.unlockedDashboardTitle}</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                @{profile.username} — {language === 'fr' ? 'Toutes les données révélées' : 'All Data Revealed'}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {profile.recentFollows.length} {language === 'fr' ? 'nouveaux follows identifiés avec horodatage certifié' : 'new follows identified with verified timestamps'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleTriggerSimulatedAlert}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{t.simulateAlert}</span>
              </button>
              <button
                onClick={() => alert(language === 'fr' ? 'Rapport PDF généré !' : 'PDF Report generated and downloaded!')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.exportPdf}</span>
              </button>
            </div>
          </div>

          {/* Forensic Stat Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                {language === 'fr' ? 'Score de Risque' : 'Suspicion Index'}
              </span>
              <div className="text-2xl font-black text-amber-400 mt-1 flex items-center gap-1.5">
                <span>{profile.riskScore}%</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  {language === 'fr' ? 'Élevé' : 'High'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                {language === 'fr' ? 'Nouveaux Follows (7j)' : 'New Follows (7d)'}
              </span>
              <div className="text-2xl font-black text-white mt-1">
                +{profile.recentFollows.length}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                {language === 'fr' ? 'Ratio Filles / Mecs' : 'Girls / Guys Ratio'}
              </span>
              <div className="text-2xl font-black text-pink-400 mt-1">
                {profile.genderBreakdown.girlsCount} <span className="text-sm text-slate-400 font-normal">vs</span> {profile.genderBreakdown.guysCount}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                {language === 'fr' ? 'Admirateurs Secrets' : 'Secret Lurkers'}
              </span>
              <div className="text-2xl font-black text-violet-400 mt-1">
                {profile.secretAdmirers.length} {language === 'fr' ? 'comptes' : 'users'}
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📅 {t.timelineTab} ({profile.recentFollows.length})
            </button>
            <button
              onClick={() => setActiveTab('admirers')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'admirers'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👀 {t.admirersTab} ({profile.secretAdmirers.length})
            </button>
            <button
              onClick={() => setActiveTab('unfollows')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'unfollows'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ❌ {t.unfollowsTab} ({profile.unfollows.length})
            </button>
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'heatmap'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌙 {t.heatmapTab}
            </button>
          </div>

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{language === 'fr' ? 'Affichage par catégorie :' : 'Filter follows:'}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      selectedFilter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {language === 'fr' ? 'Tous' : 'All'} ({profile.recentFollows.length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('girls')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      selectedFilter === 'girls' ? 'bg-pink-600 text-white' : 'text-pink-300 hover:text-white'
                    }`}
                  >
                    👩 {profile.genderBreakdown.girlsCount} {t.girlsLabel}
                  </button>
                  <button
                    onClick={() => setSelectedFilter('guys')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      selectedFilter === 'guys' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'
                    }`}
                  >
                    👨 {profile.genderBreakdown.guysCount} {t.guysLabel}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredFollows.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAccount(item)}
                    className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatarUrl}
                        alt={item.targetUsername}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-violet-500 transition-all"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">
                            @{item.targetUsername}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              item.gender === 'girl'
                                ? 'bg-pink-500/20 text-pink-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {item.gender === 'girl' ? (language === 'fr' ? 'Fille' : 'Girl') : (language === 'fr' ? 'Mec' : 'Guy')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{item.targetFullName}</p>
                        <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{item.timestamp}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-slate-400 block">
                        {item.mutualsCount} {language === 'fr' ? 'amis communs' : 'mutuals'}
                      </span>
                      <span className="text-xs text-violet-400 font-semibold group-hover:underline">
                        {language === 'fr' ? 'Détails →' : 'Details →'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Account Detail Modal */}
          {selectedAccount && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-700 text-white shadow-2xl relative">
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedAccount.avatarUrl}
                    alt={selectedAccount.targetUsername}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-violet-500"
                  />
                  <div>
                    <h4 className="text-lg font-bold">@{selectedAccount.targetUsername}</h4>
                    <p className="text-xs text-slate-400">{selectedAccount.targetFullName}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-violet-900/60 text-violet-300 font-semibold mt-1 inline-block">
                      {selectedAccount.gender === 'girl' 
                        ? (language === 'fr' ? 'Profil Féminin' : 'Female Profile') 
                        : (language === 'fr' ? 'Profil Masculin' : 'Male Profile')}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 text-xs space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      {language === 'fr' ? 'Horodatage précis :' : 'Exact Timestamp:'}
                    </span>
                    <span className="font-semibold text-emerald-400">{selectedAccount.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      {language === 'fr' ? 'Amis en commun :' : 'Mutual Connections:'}
                    </span>
                    <span className="font-semibold">
                      {selectedAccount.mutualsCount} {language === 'fr' ? 'profils' : 'accounts'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      {language === 'fr' ? 'Follow en retour :' : 'Follows Back:'}
                    </span>
                    <span className="font-semibold">
                      {selectedAccount.isMutualFollow 
                        ? (language === 'fr' ? 'Oui (Réciproque)' : 'Yes (Mutual)') 
                        : (language === 'fr' ? 'Non (Unilatéral)' : 'No (Unilateral)')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAccount(null)}
                  className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold text-sm cursor-pointer"
                >
                  {language === 'fr' ? 'Fermer' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
