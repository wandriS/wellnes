import { UserProfile, DayLog } from './types';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Sarah',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_t4i-gQhWV503GiGzrNEREnzrWK0TjpI3dYbgsm3_GsyaaGiFDHPp6yv4h_C7H_bi-pwT9HEWNZnS95s4I0_vtHts3KAPU56WXUwlocq5fJa7y_kcBTWuVql-R6_3lTKoYrjVpUyzInINo_byiAb4sQVy_ssEPOqVe8ZmcjmRqdBDMeEce1NigC5uG5cCGZab4xk5TqaOz4FMH9w1U-jvoSb6tUMgt-LzsUOwQ57fEsV-Ozj7RL3jhe8HrIZV5i0txhaxtENAORk',
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
