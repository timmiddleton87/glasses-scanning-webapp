import React from "react";
import { ReactGrid, Column, Row, CellChange, TextCell, Highlight } from "@silevis/reactgrid";
import { useStateMachine } from "little-state-machine";
import "@silevis/reactgrid/styles.css";

const colwidth = 150;
// const rowheight = 20;

interface Device {
  controller_id: number;
  glasses_id: number;
  status: string;
  issue_time: string;
  return_time: string;
  ticket_id: string;
  notes: string;
}

const getDevices = (): Device[] => [
  {
          controller_id: 1,
          glasses_id: 1,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 2,
          glasses_id: 2,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 3,
          glasses_id: 3,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 4,
          glasses_id: 4,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 5,
          glasses_id: 5,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 6,
          glasses_id: 6,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 7,
          glasses_id: 7,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 8,
          glasses_id: 8,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 9,
          glasses_id: 9,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 10,
          glasses_id: 10,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 11,
          glasses_id: 11,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 12,
          glasses_id: 12,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 13,
          glasses_id: 13,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 14,
          glasses_id: 14,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 15,
          glasses_id: 15,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 16,
          glasses_id: 16,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 17,
          glasses_id: 17,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 18,
          glasses_id: 18,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 19,
          glasses_id: 19,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 20,
          glasses_id: 20,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 21,
          glasses_id: 21,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 22,
          glasses_id: 22,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 23,
          glasses_id: 23,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 24,
          glasses_id: 24,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 25,
          glasses_id: 25,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 26,
          glasses_id: 26,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 27,
          glasses_id: 27,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 28,
          glasses_id: 28,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 29,
          glasses_id: 29,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
        {
          controller_id: 30,
          glasses_id: 30,
          status: "",
          issue_time: "",
          return_time: "",
          ticket_id: "",
          notes: "",
        },
];


const getColumns = (): Column[] => [
  { columnId: "controller_id", width: colwidth },
  { columnId: "glasses_id", width: colwidth },
  { columnId: "status", width: colwidth },
  { columnId: "issue_time", width: colwidth },
  { columnId: "return_time", width: colwidth },
  { columnId: "ticket_id", width: colwidth },
  { columnId: "notes", width: (4*colwidth) },
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Controller ID" },
    { type: "header", text: "Glasses ID" },
    { type: "header", text: "Status" },
    { type: "header", text: "Issue Time" },
    { type: "header", text: "Return Time" },
    { type: "header", text: "Ticket ID" },
    { type: "header", text: "Notes" }
  ]
};

const getRows = (devices: Device[]): Row[] => [
  headerRow,
  ...devices.map<Row>((device, idx) => ({
    rowId: idx,
    cells: [
      { type: "number", value: device.controller_id },
      { type: "number", value: device.glasses_id },
      { type: "text", text: device.status },
      { type: "text", text: device.issue_time },
      { type: "text", text: device.return_time },
      { type: "text", text: device.ticket_id },
      { type: "text", text: device.notes },
    ]
  }))
];

const applyChangesToDevices = (
  changes: CellChange<TextCell>[],
  prevDevices: Device[]
): Device[] => {
  changes.forEach((change) => {
    const deviceIndex = change.rowId;
    const fieldName = change.columnId;
    prevDevices[deviceIndex][fieldName] = change.newCell.text;
  });
  return [...prevDevices];
};

// const highlights: Highlight[] = [
//   { columnId: "status", rowId: 1, borderColor: "#00ff00" },
//   { columnId: "status", rowId: 7, borderColor: "#0000ff" },
//   { columnId: "status", rowId: 12, borderColor: "#ff0000" }
// ];

function Spreadsheet({state, actions}) {
  
  const [devices] = React.useState<Device[]>(getDevices());

  const rows = getRows(devices);
  const columns = getColumns();


  if ([devices] != null) {
    actions.updateDevicesAction({
      ...[devices],
    });
  }

  // const handleChanges = (changes: CellChange<TextCell>[]) => { 
  //   setDevices((prevDevices) => applyChangesToDevices(changes, prevDevices)); 
  // }; 

  return (
    <div className="reactgrid-wrapper">
      <ReactGrid
        rows={rows}
        columns={columns}
        stickyTopRows={1}
        // onCellsChanged={handleChanges}
      />
    </div>
  )
}

export default Spreadsheet;