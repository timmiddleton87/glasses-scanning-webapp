import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { LiveTime } from "./components/TimeDisplay";
import PerformanceInfo from "./components/PerformanceInfo";
import Footer from "./components/Footer";
import MOCK_DATA from "./components/MOCK_DATA.json";
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from "little-state-machine";
import TableFeeder from "./components/TableFeeder";
import IssuedCounter from "./components/IssuedCounter";

const defaultData = {
  devices: MOCK_DATA,
  performance: {},
};

createStore(defaultData, {
  name: "bfgStore",
  storageType: localStorage,
});

function Device() {
  const { state } = useStateMachine();
  console.log(state);
  return (
    <>
      <p>
        You: {state.yourDetails.name}
        {state.yourDetails.counter}
      </p>
    </>
  );
}

function resetDevicesAction(globalState, payload) {
  return {
    ...globalState,
    devices: defaultData.devices,
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

function ResetDevices() {
  const { state, actions } = useStateMachine({
    resetDevicesAction,
  });
  return (
    <button
      onClick={() => {
        actions.resetDevicesAction({});
      }}
    >
      reset devices
    </button>
  );
}

function App() {
  return (
    <>
      <StateMachineProvider>
        <div className="header">
          <div className="header-left">Glasses Tracker</div>
          <div className="header-center">
            <PerformanceInfo />
          </div>
          <div className="header-right">
            <LiveTime />
            <IssuedCounter />
          </div>
        </div>
        <div className="app-main">
          <TableFeeder />
        </div>
        <div className="footer">
          <ClearAll />
          <ResetDevices />
          <Footer />
        </div>
      </StateMachineProvider>
    </>
  );
}

export default App;
