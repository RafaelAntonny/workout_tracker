import type { SessionExercise } from '../types';

const STORAGE_KEY = 'exercises';

export function loadExercises(): SessionExercise[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  return JSON.parse(raw) as SessionExercise[];
}

export function saveExercises(exercises: SessionExercise[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));

  return;
}
