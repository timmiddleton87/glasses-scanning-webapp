import React from "react";
import { useStateMachine } from "little-state-machine";
import DeviceForm from "./DeviceForm";

function DeviceList() {
  const { state, actions } = useStateMachine();

  return (
    <>
      <span className="same-line-span">
        <DeviceForm onSubmit={addDevice} />
        <button onClick={handleClearAll} className="clearall-button">
          Clear All
        </button>
      </span>
      <Device
        devices={devices}
        returnDevice={returnDevice}
        removeDevice={removeDevice}
        updateDevice={updateDevice}
        removeAllDevices={removeAllDevices}
      />
    </>
  );
}

export default DeviceList;
