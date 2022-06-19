import React, { useState } from "react";
import Exercise from "../exercise/Exercise";
import ProgressBar, { PROGRESS_BAR_STATES } from "./ProgressBar";
import ProgressControls from "./ProgressControls"

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [state, setProgressState] = useState(PROGRESS_BAR_STATES.EMPTY);
  return (
    <section className="container">
      <ProgressBar state={state} setProgressState={setProgressState} />
      <ProgressControls state={state} setProgressState={setProgressState} />
    </section>
  );
};
