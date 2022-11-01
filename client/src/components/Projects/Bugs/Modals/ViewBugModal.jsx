import React, {useEffect} from 'react'

import { Modal, Button } from 'react-bootstrap'
import { Chip } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { loadCurrentBugData } from '../../../../reducers/currentBugReducer'

const ViewBugModal = ({showViewDetails, closeViewDetails, bugSelected}) => {
    const currentBug = useSelector(state => state.currentBug.bugData)
    const isLoading = useSelector(state => state.currentBug.isLoading);
    const hasError = useSelector(state => state.currentBug.hasError);

    const dispatch = useDispatch();

    //useEffect
    useEffect(() => {dispatch(loadCurrentBugData(bugSelected))}, [bugSelected]);

    if(isLoading){
        return(
            <Modal show={showViewDetails} onHide={closeViewDetails} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Loading...</Modal.Title>
                </Modal.Header>
            </Modal>
        )
    }
    if(hasError){
        return(
            <Modal show={showViewDetails} onHide={closeViewDetails} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Has Error</Modal.Title>
                </Modal.Header>
            </Modal>
        )
    }

  return (
    <Modal show={showViewDetails} onHide={closeViewDetails} centered>
        <Modal.Header closeButton>
            <Modal.Title>{currentBug.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "text-danger">
            <h6>{currentBug.description}</h6>
            <Chip label = {`Created on ${currentBug.createdDate}`} color="primary" size="small" />
            <br/>
            <Chip label = {`Due Date ${currentBug.endDate? currentBug.endDate: "N/A"}`} color="warning" size="small" />
            <br/>
            <p className = "d-inline text-success">Status: </p>
            {currentBug.status === "Created"? <Chip label = {`${currentBug.status}`} color="secondary" size="small" />: null}
            {currentBug.status === "Progress"? <Chip label = {`${currentBug.status}`} color="info" size="small" />: null}
            {currentBug.status === "Done"? <Chip label = {`${currentBug.status}`} color="success" size="small" />: null}
            <h6 className = "text-primary">Assigned:</h6>
            {currentBug.assigned.length === 0? <p>No one Assigned Yet</p>:currentBug.assigned.map((assignee) => <p key = {assignee.id} className = "text-primary">{assignee.username}</p>)}
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

export default ViewBugModal
