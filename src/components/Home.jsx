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

const Home =  () => {
  const currentUserProjectInvites = useSelector(state => state.currentUser.personData.projectInvites)
  const currentUserTasks = useSelector(state => state.currentUser.personData.tasks)
  const currentUserBugs = useSelector(state => state.currentUser.personData.bugs)
  const currentUserProjects = useSelector(state => state.currentUser.personData.projects);
  const isLoading = useSelector(state => state.currentUser.isLoading);
  const hasError = useSelector(state => state.currentUser.hasError);
  const userId = useSelector(state => state.currentUser.personData.id);
  const name = useSelector(state => state.currentUser.personData.name);

  console.log("User Id", userId);

  const dispatch = useDispatch();

  if(!currentUserProjectInvites || isLoading){
    return(
      <p>Loading... </p>
    )
  }

  if(hasError){
    return (<p>Has Error</p>)
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
        <div className = "d-flex" style={{justifyContent: "space-evenly"}}>
          {currentUserProjects.length === 0 ? 
            <div style={{ height: '12rem', width: '25rem', padding: '3rem', borderRadius: '1rem' }} className = "text-center invitations">
                <h6 className = "text-danger">User Have No Projects</h6>
            </div>: <SampleProjects />}
          {currentUserProjectInvites.length === 0 ? 
            <div style={{height: '12rem', width: '25rem', padding: '3rem', borderRadius: '1rem' }} className = "text-center invitations">
                <h6 className = "text-danger">User Have No Invitations</h6>
            </div>: 
            <div style={{ height: '14rem', width: '25rem', overflow: "scroll" }}>
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
