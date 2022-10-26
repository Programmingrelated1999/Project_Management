import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Button, Card, Table} from "react-bootstrap"
import { editSelectedProject, loadCurrentProjectData } from '../../../reducers/currentProjectReducer'
import SearchUsersModal from '../Modals/SearchUsersModal'
import { Button as MaterialUIButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { loadAllUsersData } from '../../../reducers/allUsersReducer'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteProjectMemberModal from '../Modals/DeleteProjectMemberModal';
import { Chip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {IconButton, Tooltip} from '@mui/material'

import "./ProjectSetting.css";

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
  const [showDelete, setShowDelete] = useState(false);
  const [invites, setInvites] = useState([]);
  const [notification, setNotification] = useState('');
  const [userToKick, setUserToKick] = useState();

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
  const openDelete = () => {
    setShowDelete(true);
  }
  const closeDelete = () => {
    setShowDelete(false);
  }
  const addInvite = (invitedPerson) => {
    setInvites(invites.concat(invitedPerson));
  }
  const handleOpenDelete = (person) => {
    openDelete();
    console.log("Got here ")
    setUserToKick(person)
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
      const inviteList = invites.map(invite => invite.id);
      const data = {
        name: name.current.value, 
        description: description.current.value,
        addInvites: inviteList
      }
      console.log("Data", data);
      const id = currentProject.id;
      await editSelectedProject(id, data);
      await dispatch(loadCurrentProjectData(id));
      setInvites([])
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

        <h3>Current Member List:</h3>
        <Table>
          <thead>
            <tr>  
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
              <th>Kick Out</th>
            </tr>
          </thead>
          <tbody>
            <tr key = {currentProject.creator.id}>
              <td>{currentProject.creator.name}</td>
              <td>{currentProject.creator.username}</td>
              <td>                
              <Chip label="Creator" color = "error"/>
              </td>
              <td></td>
              <td><MaterialUIButton variant="outlined" color="error"><DeleteForeverIcon/></MaterialUIButton></td>
            </tr>
            {currentProject.admins.map(admin => <tr key = {admin.id}>
              <td>{admin.name}</td>
              <td>{admin.username}</td>
              <td>
                <Chip label="Admin" color = "warning"/>
              </td>
              <td>                
                <Tooltip title="Demote to Developer"><IconButton aria-label="delete" size="small" color = "error"><ArrowDownwardIcon/></IconButton></Tooltip>
              </td>
              <td><MaterialUIButton variant="outlined" color="error" onClick = {() => handleOpenDelete(admin)}><DeleteForeverIcon/></MaterialUIButton></td>
            </tr>)}
            {currentProject.developers.map(developer => <tr key = {developer.id}>
              <td>{developer.name}</td>
              <td>{developer.username}</td>
              <td>                
                <Chip label="Developer" color = "secondary" />
              </td>
              <td>
                <Tooltip title="Promote to Admin"><IconButton aria-label="delete" size="small" color = "success"><ArrowUpwardIcon/></IconButton></Tooltip>
              </td>
              <td><MaterialUIButton variant="outlined" color="error" onClick = {() => handleOpenDelete(developer)}><DeleteForeverIcon/></MaterialUIButton></td>
            </tr>)}
          </tbody>
        </Table>
          {currentProject.admins.map(admin => <p>{admin.name}</p>)}
        <Button variant="success" type="submit" className='buttons-vertical mx-auto'>Submit</Button>
      </Form>
      </Card>
      {userToKick ? <DeleteProjectMemberModal showDelete = {showDelete} closeDelete = {closeDelete} userToKick = {userToKick}/>: null}
    </div>
  )
}

export default ProjectSetting
