import React from "react";
import { useStateMachine } from "little-state-machine";
import { Button, Stack } from "react-bootstrap";
import ExcelExport from "./ExcelExport";
import GlassesModals from "./GlassesModals";
import { BrowserView } from "react-device-detect";

function resetDevicesAction(globalState, payload) {
  return {
    ...globalState,
    devices: payload.devices,
  };
}

function clearAllAction(globalState, payload) {
  return {
    ...globalState,
    devices: [],
    performance: {},
  };
}

function Footer({ resetdata }) {
  const { actions } = useStateMachine({
    clearAllAction,
    resetDevicesAction,
  });
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <p></p>
        {/* <Button
          onClick={() => {
            actions.clearAllAction({});
          }}
        >
          Clear All
        </Button> */}
        <Button
          onClick={() => {
            actions.resetDevicesAction(resetdata);
          }}
        >
          Reset Devices
        </Button>
        <GlassesModals />
        <BrowserView>
          <ExcelExport
            exportType="download"
            buttonTextInput="Download Report"
          />
        </BrowserView>
        <ExcelExport exportType="email" buttonTextInput="Email Report" />
      </Stack>
    </>
  );
}

export default Footer;
