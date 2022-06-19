import React from "react";
import { PROGRESS_BAR_STATES } from "./ProgressBar";

const ProgressControls = ({ state, setProgressState }) => {
  const isActive = state === PROGRESS_BAR_STATES.EMPTY;

  return (
    <div className="progress-controls">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setProgressState(PROGRESS_BAR_STATES.LOADING)}
        disabled={!isActive}
      >
        {isActive
          ? "Start Request"
          : "Loading..."}
      </button>

      <button
        onClick={() => setProgressState(PROGRESS_BAR_STATES.DONE)}
        className="btn btn-danger"
        type="button"
      >
        Finish Request
      </button>
    </div>
  )
}

export default ProgressControls;