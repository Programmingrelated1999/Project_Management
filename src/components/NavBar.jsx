//import React
import React from 'react';

//import Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import CSS
import "./NavBar.css"

//import Components
import Projects from './Projects';
import Tasks from './Tasks';
import Home from "./Home";

//material UI icons import
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HomeIcon from '@mui/icons-material/Home';

//Import React Router
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"


const NavBar = () => {
  return (
    <Router>
    <div className='navBar'>
      <div className = "logo">
        <p>Logo</p>
      </div>
      <div className = "mainNav">
        <Link to="/"><HomeIcon /> Home </Link>
        <Link to="/projects"><AccountTreeIcon /> Projects</Link>
        <Link to="/tasks"><AssignmentIcon /> Tasks </Link>
      </div>
      <div className = "profileNav">
        <a href = "#">KM</a>
      </div>
    </div>

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
    </Routes>
    
    </Router>
  )
}

export default NavBar
