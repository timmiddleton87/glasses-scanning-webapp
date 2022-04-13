import { React, useEffect } from "react";
import { useStateMachine } from "little-state-machine";
import { COLUMNS } from "./columns";
import Table from "./Table";

function TableFeeder() {
  const { state } = useStateMachine();

  const columns = COLUMNS;

  useEffect(() => {
    console.log("REFRESH TABLE");
  }, [state.devices]);

  return (
    <>
      <Table columns={columns} data={state.devices} />
    </>
  );
}

export default TableFeeder;
