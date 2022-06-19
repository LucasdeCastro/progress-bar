import React, { useEffect, useRef } from "react";

export const PROGRESS_BAR_STATES = {
  LOADING: "LOADING",
  EMPTY: "EMPTY",
  DONE: "DONE",
}

const SLOW_ANIMATION_CICLE = 100;
const FAST_ANIMATION_CICLE = 0;
const BREADKPOINT_PADDING = {
  LEFT: 0,
  RIGHT: 0
}

const useProgressBarEffects = (state, setProgressState, breakPoints = []) => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    element.addEventListener('animationend', () => {
      setProgressState(PROGRESS_BAR_STATES.EMPTY);
      if (element) element.classList.remove("complete");
    });
  }, [setProgressState])

  useEffect(() => {
    let animationFrameID;
    let animationCicleInterval = 10;
    let previousAnimationCicle = Date.now() - animationCicleInterval;

    const breakPointsList = [].concat(breakPoints).sort((a, b) => b - a);

    const handleProgress = () => {
      const element = ref.current;
      const MAX_WIDTH = element.parentElement.offsetWidth;
  
      const currentWidth = element.offsetWidth;
      const percent = parseInt(currentWidth * 100 / MAX_WIDTH);

      const isDone = state === PROGRESS_BAR_STATES.DONE;
      const isLoading = state === PROGRESS_BAR_STATES.LOADING;
      const hasMaxWidth = percent === 100;

      if (isDone || hasMaxWidth) {
        element.classList.remove("loading");
        element.classList.add("complete");
        element.style.width = "";
        return;
      }

      const currentCicleTime = Date.now() - previousAnimationCicle;
      if (currentCicleTime < animationCicleInterval)
        return animationFrameID = window.requestAnimationFrame(handleProgress);

      if (isLoading && breakPointsList.length === 0) {
        element.classList.add("loading");
      }

      if (isLoading && breakPointsList.length > 0) {
        const currentBreakPoint = breakPointsList[breakPointsList.length - 1];
        const isAroundBreakPoint =
           currentBreakPoint - BREADKPOINT_PADDING.LEFT <= percent 
        && currentBreakPoint + BREADKPOINT_PADDING.RIGHT >= percent;

        animationCicleInterval = 
          isAroundBreakPoint ? SLOW_ANIMATION_CICLE : FAST_ANIMATION_CICLE;

        if (currentBreakPoint < percent && breakPointsList.length > 1) {
          breakPointsList.pop();
        }

        const width = Math.min(MAX_WIDTH, currentWidth + 1);
        element.style.width = `${width}px`;
      }

      previousAnimationCicle = Date.now();
      animationFrameID = window.requestAnimationFrame(handleProgress);
    }

    previousAnimationCicle = Date.now();
    animationFrameID = window.requestAnimationFrame(handleProgress);

    return () => window.cancelAnimationFrame(animationFrameID);
  }, [breakPoints, setProgressState, state]);

  return ref;
}

const ProgressBar = ({ state, setProgressState, breakPoints }) => {
  const ref = useProgressBarEffects(state, setProgressState, breakPoints);

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