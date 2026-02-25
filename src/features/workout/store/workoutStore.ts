import { useState } from 'react';
import type { WorkoutSession } from '../types';
import { loadWorkouts, saveWorkouts } from '../storage/workoutStorage';

export function useWorkoutStore() {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>(() =>
    loadWorkouts()
  );

  function addWorkout(name: string, completedAt: string, notes?: string) {
    const next: WorkoutSession = {
      id: crypto.randomUUID(),
      name: name,
      completedAt: completedAt,
      notes: notes,
    };

    setWorkouts((prev) => {
      const updated = [...prev, next];
      saveWorkouts(updated);
      return updated;
    });
  }

  return { workouts, addWorkout };
}
