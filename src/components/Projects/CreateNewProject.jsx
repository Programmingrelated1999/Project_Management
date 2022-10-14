import React, {useState, useEffect} from 'react'
import "./CreateNewProject.css"

import { Form, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { loadAllUsersData } from '../../reducers/allUsersReducer';

import SearchUsersModal from './Modals/SearchUsersModal';

const CreateNewProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [invites, setInvites] = useState([]);
  const [users, setUsers] = useState({});
  const [showAdd, setShowAdd] = useState(false);

  const isLoading = useSelector(state => state.allUsers.isLoading);
  const hasError = useSelector(state => state.allUsers.hasError);
  const allUsers = useSelector(state => state.allUsers.allUsersData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllUsersData()); 
    setUsers(allUsers);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setName('');
    setDescription('');
  }

  return (
    <Container className = "mx-auto">
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
        {invites.map(invite => <p>{invite.username}</p>)}

        <SearchUsersModal showAdd = {showAdd} closeAdd = {closeAdd}/>

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
