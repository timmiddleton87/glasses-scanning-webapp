import React from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

interface Device {
  controller_id: string;
  glasses_id: string;
  status: string;
  issue_time: string;
  return_time: string;
  ticket_id: string;
  notes: string;
}

const getPeople = (): Device[] => [
  { controller_id: "01", glasses_id: "11", status: "", issue_time: "", return_time: "", ticket_id: "", notes: ""},
  { controller_id: "02", glasses_id: "12", status: "", issue_time: "", return_time: "", ticket_id: "", notes: ""},
  { controller_id: "03", glasses_id: "13", status: "", issue_time: "", return_time: "", ticket_id: "", notes: ""},
  { controller_id: "04", glasses_id: "14", status: "", issue_time: "", return_time: "", ticket_id: "", notes: ""},
  { controller_id: "05", glasses_id: "15", status: "", issue_time: "", return_time: "", ticket_id: "", notes: ""},
];

const getColumns = (): Column[] => [
  { columnId: "controller_id", width: 150 },
  { columnId: "glasses_id", width: 150 },
  { columnId: "status", width: 150 },
  { columnId: "issue_time", width: 150 },
  { columnId: "return_time", width: 150 },
  { columnId: "ticket_id", width: 150 },
  { columnId: "notes", width: 400 },
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
      { type: "text", text: device.controller_id },
      { type: "text", text: device.glasses_id },
      { type: "text", text: device.status },
      { type: "text", text: device.issue_time },
      { type: "text", text: device.return_time },
      { type: "text", text: device.ticket_id },
      { type: "text", text: device.notes },
    ]
  }))
];

function Spreadsheet() {
  const [people] = React.useState<Device[]>(getPeople());

  const rows = getRows(people);
  const columns = getColumns();

  return <ReactGrid rows={rows} columns={columns} />;
}

export default Spreadsheet;