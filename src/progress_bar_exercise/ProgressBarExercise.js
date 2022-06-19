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
  const [stateWithBreakPoints, setProgressStateWithBreakPoints] = useState(PROGRESS_BAR_STATES.EMPTY);
  return (
    <article className="container">
      <h2>Solution v2</h2>

      <section className="container">
        <h3>ProgressBar without breakpoints</h3>
        <ProgressBar state={state} setProgressState={setProgressState} />
        <ProgressControls state={state} setProgressState={setProgressState} />
      </section>

      <section className="container">
        <h3>ProgressBar with breakpoints</h3>
        <ProgressBar
          breakPoints={[20, 95]}
          state={stateWithBreakPoints}
          setProgressState={setProgressStateWithBreakPoints}
        />
        <ProgressControls
          state={stateWithBreakPoints}
          setProgressState={setProgressStateWithBreakPoints} />
      </section>
    </article>
  );
};
