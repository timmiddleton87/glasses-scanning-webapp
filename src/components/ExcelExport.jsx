import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useStateMachine } from "little-state-machine";
import XLSX from "sheetjs-style";
import { devicesUsed, devicesReturned, devicesOutNow } from "./IssuedCounter";

function ExcelExport({ exportType, buttonTextInput }) {
  const { state } = useStateMachine();

  const [buttonStatus, setButtonStatus] = useState(true);

  const [emailResponse, setEmailResponse] = useState("");

  const [buttonText, setButtonText] = useState(buttonTextInput);

  function emailReport(reportFile) {
    console.log("emailReport Started", reportFile.length);

    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // do something to notify user
      console.log(xhr.responseText);
    });

    const formData = new FormData();
    formData.append(
      "showname",
      state.performance.showname.replace(/[*:/\\[\]?]/g, "_")
    );
    formData.append("sendto", "tim@timmiddleton.co.uk");
    formData.append(
      "showdatetime",
      (state.performance.showdate + " " + state.performance.showtime).replace(
        /[*:/\\[\]?]/g,
        "_"
      )
    );
    formData.append("report", reportFile);

    console.log(formData);

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // request succesful
          console.log("Email Success: " + xhr.responseText);
          setEmailResponse(xhr.responseText);
          setButtonStatus(false);
          setButtonText("Email Sent");
        } else {
          // request unsuccessful
          console.log("Email Failure: " + xhr.responseText);
          setEmailResponse(xhr.responseText);
          setButtonStatus(true);
          setButtonText(buttonTextInput);
        }
      }
    });

    xhr.open(
      "POST",
      "https://builtforgood.co.uk/scanning/sendmail/index.php",
      true
    );

    xhr.send(formData);
  }

  const handleOnExport = () => {
    if (state.devices.length > 0 && Object.keys(state.performance).length > 0) {
      const filename = (
        state.performance.showname +
        " - " +
        state.performance.showdate +
        " " +
        state.performance.showtime +
        ".xlsx"
      ).replace(/[*:/\\[\]?]/g, "_");

      const sheetname = state.performance.showname.replace(/[*:/\\[\]?]/g, "_");

      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet([
          [
            "Venue:",
            state.performance.venuename,
            "",
            "",
            "",
            "Glasses Used:   " + devicesUsed(state),
          ],
          [
            "Stage:",
            state.performance.stagename !== "Other..."
              ? state.performance.stagename
              : state.performance.stagename2,
            "",
            "",
            "",
            "Glasses Returned:   " + devicesReturned(state),
          ],
          [
            "Show:",
            state.performance.showname,
            "",
            "",
            "",
            "Glasses Not Returned:   " + devicesOutNow(state),
          ],
          ["Staff:", state.performance.staffname, "", "", "", ""],
          ["Date:", state.performance.showdate, "", "", "", ""],
          ["Time:", state.performance.showtime, "", "", "", ""],
        ]);

      const deviceheader = [
        {
          a: "Status",
          b: "Unit ID",
          c: "Ticket",
          d: "Issue Time",
          e: "Return Time",
          f: "Notes",
        },
      ];

      XLSX.utils.sheet_add_json(ws, deviceheader, {
        origin: "A8",
        skipHeader: true,
      });

      XLSX.utils.sheet_add_json(ws, state.devices, {
        origin: "A9",
        skipHeader: true,
      });

      for (let i in ws) {
        if (typeof ws[i] != "object") continue;

        ws[i].s = {
          // styling for all cells
          font: {
            name: "arial",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
            wrapText: true,
          },
        };
      }

      const highlightfont = {
        sz: 16,
        bold: true,
        color: {
          rgb: "FFAA00",
        },
      };

      const performancerows = ["1", "2", "3", "4", "5", "6"];
      const performancecols = ["A", "B", "F"];

      for (let i = 0; i < performancecols.length; i++) {
        for (let j = 0; j < performancerows.length; j++) {
          ws[performancecols[i] + performancerows[j]].s = {
            font: highlightfont,
            alignment: {
              horizontal: "left",
            },
          };
        }
      }

      const headerrow = "8";
      const headercols = ["A", "B", "C", "D", "E", "F"];

      for (let i = 0; i < headercols.length; i++) {
        ws[headercols[i] + headerrow].s = {
          font: highlightfont,
          alignment: {
            horizontal: "center",
          },
        };
      }

      // COLUMN WIDTHS

      const wscols = [
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 100 },
      ];
      ws["!cols"] = wscols;

      // CELL MERGES

      const wsmerge = [
        { s: { r: 0, c: 1 }, e: { r: 0, c: 4 } },
        { s: { r: 1, c: 1 }, e: { r: 1, c: 4 } },
        { s: { r: 2, c: 1 }, e: { r: 2, c: 4 } },
        { s: { r: 3, c: 1 }, e: { r: 3, c: 4 } },
        { s: { r: 4, c: 1 }, e: { r: 4, c: 4 } },
        { s: { r: 5, c: 1 }, e: { r: 5, c: 4 } },
      ];

      ws["!merges"] = wsmerge;

      XLSX.utils.book_append_sheet(wb, ws, sheetname);

      if (exportType === "download" && buttonStatus) {
        console.log("Downloading Report");
        XLSX.writeFile(wb, filename);
        setButtonStatus(false);
        setButtonText("Downloaded");
      } else if (exportType === "email" && buttonStatus) {
        console.log("Emailing Report");
        emailReport(XLSX.write(wb, { bookType: "xlsx", type: "base64" }));
        setButtonStatus(false);
        setButtonText("");
      }
    } else {
      console.log("Couldn't export to Excel...");
      setButtonStatus(true);
      setButtonText(buttonTextInput);
    }
  };

  return (
    <>
      <Button disabled={!buttonStatus} onClick={handleOnExport}>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          hidden={buttonText.length > 0 ? true : false}
        />
        {buttonText}
      </Button>
    </>
  );
}

export default ExcelExport;
