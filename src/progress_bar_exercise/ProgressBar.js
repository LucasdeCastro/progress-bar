import React, { useEffect, useRef } from "react";

export const PROGRESS_BAR_STATES = {
  LOADING: "LOADING",
  EMPTY: "EMPTY",
  DONE: "DONE",
}

const useProgressBarEffects = (state, setProgressState) => {
  const ref = useRef();
  
  useEffect(() => {
    if(!ref.current) return;
    const element = ref.current;

    element.addEventListener('animationend', () => {
      setProgressState(PROGRESS_BAR_STATES.EMPTY);
      if(element)
        element.classList.remove("complete");
    });

    if (state === PROGRESS_BAR_STATES.LOADING) {
      element.classList.add("loading");
    } 
    
    if(state === PROGRESS_BAR_STATES.DONE){
      element.classList.remove("loading");
      element.classList.add("complete");
    }
  }, [setProgressState, state]);

  return ref;
}

const ProgressBar = ({ state, setProgressState }) => {
  const ref = useProgressBarEffects(state, setProgressState);

  return (
    <div className="progress-bar">
      <div
        ref={ref}
        className={`progress`}
      />
    </div>
  )
}

export default ProgressBar;