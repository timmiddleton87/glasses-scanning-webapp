import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import DeviceList from "./components/DeviceList";
import { LiveTime } from "./components/TimeDisplay";
import PerformanceInfo from "./components/PerformanceInfo";
import Footer from "./components/Footer";
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from "little-state-machine";

function App() {
  createStore(
    {
      performance: {},
      devices: {},
    },
    {
      storageType: localStorage,
    }
  );
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
          </div>
        </div>
        <div className="app-main">
          <DeviceList />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </StateMachineProvider>
    </>
  );
}

export default App;
