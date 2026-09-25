import { ThemeColor } from '../types';

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  badge: string;
  bgGradient: string;
  heroGlow: string;
  primaryButton: string;
  searchBtn: string;
  pillBorder: string;
  cardGirls: string;
  cardGuys: string;
  accentText: string;
  progressFill: string;
  activeBorder: string;
  glowRing: string;
}

export const themes: Record<ThemeColor, ThemeConfig> = {
  violet: {
    id: 'violet',
    name: 'Electric Violet (New Vibe)',
    badge: 'Violet & Indigo',
    bgGradient: 'from-violet-950/40 via-slate-950 to-slate-950',
    heroGlow: 'bg-violet-600/20',
    primaryButton: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25',
    searchBtn: 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/30',
    pillBorder: 'border-violet-500/30 focus-within:border-violet-400',
    cardGirls: 'bg-gradient-to-r from-pink-500/25 via-rose-500/20 to-purple-600/25 border-pink-500/40 text-pink-100',
    cardGuys: 'bg-gradient-to-r from-indigo-500/25 via-blue-500/20 to-cyan-500/25 border-indigo-500/40 text-indigo-100',
    accentText: 'text-violet-400',
    progressFill: 'bg-gradient-to-r from-violet-500 to-indigo-500',
    activeBorder: 'border-violet-500/50 bg-violet-950/20',
    glowRing: 'ring-violet-500/40',
  },
  emerald: {
    id: 'emerald',
    name: 'Cyber Mint & Jade',
    badge: 'Stealth Emerald',
    bgGradient: 'from-emerald-950/40 via-slate-950 to-slate-950',
    heroGlow: 'bg-emerald-600/20',
    primaryButton: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25',
    searchBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30',
    pillBorder: 'border-emerald-500/30 focus-within:border-emerald-400',
    cardGirls: 'bg-gradient-to-r from-teal-500/25 via-emerald-500/20 to-cyan-600/25 border-teal-500/40 text-teal-100',
    cardGuys: 'bg-gradient-to-r from-emerald-600/25 via-blue-500/20 to-teal-500/25 border-emerald-500/40 text-emerald-100',
    accentText: 'text-emerald-400',
    progressFill: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    activeBorder: 'border-emerald-500/50 bg-emerald-950/20',
    glowRing: 'ring-emerald-500/40',
  },
  sapphire: {
    id: 'sapphire',
    name: 'Hyper Blue / Sapphire',
    badge: 'Ocean Azure',
    bgGradient: 'from-blue-950/40 via-slate-950 to-slate-950',
    heroGlow: 'bg-blue-600/20',
    primaryButton: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25',
    searchBtn: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30',
    pillBorder: 'border-blue-500/30 focus-within:border-blue-400',
    cardGirls: 'bg-gradient-to-r from-rose-500/25 via-pink-500/20 to-blue-600/25 border-rose-500/40 text-rose-100',
    cardGuys: 'bg-gradient-to-r from-blue-600/25 via-cyan-500/20 to-sky-500/25 border-blue-500/40 text-blue-100',
    accentText: 'text-blue-400',
    progressFill: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    activeBorder: 'border-blue-500/50 bg-blue-950/20',
    glowRing: 'ring-blue-500/40',
  },
  amber: {
    id: 'amber',
    name: 'Sunset Sunset Coral',
    badge: 'Solar Amber',
    bgGradient: 'from-amber-950/40 via-slate-950 to-slate-950',
    heroGlow: 'bg-amber-600/20',
    primaryButton: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-500/25',
    searchBtn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30',
    pillBorder: 'border-amber-500/30 focus-within:border-amber-400',
    cardGirls: 'bg-gradient-to-r from-rose-500/25 via-amber-500/20 to-orange-600/25 border-rose-500/40 text-rose-100',
    cardGuys: 'bg-gradient-to-r from-orange-600/25 via-amber-500/20 to-yellow-500/25 border-orange-500/40 text-amber-100',
    accentText: 'text-amber-400',
    progressFill: 'bg-gradient-to-r from-amber-500 to-orange-400',
    activeBorder: 'border-amber-500/50 bg-amber-950/20',
    glowRing: 'ring-amber-500/40',
  },
  slate: {
    id: 'slate',
    name: 'Midnight Monolith',
    badge: 'Stealth Noir',
    bgGradient: 'from-slate-900/60 via-slate-950 to-slate-950',
    heroGlow: 'bg-slate-700/20',
    primaryButton: 'bg-gradient-to-r from-slate-200 to-white hover:from-white hover:to-slate-100 text-slate-900 font-semibold shadow-lg shadow-white/10',
    searchBtn: 'bg-white hover:bg-slate-100 text-slate-900 font-semibold shadow-md',
    pillBorder: 'border-slate-700 focus-within:border-slate-400',
    cardGirls: 'bg-gradient-to-r from-pink-500/20 via-purple-500/15 to-slate-800 border-pink-500/30 text-slate-200',
    cardGuys: 'bg-gradient-to-r from-blue-500/20 via-slate-700/30 to-slate-800 border-blue-500/30 text-slate-200',
    accentText: 'text-slate-300',
    progressFill: 'bg-gradient-to-r from-slate-400 to-white',
    activeBorder: 'border-slate-500/50 bg-slate-900/40',
    glowRing: 'ring-slate-400/40',
  },
};
