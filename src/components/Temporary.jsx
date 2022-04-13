import React from "react";
import { useStateMachine } from "little-state-machine";

function Temporary() {
  const { state } = useStateMachine();

  // USE THIS TO SHOW DOWNLOAD AND EMAIL STATUS
  var variable1 =
    typeof state.exports !== "undefined"
      ? "D: " + state.exports.downloaded + ", E: " + state.exports.emailed
      : 0;

  // USE THIS TO SHOW APP VERSION
  var variable2 = "App Version: " + state.version;

  return <div>{variable2}</div>;
}

export default Temporary;
