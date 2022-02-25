import React from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "react-st-modal";

function PerformanceForm({ state, actions }) {
  const dialog = useDialog();

  const INITIAL_PERF = [
    {
      venuename: "",
      stagename: "",
      stagename2: "",
      staffname: "",
      showname: "",
      showdate: "",
      showtime: "",
      showtime2: "",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    defaultValues: {
      venuename: state.performance.venuename,
      stagename: state.performance.stagename,
      stagename2: state.performance.stagename2,
      staffname: state.performance.staffname,
      showname: state.performance.showname,
      showdate: state.performance.showdate,
      showtime: state.performance.showtime,
      showtime2: state.performance.showtime2,
    },
  });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          dialog.close(data);
        })}
      >
        <label>Venue</label>
        <select
          {...register("venuename", {
            required: true,
            pattern: /People's Light/,
          })}
        >
          <option value="Select Venue">Select Venue</option>
          <option value="People's Light">People's Light</option>
        </select>
        <label>Stage</label>
        <select
          {...register("stagename", {
            required: true,
            pattern: /Haas|Steinbright|Other.../,
          })}
        >
          <option value="Select Stage">Select Stage</option>
          <option value="Haas">Haas</option>
          <option value="Steinbright"> Steinbright</option>
          <option value="Other...">Other...</option>
        </select>
        <input
          type="text"
          placeholder="Stage Other"
          {...register("stagename2", {
            required: watch("stagename") === "Other..." ? true : false,
          })}
          hidden={watch("stagename") === "Other..." ? false : true}
        />
        <label>Staff</label>
        <input
          type="text"
          placeholder="Staff Name"
          {...register("staffname", {
            required: true,
            maxLength: 50,
          })}
        />
        <label>Show</label>
        <input
          type="text"
          placeholder="Show Name"
          {...register("showname", { required: true, maxLength: 50 })}
        />
        <label>Date</label>
        <input
          type="datetime"
          placeholder="Date"
          {...register("showdate", { required: true })}
        />
        <label>Time</label>
        <select
          {...register("showtime", {
            required: true,
            pattern: /Matinee|Evening|Other.../,
          })}
        >
          <option value="Select Time">Select Time</option>
          <option value="Matinee">Matinee</option>
          <option value="Evening">Evening</option>
          <option value="Other...">Other...</option>
        </select>
        <input
          type="text"
          placeholder="Time Other"
          {...register("showtime2", {
            required: watch("showtime") === "Other..." ? true : false,
          })}
          hidden={watch("showtime") === "Other..." ? false : true}
        />

        <input type="submit" />

        <input
          type="button"
          onClick={() => {
            resetField("staffname", {
              defaultValue: INITIAL_PERF[0]["staffname"],
            });
            resetField("showdate", {
              defaultValue: INITIAL_PERF[0]["showdate"],
            });
            resetField("showtime", {
              defaultValue: INITIAL_PERF[0]["showtime"],
            });
            resetField("showtime2", {
              defaultValue: INITIAL_PERF[0]["showtime2"],
            });
          }}
          value="Next Performance"
        />
        <input
          type="button"
          onClick={() => {
            resetField("venuename", {
              defaultValue: INITIAL_PERF[0]["venuename"],
            });
            resetField("stagename", {
              defaultValue: INITIAL_PERF[0]["stagename"],
            });
            resetField("stagename2", {
              defaultValue: INITIAL_PERF[0]["stagename2"],
            });
            resetField("staffname", {
              defaultValue: INITIAL_PERF[0]["staffname"],
            });
            resetField("showname", {
              defaultValue: INITIAL_PERF[0]["showname"],
            });
            resetField("showdate", {
              defaultValue: INITIAL_PERF[0]["showdate"],
            });
            resetField("showtime", {
              defaultValue: INITIAL_PERF[0]["showtime"],
            });
            resetField("showtime2", {
              defaultValue: INITIAL_PERF[0]["showtime2"],
            });
          }}
          value="Clear All"
        />
      </form>
    </>
  );
}

export default PerformanceForm;
