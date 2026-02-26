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
      completedAt: new Date(completedAt).toISOString(),
      notes: notes,
    };

    setWorkouts((prev) => {
      const updated = [...prev, next];
      saveWorkouts(updated);
      return updated;
    });
  }

  function getWorkout(id: string): WorkoutSession | undefined {
    return workouts.find((w) => w.id === id);
  }

  function updateWorkout(
    id: string,
    name: string,
    completedAt: string,
    notes?: string
  ) {
    setWorkouts((prev) => {
      const next = prev.map((w) =>
        w.id === id
          ? {
              ...w,
              name,
              completedAt: new Date(completedAt).toISOString(),
              notes,
            }
          : w
      );
      saveWorkouts(next);
      return next;
    });
  }

  function deleteWorkout(id: string) {
    setWorkouts((prev) => {
      const next = prev.filter((w) => w.id !== id);
      saveWorkouts(next);
      return next;
    });
  }

  return { workouts, addWorkout, getWorkout, updateWorkout, deleteWorkout };
}
