import { useState } from 'react';
import type { MovementPattern, SessionExercise } from '../types';
import { loadExercises, saveExercises } from '../storage/exerciseStorage';

export function useExerciseStore() {
  const [exercises, setExercises] = useState<SessionExercise[]>(() =>
    loadExercises()
  );

  function addExercise(
    sessionId: string,
    name: string,
    orderIndex: number,
    movementPattern: MovementPattern
  ) {
    const next: SessionExercise = {
      id: crypto.randomUUID(),
      sessionId: sessionId,
      name: name,
      orderIndex: orderIndex,
      movementPattern: movementPattern,
    };

    setExercises((prev) => {
      const updated = [...prev, next];
      saveExercises(updated);
      return updated;
    });
  }

  return { exercises, addExercise };
}
