import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useStateMachine } from "little-state-machine";
import XLSX from "sheetjs-style";
import { devicesUsed, devicesReturned, devicesOutNow } from "./IssuedCounter";
import toast from "react-hot-toast";

// SET THESE TO ADJUST THE SENDING PATTERN!
const recipientEmail = "housemanager@peopleslight.org";
const phpMailServer = "https://builtforgood.co.uk/scanning/sendmail/index.php";

const INITIAL_EXPORT = {
  downloaded: false,
  emailed: false,
};

const BUTTON_MESSAGES = {
  email_default: "Email Report",
  download_default: "Download Report",
  email_empty: "",
  download_empty: "",
  email_sent: "Email Sent",
  download_complete: "File Downloaded",
};

function updateButtonStatus(globalState, payload) {
  return {
    ...globalState,
    exports: {
      ...globalState.exports,
      ...payload,
    },
  };
}

function ExcelExport({ exportType }) {
  const { state } = useStateMachine();
  const { actions } = useStateMachine({
    updateButtonStatus,
  });

  const [buttonPressed, setButtonPressed] = useState(state.exports.downloaded);
  const [buttonText, setButtonText] = useState("");

  function controlButtonState() {
    if (exportType === "download") {
      setButtonPressed(state.exports.downloaded);
      if (state.exports.downloaded) {
        setButtonText(BUTTON_MESSAGES.download_complete);
      } else {
        setButtonText(BUTTON_MESSAGES.download_default);
      }
    } else {
      setButtonPressed(state.exports.emailed);
      if (state.exports.emailed) {
        setButtonText(BUTTON_MESSAGES.email_sent);
      } else {
        setButtonText(BUTTON_MESSAGES.email_default);
      }
    }
  }

  useEffect(() => {
    if (typeof state.exports === "undefined") {
      console.log("EXPORT DID NOT EXIST", exportType);
      actions.updateButtonStatus(INITIAL_EXPORT);
    } else {
      console.log("EXPORT EXISTED", exportType);
      console.log(state.exports);
      controlButtonState();
    }
  });

  useEffect(() => {
    controlButtonState();
  }, [state.exports]);

  function emailReport(reportFile) {
    console.log("emailReport Started", reportFile.length);
    toast.loading("Emailing...");

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
    formData.append("sendto", recipientEmail);
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
          toast.success("Email Sent!");
          setButtonPressed(true);
          setButtonText(BUTTON_MESSAGES.email_sent);
          actions.updateButtonStatus({
            emailed: true,
          });
          return true;
        } else {
          // request unsuccessful
          console.log("Email Failure: " + xhr.responseText);
          toast.error("Email Failed!");
          setButtonPressed(false);
          setButtonText(BUTTON_MESSAGES.email_default);
          actions.updateButtonStatus({
            emailed: false,
          });
          return false;
        }
      }
    });

    xhr.open("POST", phpMailServer, true);

    xhr.send(formData);
  }

  const handleOnExport = () => {
    if (state.performance.staffname !== "") {
      const filename = (
        state.performance.showdate +
        " " +
        state.performance.showtime +
        " - " +
        state.performance.showname +
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

      if (exportType === "download" && !buttonPressed) {
        toast.success("Download Success!");
        console.log("Downloading Report");
        XLSX.writeFile(wb, filename);
        setButtonPressed(true);
        setButtonText(BUTTON_MESSAGES.download_complete);
        actions.updateButtonStatus({
          downloaded: true,
        });
      } else if (exportType === "email" && !buttonPressed) {
        console.log("Emailing Report");
        emailReport(XLSX.write(wb, { bookType: "xlsx", type: "base64" }));
        setButtonPressed(true);
        setButtonText(BUTTON_MESSAGES.email_empty);
        actions.updateButtonStatus({
          emailed: true,
        });
      }
    } else {
      console.log("Couldn't export to Excel...");
      setButtonPressed(false);
      if (exportType === "download") {
        setButtonText(BUTTON_MESSAGES.download_default);
      } else {
        setButtonText(BUTTON_MESSAGES.email_default);
      }
      actions.updateButtonStatus(INITIAL_EXPORT);
    }
  };

  return (
    <>
      <Button disabled={buttonPressed} onClick={handleOnExport}>
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
