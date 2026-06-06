export interface UserProfile {
  name: string;
  avatarUrl: string;
  calorieGoal: number;
  sleepGoal: number;
  hydrationGoal: number; // in glasses
}

export interface DayLog {
  date: string; // YYYY-MM-DD
  calories: number;
  sleep: number; // hours
  hydration: number; // glasses (1 glass = standard 250ml)
  sleepScore?: number; // 0-100 rating
  sleepQuality?: 'Optimal' | 'Fair' | 'Poor';
}

export interface HealthInsight {
  id: string;
  title: string;
  category: 'sleep' | 'calories' | 'hydration' | 'general';
  description: string;
  impactColor: string;
}
