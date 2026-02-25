import React, { useState } from 'react';
import { useWorkoutStore } from '../features/workout/store/workoutStore';

const WorkoutForm = () => {
  const { addWorkout } = useWorkoutStore();

  const [name, setName] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    addWorkout(name, completedAt, notes);

    setName('');
    setCompletedAt('');
    setNotes('');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="completedAt">Completed At:</label>
          <input
            type="text"
            id="completedAt"
            value={completedAt}
            onChange={(e) => setCompletedAt(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="notes">Notes: </label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </p>
        <p>
          <button>Save Workout</button>
        </p>
      </form>
    </>
  );
};

export default WorkoutForm;
