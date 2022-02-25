import React from "react";
import { LiveTime } from "./TimeDisplay";
import PerformanceInfo from "./PerformanceInfo";
import Footer from "./Footer";
import { useStateMachine } from "little-state-machine";

function AppHandler() {
  function updatePerformanceAction(state, payload) {
    return {
      ...state,

      performance: {
        ...payload,
      },
    };
  }

  function clearPerformanceAction(state) {
    return {
      ...state,

      performance: {},
    };
  }

  function updateDevicesAction(state, payload) {
    return {
      ...state,

      devices: {
        ...payload,
      },
    };
  }

  function clearDevicesAction(state) {
    return {
      ...state,

      devices: {},
    };
  }

  const { state, actions } = useStateMachine({
    updatePerformanceAction,
    clearPerformanceAction,
    updateDevicesAction,
    clearDevicesAction,
  });

  return (
    <>
      <div className="header">
        <div className="header-left">Glasses Tracker</div>
        <div className="header-center">
          <PerformanceInfo state={state} actions={actions} />
        </div>
        <div className="header-right">
          <LiveTime />
        </div>
      </div>
      <div className="app-main"></div>
      <Spreadsheet state={state} actions={actions} />
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default AppHandler;
