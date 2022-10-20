import React, {useEffect, useState, useRef} from 'react'

import { Modal, Form, Button } from 'react-bootstrap'
import { Chip } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'

import { loadCurrentTaskData } from '../../../../reducers/currentTaskReducer'
import { editSelectedTask } from '../../../../reducers/currentTaskReducer'
import { loadCurrentProjectData } from '../../../../reducers/currentProjectReducer'

const EditTaskModal = ({showEdit, closeEdit, taskSelected}) => {
    const dispatch = useDispatch();

    //currentTask and currentProject
    const currentTask = useSelector(state => state.currentTask.taskData);
    const isLoading = useSelector(state => state.currentTask.isLoading);
    const hasError = useSelector(state => state.currentTask.hasError);
    const currentProject = useSelector(state => state.currentProject.projectData);

    const name = useRef();
    const description = useRef();
    const status = useRef();
    const selectedUser = useRef();
    const [notification, setNotification] = useState('');

    //useEffect
    useEffect(() => {
        dispatch(loadCurrentTaskData(taskSelected));
    }, [taskSelected]);    

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
        const assigned = currentTask.assigned.map((user) => user.id);
        const data = {
            name: name.current.value,
            description: description.current.value,
            status: status.current.value,
            assigned,
        }
        const id = currentTask.id
        await editSelectedTask(id, data);
        await dispatch(loadCurrentProjectData(currentProject.id));
        setNotification('');
        closeEdit();
    } 

    const handleAssignDelete = (userId) => {
        dispatch({ type: 'currentTask/deleteAssignee', payload: {deleteUser: userId} });
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
            const taskAssignIds = currentTask.assigned.map((member) => member.id);
            if(taskAssignIds.includes(selectedUserObject.id)){
                setNotification('User Already Added')
                setTimeout(() => {
                  setNotification('');
                }, 1000)
            } else{
                dispatch({ type: 'currentTask/addAssignee', payload: {addUser: selectedUserObject} });
            }
        }
    }

    const handleClose = async() => {
        await dispatch(loadCurrentTaskData(taskSelected));
        closeEdit();
    }

  return (
    <Modal show={showEdit} onHide={handleClose} centered>
        {notification? <p className = "text-danger">{notification}</p>: null}
        <Modal.Header closeButton>
            <Modal.Title>Editing {currentTask.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "text-danger">
            <Form onSubmit = {handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label className = "text-primary">Task Name</Form.Label>
                <input defaultValue={currentTask.name} ref={name}></input>
                </Form.Group>

                <Form.Group className="mb-3 text-primary">
                <Form.Label>Task Description</Form.Label>
                <textarea rows="4" cols="50" defaultValue = {currentTask.description} ref={description}/>
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
                    currentTask.assigned.map((user) => <Chip label={user.name} key = {user.id} className = "showAssignedUsers" onDelete = {() => {handleAssignDelete(user.id)}}/>)
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

export default EditTaskModal