import React, { useState } from 'react';
import { Form, Modal, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createBug } from '../../../../reducers/currentBugReducer';
import { loadCurrentProjectData } from '../../../../reducers/currentProjectReducer';
import { loadCurrentUserData } from '../../../../reducers/currentUserReducer';

import TextField from '@mui/material/TextField';
import { Chip } from '@mui/material';
import { Textarea } from '@mantine/core';

import "./CreateANewBugModal.css";

const CreateANewBugModal = ({showCreateBug, closeCreateBug}) => {
  const dispatch = useDispatch();

  const currentProject = useSelector(state => state.currentProject.projectData);
  const isLoading = useSelector(state => state.currentProject.isLoading);
  const hasError = useSelector(state => state.currentProject.hasError);

  if(isLoading){
    return <p>Loading...</p>
  }

  if(hasError){
    return <p>Has Error</p>
  }

  //allMembers
  let allMembers = []
  allMembers = allMembers.concat(currentProject.creator);
  allMembers = allMembers.concat(currentProject.admins);
  allMembers = allMembers.concat(currentProject.developers);

  const [notification, setNotification] = useState('');
  const [bugName, setBugName] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [selectedUser, setSelectedUser] = useState();
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showAssignedUsers, setShowAssignedUsers] = useState([]);

  const handleSelectedUser = (event) => {
    event.preventDefault();
    setSelectedUser(event.target.value);
  }
  
  const handleAssignedUsers = () => {
    if(selectedUser == 1 || !selectedUser){
      setNotification("No Users Selected")
      setTimeout(() => {
        setNotification('');
      }, 1000)
    }else if(assignedUsers.includes(selectedUser)){
      setNotification('User already Included')
      setTimeout(() => {
        setNotification('');
      }, 1000)
    } else{
      setAssignedUsers(assignedUsers.concat(selectedUser));
      const userToShow = allMembers.find(element => element.id === selectedUser);
      setShowAssignedUsers(showAssignedUsers.concat(userToShow));
    }
  }

  const handleAssignedUsersDelete = (id) => {
    setAssignedUsers(assignedUsers.filter((userId) => userId !== id));
    setShowAssignedUsers(showAssignedUsers.filter((user) => user.id !== id));
  }

  const handleBugName = (event) => {
    setBugName(event.target.value)
  }

  const handleBugDescription = (event) => {
    setBugDescription(event.target.value)
  }

  const addBug = async (event) => {
    event.preventDefault();
    if(bugName.length === 0){
      setNotification('Bug Name is Empty')
      setTimeout(() => {
        setNotification('');
      }, 1000)   
    } else if(bugDescription.length < 3){
      setNotification('Describe More')
      setTimeout(() => {
        setNotification('');
      }, 1000)   
    } else{
      const newBug = {
        name: bugName,
        description: bugDescription,
        project: currentProject.id,
        assigned: assignedUsers
      }

      await createBug(newBug);
      await dispatch(loadCurrentUserData(JSON.parse(localStorage.getItem("id"))));
      await dispatch(loadCurrentProjectData(currentProject.id));

      setBugName('');
      setBugDescription('');
      setSelectedUser();
      setAssignedUsers([]);
      setShowAssignedUsers([]);
    }
  }

  return (
    <Modal show={showCreateBug} onHide={closeCreateBug} centered>
        <Modal.Header closeButton>
            <Modal.Title>Create A New Bug</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "text-danger">
          {notification? <p className = "text-danger">{notification}</p>:null}
          <Form onSubmit = {addBug}>   
              <TextField className = "text-input" id="bug-name" label="Bug Name" variant="standard" value = {bugName} onChange = {handleBugName}/>
              <Textarea placeholder = "Enter Text Description" label="Text Description" autosize minRows={2} value = {bugDescription} onChange = {handleBugDescription}/>
              {assignedUsers.length === 0? <p className = "text-warning">No One is assigned</p>: null}
              <select value = {selectedUser} onChange = {handleSelectedUser} className = "d-block m-2">
                <option value = {1}>Select Users</option>
                {allMembers.map((member) => <option key = {member.id} value = {member.id}>{member.username}</option>)}
              </select>
              <Button className ="d-block m-2 btn btn-success" onClick = {handleAssignedUsers}> Assigned Selected User </Button>
              <div>
                {
                  showAssignedUsers.map(user => <Chip label={user.name} key = {user.id} onDelete={() => handleAssignedUsersDelete(user.id)} className = "showAssignedUsers"/>)
                }
              </div>
              <Button type = "submit" >Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
  )
}

export default CreateANewBugModal
