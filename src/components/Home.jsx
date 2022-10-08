import React, {useState} from 'react'

import CalendarUI from './commonlyUsedComponents/CalendarUI';
import Invitations from './Home/Invitations';
import MiniTask from './Home/MiniTask';
import SampleProjects from './Home/SampleProjects';
import "./Home.css";

//REDUX
//useSelector from Redux
import { useSelector, useDispatch } from "react-redux";

import currentUserService from '../services/currentUserService';

//bootstrap
import Table from 'react-bootstrap/Table';

const Home =  () => {
  const currentUserProjectInvites = useSelector(state => state.currentUser.personData.projectInvites)
  const currentUserTasks = useSelector(state => state.currentUser.personData.tasks)
  const userId = useSelector(state => state.currentUser.personData.id)
  const name = useSelector(state => state.currentUser.personData.name)

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

  const handleRejectInvite = (projectId) => {
    console.log("handleRejectInvite", projectId);
    currentUserService.rejectInvite(userId, projectId).then((currentUser) => dispatch(setCurrentUser(currentUser)));
  }

  return (
    <div>
        <div className = "home-main">   
          WELCOME BACK! {name}
        </div>
        <SampleProjects />
        <p>Invitations: </p>
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
            {currentUserProjectInvites.map((project) => 
              <Invitations key = {project.id} projectId = {project.id} name = {project.name} handleAcceptInvite = {handleAcceptInvite} handleRejectInvite = {handleRejectInvite}/>)
            }
          </tbody>
          </Table>
        }  
        <div className = "calendarAndTask">
          <CalendarUI />
          <MiniTask tasks = {currentUserTasks}/>
        </div>
    </div>
  )
}

export default Home;
