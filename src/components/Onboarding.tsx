import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Moon, Droplet, Sparkles, ArrowRight, User, Check, Laptop, Smartphone } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingProps {
  profile: UserProfile;
  saveProfile: (newProfile: UserProfile) => void;
  onComplete: () => void;
}

export default function Onboarding({ profile, saveProfile, onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(profile.name);
  const [calorieGoal, setCalorieGoal] = useState(profile.calorieGoal);
  const [sleepGoal, setSleepGoal] = useState(profile.sleepGoal);
  const [hydrationGoal, setHydrationGoal] = useState(profile.hydrationGoal);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Save setup and complete onboarding
      saveProfile({
        ...profile,
        name: name.trim() || 'Kawan Sehat',
        calorieGoal: Number(calorieGoal) || 2000,
        sleepGoal: Number(sleepGoal) || 8,
        hydrationGoal: Number(hydrationGoal) || 8
      });
      onComplete();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const stepsContent = [
    {
      title: "Selamat Datang di WellnessPro",
      subtitle: "Gaya Hidup Sehat Mulai Hari Ini",
      description: "Pantau kesehatan harian Anda secara rutin. Kami membantu mencatat kalori, waktu tidur, dan tingkat hidrasi tubuh Anda agar selalu prima.",
      iconColors: "bg-indigo-100 text-primary"
    },
    {
      title: "Atur Target Pribadi Anda",
      subtitle: "Kenalan yuk! Tentukan target harian Anda",
      description: "Sesuaikan target nutrisi dan istirahat agar sesuai dengan rutinitas harian serta gaya hidup sehat pilihan Anda.",
      iconColors: "bg-amber-100 text-amber-600"
    },
    {
      title: "Siap Berpetualang Sehat!",
      subtitle: "Simpan langsung sebagai aplikasi",
      description: "WellnessPro mendukung teknologi instan (PWA). Pasang ke layar utama layar HP atau PC Anda untuk mengakses cepat secara offline tanpa browser bar.",
      iconColors: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col justify-between p-6 z-50 overflow-y-auto">
      {/* Decorative top header patterns */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-indigo-100/30 to-transparent pointer-events-none" />

      {/* Top action skip button */}
      <div className="flex justify-between items-center z-10 pt-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-xs font-black tracking-wider text-slate-850">WELLNESSPRO</span>
        </div>
        
        {step < 2 && (
          <button 
            onClick={() => {
              // Complete early with current parameters
              saveProfile({
                ...profile,
                name: name.trim() || 'Kawan Sehat',
                calorieGoal,
                sleepGoal,
                hydrationGoal
              });
              onComplete();
            }}
            className="text-xs text-slate-400 hover:text-slate-600 font-extrabold tracking-wide uppercase transition-colors"
          >
            Lewati
          </button>
        )}
      </div>

      {/* Main Slide Card content container with Animation */}
      <div className="flex-1 flex flex-col justify-center my-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Visual Icon Illustration for each step */}
            <div className="flex justify-center">
              {step === 0 && (
                <div className="relative">
                  <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
                  <div className="flex items-center justify-center gap-3 bg-white p-5 rounded-3xl shadow-lg border border-slate-100 relative">
                    <div className="p-3 bg-rose-100 text-rose-500 rounded-2xl">
                      <Flame className="w-8 h-8 fill-current animate-bounce" />
                    </div>
                    <div className="p-3 bg-indigo-100 text-indigo-500 rounded-2xl">
                      <Moon className="w-8 h-8" />
                    </div>
                    <div className="p-3 bg-sky-100 text-sky-500 rounded-2xl">
                      <Droplet className="w-8 h-8 fill-current" />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="w-full max-w-xs bg-white rounded-2xl border border-slate-100 p-4 shadow-lg space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-700">Profil Anggota Baru</span>
                  </div>
                  
                  {/* Nickname modification */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Panggilan Anda</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama panggilan Anda..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary font-semibold text-slate-800"
                    />
                  </div>

                  {/* Micro Setup Target */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="bg-rose-50 p-2 rounded-xl text-center space-y-1">
                      <Flame className="w-4 h-4 text-rose-500 mx-auto fill-current" />
                      <div className="text-[9px] font-bold text-slate-500">Kalori (kcal)</div>
                      <input
                        type="number"
                        value={calorieGoal}
                        onChange={(e) => setCalorieGoal(Number(e.target.value))}
                        className="w-full text-center text-xs font-bold bg-white rounded border border-rose-200 p-0.5"
                      />
                    </div>
                    <div className="bg-indigo-50 p-2 rounded-xl text-center space-y-1">
                      <Moon className="w-4 h-4 text-indigo-500 mx-auto" />
                      <div className="text-[9px] font-bold text-slate-500">Tidur (jam)</div>
                      <input
                        type="number"
                        value={sleepGoal}
                        onChange={(e) => setSleepGoal(Number(e.target.value))}
                        className="w-full text-center text-xs font-bold bg-white rounded border border-indigo-200 p-0.5"
                      />
                    </div>
                    <div className="bg-sky-50 p-2 rounded-xl text-center space-y-1">
                      <Droplet className="w-4 h-4 text-sky-500 mx-auto fill-current" />
                      <div className="text-[9px] font-bold text-slate-500">Air (gelas)</div>
                      <input
                        type="number"
                        value={hydrationGoal}
                        onChange={(e) => setHydrationGoal(Number(e.target.value))}
                        className="w-full text-center text-xs font-bold bg-white rounded border border-sky-200 p-0.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="relative">
                  <div className="absolute -inset-3 bg-emerald-500/10 rounded-full blur-xl" />
                  <div className="flex gap-4 bg-white p-5 rounded-3xl shadow-lg border border-slate-100 relative">
                    <div className="flex flex-col items-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-20">
                      <Smartphone className="w-8 h-8 mb-2" />
                      <span className="text-[9px] font-bold text-center">Tinggal Pasang</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-20">
                      <Check className="w-8 h-8 mb-2" />
                      <span className="text-[9px] font-bold text-center">Siap Sehat</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step Text Contents */}
            <div className="text-center space-y-2.5 px-3">
              <h2 className="text-xl font-extrabold text-slate-850 tracking-tight leading-snug">
                {stepsContent[step].title}
              </h2>
              <p className="text-xs text-primary font-extrabold tracking-wide uppercase">
                {stepsContent[step].subtitle}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {stepsContent[step].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls: Dots and Buttons */}
      <div className="space-y-5 z-10 shrink-0 pb-2">
        {/* Progress dots indicator */}
        <div className="flex justify-center items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === i ? 'w-5 bg-primary' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Buttons wrapper */}
        <div className="flex items-center gap-3">
          {step > 0 ? (
            <button
              onClick={handlePrev}
              type="button"
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Kembali
            </button>
          ) : null}

          <button
            onClick={handleNext}
            type="button"
            className="flex-1 py-3 px-5 bg-primary hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            {step === 2 ? 'Mulai Sekarang' : 'Lanjutkan'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
