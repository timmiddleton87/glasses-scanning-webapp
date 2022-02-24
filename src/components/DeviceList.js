import React, { useState, useEffect } from "react";
import DeviceForm from "./DeviceForm";
import Device from "./Device";

function DeviceList() {
  let initDevice;
  if (localStorage.getItem("devices") === null) {
    initDevice = [];
  } else {
    initDevice = JSON.parse(localStorage.getItem("devices"));
  }

  const [devices, setDevices] = useState(initDevice);
  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices));
  }, [devices]);

  const addDevice = (device) => {
    if (!device.text || /^\s*$/.test(device.text)) {
      return;
    }

    const newDevices = [device, ...devices];

    setDevices(newDevices);
    console.log(newDevices);
    localStorage.setItem("devices", JSON.stringify(devices));
  };

  const updateDevice = (deviceId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setDevices((prev) =>
      prev.map((item) => (item.id === deviceId ? newValue : item))
    );
  };

  const removeDevice = (id) => {
    const removedArr = [...devices].filter((device) => device.id !== id);

    setDevices(removedArr);
  };

  const removeAllDevices = () => {
    setDevices([]);
  };

  const handleClearAll = (e) => {
    removeAllDevices();
  };

  const returnDevice = (id) => {
    let updatedDevices = devices.map((device) => {
      if (device.id === id) {
        device.isReturned = !device.isReturned;
      }
      return device;
    });
    setDevices(updatedDevices);
  };

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
