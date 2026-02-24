export type WorkoutSession = {
  id: string;
  name: string;
  completedAt: string;
  notes?: string;
};

type MovementPattern = 'push' | 'pull' | 'squat' | 'hinge' | 'lunge';

export type SessionExercise = {
  id: string;
  sessionId: string;
  name: string;
  orderIndex: number;
  movementPattern: MovementPattern;
};

export type ExerciseSet = {
  id: string;
  exerciseId: string;
  repetitions: number;
  weight: number;
};
