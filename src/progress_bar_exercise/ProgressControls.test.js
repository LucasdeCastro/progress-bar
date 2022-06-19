import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PROGRESS_BAR_STATES } from "./ProgressBar"
import ProgressControls from "./ProgressControls"

describe("ProgressControls", () => {
  it("actions", async () => {
    const setState = jest.fn();

    render(
      <ProgressControls 
        state={PROGRESS_BAR_STATES.EMPTY} 
        setProgressState={setState}
      />
    )

    fireEvent.click(screen.getByText("Start Request"));
    expect(setState.mock.calls[0][0]).toBe(PROGRESS_BAR_STATES.LOADING);

    fireEvent.click(screen.getByText("Finish Request"));
    expect(setState.mock.calls[1][0]).toBe(PROGRESS_BAR_STATES.DONE);
  })

  it("render state LOADING", () => {
    const setState = jest.fn();
    render(
      <ProgressControls 
        state={PROGRESS_BAR_STATES.LOADING} 
        setProgressState={setState}
      />
    )
    
    const [primaryButton] = document.getElementsByTagName("button");
    expect(primaryButton.textContent).toBe("Loading...")

    fireEvent.click(screen.getByText("Loading..."));
    expect(setState.mock.calls.length).toBe(0)
  })
})
