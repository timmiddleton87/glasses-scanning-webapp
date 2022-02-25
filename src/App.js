import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import { LiveTime } from "./components/TimeDisplay";
import PerformanceInfo from "./components/PerformanceInfo";
import Footer from "./components/Footer";
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from "little-state-machine";
import Spreadsheet from "./components/Spreadsheet.tsx";

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
        <div className="app-main"></div>
        <Spreadsheet />
        <div className="footer">
          <Footer />
        </div>
      </StateMachineProvider>
=======
import DeviceList from "./components/DeviceList";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const FooterScrollLength = () => {
    return "footer scroll";
  };

  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="app-main">
        <DeviceList />
      </div>
      <div className="footer">
        <Footer />
      </div>
>>>>>>> parent of 336f6a7 (Feature update)
    </>
  );
}

export default App;
