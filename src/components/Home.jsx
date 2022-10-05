import React, {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Calendar from './commonlyUsedComponents/Calendar';
import Invitations from './Home/Invitations';
import MiniTask from './Home/MiniTask';
import SampleProjects from './Home/SampleProjects';
import "./Home.css";

//REDUX
//useSelector from Redux
import { useSelector, useDispatch } from "react-redux";

import currentUserService from '../services/currentUserService';
import { setCurrentUser } from '../reducers/currentUserReducer';

//bootstrap
import Table from 'react-bootstrap/Table';

const Home =  () => {
  const currentUserProjectInvites = useSelector(state => state.currentUser.projectInvites)
  const currentUserTasks = useSelector(state => state.currentUser.tasks)
  const userId = useSelector(state => state.currentUser.id)

  console.log("User Id", userId);

  const dispatch = useDispatch();

  if(!currentUserProjectInvites){
    return(
      <p>Loading... </p>
    )
  }

  const handleAcceptInvite = (projectId) => {
    console.log("handleAcceptInviteProjectId", projectId);
    currentUserService.acceptInvite(userId, projectId).then((currentUser) => dispatch(setCurrentUser(currentUser)));
  }

  return (
    <div>
        <div className = "home-main">   
            <Button variant="info">Create Project</Button>{' '}    
            <Button variant="info" >Invite Friends</Button>{' '}  
        </div>
        <SampleProjects />
        {currentUserProjectInvites.length === 0 ? 
          <p>No Invitations</p>: 
          <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {currentUserProjectInvites.map((project) => <Invitations key = {project.id} projectId = {project.id} name = {project.name} handleAcceptInvite = {handleAcceptInvite}/>)}
          </tbody>
          </Table>
        }  
        <div className = "calendarAndTask">
          <Calendar />
          <MiniTask tasks = {currentUserTasks}/>
        </div>
    </div>
  )
}

export default Home;
