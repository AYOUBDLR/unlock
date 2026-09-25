import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsAndHowItWorks } from './components/StatsAndHowItWorks';
import { LiveScannerModal } from './components/LiveScannerModal';
import { AnalysisResults } from './components/AnalysisResults';
import { Footer } from './components/Footer';
import { ThemeColor, Language, TargetProfile } from './types';
import { generateMockProfile } from './utils/mockProfiles';
import { themes } from './utils/theme';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>('violet');
  const [language, setLanguage] = useState<Language>('en');
  const [isScanning, setIsScanning] = useState(false);
  const [scanningUsername, setScanningUsername] = useState('my_partner');
  const [activeProfile, setActiveProfile] = useState<TargetProfile | null>(null);

  // Check URL params on initial mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const targetParam = params.get('target');
      const themeParam = params.get('theme') as ThemeColor;
      const langParam = params.get('lang') as Language;

      if (themeParam && themes[themeParam]) {
        setCurrentTheme(themeParam);
      }
      if (langParam === 'en' || langParam === 'fr') {
        setLanguage(langParam);
      }
      if (targetParam) {
        setScanningUsername(targetParam);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleStartSearch = (username: string) => {
    setScanningUsername(username);
    setIsScanning(true);
  };

  const handleScanComplete = () => {
    const profile = generateMockProfile(scanningUsername, language);
    setActiveProfile(profile);
    setIsScanning(false);

    // Smooth scroll to results
    setTimeout(() => {
      const resultsEl = document.getElementById('results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleReset = () => {
    setActiveProfile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeThemeConfig = themes[currentTheme];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-violet-500 selection:text-white`}>
      {/* Background radial gradient overlay */}
      <div
        className={`fixed inset-0 pointer-events-none bg-gradient-to-b ${activeThemeConfig.bgGradient} opacity-50 z-0`}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          currentTheme={currentTheme}
          setTheme={setCurrentTheme}
          language={language}
          setLanguage={setLanguage}
        />

        <main className="flex-1">
          {/* Hero Section matching Screenshot 1 */}
          <HeroSection
            currentTheme={currentTheme}
            language={language}
            onSearch={handleStartSearch}
            isLoading={isScanning}
          />

          {/* If analysis is ready, show Results Screen matching Screenshot 4 */}
          {activeProfile && (
            <AnalysisResults
              profile={activeProfile}
              currentTheme={currentTheme}
              language={language}
              onReset={handleReset}
            />
          )}

          {/* Social proof stats & How it works matching Screenshot 2 */}
          <StatsAndHowItWorks
            currentTheme={currentTheme}
            language={language}
          />
        </main>

        {/* Footer */}
        <Footer
          currentTheme={currentTheme}
          language={language}
        />
      </div>

      {/* Live Scanner Modal matching Screenshot 3 */}
      {isScanning && (
        <LiveScannerModal
          username={scanningUsername}
          currentTheme={currentTheme}
          language={language}
          onComplete={handleScanComplete}
          onClose={() => setIsScanning(false)}
        />
      )}
    </div>
  );
}
