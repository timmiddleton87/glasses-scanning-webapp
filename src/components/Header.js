import React from "react";
import { LiveTime } from "./TimeDisplay";
import PerformanceForm from "./PerformanceForm";

function Header() {
  return (
    <>
      <div className="header-left">BFG Glasses Tracker</div>
      <div className="header-center">
        <PerformanceForm />
      </div>
      <div className="header-right">
        <LiveTime />
        <p></p>
      </div>
    </>
  );
}

export default Header;
