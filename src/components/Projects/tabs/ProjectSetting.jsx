import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Button, Card} from "react-bootstrap"
import { editSelectedProject, loadCurrentProjectData } from '../../../reducers/currentProjectReducer'
import SearchUsersModal from '../Modals/SearchUsersModal'
import { Button as MaterialUIButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { loadAllUsersData } from '../../../reducers/allUsersReducer'

const ProjectSetting = () => {

  const dispatch = useDispatch();
  
  const currentProject = useSelector(state => state.currentProject.projectData);
  const isCurrentProjectLoading = useSelector(state => state.currentProject.isLoading);
  const hasCurrentProjectError = useSelector(state => state.currentProject.hasError);

  const allUsers = useSelector(state => state.allUsers.allUsersData);
  const allUsersIsLoading = useSelector(state => state.allUsers.isLoading);
  const allUsersHasError = useSelector(state => state.allUsers.hasError);

  useEffect(() => {dispatch(loadAllUsersData())}, [])

  console.log("all users", allUsers);

  const name = useRef();
  const description = useRef();

  const [showAdd, setShowAdd] = useState(false);
  const [invites, setInvites] = useState([]);
  const [notification, setNotification] = useState('');

  if(isCurrentProjectLoading || allUsersIsLoading){
    return <p>Loading</p>
  }

  if(hasCurrentProjectError || allUsersHasError){
    return <p>Has Error</p>
  }  

  let allPeopleInProject = [currentProject.creator.id];
  allPeopleInProject = allPeopleInProject.concat(currentProject.admins.map((admin) => admin.id));
  allPeopleInProject = allPeopleInProject.concat(currentProject.developers.map((developer) => developer.id));
  allPeopleInProject = allPeopleInProject.concat(currentProject.invites.map((invite) => invite.id));

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
  const removeInvite = (inviteId) => {
    const newInviteList = invites.filter((invite) => invite.id !== inviteId);
    setInvites(newInviteList);
  }

  const doesInviteListIncludesProjectMembers = () => {
    let returnVal = true;
    for(let person of invites){
      if(allPeopleInProject.includes(person.id)){
        returnVal = false;
        return returnVal;
      }
    }
    return returnVal;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!doesInviteListIncludesProjectMembers()){
      setNotification("Invite List Error: At least one person is already in the project.");
      setTimeout(() => {
        setNotification("");
      }, 4000)
    } else{
      const data = {
        name: name.current.value, 
        description: description.current.value
      }
      console.log("Data", data);
      const id = currentProject.id;
      await editSelectedProject(id, data);
      await dispatch(loadCurrentProjectData(id));
    }
  }

  return (
    <div className = "d-flex flex-column align-items-center my-5">
      <Card className = 'px-5'>
      <Form onSubmit = {handleSubmit} className = "d-flex flex-column align-items-center">
        {notification? <p className = "text-danger">{notification}</p>: null}
        <Form.Group className=" my-3 mb-3 d-flex flex-column align-items-center" controlId="projectName">
          <Form.Label className = "mx-2">Name</Form.Label>
          <input className = "text-center" defaultValue = {currentProject.name} ref = {name}></input>
        </Form.Group>
      
        <Form.Group className="d-flex mb-3 d-flex flex-column align-items-center" controlId="projectDescription">
          <Form.Label className = "mx-2 d-flex flex-column align-items-center">Description</Form.Label>
          <textarea rows="4" cols="50" defaultValue = {currentProject.description} ref = {description}/>
        </Form.Group>

        <div className = "d-block">
        <h3> Invite List: </h3>
        {invites.map(invite => 
        <MaterialUIButton variant="outlined" color="error" key = {invite.id} onClick = {() => removeInvite(invite.id)}>
          {invite.username} <CancelIcon />
        </MaterialUIButton>)}
        </div>
        <SearchUsersModal showAdd = {showAdd} closeAdd = {closeAdd} addInvite = {addInvite} invites = {invites}/>
        <Button variant="success" className='buttons-vertical mx-auto' onClick = {openAdd}>Add Users</Button>
        <br />

        <Button variant="success" type="submit" className='buttons-vertical mx-auto'>Submit</Button>
      </Form>
      </Card>
    </div>
  )
}

export default ProjectSetting
