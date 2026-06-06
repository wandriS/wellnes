import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Check, ShieldCheck, UserCheck, Upload, Trash2, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  saveProfile: (newProfile: UserProfile) => void;
  onResetData: () => void;
  isInstallable?: boolean;
  isStandalone?: boolean;
  onInstall?: () => void;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function Profile({ 
  profile, 
  saveProfile, 
  onResetData,
  isInstallable = false,
  isStandalone = false,
  onInstall,
  darkMode = false,
  toggleDarkMode
 }: ProfileProps) {
  const [name, setName] = useState(profile.name);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Nameless premium avatar presets with high resolution hand-picked images
  const AVATAR_PRESETS = [
    {
      id: 'avatar-p1',
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      id: 'avatar-p2',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      id: 'avatar-p3',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile({
      name,
      avatarUrl,
      calorieGoal: profile.calorieGoal, // Keep existing health targets unchanged in DB
      sleepGoal: profile.sleepGoal,     // Keep existing health targets unchanged in DB
      hydrationGoal: profile.hydrationGoal // Keep existing health targets unchanged in DB
    });
    
    // Provide tactile toast feedback
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 3000);
  };

  // Convert uploaded image from file explorer/gallery into Base64 string for localStorage
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran gambar terlalu besar. Batas maksimal adalah 2MB agar performa aplikasi tetap optimal.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full pb-28 min-h-screen transition-colors duration-205 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/20'}`}>
      {/* Top Bar Check */}
      <header className={`fixed top-0 left-0 right-0 border-b flex items-center justify-between px-6 py-4.5 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.02)] max-w-md mx-auto transition-colors duration-200 ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-805'
      }`}>
        <h1 className="text-sm font-bold uppercase tracking-widest mx-auto">Configure Profile</h1>
      </header>

      {/* Main Container */}
      <div className="px-5 pt-16 max-w-md mx-auto">
        
        {/* User Badge Header */}
        <div className="flex flex-col items-center text-center my-6 space-y-2 animate-fade-in">
          <div className="relative group">
            <div className={`w-24 h-24 rounded-full overflow-hidden border shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition-colors ${
              darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-[#f8fafc]'
            }`}>
              <img 
                alt="Profile Avatar Large" 
                className="w-full h-full object-cover" 
                src={avatarUrl}
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md text-xs border-2 border-white flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <h2 className={`text-base font-extrabold flex items-center justify-center gap-1.5 leading-none ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {name || 'User'}
              <UserCheck className="w-4 h-4 text-primary" />
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Premium Member</p>
          </div>
        </div>

        {/* Global Dark Mode Switch Toggle Component */}
        {toggleDarkMode && (
          <div className={`mb-5 p-4.5 rounded-2xl border shadow-sm flex items-center justify-between transition-colors duration-200 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-indigo-500/15 text-indigo-400' : 'bg-indigo-50 text-indigo-650'}`}>
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Gaya Gelap (Dark Mode)
                </h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider">
                  Ubah tampilan aplikasi
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleDarkMode}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer outline-none ${
                darkMode ? 'bg-primary' : 'bg-slate-200'
              }`}
            >
              <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                darkMode ? 'translate-x-5.5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        )}

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
                Berhasil! Profil kustom Anda telah disimpan.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Configuration Form */}
        <form onSubmit={handleFormSubmit} className={`space-y-5 rounded-2xl p-5 border shadow-sm transition-colors duration-200 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-widest border-b pb-2 mb-2 ${
            darkMode ? 'text-slate-400 border-slate-805/30' : 'text-slate-400 border-slate-100'
          }`}>Pengaturan Profil</h3>

          {/* User Name input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Anda</label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3.5 py-2.5 border rounded-xl font-medium text-sm focus:outline-none transition-colors ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-white focus:border-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-805 focus:border-slate-500'
              }`}
              placeholder="Ketik nama Anda..."
            />
          </div>

          {/* Avatar Option Selectors - Nameless, clean clickable round pictures */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Foto Pilihan (Preset)</label>
            <div className="flex gap-4 justify-center py-1">
              {AVATAR_PRESETS.map((p) => {
                const selected = avatarUrl === p.url;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setAvatarUrl(p.url)}
                    className={`relative w-14 h-14 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                      selected 
                        ? 'border-primary scale-105 ring-4 ring-indigo-500/10' 
                        : darkMode
                          ? 'border-slate-700 hover:border-slate-500'
                          : 'border-slate-200 hover:border-slate-350'
                    }`}
                  >
                    <img 
                      src={p.url} 
                      alt={`Avatar option ${p.id}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {selected && (
                      <div className="absolute inset-0 bg-primary/15 flex items-center justify-center">
                        <div className="bg-primary text-white p-1 rounded-full scale-90">
                          <Check className="w-3 h-3 stroke-[3.5]" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Uploader Dari Galeri */}
          <div className={`space-y-2 pt-3.5 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Atau Unggah dari Galeri</label>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <input 
                type="file"
                id="avatar-gallery-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label 
                htmlFor="avatar-gallery-upload"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[11px] font-extrabold uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow-sm ${
                  darkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 border-slate-705 text-slate-200' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <Upload className="w-4 h-4 text-primary" />
                Pilih Foto dari Galeri
              </label>

              {avatarUrl.startsWith('data:image/') && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl(AVATAR_PRESETS[0].url)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-rose-500 hover:bg-rose-500/10 active:scale-95 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus Foto Galeri
                </button>
              )}
            </div>
            <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">
              Dukung JPG, PNG, WebP hiasan profil kustom. Gambar diproses secara offline tanpa diunggah ke server luar guna menjaga privasi.
            </p>
          </div>

          {/* Action button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-primary hover:bg-primary/95 text-white rounded-xl font-extrabold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm text-xs uppercase tracking-wider"
          >
            <Check className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </form>

        {/* Seed & Utility Reset panel */}
        <section className="mt-5 mb-4">
          <div className={`border rounded-2xl p-4 space-y-3 shadow-sm transition-colors duration-201 ${
            darkMode ? 'bg-rose-950/15 border-rose-900/40' : 'bg-rose-50 border-rose-200/65'
          }`}>
            <div>
              <h4 className={`text-[10px] font-extrabold uppercase tracking-widest ${darkMode ? 'text-rose-400' : 'text-rose-800'}`}>Advanced Actions</h4>
              <p className={`text-[11px] font-semibold mt-0.5 ${darkMode ? 'text-rose-300' : 'text-rose-700/80'}`}>
                Kembalikan semua tambahan di basis data ke pengaturan asal pabrikan WellnessPro.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("Apakah Anda yakin ingin menyetel ulang semua data? Tindakan ini tidak dapat dibatalkan.")) {
                  onResetData();
                }
              }}
              className={`py-2.5 px-4 font-extrabold uppercase rounded-xl border shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all text-[11px] ${
                darkMode
                  ? 'bg-slate-850 hover:bg-slate-800 text-rose-450 border-rose-900/35'
                  : 'bg-white hover:bg-rose-100 text-rose-605 border-rose-200'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              Reset App Data Cache
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
