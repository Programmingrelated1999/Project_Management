import React, {useState} from 'react'

import { Modal, Button, Card } from 'react-bootstrap'
import { editSelectedProject } from '../../../reducers/currentProjectReducer'
import { useParams } from 'react-router'
import { loadCurrentProjectData } from '../../../reducers/currentProjectReducer'
import { useDispatch } from 'react-redux'

const DeleteProjectMemberModal = ({showDelete, closeDelete, userToKick}) => {
    const {id} = useParams();

    const dispatch = useDispatch();

    const kickUser = async (userId) => {
        console.log("User to Kick", userId);
        const data = {
            removeUsers: [userId]
        }
        console.log("Data", data);  
        await editSelectedProject(id, data);
        await dispatch(loadCurrentProjectData(id));
        closeDelete();
    }

  return (
    <Modal show={showDelete} onHide={closeDelete} centered>
    <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to kick {userToKick.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body className = "text-danger">
        <h6 className='text-warning'>Confirming delete would permanently delete the user from the project. Changes are made instantly.</h6>
    </Modal.Body>
    <Modal.Footer>
        <Button className = "btn-danger" onClick = {() => kickUser(userToKick.id)}>Yes</Button>
        <Button onClick = {closeDelete}>No</Button>
    </Modal.Footer>
    </Modal>
  )
}

export default DeleteProjectMemberModal
