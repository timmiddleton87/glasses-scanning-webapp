import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
import {
  FloatingLabel,
  Modal,
  Form,
  Button,
  Table,
  InputGroup,
} from "react-bootstrap";
import "./tables.css";

function updatePerformanceAction(globalState, payload) {
  return {
    ...globalState,

    performance: {
      ...payload,
    },
  };
}

function clearPerformanceAction(globalState) {
  return {
    ...globalState,

    performance: {},
  };
}

function PerformanceInfo() {
  const { state } = useStateMachine();
  const { actions } = useStateMachine({
    updatePerformanceAction,
    clearPerformanceAction,
  });

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

  const [values, setValues] = useState({
    venuename: state.performance.venuename,
    stagename: state.performance.stagename,
    stagename2: state.performance.stagename2,
    staffname: state.performance.staffname,
    showname: state.performance.showname,
    showdate: state.performance.showdate,
    showtime: state.performance.showtime,
    showtime2: state.performance.showtime2,
  });

  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleCloseForm = () => {
    setValues({
      venuename: state.performance.venuename,
      stagename: state.performance.stagename,
      stagename2: state.performance.stagename2,
      staffname: state.performance.staffname,
      showname: state.performance.showname,
      showdate: state.performance.showdate,
      showtime: state.performance.showtime,
      showtime2: state.performance.showtime2,
    });
    console.log("CLOSE");
    setShow(false);
    setValidated(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmitForm = (event) => {
    console.log("SUBMIT");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    actions.updatePerformanceAction({
      ...values,
    });
  };

  const handleResetForm = () => {
    console.log("RESET");
    setValues(INITIAL_PERF[0]);
    actions.updatePerformanceAction({
      ...values,
    });
    setValidated(false);
    setShow(false);
  };

  const handleNextPerformance = () => {
    console.log("NEXT");
    setValues({
      venuename: values.venuename,
      stagename: values.stagename,
      stagename2: values.stagename2,
      staffname: INITIAL_PERF[0]["staffname"],
      showname: values.showname,
      showdate: INITIAL_PERF[0]["showdate"],
      showtime: INITIAL_PERF[0]["showtime"],
      showtime2: INITIAL_PERF[0]["showtime2"],
    });
    console.log(values);
    setValidated(false);
  };

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <div className="performance_table_container table-responsive">
        <Table borderless variant="dark" size="sm">
          <tbody>
            <tr>
              <th>Venue:</th>
              <td>
                {state.performance.stagename !== "Other..."
                  ? state.performance.stagename
                  : state.performance.stagename2}
                , {state.performance.venuename}
              </td>
              <th>Show:</th>
              <td>{state.performance.showname}</td>
            </tr>
            <tr>
              <th>Staff:</th>
              <td>{state.performance.staffname}</td>
              <th>Date &#038; Time:</th>
              <td>
                {state.performance.showdate},{" "}
                {state.performance.showtime !== "Other..."
                  ? state.performance.showtime
                  : state.performance.showtime2}
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="primary" onClick={handleShow}>
                  Press
                </Button>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Performance Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated={validated} autoComplete="off">
            <FloatingLabel controlId="formVenue" label="Venue:">
              <Form.Select
                required
                name="venuename"
                onChange={handleChange}
                defaultValue={values.venuename}
              >
                <option value="">Select venue</option>
                <option value="People's Light">People's Light</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="formStage" label="Stage:">
              <Form.Select
                required
                name="stagename"
                onChange={handleChange}
                defaultValue={values.stagename}
              >
                <option value="">Select stage</option>
                <option value="Haas">Haas</option>
                <option value="Steinbright">Steinbright</option>
                <option value="Other...">Other...</option>
              </Form.Select>
            </FloatingLabel>
            <Form.Control
              id="formStage2"
              type="text"
              placeholder="Other stage name"
              name="stagename2"
              onChange={handleChange}
              defaultValue={values.stagename2}
              hidden={values.stagename === "Other..." ? false : true}
              required={values.stagename === "Other..." ? true : false}
            />
            <FloatingLabel controlId="formStaff" label="Staff Name:">
              <Form.Control
                required
                type="text"
                placeholder="Staff Name"
                name="staffname"
                defaultValue={values.staffname}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formShow" label="Show Name:">
              <Form.Control
                required
                type="text"
                placeholder="Show Name"
                name="showname"
                defaultValue={values.showname}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formDate" label="Performance Date:">
              <Form.Control
                required
                type="text"
                placeholder="Performance Date"
                name="showdate"
                defaultValue={values.showdate}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formTime" label="Performance Time:">
              <Form.Select
                required
                name="showtime"
                onChange={handleChange}
                defaultValue={values.showtime}
              >
                <option value="">Select time</option>
                <option value="Matinee">Matinee</option>
                <option value="Evening">Evening</option>
                <option value="Other...">Other...</option>
              </Form.Select>
            </FloatingLabel>
            <Form.Control
              id="formTime2"
              type="text"
              placeholder="Other performance time"
              name="showtime2"
              onChange={handleChange}
              defaultValue={values.showtime2}
              hidden={values.showtime === "Other..." ? false : true}
              required={values.showtime === "Other..." ? true : false}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleResetForm}>
            RESET
          </Button>
          <Button variant="danger" onClick={handleCloseForm}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleNextPerformance}>
            Next Performance
          </Button>
          <Button type="submit" onClick={handleSubmitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <button
        onClick={async () => {
          const result = await CustomDialog(<PerformanceForm state={state} />);
          if (result != null) {
            actions.updatePerformanceAction({
              ...result,
            });
          }
        }}
      >
        Edit Performance Data
      </button> */}
    </>
  );
}

export default PerformanceInfo;
