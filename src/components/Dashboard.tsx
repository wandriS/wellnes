import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Moon, Droplet, Plus, Minus, Settings, Lightbulb, Activity, Check, Trophy } from 'lucide-react';
import { UserProfile, DayLog } from '../types';

interface DashboardProps {
  profile: UserProfile;
  todayLog: DayLog;
  updateTodayLog: (fields: Partial<DayLog>) => void;
  onNavigate: (tab: 'dashboard' | 'stats' | 'profile') => void;
}

export default function Dashboard({ profile, todayLog, updateTodayLog, onNavigate }: DashboardProps) {
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [calorieInput, setCalorieInput] = useState('');
  const [sleepInput, setSleepInput] = useState('');

  // Calculate percentage for progress bars
  const caloriePercent = Math.min(100, Math.round((todayLog.calories / profile.calorieGoal) * 100));
  
  // Sleep Quality evaluation and background logic
  const sleepValue = todayLog.sleep;
  let sleepQuality: 'Optimal' | 'Fair' | 'Poor' = 'Fair';
  let sleepBg = 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
  
  if (sleepValue >= profile.sleepGoal - 1 && sleepValue <= profile.sleepGoal + 1) {
    sleepQuality = 'Optimal';
    sleepBg = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
  } else if (sleepValue < profile.sleepGoal - 2) {
    sleepQuality = 'Poor';
    sleepBg = 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300';
  }

  // Handle water actions
  const adjustWater = (amount: number) => {
    const newCount = Math.max(0, todayLog.hydration + amount);
    updateTodayLog({ hydration: newCount });
  };

  // Log active burn / calorie activities
  const handleAddCalories = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(calorieInput, 10);
    if (!isNaN(val) && val > 0) {
      updateTodayLog({ calories: todayLog.calories + val });
      setCalorieInput('');
      setShowCalorieModal(false);
    }
  };

  // Log Sleep duration
  const handleSaveSleep = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(sleepInput);
    if (!isNaN(val) && val >= 0 && val <= 24) {
      updateTodayLog({ sleep: val });
      setSleepInput('');
      setShowSleepModal(false);
    }
  };

  // Dynamic Rule-Based Health Insights
  const getDynamicInsights = () => {
    const insights = [];

    // Calorie Insight
    if (todayLog.calories >= profile.calorieGoal) {
      insights.push({
        text: `Awesome job! You reached your active burn target of ${profile.calorieGoal} kcal. Keep it up!`,
        hl: 'Active Burn'
      });
    } else {
      const remaining = profile.calorieGoal - todayLog.calories;
      insights.push({
        text: `You have ${remaining} kcal remaining to hit your target. A brisk 30-minute jog can burn this off!`,
        hl: 'Target Remaining'
      });
    }

    // Water Insight
    if (todayLog.hydration >= profile.hydrationGoal) {
      insights.push({
        text: `Excellent hydration today! Meeting your water target of ${profile.hydrationGoal} glasses fuels muscle recovery and focus.`,
        hl: 'Hydration Completed'
      });
    }

    return insights;
  };

  const dynamicInsights = getDynamicInsights();

  return (
    <div className="w-full pb-28">
      {/* Top Bar matching Geometric Balance styling */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 flex justify-between items-center px-6 py-3.5 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 active:scale-95 transition-transform cursor-pointer border border-slate-200"
            id="profile-avatar-btn"
          >
            <img 
              alt="Profile avatar" 
              className="w-full h-full object-cover" 
              src={profile.avatarUrl}
              referrerPolicy="no-referrer"
            />
          </button>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Hello, {profile.name}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
              </div>
              <h1 className="text-md font-bold text-slate-900 font-sans tracking-tight leading-tight">WellnessPro</h1>
            </div>
          </div>
        </div>

        {/* Dynamic Tracker Status badge from Geometric style */}
        <div className="flex items-center bg-slate-100 rounded-full px-3.5 py-1.5 gap-2 border border-slate-200/60 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-none">Live Active</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="px-5 pt-24 max-w-md mx-auto">
        
        {/* Hero Section */}
        <section className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#4f46e5] mb-1">STRATUM ENGINE</div>
          <h2 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-none mb-1.5" id="hero-title">Your Summary</h2>
          <p className="text-sm font-medium text-slate-500 leading-snug">You're doing great today! Here's your current progress.</p>
        </section>

        {/* Health Progress Cards Grid */}
        <div className="space-y-4">
          
          {/* Active Calories Card */}
          <div 
            id="calories-burn-card"
            className="health-card bg-white rounded-2xl p-5 flex flex-col justify-between h-48 border border-slate-200 shadow-sm cursor-pointer relative overflow-hidden"
            onClick={() => {
              setCalorieInput('');
              setShowCalorieModal(true);
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Calories</p>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Active Burn</h3>
              </div>
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
                <Flame className="w-5 h-5 fill-current" />
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[38px] font-extrabold text-slate-900 leading-none tracking-tight">
                  {todayLog.calories.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  / {profile.calorieGoal.toLocaleString()} kcal
                </span>
              </div>
              
              {/* Progress Container */}
              <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  className="h-full bg-primary rounded-full animate-pulse"
                  initial={{ width: 0 }}
                  animate={{ width: `${caloriePercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[11px] text-slate-400 font-semibold">Progress Bar</span>
                <span className="text-[11px] text-primary font-bold">{caloriePercent}%</span>
              </div>
            </div>
            
            {/* Soft indicator of interactivity */}
            <div className="absolute top-2 right-2 flex bg-primary/5 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              + Log Burn
            </div>
          </div>

          {/* Sleep Rest Duration Card */}
          <div 
            id="sleep-duration-card"
            className="health-card bg-white rounded-2xl p-5 flex flex-col justify-between h-48 border border-slate-200 shadow-sm cursor-pointer"
            onClick={() => {
              setSleepInput(todayLog.sleep.toString());
              setShowSleepModal(true);
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Sleep</p>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Rest Duration</h3>
              </div>
              <div className="p-2.5 bg-indigo-50 rounded-xl text-primary flex items-center justify-center">
                <Moon className="w-5 h-5 fill-current" />
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[38px] font-extrabold text-slate-900 leading-none tracking-tight">
                  {todayLog.sleep}
                </span>
                <span className="text-xs font-semibold text-slate-500">hours</span>
              </div>
              
              {/* Status Chip matching user photo */}
              <div className="mt-2.5">
                <span className="inline-flex items-center px-3.5 py-1 bg-slate-100 text-[#4f46e5] border border-slate-200 rounded-full text-[12px] font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] mr-1.5"></span>
                  {sleepQuality}
                </span>
              </div>
            </div>
          </div>

          {/* Hydration / Water intake Card with exact design matching */}
          <div 
            id="water-hydration-card"
            className="health-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-50 rounded-xl text-rose-600 flex items-center justify-center">
                  <Droplet className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Hydration</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Water Intake</h3>
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 mt-4">
                <span className="text-[38px] font-extrabold text-slate-900 leading-none tracking-tight">{todayLog.hydration}</span>
                <span className="text-xs font-semibold text-slate-500">/ {profile.hydrationGoal} glasses</span>
              </div>
            </div>

            {/* Visual Glass Counter + Add Button */}
            <div className="flex gap-2.5 items-center justify-between sm:justify-start mt-2 sm:mt-0">
              {/* Glass capsule indicator matrix */}
              <div className="flex gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
                {Array.from({ length: Math.max(8, profile.hydrationGoal) }).map((_, idx) => {
                  const filled = idx < todayLog.hydration;
                  return (
                    <div 
                      key={idx}
                      className={`w-6 h-10 rounded-t-sm rounded-b-lg transition-all duration-300 ${
                        filled 
                          ? 'bg-primary shadow-sm shadow-primary/20 scale-100' 
                          : 'bg-gray-200 opacity-60 scale-95'
                      }`}
                      title={`${idx + 1} glass`}
                    />
                  );
                })}
              </div>

              {/* Incrementor/Decrementor Circle buttons */}
              <div className="flex flex-col gap-1 px-1">
                <button 
                  id="water-add-btn"
                  onClick={() => adjustWater(1)}
                  className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-container active:scale-90 transition-all cursor-pointer"
                  title="Add Glass"
                >
                  <Plus className="w-6 h-6" />
                </button>
                {todayLog.hydration > 0 && (
                  <button 
                    id="water-remove-btn"
                    onClick={() => adjustWater(-1)}
                    className="w-9 h-9 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center active:scale-90 transition-all cursor-pointer mx-auto mt-1"
                    title="Remove Glass"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Health Insights matching bottom section perfectly with Geometric style */}
        <section className="mt-8 mb-6">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Health Insights</div>
          
          <div className="space-y-3">
            {/* Primary Static sleep insight from user mockup */}
            <div id="sleep-insight-block" className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <span className="p-2 bg-indigo-50 text-primary rounded-lg mt-0.5 border border-indigo-100 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </span>
              <p className="text-[14px] leading-relaxed text-slate-600 font-medium">
                Your <span className="font-bold text-primary">Sleep Quality</span> has improved by 12% this week compared to last. Keep it up!
              </p>
            </div>

            {/* Dynamic additional alerts based on target compliance */}
            {dynamicInsights.map((ins, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <span className="p-2 bg-slate-100 text-[#475569] rounded-lg mt-0.5 border border-slate-200 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </span>
                <p className="text-[14px] leading-relaxed text-slate-600 font-medium">
                  {ins.text.includes(ins.hl) ? (
                    <span>
                      {ins.text.split(ins.hl)[0]}
                      <span className="font-bold text-primary">{ins.hl}</span>
                      {ins.text.split(ins.hl)[1]}
                    </span>
                  ) : (
                    ins.text
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* Calories Input Overlay Modal */}
      <AnimatePresence>
        {showCalorieModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCalorieModal(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl z-10 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#1a1c1c] flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-primary fill-current" />
                Active Burn Entry
              </h3>
              <p className="text-sm text-[#424656] mb-4">
                Record physical workouts or extra activity to increase your burned kcal.
              </p>

              <form onSubmit={handleAddCalories} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Calories Burned (kcal)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 350"
                    required
                    autoFocus
                    value={calorieInput}
                    onChange={(e) => setCalorieInput(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:outline-none font-semibold text-lg"
                  />
                </div>
                
                {/* Popular Pre-sets for quick logging */}
                <div className="flex gap-2 flex-wrap">
                  {[150, 250, 400].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCalorieInput(preset.toString())}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 cursor-pointer"
                    >
                      +{preset} kcal
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowCalorieModal(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-500 font-semibold cursor-pointer text-center text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary hover:bg-primary-container text-white rounded-xl font-semibold cursor-pointer text-center text-sm"
                  >
                    Save Progress
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sleep Input Overlay Modal */}
      <AnimatePresence>
        {showSleepModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSleepModal(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl z-10 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#1a1c1c] flex items-center gap-2 mb-2">
                <Moon className="w-5 h-5 text-emerald-700 fill-current" />
                Sleep Duration Entry
              </h3>
              <p className="text-sm text-[#424656] mb-4">
                Track how many hours you slept last night to help target optimal recovery.
              </p>

              <form onSubmit={handleSaveSleep} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Duration (Hours)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    min="0"
                    max="24"
                    placeholder="e.g. 7.5"
                    required
                    autoFocus
                    value={sleepInput}
                    onChange={(e) => setSleepInput(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:outline-none font-semibold text-lg"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex gap-2">
                  {[6, 7, 8, 9].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setSleepInput(hours.toString())}
                      className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 cursor-pointer"
                    >
                      {hours}h
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowSleepModal(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-500 font-semibold cursor-pointer text-center text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold cursor-pointer text-center text-sm"
                  >
                    Save Duration
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
