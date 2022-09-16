import React, {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Calendar from './commonlyUsedComponents/Calendar';
import MiniTask from './Home/MiniTask';
import SampleProjects from './Home/SampleProjects';
import "./Home.css";

const Home = () => {
  //states
  const [makeNewProject, setMakeNewProject] = useState(0);
  const [inviteFriends, setInviteFriends] = useState(0);

  const makeNewProjectCallBackFunction = () => {
    setMakeNewProject(0);
  }

  const inviteFriendsCallBackFunction = () => {
    setInviteFriends(0);
  }

  return (
    <div>
        <div className = "home-main">   
            <Button variant="info">Create Project</Button>{' '}    
            <Button variant="info">Invite Friends</Button>{' '}  
        </div>
        <SampleProjects />
        <div className = "calendarAndTask">
          <Calendar />
          <MiniTask />
        </div>
    </div>
  )
}

export default Home
