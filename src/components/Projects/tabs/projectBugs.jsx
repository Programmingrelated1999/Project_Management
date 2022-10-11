import React, {useState} from 'react'
import { useSelector } from 'react-redux';

import ProjectTaskCard from '../Tasks/ProjectTaskCard';

const ProjectBugs = () => {
  const bugs = useSelector(state => state.currentProject.projectData.bugs);
  
  const isLoading = useSelector(state => state.currentProject.isLoading);

  if(isLoading){
    return <p>Is Loading</p>
  }

  const started = bugs.filter((bug) => bug.status === 'Created');
  const progress = bugs.filter((bug) => bug.status === 'Progress');
  const done = bugs.filter((bug) => bug.status === 'Done');

  const handleDeleteCard = (id) => {
    console.log("Delete", id);
  }

  return (
    <div className='project-bugs'>
      <p>Started</p>
        {started.map((bug) => <ProjectTaskCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} id = {bug.id} handleDeleteCard = {handleDeleteCard}/>)}
      <p>Progress</p>
        {progress.map((bug) => <ProjectTaskCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} id = {bug.id} handleDeleteCard = {handleDeleteCard}/>)}  
      <p>Done</p>
        {done.map((bug) => <ProjectTaskCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} id = {bug.id} handleDeleteCard = {handleDeleteCard}/>)}
    </div>
  )
}

export default ProjectBugs;
