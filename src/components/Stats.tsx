import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Moon, Droplet, Calendar, BarChart3, TrendingUp, Compass, Sparkles, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { UserProfile, DayLog } from '../types';

interface StatsProps {
  profile: UserProfile;
  logs: DayLog[];
  darkMode?: boolean;
}

type MetricType = 'calories' | 'sleep' | 'hydration';

export default function Stats({ profile, logs, darkMode = false }: StatsProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('calories');
  const [hoveredDay, setHoveredDay] = useState<DayLog | null>(null);
  const [activeDayIdx, setActiveDayIdx] = useState<number>(logs.length - 1);

  const activeDay = logs[activeDayIdx] || logs[logs.length - 1];

  // Calculate averages & achievements
  const totalDays = logs.length;
  const avgCalories = Math.round(logs.reduce((acc, l) => acc + l.calories, 0) / totalDays);
  const avgSleep = parseFloat((logs.reduce((acc, l) => acc + l.sleep, 0) / totalDays).toFixed(1));
  const avgHydration = parseFloat((logs.reduce((acc, l) => acc + l.hydration, 0) / totalDays).toFixed(1));

  // Threshold compliance
  const calMetDays = logs.filter(l => l.calories >= profile.calorieGoal).length;
  const sleepMetDays = logs.filter(l => l.sleep >= profile.sleepGoal).length;
  const hydMetDays = logs.filter(l => l.hydration >= profile.hydrationGoal).length;

  const currentAvg = selectedMetric === 'calories' ? avgCalories : selectedMetric === 'sleep' ? avgSleep : avgHydration;
  const currentGoal = selectedMetric === 'calories' ? profile.calorieGoal : selectedMetric === 'sleep' ? profile.sleepGoal : profile.hydrationGoal;
  const currentUnit = selectedMetric === 'calories' ? 'kcal' : selectedMetric === 'sleep' ? 'hrs' : 'glasses';
  const metDays = selectedMetric === 'calories' ? calMetDays : selectedMetric === 'sleep' ? sleepMetDays : hydMetDays;
  const metPercentage = Math.round((metDays / totalDays) * 100);

  // Map values for scaling the SVG chart elegantly
  const values = logs.map(l => l[selectedMetric]);
  const maxValue = Math.max(...values, currentGoal) * 1.15; // 15% buffer on top

  // Map day labels (e.g., Sun, Mon...)
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const dayLabels = logs.map(l => getDayName(l.date));

  // Dynamic Weekly Observational Summary
  const getWeeklyVerdict = () => {
    const metCal = calMetDays >= 4;
    const metHyd = hydMetDays >= 4;
    const metSlp = sleepMetDays >= 4;

    if (metCal && metHyd && metSlp) {
      return {
        title: "Performa Sangat Sempurna!",
        status: "success",
        text: "Anda menunjukkan konsistensi luar biasa minggu ini. Target membakar kalori, tidur malam, serta hidrasi air terpenuhi hampir setiap hari. Jantung dan otot Anda berada dalam performa prima!",
        tip: "Pertahankan ritme ini. Tubuh Anda beradaptasi sangat baik terhadap struktur sehat ini."
      };
    } else if (metCal && metHyd) {
      return {
        title: "Fokus pada Istirahat (Tidur)",
        status: "warning",
        text: "Aktivitas pembakaran energi (olahraga) dan minum air Anda sudah sangat luar biasa. Namun, waktu tidur malam rata-rata masih berada di bawah target ideal Anda.",
        tip: "Kurangi paparan layar gawai 30 menit sebelum tidur untuk memicu hormon melatonin alami."
      };
    } else if (metHyd) {
      return {
        title: "Hidrasi Baik, Tingkatkan Olahraga",
        status: "info",
        text: "Kebutuhan air minum harian Anda tercukupi dengan sangat konsisten. Namun, pembakaran kalori aktif harian Anda masih butuh dorongan ekstra agar metabolismenya berjalan maksimal.",
        tip: "Coba tambahkan aktivitas jalan cepat minimal 15-20 menit di pagi atau sore hari."
      };
    } else {
      return {
        title: "Waktunya Membangun Kebiasaan Baru",
        status: "attention",
        text: "Minggu ini merupakan fase penyesuaian bagi Anda. Beberapa target kesehatan harian Anda masih menghadapi fluktuasi yang cukup signifikan.",
        tip: "Mulailah dari langkah paling mudah terlebih dahulu, seperti minum segelas air saat bangun tidur pagi."
      };
    }
  };

  const weeklyVerdict = getWeeklyVerdict();

  return (
    <div className={`w-full pb-28 min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/20'}`}>
      {/* Top Header */}
      <header className={`fixed top-0 left-0 right-0 border-b flex items-center justify-between px-6 py-4.5 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.02)] max-w-md mx-auto transition-colors duration-200 ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <h1 className="text-sm font-bold uppercase tracking-widest mx-auto">Health Analytics</h1>
      </header>

      {/* Main Analytics Container */}
      <div className="px-5 pt-16 max-w-md mx-auto">
        
        {/* Metric Selector Pills - Geometric balance style */}
        <div className={`flex gap-1 p-1 rounded-xl my-5 border transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/50 border-slate-200'
        }`}>
          <button
            onClick={() => setSelectedMetric('calories')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              selectedMetric === 'calories'
                ? darkMode
                  ? 'bg-slate-800 text-primary border-slate-700 shadow-sm'
                  : 'bg-white text-primary border-slate-200 shadow-sm'
                : darkMode
                  ? 'text-slate-400 hover:text-slate-200 border-transparent'
                  : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Calories
          </button>
          <button
            onClick={() => setSelectedMetric('sleep')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              selectedMetric === 'sleep'
                ? darkMode
                  ? 'bg-slate-800 text-primary border-slate-700 shadow-sm'
                  : 'bg-white text-primary border-slate-200 shadow-sm'
                : darkMode
                  ? 'text-slate-400 hover:text-slate-200 border-transparent'
                  : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            Sleep
          </button>
          <button
            onClick={() => setSelectedMetric('hydration')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              selectedMetric === 'hydration'
                ? darkMode
                  ? 'bg-slate-800 text-primary border-slate-700 shadow-sm'
                  : 'bg-white text-primary border-slate-200 shadow-sm'
                : darkMode
                  ? 'text-slate-400 hover:text-slate-200 border-transparent'
                  : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            Hydrate
          </button>
        </div>

        {/* High-Fidelity Stats Overview Hero Card */}
        <div className={`rounded-2xl p-5 border shadow-sm space-y-4 transition-colors duration-200 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Weekly Average</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{currentAvg.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-500">{currentUnit}</span>
              </div>
            </div>

            <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% Trend
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-slate-100 dark:border-slate-800/60">
            <div className={`border p-3 rounded-xl transition-colors ${darkMode ? 'bg-slate-850 border-slate-800' : 'bg-slate-50 border-slate-200/60'}`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DAILY TARGET</p>
              <p className={`text-sm font-extrabold mt-0.5 ${darkMode ? 'text-slate-250' : 'text-slate-800'}`}>
                {currentGoal.toLocaleString()} {currentUnit}
              </p>
            </div>
            <div className={`border p-3 rounded-xl transition-colors ${darkMode ? 'bg-slate-850 border-slate-800' : 'bg-slate-50 border-slate-200/60'}`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">COMPLIANCE</p>
              <p className={`text-sm font-extrabold mt-0.5 ${darkMode ? 'text-slate-250' : 'text-slate-800'}`}>
                {metPercentage}% compliance
              </p>
            </div>
          </div>
        </div>

        {/* Brand New: Rich Weekly Summary AI-style Panel */}
        <div className={`mt-5 rounded-2xl p-5 border shadow-sm transition-colors duration-200 ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-gradient-to-br from-indigo-50/50 to-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b pb-3.5 mb-3.5 dark:border-slate-800/80">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 fill-current animate-pulse" />
              Rangkasan Mingguan (Weekly Summary)
            </h3>
            <span className="text-[9px] font-black tracking-wider text-[#4945db] dark:text-indigo-400 bg-primary/10 px-2 py-0.5 rounded-full uppercase">
              AI Insight
            </span>
          </div>

          {/* Verdict Heading badge */}
          <div className="flex gap-2.5 items-start">
            <div className={`p-2 rounded-xl shrink-0 ${
              weeklyVerdict.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
              weeklyVerdict.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
              'bg-indigo-500/10 text-indigo-400'
            }`}>
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-1">
              <h4 className={`text-xs font-extrabold uppercase tracking-widest ${darkMode ? 'text-white' : 'text-slate-850'}`}>
                {weeklyVerdict.title}
              </h4>
              <p className={`text-xs leading-relaxed font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {weeklyVerdict.text}
              </p>
            </div>
          </div>

          {/* Micro-Target Score Cards */}
          <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4.5 border-t border-slate-100 dark:border-slate-800/50">
            <div className="text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Bakar Kalori</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Flame className="w-3.5 h-3.5 text-primary fill-current" />
                <span className="text-xs font-black">{calMetDays}/7 Hari</span>
              </div>
            </div>
            <div className="text-center border-x dark:border-slate-800/60 border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tidur Malam</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Moon className="w-3.5 h-3.5 text-indigo-400 fill-current" />
                <span className="text-xs font-black">{sleepMetDays}/7 Hari</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Minum Air</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Droplet className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span className="text-xs font-black">{hydMetDays}/7 Hari</span>
              </div>
            </div>
          </div>

          {/* Tip of the week panel */}
          <div className={`mt-4 p-3 rounded-xl flex items-start gap-2.5 transition-colors ${
            darkMode ? 'bg-slate-850 text-slate-300' : 'bg-amber-500/5 text-amber-900 border border-amber-500/10'
          }`}>
            <AlertCircle className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${darkMode ? 'text-indigo-400' : 'text-amber-600'}`} />
            <div className="text-[11px] font-semibold leading-normal">
              <strong className="uppercase block text-[9px] tracking-wider mb-0.5 text-slate-400">Rekomendasi Kami (Suggestion):</strong>
              {weeklyVerdict.tip}
            </div>
          </div>
        </div>

        {/* Beautiful Interactive SVG Bar Chart Section */}
        <div className={`mt-5 rounded-2xl p-5 border shadow-sm transition-colors duration-200 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex justify-between items-center mb-5">
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              <BarChart3 className="w-4 h-4 text-primary" />
              Progression Chart
            </h3>
            <span className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 px-2 py-1 rounded border ${
              darkMode ? 'bg-slate-850 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200/40 text-slate-400'
            }`}>
              <Calendar className="w-3 h-3" />
              Past 7 Days
            </span>
          </div>

          {/* Core Interactive SVG Graph */}
          <div className="relative w-full h-44 mt-2">
            
            {/* Horizontal Grid Threshold Line */}
            {(() => {
              const thresholdY = 140 - (currentGoal / maxValue) * 120;
              return (
                <div 
                  className="absolute w-full border-t border-dashed border-rose-400/50 pointer-events-none" 
                  style={{ top: `${thresholdY}px` }}
                >
                  <span className={`absolute right-0 text-[9px] font-extrabold px-1.5 py-0.5 rounded -mt-2.5 shadow-sm border ${
                    darkMode 
                      ? 'bg-slate-800 text-rose-400 border-rose-900' 
                      : 'bg-rose-50 text-rose-500 border-rose-100'
                  }`}>
                    Target: {currentGoal}
                  </span>
                </div>
              );
            })()}

            {/* Bars Canvas layout */}
            <div className="absolute inset-x-0 bottom-6 top-2 flex justify-between items-end px-2">
              {logs.map((log, idx) => {
                const val = log[selectedMetric];
                // Scale height between 12% (min display) and 100%
                const barHeightPercent = Math.max(12, Math.min(100, (val / maxValue) * 100));
                const isActive = idx === activeDayIdx;
                const isGoalMet = val >= currentGoal;

                // Dynamic theme styling matching metrics - with primary indigo mapping
                let barColor = 'bg-primary/80 hover:bg-primary';

                if (isActive) {
                  barColor = `bg-primary ring-4 border ${darkMode ? 'ring-indigo-950/40 border-indigo-900' : 'ring-indigo-100 border-indigo-200'}`;
                }

                return (
                  <div 
                    key={log.date}
                    onClick={() => setActiveDayIdx(idx)}
                    onMouseEnter={() => setHoveredDay(log)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className="flex flex-col items-center flex-1 cursor-pointer h-full justify-end group px-1"
                  >
                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {hoveredDay?.date === log.date && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: -5 }}
                          exit={{ opacity: 0 }}
                          className="absolute bg-slate-950 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg -translate-y-24 z-10 pointer-events-none shadow-lg text-center border border-slate-700"
                        >
                          {val.toLocaleString()} {currentUnit}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Target Reached Badge Sparkle */}
                    {isGoalMet && (
                      <motion.div 
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[9px] text-[#4f46e5] font-extrabold mb-1"
                      >
                        ▲
                      </motion.div>
                    )}

                    {/* Actual Bar Graphic */}
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-305 ${barColor}`}
                      style={{ height: `${barHeightPercent}%` }}
                    />
                    
                    {/* Tick label */}
                    <span className={`text-[9px] uppercase font-bold mt-2.5 tracking-wider ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                      {dayLabels[idx]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Zero Baseline */}
            <div className={`absolute w-full bottom-6 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`} />
          </div>

          <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider mt-2">
            💡 Tap on any day graph bar to audit complete items.
          </p>
        </div>

        {/* Selected Day Detail Breakdown Section */}
        <section className="mt-5 mb-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Day Audit details: {new Date(activeDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          
          <div className={`rounded-2xl p-4 border shadow-sm space-y-3.5 transition-colors duration-200 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {/* Calories Item */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className={`p-2.5 rounded-xl border flex items-center justify-center ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-primary' : 'bg-indigo-50 border border-indigo-100 text-primary'
                }`}>
                  <Flame className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Calories</p>
                  <p className={`text-sm font-extrabold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeDay.calories} kcal burned</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Met</p>
                <p className={`text-xs font-black ${activeDay.calories >= profile.calorieGoal ? 'text-primary' : 'text-slate-400'}`}>
                  {Math.round((activeDay.calories / profile.calorieGoal) * 100)}%
                </p>
              </div>
            </div>

            {/* Sleep Item */}
            <div className={`flex justify-between items-center pt-3 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2.5">
                <span className={`p-2.5 rounded-xl border flex items-center justify-center ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-rose-500' : 'bg-rose-50 border border-rose-100 text-rose-600'
                }`}>
                  <Moon className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sleep Time</p>
                  <p className={`text-sm font-extrabold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeDay.sleep} hours rested</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                <span className={`inline-block px-2.5 py-0.5 rounded border text-[10px] font-bold ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700 text-[#4f46e5]' 
                    : 'bg-slate-100 border border-slate-200 text-slate-500'
                }`}>
                  {activeDay.sleep >= profile.sleepGoal ? 'Optimal' : 'Fair'}
                </span>
              </div>
            </div>

            {/* Hydration Item */}
            <div className={`flex justify-between items-center pt-3 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2.5">
                <span className={`p-2.5 rounded-xl border flex items-center justify-center ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border border-slate-200 text-[#475569]'
                }`}>
                  <Compass className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Water Intake</p>
                  <p className={`text-sm font-extrabold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeDay.hydration} glasses taken</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Status</p>
                <p className={`text-xs font-black ${activeDay.hydration >= profile.hydrationGoal ? 'text-primary' : 'text-slate-400'}`}>
                  {activeDay.hydration >= profile.hydrationGoal ? 'COMPLETED' : 'PARTIAL'}
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
