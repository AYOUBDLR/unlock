import React, { useEffect, useState } from 'react';
import { Wifi, Search, User, Shield, Check, X } from 'lucide-react';
import { ThemeColor, Language } from '../types';
import { translations } from '../utils/translations';
import { themes } from '../utils/theme';

interface LiveScannerModalProps {
  username: string;
  currentTheme: ThemeColor;
  language: Language;
  onComplete: () => void;
  onClose: () => void;
}

export const LiveScannerModal: React.FC<LiveScannerModalProps> = ({
  username,
  currentTheme,
  language,
  onComplete,
  onClose,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-800 text-white overflow-hidden">
        {/* Subtle ambient background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Progression / Percentage */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold tracking-wide uppercase text-slate-400">
              {t.scanProgress}
            </span>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            {progress}%
          </span>
        </div>

        {/* Progress Bar with theme gradient fill */}
        <div className="w-full h-3 rounded-full bg-slate-800/90 border border-slate-700/60 overflow-hidden mb-6 p-0.5">
          <div
            className={`h-full transition-all duration-300 rounded-full ${activeTheme.progressFill}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Cards (matching layout from screenshot, styled in website dark aesthetic) */}
        <div className="space-y-3 relative z-10">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex || progress === 100;
            const isActive = idx === currentStepIndex && progress < 100;
            const Icon = step.icon;

            if (isCompleted) {
              // Completed Step (Mint / Emerald tinted card)
              return (
                <div
                  key={step.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      {Icon ? (
                        <Icon className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Check className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                      )}
                    </div>
                    <span className="font-bold text-sm sm:text-[15px] text-white tracking-tight">
                      {step.title}
                    </span>
                  </div>

                  {/* Emerald checkmark badge on right */}
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0 mr-1 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  </div>
                </div>
              );
            }

            if (isActive) {
              // Active Step (Highlighted with theme glow & spinner)
              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-between p-3.5 rounded-2xl ${activeTheme.activeBorder} shadow-lg ring-1 ${activeTheme.glowRing} transition-all duration-300`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-violet-400 animate-spin" />
                    </div>
                    <span className="font-extrabold text-sm sm:text-[15px] text-white tracking-tight">
                      {step.title}
                    </span>
                  </div>

                  {/* Pulsing active badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-[11px] font-bold text-violet-300">
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
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 opacity-55 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/60 border border-slate-800 flex items-center justify-center shrink-0">
                    {Icon && <Icon className="w-5 h-5 text-slate-500" />}
                  </div>
                  <span className="font-semibold text-sm sm:text-[15px] text-slate-400 tracking-tight">
                    {step.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer skip link */}
        <div className="mt-6 text-center">
          <button
            onClick={onComplete}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>{t.skipScanner}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
