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

  function getExercise(id: string): SessionExercise | undefined {
    return exercises.find((e) => e.id === id);
  }

  function updateExercise(
    id: string,
    name: string,
    orderIndex: number,
    movementPattern: MovementPattern
  ) {
    setExercises((prev) => {
      const next = prev.map((e) =>
        e.id === id ? { ...e, name, orderIndex, movementPattern } : e
      );

      setExercises(next);
      return next;
    });
  }

  function deleteExercise(id: string) {
    setExercises((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveExercises(next);
      return next;
    });
  }

  return {
    exercises,
    addExercise,
    getExercise,
    updateExercise,
    deleteExercise,
  };
}
