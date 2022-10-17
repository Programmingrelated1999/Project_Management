import React, {useState} from 'react';

import { useSelector } from 'react-redux';
import ProgressBar from '../../commonlyUsedComponents/ProgressBar';

import "./ProjectDashboard.css"

const ProjectDashboard = () => {

  const currentProject = useSelector(state => state.currentProject.projectData)
  const isLoading = useSelector(state => state.currentProject.isLoading);
  const hasError = useSelector(state => state.currentProject.hasError);

  if(hasError){
    return <p>Has Error...</p>
  }

  if(isLoading){
    return <p>Is Loading...</p>
  }

  //for displaying dashboard stats
  const taskCreated = currentProject.tasks.reduce( (count, task) => task.status === 'Created'? count + 1 : count, 0)
  const taskProgress = currentProject.tasks.reduce( (count, task) => task.status === 'Progress'? count + 1 : count, 0)
  const taskDone = currentProject.tasks.reduce( (count, task) => task.status === 'Done'? count + 1 : count, 0)
  const bugCreated = currentProject.bugs.reduce( (count, bug) => bug.status === 'Created'? count + 1 : count, 0)
  const bugProgress = currentProject.bugs.reduce( (count, bug) => bug.status === 'Progress'? count + 1 : count, 0)
  const bugDone = currentProject.bugs.reduce( (count, bug) => bug.status === 'Done'? count + 1 : count, 0)

  let projectProgress = Math.round(((taskDone+bugDone)/(currentProject.tasks.length + currentProject.bugs.length)) * 100)
  if(!projectProgress){
    projectProgress = 0;
  }

  return (
    <div>
      <h1>Project Overview</h1>
      <h3>Number of Members</h3>
      <h3>Project Done</h3>
      <ProgressBar percentage = {projectProgress}/>
      <h2>Project Breakdown</h2>
      <h4>Total Number of Tasks: </h4>
      <h4>{currentProject.tasks.length}</h4>
      <h4>Started: {taskCreated} In Progress: {taskProgress} Done: {taskDone}</h4>
      <h4>Total Number of Bugs: </h4>
      <h4>{currentProject.bugs.length}</h4>
      <h4>Started: {bugCreated} In Progress: {bugProgress} Done: {bugDone}</h4>
    </div>
  )
}

export default ProjectDashboard
