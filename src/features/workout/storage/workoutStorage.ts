import type { WorkoutSession } from '../types';

const STORAGE_KEY = 'workouts';

export function loadWorkouts(): WorkoutSession[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  return JSON.parse(raw) as WorkoutSession[];
}

export function saveWorkouts(workouts: WorkoutSession[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));

  return;
}
