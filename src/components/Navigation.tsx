import React from 'react';
import { LayoutDashboard, LineChart, User } from 'lucide-react';

interface NavigationProps {
  activeTab: 'dashboard' | 'stats' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'stats' | 'profile') => void;
  darkMode?: boolean;
}

export default function Navigation({ activeTab, setActiveTab, darkMode = false }: NavigationProps) {
  return (
    <nav className={`fixed bottom-0 left-0 right-0 py-3.5 flex justify-around items-center z-50 rounded-t-xl shadow-[0_-2px_8px_rgba(15,23,42,0.03)] max-w-md mx-auto transition-colors border-t ${
      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      {/* Tab: Dashboard */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center py-2 px-5 active:scale-95 transition-all cursor-pointer rounded-xl border ${
          activeTab === 'dashboard'
            ? darkMode
              ? 'bg-slate-800 text-white border-slate-700 font-bold shadow-[0_1px_2px_rgba(0,0,0,0.2)]'
              : 'bg-[#f8fafc] text-[#4f46e5] border-slate-200 font-bold shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
            : darkMode
              ? 'text-slate-400 hover:text-slate-200 border-transparent'
              : 'text-slate-500 hover:text-slate-900 border-transparent'
        }`}
        title="Dashboard"
        id="nav-tab-dashboard"
      >
        <LayoutDashboard className="w-[20px] h-[20px]" />
        <span className="text-[10px] uppercase font-bold tracking-wider mt-1">Dashboard</span>
      </button>

      {/* Tab: Stats */}
      <button
        onClick={() => setActiveTab('stats')}
        className={`flex flex-col items-center justify-center py-2 px-5 active:scale-95 transition-all cursor-pointer rounded-xl border ${
          activeTab === 'stats'
            ? darkMode
              ? 'bg-slate-800 text-white border-slate-700 font-bold shadow-[0_1px_2px_rgba(0,0,0,0.2)]'
              : 'bg-[#f8fafc] text-[#4f46e5] border-slate-200 font-bold shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
            : darkMode
              ? 'text-slate-400 hover:text-slate-200 border-transparent'
              : 'text-slate-500 hover:text-slate-900 border-transparent'
        }`}
        title="Stats Analytics"
        id="nav-tab-stats"
      >
        <LineChart className="w-[20px] h-[20px]" />
        <span className="text-[10px] uppercase font-bold tracking-wider mt-1">Stats</span>
      </button>

      {/* Tab: Profile */}
      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center justify-center py-2 px-5 active:scale-95 transition-all cursor-pointer rounded-xl border ${
          activeTab === 'profile'
            ? darkMode
              ? 'bg-slate-800 text-white border-slate-700 font-bold shadow-[0_1px_2px_rgba(0,0,0,0.2)]'
              : 'bg-[#f8fafc] text-[#4f46e5] border-slate-200 font-bold shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
            : darkMode
              ? 'text-slate-400 hover:text-slate-200 border-transparent'
              : 'text-slate-500 hover:text-slate-900 border-transparent'
        }`}
        title="Profile Config"
        id="nav-tab-profile"
      >
        <User className="w-[20px] h-[20px]" />
        <span className="text-[10px] uppercase font-bold tracking-wider mt-1">Profile</span>
      </button>
    </nav>
  );
}
