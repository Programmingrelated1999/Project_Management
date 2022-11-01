import React from 'react'

import { Modal, Button } from 'react-bootstrap'

const DeleteModal = ({showDelete, closeDelete, loadDelete, isDelete, handleDelete}) => {

  return (
    <Modal show={showDelete} onHide={closeDelete} centered>
        <Modal.Header closeButton>
            {isDelete? <p>Deleting</p>: <Modal.Title>Are you sure you want to delete this Task?</Modal.Title>}
        </Modal.Header>
        <Modal.Body className = "text-danger">Once you delete you will not be able to retrieve the task.</Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
            Yes
        </Button>
        <Button variant="primary" onClick={closeDelete}>
            No
        </Button>
        </Modal.Footer>
  </Modal>
  )
}

export default DeleteModal
