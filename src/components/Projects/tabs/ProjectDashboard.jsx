import React from 'react';

import { useSelector } from 'react-redux';
import {Progress} from 'react-circle-progress-bar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Card, Container } from 'react-bootstrap';

import "./ProjectDashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const taskData = {
    labels: [
      "Haven't started (Created)",
      'In Progress',
      'Done'
    ],
    datasets: [{
      label: 'Project Tasks',
      data: [taskCreated,taskProgress,taskDone],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  const bugData = {
    labels: [
      "Haven't started (Created)",
      'In Progress',
      'Done'
    ],
    datasets: [{
      label: 'Project Bugs',
      data: [bugCreated, bugProgress, bugDone],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div>
      <h1>Project Overview</h1>
      <Container className = "dashboard">
        <Card className = "project-dashboard-progress bg-gradient-info">
          <Card.Title className = "my-1">Progress</Card.Title>
          <Card.Body>
            <Progress progress={projectProgress} subtitle = "Done" className = "progress-bar" background = "gray" />
          </Card.Body>
        </Card>
        <Card className = "project-dashboard-progress">
          <Card.Title className = "my-1">Project Team Overview</Card.Title>
          <Card.Body>
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>Creator</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Admins</td>
                  <td>{currentProject.admins.length}</td>
                </tr>
                <tr>
                  <td>Developers</td>
                  <td>{currentProject.developers.length}</td>
                </tr>
                <tr id = "total-members-text">
                  <td>Total Members</td>
                  <td>{currentProject.admins.length + currentProject.developers.length + 1}</td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Container>
      <Container className = "dashboard">
        <Card className='pie-charts'>
          <Card.Title>Task BreakDown</Card.Title>
          <Card.Body className='card-body'>
            <Pie data = {taskData} className = "pie"/>
          </Card.Body>
        </Card>
        <Card className = "pie-charts">
          <Card.Title>Bugs BreakDown</Card.Title>
          <Card.Body className="card-body">
            {currentProject.bugs.length === 0? <div className='no-item-reminder'><p>No Bugs for data to show</p></div>:<Pie data = {bugData} className = "pie"/>}
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default ProjectDashboard
