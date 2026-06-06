/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { DEFAULT_PROFILE, DEFAULT_LOGS } from './initialData';
import { UserProfile, DayLog } from './types';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stats' | 'profile'>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [logs, setLogs] = useState<DayLog[]>(DEFAULT_LOGS);

  // Splash & Onboarding states
  const [showSplash, setShowSplash] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  // PWA installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // Load from local storage on component mount & listen for PWA install prompt
  useEffect(() => {
    const cachedProfile = localStorage.getItem('wellnesspro_profile');
    const cachedLogs = localStorage.getItem('wellnesspro_logs');
    const cachedOnboarded = localStorage.getItem('wellnesspro_onboarded') === 'true';

    setHasOnboarded(cachedOnboarded);

    if (cachedProfile) {
      try {
        setProfile(JSON.parse(cachedProfile));
      } catch (err) {
        console.error('Failed to parse cached profile', err);
      }
    }

    if (cachedLogs) {
      try {
        setLogs(JSON.parse(cachedLogs));
      } catch (err) {
        console.error('Failed to parse cached logs', err);
      }
    }

    // Check if running as standalone PWA
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    setIsStandalone(!!checkStandalone);

    // Listen for PWA install event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Trigger PWA installation dialog
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsStandalone(true);
    }
  };

  // Sync profile edits
  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('wellnesspro_profile', JSON.stringify(newProfile));
  };

  // Target today log (the last entry in the seed array: '2026-06-06')
  const getTodayLog = (): DayLog => {
    const todayStr = '2026-06-06';
    const log = logs.find(l => l.date === todayStr);
    return log || logs[logs.length - 1];
  };

  const updateTodayLog = (fields: Partial<DayLog>) => {
    const todayStr = '2026-06-06';
    const updatedLogs = logs.map(l => {
      if (l.date === todayStr) {
        return { ...l, ...fields };
      }
      return l;
    });
    setLogs(updatedLogs);
    localStorage.setItem('wellnesspro_logs', JSON.stringify(updatedLogs));
  };

  // Total reset back to clean seed defaults
  const handleResetData = () => {
    localStorage.removeItem('wellnesspro_profile');
    localStorage.removeItem('wellnesspro_logs');
    localStorage.removeItem('wellnesspro_onboarded');
    setProfile(DEFAULT_PROFILE);
    setLogs(DEFAULT_LOGS);
    setHasOnboarded(false);
    setActiveTab('dashboard');
  };

  const todayLog = getTodayLog();

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#1a1c1c] font-sans antialiased selection:bg-primary/10">
      {/* Outer wrapper to center and emulate a professional preview boundary */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col relative shadow-md">
        
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : !hasOnboarded ? (
          <Onboarding 
            profile={profile} 
            saveProfile={saveProfile} 
            onComplete={() => {
              setHasOnboarded(true);
              localStorage.setItem('wellnesspro_onboarded', 'true');
            }} 
          />
        ) : (
          <>
            {/* Render Tab Views Dynamically */}
            <main className="flex-1 w-full bg-slate-50/40">
              {activeTab === 'dashboard' && (
                <Dashboard 
                  profile={profile} 
                  todayLog={todayLog} 
                  updateTodayLog={updateTodayLog}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'stats' && (
                <Stats 
                  profile={profile} 
                  logs={logs} 
                />
              )}

              {activeTab === 'profile' && (
                <Profile 
                  profile={profile} 
                  saveProfile={saveProfile}
                  onResetData={handleResetData}
                  isInstallable={isInstallable}
                  isStandalone={isStandalone}
                  onInstall={handleInstallClick}
                />
              )}
            </main>

            {/* Global Bottom Tab Bar Panel */}
            <Navigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </>
        )}
      </div>
    </div>
  );
}
