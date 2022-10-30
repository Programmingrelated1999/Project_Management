import React from 'react'

import Clock from './commonlyUsedComponents/Clock';
import Invitations from './Home/Invitations';
import MiniTaskAndBugs from './Home/MiniTaskAndBugs';
import SampleProjects from './Home/SampleProjects';
import "./Home.css";

//REDUX
//useSelector from Redux
import { useSelector, useDispatch } from "react-redux";
import { acceptInvite, loadCurrentUserData, rejectInvite } from '../reducers/currentUserReducer';

//bootstrap
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

const Home =  () => {
  const currentUserProjectInvites = useSelector(state => state.currentUser.personData.projectInvites)
  const currentUserTasks = useSelector(state => state.currentUser.personData.tasks)
  const currentUserBugs = useSelector(state => state.currentUser.personData.bugs)
  const userId = useSelector(state => state.currentUser.personData.id)
  const name = useSelector(state => state.currentUser.personData.name)

  console.log("User Id", userId);

  const dispatch = useDispatch();

  if(!currentUserProjectInvites){
    return(
      <p>Loading... </p>
    )
  }

  const handleAcceptInvite = async (projectId) => {
    console.log("handleAcceptInviteProjectId", projectId);
    await dispatch(acceptInvite({userId: userId, projectId: projectId}))
    dispatch(loadCurrentUserData(userId));
  }

  const handleRejectInvite = async (projectId) => {
    console.log("handleAcceptInviteProjectId", projectId);
    await dispatch(rejectInvite({userId: userId, projectId: projectId}))
    dispatch(loadCurrentUserData(userId));
  }

  return (
    <div>
        <div className = "home-main">   
          WELCOME BACK! {name}
        </div>
        <div className = "d-flex justify-content-evenly">
          <SampleProjects />
          {currentUserProjectInvites.length === 0 ? 
            <Card style={{ width: '18rem' }} className = "text-center">
              <Card.Body>
                <Card.Text>User Have No Invitations</Card.Text>
              </Card.Body>
            </Card>: 
            <div style={{ height: '14rem', width: '22rem', overflow: "scroll" }}>
              <h3>Invitations</h3>
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
          </div>
        }
        </div>  
        <div className = "calendarAndTask">
          <Clock />
          <MiniTaskAndBugs tasks = {currentUserTasks} bugs = {currentUserBugs}/>
        </div>
    </div>
  )
}

export default Home;
