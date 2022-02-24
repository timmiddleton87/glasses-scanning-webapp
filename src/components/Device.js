import React, { useState } from "react";
import DeviceForm from "./DeviceForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Device = ({ devices, returnDevice, removeDevice, updateDevice }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateDevice(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <DeviceForm edit={edit} onSubmit={submitUpdate} />;
  }

  return devices.map((device, index) => (
    <div
      className={device.isReturned ? "device-row returned" : "device-row"}
      key={index}
    >
      <div key={device.id} onClick={() => returnDevice(device.id)}>
        {device.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeDevice(device.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: device.id, value: device.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Device;
