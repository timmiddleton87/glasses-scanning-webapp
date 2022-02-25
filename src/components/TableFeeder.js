import React from "react";
import { useStateMachine } from "little-state-machine";
import { COLUMNS } from "./columns";
import Table from "./Table";

function TableFeeder() {
  const { state } = useStateMachine();

  const columns = COLUMNS;

  return (
    <>
      <Table columns={columns} data={state.devices} />
    </>
  );
}

export default TableFeeder;
