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

  return { exerciseSets, addExerciseSet };
}
