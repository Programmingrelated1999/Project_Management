import React, {useState} from 'react'

//import CSS
import "./Projects.css"

//import Bootstrap
import { Button, Container } from 'react-bootstrap';
import ProjectList from './Projects/ProjectList';
import { Link } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';

const Projects = () => {
   const currentUserProjects = useSelector(state => state.currentUser.personData.projects);

   const [searchFilter, setSearchFilter] = useState('');
   const [filteredUserProjects, setFilteredUserProjects] = useState(currentUserProjects);

   //Filter functions
   //changeFilter for search bar
   const changeFilter = (event) => {
    setSearchFilter(event.target.value);
    const newProjectsList = currentUserProjects.filter(project => project.name.includes(event.target.value));
    console.log("new Porjects List", newProjectsList);
    setFilteredUserProjects(newProjectsList);
   }

    return (
      <>
        <div className='projects'>
          <Container className = "text-center">
            <Link to="/projects/createNew"><Button className = "btn btn-warning">Create New Project</Button></Link>
          </Container>
          <div className = "main-filter">
            <h1>All Projects</h1>
            <input id = "search-bar" placeholder='Search Your Projects' value = {searchFilter} onChange = {changeFilter}/>
          </div>
          <div className = "project-table py-3">
            {filteredUserProjects.map((project) => <ProjectList key = {project.id} projectId = {project.id} name ={project.name} description = {project.description}/>)}
          </div>
        </div>
    </>
  )
}

export default Projects
