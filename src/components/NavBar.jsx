//STYLES
//material UI icons import
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HomeIcon from '@mui/icons-material/Home';

//import bootstrap
import Dropdown from 'react-bootstrap/Dropdown';

//import CSS
import "./NavBar.css"

//REACT
//import React
import React, {useEffect} from 'react';

//Import React Router
import {
  Routes, Route, Link
} from "react-router-dom"

//COMPONENTS
//import Components
import Projects from './Projects';
import TasksAndBugs from './TasksAndBugs';
import Home from "./Home";
import ProjectHome from './Projects/ProjectHome';
import CreateNewProject from './Projects/CreateNewProject';

const NavBar = ({logout, currentUser}) => {

  if(!currentUser){
    console.log("loading");
    return (
      <p>Loading</p>
    )
  }

  const handleLogout = () => {
    logout();
  }

  return (
    <>
        <div className='navBar'>
          <Link to="/" className='logo'>&lt;/&gt;Project Tracker</Link>
          <div className = "mainNav">
            <Link to="/"><HomeIcon/> Home </Link>
            <Link to="/projects"><AccountTreeIcon /> Projects</Link>
            <Link to="/tasks&bugs"><AssignmentIcon /> Tasks & Bugs </Link>
          </div>
          <div className = "profileNav">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-button-dark-example1" size = "sm">
                {currentUser.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick = {handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/projects/*" element={<Projects/>} />
            <Route path="/tasks&bugs" element={<TasksAndBugs />} />
            <Route path="/projects/:id" element={<ProjectHome />} />
            <Route path="/projects/createNew" element = {<CreateNewProject />} />
          </Routes>
    </>
  )
}

export default NavBar
