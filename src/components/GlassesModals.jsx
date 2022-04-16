import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
import { FloatingLabel, Modal, Form, Button } from "react-bootstrap";
import moment from "moment";
import toast from "react-hot-toast";

function GlassesModals() {
  const { state } = useStateMachine();
  const { actions } = useStateMachine({
    updateGlassesAction,
  });

  function updateGlassesAction(globalState, payload) {
    console.log(payload);
    const newArray = [...globalState.devices];
    const index = newArray
      .map(function (x) {
        return x.unit_id;
      })
      .indexOf(payload.unit_id);

    newArray[index].status = payload.hasOwnProperty("status")
      ? payload.status
      : newArray[index].status;
    newArray[index].unit_id = payload.hasOwnProperty("unit_id")
      ? payload.unit_id
      : newArray[index].unit_id;
    newArray[index].ticket = payload.hasOwnProperty("ticket")
      ? payload.ticket
      : newArray[index].ticket;
    newArray[index].issue_time = payload.hasOwnProperty("issue_time")
      ? payload.issue_time
      : newArray[index].issue_time;
    newArray[index].return_time = payload.hasOwnProperty("return_time")
      ? payload.return_time
      : newArray[index].return_time;
    newArray[index].notes = payload.hasOwnProperty("notes")
      ? payload.notes
      : newArray[index].notes;

    return {
      ...globalState,

      devices: newArray,
    };
  }

  const INITIAL_DEVICE = [
    {
      status: 1,
      unit_id: "",
      ticket: "",
      issue_time: "",
      return_time: "",
      notes: "",
    },
  ];

  //
  //
  // THIS SECTION FOR THE ISSUING MODAL
  //
  //
  const [showIssue, setShowIssue] = useState(false);

  const [issueValues, setIssueValues] = useState(INITIAL_DEVICE[0]);

  const handleShowIssue = () => {
    console.log("Show Modal");
    setIssueValues({
      ...INITIAL_DEVICE[0],
      issue_time: moment().format("HH:mm").toString(),
    });
    setShowIssue(true);
    setValidated(false);
  };

  const handleHideIssue = () => {
    console.log("Hide Modal");
    setShowIssue(false);
    setValidated(false);
  };

  const handleSubmitIssue = (event) => {
    console.log("Submit Modal");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      console.log("Issuing Form Not Valid");
    } else {
      console.log("Issuing Form Valid!");
      console.log("Saving Glasses Issue Info");
      toast.success("Glasses ID " + issueValues.unit_id + " Issued");
      actions.updateGlassesAction({
        ...issueValues,
      });
      handleHideIssue();
    }

    setValidated(true);
  };

  const handleChangeIssue = (event) => {
    var newVal = event.target.value;
    if (event.target.name === "unit_id") {
      newVal = +newVal;
      console.log("newVal: ", newVal);
    }
    setIssueValues((issueValues) => ({
      ...issueValues,
      [event.target.name]: newVal.toString(),
    }));
  };

  //
  //
  // THIS SECTION FOR THE RETURNING MODAL
  //
  //

  const RETURNING_DEVICE = [
    {
      status: 2,
      unit_id: "",
      return_time: "",
      notes: "",
    },
  ];

  const [showReturn, setShowReturn] = useState(false);
  const [returnValues, setReturnValues] = useState(RETURNING_DEVICE[0]);

  const handleShowReturn = () => {
    console.log("Show Modal");
    setReturnValues({
      ...RETURNING_DEVICE[0],
      return_time: moment().format("HH:mm").toString(),
    });
    setShowReturn(true);
    setValidated(false);
  };

  const handleHideReturn = () => {
    console.log("Hide Modal");
    setShowReturn(false);
    setValidated(false);
  };

  const handleSubmitReturn = (event) => {
    console.log("Submit Modal");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      console.log("Returning Form Not Valid");
    } else {
      const filterCheck = state.devices.filter(
        (unit) => unit.unit_id === returnValues.unit_id
      );
      if (filterCheck.length === 1) {
        console.log("Sumbitting Return Data");
        toast.success("Glasses ID " + returnValues.unit_id + " Returned");
        actions.updateGlassesAction({
          ...returnValues,
        });
      }
      handleHideReturn();
    }

    setValidated(true);
  };

  const handleChangeReturn = (event) => {
    var newVal = event.target.value;
    if (event.target.name === "unit_id") {
      newVal = +newVal;
      console.log("newVal: ", newVal);
    }
    setReturnValues((returnValues) => ({
      ...returnValues,
      [event.target.name]: newVal.toString(),
    }));
  };

  // Shared for all modals
  const [validated, setValidated] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={handleShowIssue}>
        Issue
      </Button>
      <Button variant="primary" onClick={handleShowReturn}>
        Return
      </Button>
      <Modal show={showIssue} onHide={handleHideIssue}>
        <Form
          noValidate
          validated={validated}
          autoComplete="off"
          onSubmit={handleSubmitIssue}
        >
          <Modal.Header closeButton>
            <Modal.Title>Issue Glasses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="issueTime" label="Issue Time:">
              <Form.Control
                required
                type="text"
                placeholder="Issue Time"
                name="issue_time"
                value={issueValues.issue_time}
                onChange={handleChangeIssue}
              />
            </FloatingLabel>
            <FloatingLabel controlId="issueUnitID" label="Unit ID:">
              <Form.Control
                required
                type="number"
                placeholder="Unit ID"
                name="unit_id"
                value={issueValues.unit_id}
                onChange={handleChangeIssue}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="issueTicket"
              label="Ticket or Seat Number:"
            >
              <Form.Control
                required
                type="text"
                placeholder="Ticket"
                name="ticket"
                value={issueValues.ticket}
                onChange={handleChangeIssue}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showReturn} onHide={handleHideReturn}>
        <Form
          noValidate
          validated={validated}
          autoComplete="off"
          onSubmit={handleSubmitReturn}
        >
          <Modal.Header closeButton>
            <Modal.Title>Return Glasses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="returnTime" label="Return Time:">
              <Form.Control
                required
                type="text"
                placeholder="Return Time"
                name="return_time"
                value={returnValues.return_time}
                onChange={handleChangeReturn}
              />
            </FloatingLabel>
            <FloatingLabel controlId="returnUnitID" label="Unit ID:">
              <Form.Control
                required
                type="number"
                placeholder="Unit ID"
                name="unit_id"
                value={returnValues.unit_id}
                onChange={handleChangeReturn}
              />
            </FloatingLabel>
            <FloatingLabel controlId="returnNotes" label="Notes:">
              <Form.Control
                as="textarea"
                name="notes"
                style={{ height: "120px" }}
                placeholder="Leave a comment here"
                onChange={handleChangeReturn}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default GlassesModals;
