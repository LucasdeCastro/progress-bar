import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProgressBar, { PROGRESS_BAR_STATES } from "./ProgressBar"

describe("ProgressBar v1", () => {
  it("render EMPTY state", async () => {
    const setState = jest.fn();
    render(<ProgressBar
      state={PROGRESS_BAR_STATES.EMPTY}
      setProgressState={setState}
    />);

    const [progress] = document.getElementsByClassName("progress");

    expect(progress).not.toHaveClass("loading");
    expect(setState.mock.calls.length).toBe(0)
  })

  it("render LOADING state", async () => {
    const setState = jest.fn();
    render(<ProgressBar
      state={PROGRESS_BAR_STATES.LOADING}
      setProgressState={setState}
    />);

    const [progress] = document.getElementsByClassName("progress");

    expect(progress).toHaveClass("loading");
    expect(setState.mock.calls.length).toBe(0);
  })

  it("render DONE state", async () => {
    const setState = jest.fn();
    render(<ProgressBar
      state={PROGRESS_BAR_STATES.DONE}
      setProgressState={setState}
    />);

    const [progress] = document.getElementsByClassName("progress");
    expect(progress).not.toHaveClass("loading");
    expect(progress).toHaveClass("complete");

    fireEvent.animationEnd(progress);
    expect(progress).not.toHaveClass("complete");
    expect(setState.mock.calls.length).toBe(1);
    expect(setState.mock.calls[0][0]).toBe(PROGRESS_BAR_STATES.EMPTY);
  })
})
