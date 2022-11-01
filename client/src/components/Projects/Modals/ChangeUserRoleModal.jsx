import React, {useState} from 'react'

import { Modal, Button, Card } from 'react-bootstrap'
import { changeUserRoleInProject, editSelectedProject } from '../../../reducers/currentProjectReducer'
import { useParams } from 'react-router'
import { loadCurrentProjectData } from '../../../reducers/currentProjectReducer'
import { useDispatch } from 'react-redux'

const ChangeUserRoleModal = ({showPromoteDemote, closeUserChangeStatus, userToChangeStatus, newUserRole}) => {
  let promoteOrDemote;
  if(newUserRole === 'admin'){
    promoteOrDemote = "promote"
  } else{
    promoteOrDemote = 'demote'
  }

  const {id} = useParams();
  const dispatch = useDispatch();

  const handleUserStatus = async (userId) => {
    const data = {
        role: newUserRole
    }
    await changeUserRoleInProject(id, userId, data);
    await dispatch(loadCurrentProjectData(id));
    closeUserChangeStatus();
  }

  return (
    <Modal show={showPromoteDemote} onHide={closeUserChangeStatus} centered>
    <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to {promoteOrDemote} {userToChangeStatus.name} to {newUserRole}? </Modal.Title>
    </Modal.Header>
    <Modal.Body className = "text-danger">
        <h6 className='text-warning'>Confirming this will change {userToChangeStatus.name} role to {newUserRole} immediately.</h6>
    </Modal.Body>
    <Modal.Footer>
        <Button className = "btn-danger" onClick = {() => handleUserStatus(userToChangeStatus.id)}>Yes</Button>
        <Button className = "btn-primary" onClick = {closeUserChangeStatus}>No</Button>
    </Modal.Footer>
    </Modal>
  )
}

export default ChangeUserRoleModal
