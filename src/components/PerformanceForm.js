import React from "react";
import { useForm } from "react-hook-form";
import {
  ModalButton,
  ModalContent,
  ModalFooter,
  useDialog,
} from "react-st-modal";
import "./forms.css";

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
      <div className="modal_container">
        <ModalContent className="modal_content">
          <h1>Edit Performance Info</h1>
          <div>
            <label>Venue:</label>
            <select
              {...register("venuename", {
                required: true,
                pattern: /People's Light/,
              })}
            >
              <option value="Select Venue">Select Venue</option>
              <option value="People's Light">People's Light</option>
            </select>
          </div>
          <div>
            <label>Stage:</label>
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
              placeholder=""
              {...register("stagename2", {
                required: watch("stagename") === "Other..." ? true : false,
              })}
              hidden={watch("stagename") === "Other..." ? false : true}
            />
          </div>
          <div>
            <label>Staff Name:</label>
            <input
              type="text"
              placeholder=""
              {...register("staffname", {
                required: true,
                maxLength: 50,
              })}
            />
          </div>
          <div>
            <label>Show Name:</label>
            <input
              type="text"
              placeholder=""
              {...register("showname", { required: true, maxLength: 50 })}
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="text"
              placeholder=""
              {...register("showdate", { required: true })}
            />
          </div>
          <div>
            <label>Time:</label>
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
              placeholder=""
              {...register("showtime2", {
                required: watch("showtime") === "Other..." ? true : false,
              })}
              hidden={watch("showtime") === "Other..." ? false : true}
            />
          </div>
        </ModalContent>
        <ModalFooter className="modal_footer">
          <ModalButton
            className="modal_button"
            onClick={handleSubmit((data) => {
              dialog.close(data);
            })}
          >
            Submit
          </ModalButton>
          <ModalButton
            className="modal_button"
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
          >
            Next<br></br>Performance
          </ModalButton>
          <ModalButton
            className="modal_button"
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
          >
            Clear<br></br>All
          </ModalButton>
        </ModalFooter>
      </div>
    </>
  );
}

export default PerformanceForm;
