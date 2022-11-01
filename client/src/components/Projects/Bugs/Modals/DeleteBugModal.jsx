import React from 'react'

import { Modal, Button } from 'react-bootstrap'

const DeleteBugModal = ({showDelete, closeDelete, isDelete, handleDelete}) => {

  return (
    <Modal show={showDelete} onHide={closeDelete} centered>
        <Modal.Header closeButton>
            {isDelete? <p>Deleting</p>: <Modal.Title>Are you sure you want to delete this Bug?</Modal.Title>}
        </Modal.Header>
        <Modal.Body className = "text-danger">Once you delete you will not be able to retrieve the bug.</Modal.Body>
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

export default DeleteBugModal