//STYLES
//material UI icons import
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HomeIcon from '@mui/icons-material/Home';
//import CSS
import "./NavBar.css"

//REACT
//import React
import React, {useEffect} from 'react';

//Import React Router
import {
  Routes, Route, Link
} from "react-router-dom"

//REDUX
import { setCurrentUser } from '../reducers/currentUserReducer';
import currentUserService from '../services/currentUserService';
import { useSelector, useDispatch } from 'react-redux';

//COMPONENTS
//import Components
import Projects from './Projects';
import Tasks from './Tasks';
import Home from "./Home";

const NavBar = ({logout}) => {
  
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)


  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('id'));
    currentUserService.getUser(id).then((currentUser) => dispatch(setCurrentUser(currentUser)));
  }, [])

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
          <div className = "logo">
            <p>Logo</p>
          </div>
          <div className = "mainNav">
            <Link to="/"><HomeIcon/> Home </Link>
            <Link to="/projects"><AccountTreeIcon /> Projects</Link>
            <Link to="/tasks"><AssignmentIcon /> Tasks </Link>
          </div>
          <div className = "profileNav">
            Welcome back!
            <button onClick = {handleLogout}>{currentUser.name}</button>
          </div>
        </div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
    </>
    
  )
}

export default NavBar
