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

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stats' | 'profile'>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [logs, setLogs] = useState<DayLog[]>(DEFAULT_LOGS);

  // Load from local storage on component mount
  useEffect(() => {
    const cachedProfile = localStorage.getItem('wellnesspro_profile');
    const cachedLogs = localStorage.getItem('wellnesspro_logs');

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
  }, []);

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
    setProfile(DEFAULT_PROFILE);
    setLogs(DEFAULT_LOGS);
    setActiveTab('dashboard');
  };

  const todayLog = getTodayLog();

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#1a1c1c] font-sans antialiased selection:bg-primary/10">
      {/* Outer wrapper to center and emulate a professional preview boundary */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col relative shadow-md">
        
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
            />
          )}
        </main>

        {/* Global Bottom Tab Bar Panel */}
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
    </div>
  );
}
