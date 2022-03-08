import React from "react";
import { useStateMachine } from "little-state-machine";

export function ResultCounter() {
  const { state } = useStateMachine();

  let data = []; // Clear it first, in case of empty input array

  if (state.devices.length > 0) {
    data = state.devices;
  }

  const numberOfResults =
    data.length + " result" + (data.length === 1 ? "" : "s");

  return <>{numberOfResults}</>;
}

export function DeviceCounter({ searchstatus }) {
  const { state } = useStateMachine();

  let status2 = [];

  if (state.devices.length > 0) {
    let status = state.devices.filter((a) => a.status == searchstatus);
    if (status.length > 0 || status.length !== null) {
      status2 = status;
    }
  }

  return <>{status2.length}</>;
}
