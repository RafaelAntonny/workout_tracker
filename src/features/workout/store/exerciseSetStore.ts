import { useState } from 'react';
import type { ExerciseSet } from '../types';
import {
  loadExerciseSets,
  saveExerciseSets,
} from '../storage/exerciseSetStorage';

export function useExerciseSetStore() {
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>(() =>
    loadExerciseSets()
  );

  function addExerciseSet(
    exerciseId: string,
    repetitions: number,
    weight: number
  ) {
    const next: ExerciseSet = {
      id: crypto.randomUUID(),
      exerciseId: exerciseId,
      repetitions: repetitions,
      weight: weight,
    };

    setExerciseSets((prev) => {
      const updated = [...prev, next];
      saveExerciseSets(updated);
      return updated;
    });
  }

  function getExerciseSetForExercise(sessionExerciseId: string): ExerciseSet[] {
    return exerciseSets.filter((es) => es.exerciseId === sessionExerciseId);
  }

  function updateExerciseSet(id: string, repetitions: number, weight: number) {
    setExerciseSets((prev) => {
      const next = prev.map((es) =>
        es.id === id ? { ...es, repetitions, weight } : es
      );

      setExerciseSets(next);
      return next;
    });
  }

  function deleteExerciseSet(id: string) {
    setExerciseSets((prev) => {
      const next = prev.filter((es) => es.id !== id);
      saveExerciseSets(next);
      return next;
    });
  }

  return {
    exerciseSets,
    addExerciseSet,
    getExerciseSetForExercise,
    updateExerciseSet,
    deleteExerciseSet,
  };
}
