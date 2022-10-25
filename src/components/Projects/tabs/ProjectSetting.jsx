import React, {useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Button} from "react-bootstrap"
import { editSelectedProject, loadCurrentProjectData } from '../../../reducers/currentProjectReducer'
import SearchUsersModal from '../Modals/SearchUsersModal'
import { Button as MaterialUIButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const ProjectSetting = () => {

  const dispatch = useDispatch();
  
  const currentProject = useSelector(state => state.currentProject.projectData);
  const isCurrentProjectLoading = useSelector(state => state.currentProject.isLoading);
  const hasCurrentProjectError = useSelector(state => state.currentProject.hasError);

  const name = useRef();
  const description = useRef();

  const [showAdd, setShowAdd] = useState(false);
  const [invites, setInvites] = useState([]);

  if(isCurrentProjectLoading){
    return <p>Loading</p>
  }

  if(hasCurrentProjectError){
    return <p>Has Error</p>
  }  

  const isUserCreator = JSON.parse(localStorage.getItem("id")) === currentProject.creator.id;
  const currentProjectAdminList = currentProject.admins.map((admin) => admin.id);
  const isUserAdmin = currentProjectAdminList.includes(JSON.parse(localStorage.getItem("id")));

  const openAdd = () => {
    setShowAdd(true);
  }
  const closeAdd = () => {
    setShowAdd(false);
  }
  const addInvite = (invitedPerson) => {
    setInvites(invites.concat(invitedPerson));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name.current.value, 
      description: description.current.value
    }
    console.log("Data", data);
    const id = currentProject.id;
    await editSelectedProject(id, data);
    await dispatch(loadCurrentProjectData(id));
  }

  return (
    <div>
      <Form onSubmit = {handleSubmit}>
        <Form.Group className=" my-3 mb-3" controlId="projectName">
          <Form.Label className = "mx-2">Name</Form.Label>
          <input defaultValue = {currentProject.name} ref = {name}></input>
        </Form.Group>
      
        <Form.Group className="d-flex mb-3" controlId="projectDescription">
          <Form.Label className = "mx-2">Description</Form.Label>
          <textarea rows="4" cols="50" defaultValue = {currentProject.description} ref = {description} />
        </Form.Group>

        <div className = "d-block">
        {invites.map(invite => 
        <MaterialUIButton variant="outlined" color="error" key = {invite.id} onClick = {() => removeInvite(invite.id)}>
          {invite.username} <CancelIcon />
        </MaterialUIButton>)}
        </div>

        <div className = "d-block">
        {invites.map(invite => 
        <MaterialUIButton variant="outlined" color="error" key = {invite.id} onClick = {() => removeInvite(invite.id)}>
          {invite.username} <CancelIcon />
        </MaterialUIButton>)}
        </div>

        <SearchUsersModal showAdd = {showAdd} closeAdd = {closeAdd} addInvite = {addInvite} invites = {invites}/>
        <Button variant="success" className='buttons-vertical' onClick = {openAdd}>Add Users</Button>

        <Button variant="success" type="submit" className='buttons-vertical'>Submit</Button>
      </Form>
    </div>
  )
}

export default ProjectSetting
