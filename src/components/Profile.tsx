import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Flame, Moon, Droplet, Check, ShieldCheck, RefreshCw, UserCheck, Download, Smartphone, Laptop, Share2, HelpCircle, Info, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  saveProfile: (newProfile: UserProfile) => void;
  onResetData: () => void;
  isInstallable?: boolean;
  isStandalone?: boolean;
  onInstall?: () => void;
}

export default function Profile({ 
  profile, 
  saveProfile, 
  onResetData,
  isInstallable = false,
  isStandalone = false,
  onInstall
}: ProfileProps) {
  const [name, setName] = useState(profile.name);
  const [calorieGoal, setCalorieGoal] = useState(profile.calorieGoal);
  const [sleepGoal, setSleepGoal] = useState(profile.sleepGoal);
  const [hydrationGoal, setHydrationGoal] = useState(profile.hydrationGoal);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Avatar presets for quick changing or user preferences
  const AVATAR_PRESETS = [
    {
      name: 'Sarah (Default)',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_t4i-gQhWV503GiGzrNEREnzrWK0TjpI3dYbgsm3_GsyaaGiFDHPp6yv4h_C7H_bi-pwT9HEWNZnS95s4I0_vtHts3KAPU56WXUwlocq5fJa7y_kcBTWuVql-R6_3lTKoYrjVpUyzInINo_byiAb4sQVy_ssEPOqVe8ZmcjmRqdBDMeEce1NigC5uG5cCGZab4xk5TqaOz4FMH9w1U-jvoSb6tUMgt-LzsUOwQ57fEsV-Ozj7RL3jhe8HrIZV5i0txhaxtENAORk'
    },
    {
      name: 'Michael',
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      name: 'Elena',
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile({
      name,
      avatarUrl,
      calorieGoal: Number(calorieGoal),
      sleepGoal: Number(sleepGoal),
      hydrationGoal: Number(hydrationGoal)
    });
    
    // Provide tactile toast feedback
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 3000);
  };

  return (
    <div className="w-full pb-28">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 flex items-center justify-between px-6 py-4.5 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h1 className="text-sm font-bold uppercase tracking-widest text-slate-800 mx-auto">Configure Profile</h1>
      </header>

      {/* Main Container */}
      <div className="px-5 pt-16 max-w-md mx-auto">
        
        {/* User Badge Header */}
        <div className="flex flex-col items-center text-center my-6 space-y-2">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.05)] bg-[#f8fafc]">
              <img 
                alt="Profile Avatar Large" 
                className="w-full h-full object-cover" 
                src={avatarUrl}
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md text-xs border-2 border-white flex items-center justify-center">
              <User className="w-3 h-3" />
            </span>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center justify-center gap-1.5 leading-none">
              {profile.name}
              <UserCheck className="w-4 h-4 text-primary" />
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Premium Member</p>
          </div>
        </div>

        {/* Save Confirmation Toast pop-up */}
        <AnimatePresence>
          {showSavedToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-4 bg-emerald-600 text-white rounded-xl p-3.5 flex items-center gap-2.5 shadow-lg border border-emerald-500 overflow-hidden"
            >
              <ShieldCheck className="w-4.5 h-4.5 fill-current text-white/90" />
              <div className="text-xs font-semibold">
                Success! Vitality settings saved to browser cache.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Configuration Form */}
        <form onSubmit={handleFormSubmit} className="space-y-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-2">Metrics Settings</h3>

          {/* User Name input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Name</label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-500 focus:ring-1 focus:ring-slate-300 focus:outline-none rounded-xl font-medium text-sm text-slate-800"
            />
          </div>

          {/* Avatar Option Selectors */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Choose Avatar Profile</label>
            <div className="flex gap-2.5">
              {AVATAR_PRESETS.map((p) => {
                const selected = avatarUrl === p.url;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setAvatarUrl(p.url)}
                    className={`flex-1 flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer ${
                      selected 
                        ? 'border-primary bg-indigo-50/40 text-primary font-bold shadow-sm' 
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <img 
                      src={p.url} 
                      alt={p.name} 
                      className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-bold mt-1.5">{p.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calorie burn goal slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 text-[10px]">
                <Flame className="w-3.5 h-3.5 text-primary fill-current" />
                Active Burn Goal
              </span>
              <span className="font-extrabold text-slate-800">{calorieGoal} kcal</span>
            </div>
            <input 
              type="range"
              min="1000"
              max="4000"
              step="50"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold px-0.5">
              <span>1,000 kcal</span>
              <span>4,000 kcal</span>
            </div>
          </div>

          {/* Sleep duration goal slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 text-[10px]">
                <Moon className="w-3.5 h-3.5 text-primary fill-current" />
                Nightly Sleep target
              </span>
              <span className="font-extrabold text-slate-800">{sleepGoal} hours</span>
            </div>
            <input 
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={sleepGoal}
              onChange={(e) => setSleepGoal(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold px-0.5">
              <span>4 hrs</span>
              <span>12 hrs</span>
            </div>
          </div>

          {/* Daily hydration goal slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 text-[10px]">
                <Droplet className="w-3.5 h-3.5 text-primary fill-current" />
                Hydration target
              </span>
              <span className="font-extrabold text-slate-800">{hydrationGoal} glasses</span>
            </div>
            <input 
              type="range"
              min="4"
              max="16"
              step="1"
              value={hydrationGoal}
              onChange={(e) => setHydrationGoal(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold px-0.5">
              <span>4 glasses</span>
              <span>16 glasses</span>
            </div>
          </div>

          {/* Action button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm text-sm"
          >
            <Check className="w-4 h-4" />
            Apply Changes
          </button>
        </form>

        {/* PWA Installation Section */}
        <section className="mt-5 p-5 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-850">Jadikan Aplikasi Standalone</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bukan Sekadar Website</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Pasang <strong>WellnessPro</strong> langsung ke HP atau Laptop Anda. Aplikasi akan memiliki ikon sendiri di layar utama, berjalan mandiri tanpa browser bar, dan dapat dibuka dengan sangat cepat bahkan saat keadaan offline.
          </p>

          {isStandalone ? (
            <div className="flex items-center gap-2.5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <div className="text-xs font-semibold">
                WellnessPro sudah berjalan sebagai Aplikasi Resmi!
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {isInstallable && onInstall ? (
                <button
                  type="button"
                  onClick={onInstall}
                  className="w-full py-2.5 px-4 bg-primary hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 text-xs active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Pasang Sekarang (Instal)
                </button>
              ) : (
                <div className="text-xs bg-slate-50 border border-slate-100 p-3 rounded-lg text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <Info className="w-3.5 h-3.5 text-primary" />
                    Bagaimana cara memasangnya?
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Jika tombol pasang tidak muncul, peranti Anda dapat memasangnya secara manual dengan cara berikut:
                  </p>
                </div>
              )}

              {/* Step-by-step instructions */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {/* iOS Instructions */}
                <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-start gap-2.5 shadow-sm">
                  <Smartphone className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-800">Pengguna iPhone & iPad (Safari):</p>
                    <ol className="text-[10px] text-slate-500 list-decimal pl-4 space-y-0.5 font-semibold">
                      <li>Ketuk tombol <strong className="text-primary font-bold">Bagikan (Share)</strong> <Share2 className="w-3 h-3 inline-block align-text-bottom text-primary" /> di Safari.</li>
                      <li>Scroll ke bawah dan ketuk <strong className="text-primary font-bold">"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>.</li>
                      <li>Selesai! Buka WellnessPro langsung dari homescreen Anda.</li>
                    </ol>
                  </div>
                </div>

                {/* Android Instructions */}
                <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-start gap-2.5 shadow-sm">
                  <Smartphone className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-800">Pengguna Android (Chrome):</p>
                    <ol className="text-[10px] text-slate-500 list-decimal pl-4 space-y-0.5 font-semibold">
                      <li>Ketuk tombol <strong className="text-primary">menu titik tiga (⋮)</strong> di kanan atas Chrome.</li>
                      <li>Pilih menu <strong className="text-primary">"Instal aplikasi"</strong> atau <strong className="text-primary">"Tambahkan ke Layar Utama"</strong>.</li>
                    </ol>
                  </div>
                </div>

                {/* Desktop Instructions */}
                <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-start gap-2.5 shadow-sm">
                  <Laptop className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-800">Pengguna PC & Mac (Chrome/Edge):</p>
                    <ol className="text-[10px] text-slate-500 list-decimal pl-4 space-y-0.5 font-semibold">
                      <li>Klik ikon <strong className="text-primary">Monitor Kecil (+ / Install)</strong> di ujung kanan kolom alamat browser Anda.</li>
                      <li>Tekan <strong className="text-primary">Install / Pasang</strong> saat konfirmasi muncul.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Seed & Utility Reset panel */}
        <section className="mt-5 mb-4">
          <div className="bg-rose-50 border border-rose-200/65 rounded-2xl p-4 space-y-3 shadow-sm">
            <div>
              <h4 className="text-[10px] font-extrabold text-rose-800 uppercase tracking-widest">Advanced Actions</h4>
              <p className="text-[11px] text-rose-700/80 font-semibold mt-0.5">
                Clear all custom database additions and reset back to WellnessPro launch template files.
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all goals and active progress values back to Sarah\'s initial 1,840 kcal start metrics?')) {
                  onResetData();
                }
              }}
              className="py-2.5 px-4 bg-white hover:bg-rose-100 text-rose-600 text-[11px] font-extrabold uppercase rounded-xl border border-rose-200 shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset App Data Cache
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
