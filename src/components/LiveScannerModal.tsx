import React, { useEffect, useState } from 'react';
import { Wifi, Search, User, Shield, Check } from 'lucide-react';
import { ThemeColor, Language } from '../types';
import { translations } from '../utils/translations';
import { themes } from '../utils/theme';

interface LiveScannerModalProps {
  username: string;
  currentTheme: ThemeColor;
  language: Language;
  onComplete: () => void;
  onClose?: () => void;
}

export const LiveScannerModal: React.FC<LiveScannerModalProps> = ({
  username,
  currentTheme,
  language,
  onComplete,
}) => {
  const [progress, setProgress] = useState(15);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const t = translations[language];
  const activeTheme = themes[currentTheme] || themes.violet;

  const steps = [
    {
      id: 0,
      icon: Wifi,
      title: t.scanStep1,
    },
    {
      id: 1,
      icon: Search,
      title: t.scanStep2,
    },
    {
      id: 2,
      icon: null, // Animated spinner ring
      title: t.scanStep3,
    },
    {
      id: 3,
      icon: User,
      title: t.scanStep4,
    },
    {
      id: 4,
      icon: Shield,
      title: t.scanStep5,
    },
  ];

  // Animated progression
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        const increment = Math.floor(Math.random() * 7) + 3;
        const nextVal = Math.min(100, prev + increment);

        // Update step index based on progress
        if (nextVal >= 88) setCurrentStepIndex(4);
        else if (nextVal >= 68) setCurrentStepIndex(3);
        else if (nextVal >= 42) setCurrentStepIndex(2);
        else if (nextVal >= 20) setCurrentStepIndex(1);
        else setCurrentStepIndex(0);

        return nextVal;
      });
    }, 280);

    return () => {
      clearInterval(progressInterval);
    };
  }, [username, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-[390px] bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-800 text-white overflow-hidden">
        {/* Subtle ambient background glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header: Progression / Percentage */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
              {t.scanProgress}
            </span>
          </div>
          <span className="text-lg font-black text-white tracking-tight">
            {progress}%
          </span>
        </div>

        {/* Progress Bar with theme gradient fill */}
        <div className="w-full h-2 rounded-full bg-slate-800/90 border border-slate-700/60 overflow-hidden mb-3.5 p-0.5">
          <div
            className={`h-full transition-all duration-300 rounded-full ${activeTheme.progressFill}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Compact Step Cards */}
        <div className="space-y-2 relative z-10">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex || progress === 100;
            const isActive = idx === currentStepIndex && progress < 100;
            const Icon = step.icon;

            if (isCompleted) {
              // Completed Step (Mint / Emerald tinted card)
              return (
                <div
                  key={step.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      {Icon ? (
                        <Icon className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                      )}
                    </div>
                    <span className="font-semibold text-xs sm:text-[13px] text-white tracking-tight truncate">
                      {step.title}
                    </span>
                  </div>

                  {/* Emerald checkmark badge on right */}
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0 ml-2 shadow-sm">
                    <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                  </div>
                </div>
              );
            }

            if (isActive) {
              // Active Step (Highlighted with theme glow & spinner)
              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl ${activeTheme.activeBorder} shadow-md ring-1 ${activeTheme.glowRing} transition-all duration-300`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                      <div className="w-4 h-4 rounded-full border-2 border-slate-600 border-t-violet-400 animate-spin" />
                    </div>
                    <span className="font-bold text-xs sm:text-[13px] text-white tracking-tight truncate">
                      {step.title}
                    </span>
                  </div>

                  {/* Pulsing active badge */}
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-[10px] font-bold text-violet-300 ml-2 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
                    <span>Live</span>
                  </div>
                </div>
              );
            }

            // Pending Step (Sleek muted dark card)
            return (
              <div
                key={step.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 opacity-50 transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-800 flex items-center justify-center shrink-0">
                    {Icon && <Icon className="w-4 h-4 text-slate-500" />}
                  </div>
                  <span className="font-medium text-xs sm:text-[13px] text-slate-400 tracking-tight truncate">
                    {step.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
