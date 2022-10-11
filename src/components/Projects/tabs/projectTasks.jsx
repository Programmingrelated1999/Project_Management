import React, {useState} from 'react'
import { useSelector } from 'react-redux';

import ProjectTaskCard from '../Tasks/ProjectTaskCard';

const ProjectTasks = () => {
  const tasks = useSelector(state => state.currentProject.projectData.tasks);
  
  const isLoading = useSelector(state => state.currentProject.isLoading);

  if(isLoading){
    return <p>Is Loading</p>
  }

  const started = tasks.filter((task) => task.status === 'Created');
  const progress = tasks.filter((task) => task.status === 'Progress');
  const done = tasks.filter((task) => task.status === 'Done');

  const handleDeleteCard = (id) => {
    console.log("Delete", id);
  }

  return (
    <div className='project-tasks'>
      <p>Started</p>
        {started.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} id = {task.id} handleDeleteCard = {handleDeleteCard}/>)}
      <p>Progress</p>
        {progress.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} id = {task.id} handleDeleteCard = {handleDeleteCard}/>)}  
      <p>Done</p>
        {done.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} id = {task.id} handleDeleteCard = {handleDeleteCard}/>)}
    </div>
  )
}

export default ProjectTasks;
