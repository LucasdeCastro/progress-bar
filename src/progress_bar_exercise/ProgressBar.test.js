import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProgressBar, { PROGRESS_BAR_STATES } from "./ProgressBar"

const waitTime = time => new Promise(resolve => setTimeout(resolve, time));
const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve));

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

  it("render with LOADING state", async () => {
    const setState = jest.fn();
    render(<ProgressBar
      state={PROGRESS_BAR_STATES.LOADING}
      setProgressState={setState}
    />);

    await waitRAF();
    const [progress] = document.getElementsByClassName("progress");

    expect(progress).toHaveClass("loading");
    expect(setState.mock.calls.length).toBe(0);
  })

  it("render with DONE state", async () => {
    const setState = jest.fn();
    render(<ProgressBar
      state={PROGRESS_BAR_STATES.DONE}
      setProgressState={setState}
    />);

    await waitRAF();
    const [progress] = document.getElementsByClassName("progress");
    expect(progress).not.toHaveClass("loading");
    expect(progress).toHaveClass("complete");

    fireEvent.animationEnd(progress);
    expect(progress).not.toHaveClass("complete");
    expect(setState.mock.calls.length).toBe(1);
    expect(setState.mock.calls[0][0]).toBe(PROGRESS_BAR_STATES.EMPTY);
  })
})

describe("ProgressBar v2", () => {
  it("render with BreakPoints", async () => {
    const setState = jest.fn();
    render(<ProgressBar
      breakPoints={[5, 50]}
      state={PROGRESS_BAR_STATES.LOADING}
      setProgressState={setState}
    />);

    jest
      .spyOn(
        document.getElementsByClassName("progress-bar")[0],
        'offsetWidth',
        'get'
      )
      .mockImplementation(() => 100);

    const [progress] = document.getElementsByClassName("progress");

    jest
      .spyOn(
        progress,
        'offsetWidth',
        'get'
      )
      .mockImplementation(() => {
        const elem = document.getElementsByClassName("progress")[0];
        return parseInt(elem.style.width || 0);
      });

    await waitRAF();
    expect(progress.style.width).toBe("1px");

    await waitTime(500);
    expect(parseInt(progress.style.width)).toBeGreaterThan(4);
    expect(parseInt(progress.style.width)).toBeLessThan(7);

    await waitTime(500);
    expect(parseInt(progress.style.width)).toBeGreaterThan(27);
    expect(parseInt(progress.style.width)).toBeLessThan(32);
  })
})
