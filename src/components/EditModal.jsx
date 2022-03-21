import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
import { FloatingLabel, Modal, Form, Button } from "react-bootstrap";

function EditModal() {
  const { state } = useStateMachine();
  const { actions } = useStateMachine({
    updateGlassesAction,
  });

  function updateGlassesAction(globalState, payload) {
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

  const [showEdit, setShowEdit] = useState(false);
  const [editValues, setEditValues] = useState([]);

  const handleShowEdit = () => {
    console.log("Show Modal");
    // setEditValues({
    //   ...RETURNING_DEVICE[0],
    //   return_time: moment().format("HH:mm").toString(),
    // });
    setShowEdit(true);
    setValidated(false);
  };

  const handleHideEdit = () => {
    console.log("Hide Modal");
    setShowEdit(false);
    setValidated(false);
  };

  const handleSubmitEdit = (event) => {
    console.log("Submit Modal");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      console.log("Editing Form Not Valid");
    } else {
      const filterCheck = state.devices.filter(
        (unit) => unit.unit_id === editValues.unit_id
      );
      if (filterCheck.length === 1) {
        console.log("Sumbitting Edit Data");
        actions.updateGlassesAction({
          ...editValues,
        });
      }
      handleHideEdit();
    }

    setValidated(true);
  };

  const handleChangeEdit = (event) => {
    setEditValues((editValues) => ({
      ...editValues,
      [event.target.name]: event.target.value,
    }));
  };

  const [validated, setValidated] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={handleShowEdit}>
        Edit
      </Button>
      <Modal show={showEdit} onHide={handleHideEdit}>
        <Form
          noValidate
          validated={validated}
          autoComplete="off"
          onSubmit={handleSubmitEdit}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Glasses</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditModal;
