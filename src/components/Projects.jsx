import React, {useState} from 'react'

//import CSS
import "./Projects.css"

//import Bootstrap
import { Button } from 'react-bootstrap';
import ProjectList from './Projects/ProjectList';

const Projects = () => {
   const [searchFilter, setSearchFilter] = useState('');
   const [creator, setCreator] = useState(false);
   const [admin, setAdmin] = useState(false);
   const [developer, setDeveloper] = useState(false);
   const [client, setClient] = useState(false);

   //Filter functions
   //changeFilter for search bar
   const changeFilter = (event) => {
    event.preventDefault();
    setSearchFilter(event.target.value);
   }

   //Creator filter
   const changeCreator = (event) => {
    event.preventDefault();
    let newTruthValue = creator;
    setCreator(!newTruthValue);
   }

   //Admin filter
   const changeAdmin = (event) => {
    event.preventDefault();
    let newTruthValue = admin;
    setAdmin(!newTruthValue);
   }

   //Developer filter
   const changeDeveloper = (event) => {
    event.preventDefault();
    let newTruthValue = developer;
    setDeveloper(!newTruthValue);
   }

   //Client filter
   const changeClient = (event) => {
    event.preventDefault();
    let newTruthValue = client;
    setClient(!newTruthValue);
   }

    return (
    <div className='projects'>
      <div className = "main-filter">
        <h1>All Projects</h1>
        <input id = "search-bar" placeholder='Search Your Projects' value = {searchFilter} onChange = {changeFilter}/>
      </div>

      <div className = "other-filters">
        <span>Filter by Role</span>
        <Button variant="success" onClick = {changeCreator}>Creator {creator === true? <span class="text-danger">X</span>: null}</Button>
        <Button variant="success" onClick = {changeAdmin}>Admin {admin === true? <span class="text-danger">X</span>: null}</Button>
        <Button variant="success" onClick = {changeDeveloper}>Developer {developer === true? <span class="text-danger">X</span>: null}</Button>
        <Button variant="success" onClick = {changeClient}>Client {client === true? <span class="text-danger">X</span>: null}</Button> 
      </div>

      <ProjectList />
    </div>
  )
}

export default Projects
