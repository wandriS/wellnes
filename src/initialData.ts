import { UserProfile, DayLog } from './types';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Sarah',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  calorieGoal: 2200,
  sleepGoal: 8,
  hydrationGoal: 8
};

// Seed 7 days of health logs ending on today (2026-06-06)
export const DEFAULT_LOGS: DayLog[] = [
  {
    date: '2026-05-31',
    calories: 2110,
    sleep: 6.8,
    hydration: 7,
    sleepQuality: 'Fair'
  },
  {
    date: '2026-06-01',
    calories: 1980,
    sleep: 7.2,
    hydration: 5,
    sleepQuality: 'Optimal'
  },
  {
    date: '2026-06-02',
    calories: 2350,
    sleep: 6.2,
    hydration: 8,
    sleepQuality: 'Fair'
  },
  {
    date: '2026-06-03',
    calories: 1750,
    sleep: 8.0,
    hydration: 6,
    sleepQuality: 'Optimal'
  },
  {
    date: '2026-06-04',
    calories: 2120,
    sleep: 5.5,
    hydration: 6,
    sleepQuality: 'Poor'
  },
  {
    date: '2026-06-05',
    calories: 1950,
    sleep: 7.8,
    hydration: 7,
    sleepQuality: 'Optimal'
  },
  {
    date: '2026-06-06', // Today
    calories: 1840,
    sleep: 7.5,
    hydration: 6,
    sleepQuality: 'Optimal'
  }
];
