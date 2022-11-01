import React, {useEffect, useState, useRef} from 'react'

import { Modal, Form, Button } from 'react-bootstrap'
import { Chip } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'

import { loadCurrentBugData } from '../../../../reducers/currentBugReducer'
import { editSelectedBug } from '../../../../reducers/currentBugReducer'
import { loadCurrentProjectData } from '../../../../reducers/currentProjectReducer'
import { loadCurrentUserData } from '../../../../reducers/currentUserReducer'

const EditBugModal = ({showEdit, closeEdit, bugSelected}) => {
    const dispatch = useDispatch();

    //currentBug and currentProject
    const currentBug = useSelector(state => state.currentBug.bugData);
    const isLoading = useSelector(state => state.currentBug.isLoading);
    const hasError = useSelector(state => state.currentBug.hasError);
    const currentProject = useSelector(state => state.currentProject.projectData);

    const name = useRef();
    const description = useRef();
    const status = useRef();
    const selectedUser = useRef();
    const [notification, setNotification] = useState('');

    //useEffect
    useEffect(() => {
        dispatch(loadCurrentBugData(bugSelected));
    }, [bugSelected]);    

    if(isLoading){
            return(
                <Modal show={showEdit} onHide={closeEdit} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Loading...</Modal.Title>
                    </Modal.Header>
                </Modal>
            )
        }
    if(hasError){
            return(
                <Modal show={showEdit} onHide={closeEdit} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Has Error</Modal.Title>
                    </Modal.Header>
                </Modal>
            )
    }

  //allMembers
  let allMembers = []
  allMembers = allMembers.concat(currentProject.creator);
  allMembers = allMembers.concat(currentProject.admins);
  allMembers = allMembers.concat(currentProject.developers);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const assigned = currentBug.assigned.map((user) => user.id);
        const data = {
            name: name.current.value,
            description: description.current.value,
            status: status.current.value,
            assigned,
        }
        const id = currentBug.id
        console.log()
        await editSelectedBug(id, data);
        await dispatch(loadCurrentProjectData(currentProject.id));
        await dispatch(loadCurrentUserData(JSON.parse(localStorage.getItem("id"))))
        setNotification('');
        closeEdit();
    } 

    const handleAssignDelete = (userId) => {
        dispatch({ type: 'currentBug/deleteAssignee', payload: {deleteUser: userId} });
    }

    const handleAssignAdd = (event) => {
        event.preventDefault();
        if(!selectedUser.current.value){
            setNotification('No User Selected')
            setTimeout(() => {
              setNotification('');
            }, 1000)
        } else{
            const selectedUserObject = allMembers.find(user => user.id === selectedUser.current.value);
            const bugAssignIds = currentBug.assigned.map((member) => member.id);
            if(bugAssignIds.includes(selectedUserObject.id)){
                setNotification('User Already Added')
                setTimeout(() => {
                  setNotification('');
                }, 1000)
            } else{
                dispatch({ type: 'currentBug/addAssignee', payload: {addUser: selectedUserObject} });
            }
        }
    }

    const handleClose = async() => {
        await dispatch(loadCurrentBugData(bugSelected));
        closeEdit();
    }

  return (
    <Modal show={showEdit} onHide={handleClose} centered>
        {notification? <p className = "text-danger">{notification}</p>: null}
        <Modal.Header closeButton>
            <Modal.Title>Editing {currentBug.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "text-danger">
            <Form onSubmit = {handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label className = "text-primary">Bug Name</Form.Label>
                <input defaultValue={currentBug.name} ref={name}></input>
                </Form.Group>

                <Form.Group className="mb-3 text-primary">
                <Form.Label>Bug Description</Form.Label>
                <textarea rows="4" cols="50" defaultValue = {currentBug.description} ref={description}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label className = "text-primary">Set Status</Form.Label>
                        <select className="form-select" aria-label="Default select example" defaultValue={"Done"} ref={status}>
                            <option value="Created" >Created</option>
                            <option value="Progress">Progress</option>
                            <option value="Done">Done</option>
                        </select>
                </Form.Group>

                <Form.Group>
                    <Form.Label className = "d-block text-primary">Current Assginees</Form.Label>
                    {
                    currentBug.assigned.map((user) => <Chip label={user.name} key = {user.id} className = "showAssignedUsers" onDelete = {() => {handleAssignDelete(user.id)}}/>)
                    }
                </Form.Group>

                <Form.Group>
                    <Form.Label className = "text-primary">Project Members</Form.Label>
                    <select defaultValue='' className = "d-block m-2" ref = {selectedUser}>
                        <option value = ''>Select Users</option>
                        {allMembers.map((member) => <option key = {member.id} value = {member.id}>{member.username}</option>)}
                    </select>
                </Form.Group>

                <div>
                <Button variant="success" type="submit" className='buttons-vertical' onClick = {handleAssignAdd}>Add User</Button>
                </div>
                
                <div>
                <Button variant="success" type="submit" className='buttons-vertical'>Submit</Button>
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
  </Modal>
  )
}

export default EditBugModal