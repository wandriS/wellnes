import React from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // exactly 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-between p-8 z-50 overflow-hidden"
    >
      {/* Decorative top background elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[40%] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[30%] bg-indigo-50/65 rounded-full blur-2xl pointer-events-none" />

      {/* Spacer to align center content */}
      <div className="h-12" />

      {/* Center Brand and Logo */}
      <div className="flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [0.7, 1.05, 1], opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Ambient Glow effect under the icon */}
          <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl scale-95" />
          
          <img
            src="/icon.png"
            alt="WellnessPro Logo"
            className="w-24 h-24 rounded-3xl shadow-xl border-2 border-white relative z-10"
            onError={(e) => {
              // Fallback if icon.png is not loaded or missing
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z'%3E%3C/path%3E%3C/svg%3E";
            }}
          />
        </motion.div>

        <div className="space-y-1.5 z-10">
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent"
          >
            WellnessPro
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xs text-slate-500 font-bold tracking-wider uppercase"
          >
            Pelacak Kesehatan & Kebugaran
          </motion.p>
        </div>
      </div>

      {/* Footer Loading state */}
      <div className="w-full max-w-[200px] flex flex-col items-center space-y-4 z-10">
        {/* Sleek Custom Static Loading Bar */}
        <div className="w-full h-[5px] bg-indigo-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary to-indigo-600 rounded-full"
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest"
        >
          Memuat Data Pribadi...
        </motion.p>
      </div>
    </motion.div>
  );
}
