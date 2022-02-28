import React from "react";
import { useStateMachine } from "little-state-machine";

function resetDevicesAction(globalState, payload) {
  return {
    ...globalState,
    devices: payload.devices,
  };
}

function clearAllAction(globalState, payload) {
  return {
    ...globalState,
    devices: {},
    performance: {},
  };
}

function ClearAll() {
  const { state, actions } = useStateMachine({
    clearAllAction,
  });
  return (
    <button
      onClick={() => {
        actions.clearAllAction({});
      }}
    >
      clear all
    </button>
  );
}

function ResetDevices({ resetdata }) {
  const { state, actions } = useStateMachine({
    resetDevicesAction,
  });
  return (
    <button
      onClick={() => {
        actions.resetDevicesAction(resetdata);
      }}
    >
      reset devices
    </button>
  );
}

function Footer({ resetdata }) {
  return (
    <>
      <ClearAll />
      <ResetDevices resetdata={resetdata} />
    </>
  );
}

export default Footer;
