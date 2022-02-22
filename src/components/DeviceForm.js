import React, { useState, useEffect, useRef } from "react";

function DeviceForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="device-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="device-input edit"
          />
          <button onClick={handleSubmit} className="device-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a device"
            value={input}
            onChange={handleChange}
            name="text"
            className="device-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="device-button">
            Add device
          </button>
        </>
      )}
    </form>
  );
}

export default DeviceForm;
