import React, { useMemo } from "react";
import { useTable } from "react-table";
import BTable from "react-bootstrap/Table";
import "./tables.css";

const Table = (props) => {
  const columns = useMemo(() => props.columns, []);

  let data = []; // Clear it first, in case of empty input array

  if (props.data.length > 0) {
    data = props.data;
  }

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="device_table_container">
      <BTable
        className="device_table"
        striped
        bordered
        size="sm"
        {...getTableProps()}
      >
        <thead className="device_table_head">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={column.render("selector")}
                  style={{ width: column.render("width") }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className={"device_status_" + row.cells[0].value}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>
    </div>
  );
};

export default Table;
