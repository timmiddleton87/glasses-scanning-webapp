import React from "react";
import { useStateMachine } from "little-state-machine";
import { Button, Stack } from "react-bootstrap";

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

function Footer({ resetdata }) {
  const { state, actions } = useStateMachine({
    clearAllAction,
    resetDevicesAction,
  });
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <p></p>
        <Button
          onClick={() => {
            actions.clearAllAction({});
          }}
        >
          Clear All
        </Button>
        <Button
          onClick={() => {
            actions.resetDevicesAction(resetdata);
          }}
        >
          Reset Devices
        </Button>
      </Stack>
    </>
  );
}

export default Footer;
