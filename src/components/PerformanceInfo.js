import React from "react";
import PerformanceForm from "./PerformanceForm";
import { CustomDialog } from "react-st-modal";

const PerformanceInfo = ({ state, actions }) => {
  return (
    <>
      <h3>Venue: {state.performance.venuename}</h3>
      <h3>
        Stage:
        {state.performance.stagename !== "Other..."
          ? state.performance.stagename
          : state.performance.stagename2}
      </h3>
      <h3>Staff: {state.performance.staffname}</h3>
      <h3>Show: {state.performance.showname}</h3>
      <h3>Date: {state.performance.showdate}</h3>
      <h3>
        Time:
        {state.performance.showtime !== "Other..."
          ? state.performance.showtime
          : state.performance.showtime2}
      </h3>
      <button
        onClick={async () => {
          const result = await CustomDialog(
            <PerformanceForm state={state} actions={actions} />,
            {
              title: "Edit Performance Data",
              showCloseIcon: true,
            }
          );
          if (result != null) {
            actions.updatePerformanceAction({
              ...result,
            });
          }
        }}
      >
        Edit Performance Data
      </button>
      {/* <button
        onClick={async () => {
          actions.clearPerformanceAction(state);
        }}
      >
        CLEAR ALL
      </button> */}
    </>
  );
};

export default PerformanceInfo;
