import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomDialog, useDialog } from "react-st-modal";

const PerformancePane = ({ perfInfo }) => {
  return (
    <>
      <h3>Venue: {perfInfo["venuename"]}</h3>
      <h3>
        Stage:
        {perfInfo["stagename"] != "Other..."
          ? perfInfo["stagename"]
          : perfInfo["stagename2"]}
      </h3>
      <h3>Staff: {perfInfo["staffname"]}</h3>
      <h3>Show: {perfInfo["showname"]}</h3>
      <h3>Date: {perfInfo["showdate"]}</h3>
      <h3>
        Time:
        {perfInfo["showtime"] != "Other..."
          ? perfInfo["showtime"]
          : perfInfo["showtime2"]}
      </h3>
    </>
  );
};

const PerformanceForm = () => {
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

  let initPerf;
  if (localStorage.getItem("performance") === null) {
    initPerf = INITIAL_PERF;
  } else {
    initPerf = JSON.parse(localStorage.getItem("performance"));
  }

  const [perfdata, setPerfdata] = useState(initPerf);

  useEffect(() => {
    localStorage.setItem("performance", JSON.stringify(perfdata));
  }, [perfdata]);

  const PerfEditModal = () => {
    const dialog = useDialog();

    const {
      register,
      handleSubmit,
      watch,
      resetField,
      formState: { errors },
    } = useForm({
      mode: "onchange",
      defaultValues: {
        venuename: perfdata[0]["venuename"],
        stagename: perfdata[0]["stagename"],
        stagename2: perfdata[0]["stagename2"],
        staffname: perfdata[0]["staffname"],
        showname: perfdata[0]["showname"],
        showdate: perfdata[0]["showdate"],
        showtime: perfdata[0]["showtime"],
        showtime2: perfdata[0]["showtime2"],
      },
    });

    return (
      <>
        <form
          onSubmit={handleSubmit((data) => {
            setPerfdata([data]);
            dialog.close();
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
            <option value=" Select Time">Select Time</option>
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
              setPerfdata([INITIAL_PERF]);
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
  };

  return (
    <>
      <PerformancePane className="performance-pane" perfInfo={perfdata[0]} />
      <button
        onClick={async () => {
          const result = await CustomDialog(<PerfEditModal />, {
            title: "Edit Performance Data",
            showCloseIcon: true,
          });
        }}
      >
        Edit Performance Data
      </button>
    </>
  );
};

export default PerformanceForm;
