import React, {useEffect} from 'react'

import { Modal, Button } from 'react-bootstrap'
import { Chip } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { loadCurrentTaskData } from '../../../../reducers/currentTaskReducer'

const ViewModal = ({showViewDetails, closeViewDetails, taskSelected}) => {

    const currentTask = useSelector(state => state.currentTask.taskData)
    const isLoading = useSelector(state => state.currentTask.isLoading);
    const hasError = useSelector(state => state.currentTask.hasError);

    const dispatch = useDispatch();

    //useEffect
    useEffect(() => {dispatch(loadCurrentTaskData(taskSelected))}, [taskSelected]);

    if(isLoading){
        return <p>Loading...</p>
    }

    if(hasError){
        return <p>Has Error</p>
    }

  return (
    <Modal show={showViewDetails} onHide={closeViewDetails} centered>
        <Modal.Header closeButton>
            <Modal.Title>{currentTask.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "text-danger">
            <h6>{currentTask.description}</h6>
            <Chip label = {`Created on ${currentTask.createdDate}`} color="primary" size="small" />
            <br/>
            <Chip label = {`Due Date ${currentTask.endDate? currentTask.endDate: "N/A"}`} color="warning" size="small" />
            <br/>
            <p className = "d-inline text-success">Status: </p>
            {currentTask.status === "Created"? <Chip label = {`${currentTask.status}`} color="secondary" size="small" />: null}
            {currentTask.status === "Progress"? <Chip label = {`${currentTask.status}`} color="info" size="small" />: null}
            {currentTask.status === "Done"? <Chip label = {`${currentTask.status}`} color="success" size="small" />: null}
            <h6 className = "text-primary">Assigned:</h6>
            {currentTask.assigned.length === 0? <p>No one Assigned Yet</p>:currentTask.assigned.map((assignee) => <p key = {assignee.id} className = "text-primary">{assignee.username}</p>)}
            <br/>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={closeViewDetails}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ViewModal
