import React from "react";
import { useStateMachine } from "little-state-machine";

function IssuedCounter() {
  const { state } = useStateMachine();

  let data = []; // Clear it first, in case of empty input array

  if (state.devices.length > 0) {
    data = state.devices;
  }

  const numberOfResults =
    data.length + " result" + (data.length == 1 ? "" : "s");

  return (
    <>
      <h2>{numberOfResults}</h2>
    </>
  );
}

export default IssuedCounter;
