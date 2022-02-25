import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
  GlobalState,
} from "little-state-machine";
import AppHandler from "./components/AppHandler";

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
        <AppHandler />
      </StateMachineProvider>
    </>
  );
}

export default App;
