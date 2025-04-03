import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function GenericModal({
  message,
  onConfirm,
  onClose,
  itemName = "ítem",
  buttonText = "Eliminar",
}) {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const confirmAction = () => {
    console.log(itemName);
    onConfirm();
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Acción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message || `¿Está seguro que desea eliminar ${itemName}?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmAction}>
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenericModal;
