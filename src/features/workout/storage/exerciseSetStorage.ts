import type { ExerciseSet } from '../types';

const STORAGE_KEY = 'exerciseSets';

export function loadExerciseSets(): ExerciseSet[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  return JSON.parse(raw) as ExerciseSet[];
}

export function saveExerciseSets(exercises: ExerciseSet[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));

  return;
}
