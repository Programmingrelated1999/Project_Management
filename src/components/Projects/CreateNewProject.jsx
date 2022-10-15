import React, {useState, useEffect} from 'react'
import "./CreateNewProject.css"

import { Form, Button, Container} from 'react-bootstrap';
import { Button as MaterialUIButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector, useDispatch } from 'react-redux';

import { loadAllUsersData } from '../../reducers/allUsersReducer';
import { createANewProject } from '../../reducers/currentProjectReducer';
import { loadCurrentUserData } from '../../reducers/currentUserReducer';

import { useNavigate, Navigate} from 'react-router-dom';

import SearchUsersModal from './Modals/SearchUsersModal';

const CreateNewProject = () => {
  //project
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [invites, setInvites] = useState([]);

  const [shouldNotify, setShouldNotify] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('')

  //UI component
  const [showAdd, setShowAdd] = useState(false);

  const isLoading = useSelector(state => state.allUsers.isLoading);
  const hasError = useSelector(state => state.allUsers.hasError);
  const allUsers = useSelector(state => state.allUsers.allUsersData);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllUsersData()); 
  }, []);

  if(isLoading){
    return <p>Loading</p>
  }
  if(hasError){
    return <p>Has Error</p>
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const openAdd = () => {
    setShowAdd(true);
  }
  const closeAdd = () => {
    setShowAdd(false);
  }

  const addInvite = (invitedPerson) => {
    console.log("Invited Person", invitedPerson);
    setInvites(invites.concat(invitedPerson));
  }
  const removeInvite = (inviteId) => {
    const newInviteList = invites.filter((invite) => invite.id !== inviteId);
    setInvites(newInviteList);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const invitesList = invites.map((invite) => invite.id);
    if(name === ''){
        setShouldNotify(true);
        setNotificationMessage("Name is empty");
        setTimeout(() => {
          setShouldNotify(false);
          setNotificationMessage("");
        }, 3000)
    } else if (description.length < 3){
        setShouldNotify(true);
        setNotificationMessage("Description should be at least 3 letters");
        setTimeout(() => {
          setShouldNotify(false);
          setNotificationMessage("");
        }, 3000)
    } else{
        const projectData = {
          name: name,
          description: description,
          invites: invitesList
        }
        await createANewProject(projectData);
        const userId = JSON.parse(localStorage.getItem('id'));
        await dispatch(loadCurrentUserData(userId));
        setName('');
        setDescription('');
        setInvites([]);
        navigate("/projects")
    }
  }

  return (
    <Container className = "mx-auto">
      {shouldNotify? <p className='text-danger'>{notificationMessage}</p>: null}
      <Form onSubmit = {handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Project Name</Form.Label>
          <Form.Control value = {name} onChange = {handleNameChange} placeholder="Enter project name" />
          <Form.Text className="text-warning">
            Give it a meaningful name so it is easily recognizable
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Project Description</Form.Label>
          <Form.Control value = {description} onChange ={handleDescriptionChange} as="textarea" aria-label="With textarea"/>
          <Form.Text className="text-warning" >
            A description of a project. A full description would be nice, but make it simple.
          </Form.Text>
        </Form.Group>

        <p>Current Invite List:</p>
        {invites.length === 0? <p>Noone is invited. Click on Add Users Button to invite.</p>:null}
        {invites.map(invite => 
        <MaterialUIButton variant="outlined" color="error" key = {invite.id} onClick = {() => removeInvite(invite.id)}>
          {invite.username} <CancelIcon />
        </MaterialUIButton>)}

        <SearchUsersModal showAdd = {showAdd} closeAdd = {closeAdd} addInvite = {addInvite} invites = {invites}/>

        <div>
          <Button variant="success" className='buttons-vertical' onClick = {openAdd}>Add Users</Button>
          <br/>
          <Button variant="success" type="submit" className='buttons-vertical'>Submit</Button>
        </div>
      </Form>
    </Container>
  )
}

export default CreateNewProject
