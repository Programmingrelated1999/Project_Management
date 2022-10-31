import React from 'react'

import { Modal, Button} from 'react-bootstrap'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const DeleteProjectModal = ({showProjectDelete, closeProjectDelete, deleteProject}) => {

  return (
    <Modal show={showProjectDelete} onHide={closeProjectDelete} centered>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this project?</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "text-danger">
            <h6 className='text-warning'>Confirming this will delete the project and its associated tasks and bugs.</h6>
        </Modal.Body>
        <Modal.Footer>
            <Button className = "btn-danger" onClick = {deleteProject}>Yes</Button>
            <Button className = "btn-primary" onClick = {closeProjectDelete}>No</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default DeleteProjectModal
