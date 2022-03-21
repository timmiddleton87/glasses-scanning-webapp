import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
import { FloatingLabel, Modal, Form, Button, Table } from "react-bootstrap";
import "./tables.css";
import MOCK_DATA from "./MOCK_DATA.json";

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

function nextPerformanceAction(globalstate, payload) {
  return {
    performance: {},
    devices: MOCK_DATA,
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

  const handleCloseForm = () => {
    console.log("Hide Modal");
    setShow(false);
    setValidated(false);
  };
  const handleShowForm = () => {
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
    console.log("Show Modal");
    setShow(true);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      console.log("Performance Form Not Valid");
    } else {
      console.log("Performance Form Valid!");
      console.log("Saving Performance Info");
      actions.updatePerformanceAction({
        ...values,
      });
      handleCloseForm();
    }

    setValidated(true);
  };

  const handleResetForm = () => {
    console.log("Reset Performance Info");
    setValues(INITIAL_PERF[0]);
    handleCloseForm();
    setShow(true);
    setValidated(false);
  };

  const handleNextPerformance = () => {
    console.log("Next Performance");
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
    setShow(true);
    setValidated(false);
  };

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const [validated, setValidated] = useState(false);

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
              <td colSpan={"4"}>
                <Button variant="primary" onClick={handleShowForm}>
                  Edit Performance Info
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleCloseForm}>
        <Form
          noValidate
          validated={validated}
          autoComplete="off"
          onSubmit={handleSubmitForm}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Performance Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="formVenue" label="Venue:">
              <Form.Select
                required
                name="venuename"
                onChange={handleChange}
                value={values.venuename}
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
                value={values.stagename}
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
              value={values.stagename2}
              hidden={values.stagename === "Other..." ? false : true}
              required={values.stagename === "Other..." ? true : false}
            />
            <FloatingLabel controlId="formStaff" label="Staff Name:">
              <Form.Control
                required
                type="text"
                placeholder="Staff Name"
                name="staffname"
                value={values.staffname}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formShow" label="Show Name:">
              <Form.Control
                required
                type="text"
                placeholder="Show Name"
                name="showname"
                value={values.showname}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formDate" label="Performance Date:">
              <Form.Control
                required
                type="text"
                placeholder="Performance Date"
                name="showdate"
                value={values.showdate}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formTime" label="Performance Time:">
              <Form.Select
                required
                name="showtime"
                onChange={handleChange}
                value={values.showtime}
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
              value={values.showtime2}
              hidden={values.showtime === "Other..." ? false : true}
              required={values.showtime === "Other..." ? true : false}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleResetForm}>
              Clear All
            </Button>
            <Button variant="secondary" onClick={handleNextPerformance}>
              Next Performance
            </Button>
            <Button type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default PerformanceInfo;
