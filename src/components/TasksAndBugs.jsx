import React from 'react'
import "./TasksAndBugs.css"
import ListItem from './TasksAndBugs/ListItem'
import { Container } from 'react-bootstrap'

import { useSelector } from 'react-redux'

const TasksAndBugs = () => {
  const currentUserTasks = useSelector(state => state.currentUser.personData.tasks);
  const currentUserBugs = useSelector(state => state.currentUser.personData.bugs);
  const isLoading = useSelector(state => state.currentUser.isLoading);
  const hasError = useSelector(state => state.currentUser.hasError);

  if(isLoading){
    return <p>Is Loading</p>
  }
  if(hasError){
    return <p>Has Error</p>
  }

  const tasksCreated = currentUserTasks.filter(task => task.status === 'Created');
  const tasksProgress = currentUserTasks.filter(task => task.status === 'Progress');
  const tasksDone = currentUserTasks.filter(task => task.status === 'Done');

  const bugsCreated = currentUserBugs.filter(bug => bug.status === 'Created');
  const bugsProgress = currentUserBugs.filter(bug => bug.status === 'Progress');
  const bugsDone = currentUserBugs.filter(bug => bug.status === 'Done');

  console.log("Not Started", tasksCreated);
  console.log("Progress", tasksProgress);
  console.log("Done", tasksDone);

  return (
    <div className='tasksAndBugs'>
    <h3>Your Tasks</h3>
      {currentUserTasks.length === 0? <p className='text-center text-danger'>User Has No Tasks To Display</p>:
        <div className = "d-flex justify-content-around mx-5">
          <Container className='d-flex flex-column mx-5'>
            <div className = "user-tasks-bugs-status task-bug-not-started"><span >Not Started</span><span className = "progress-num">1</span></div>
            {tasksCreated.map(task => <ListItem item = {task} key = {task.id} color = "danger"/>)}
          </Container>
          <Container className='d-flex flex-column mx-5'>
          <div className = "user-tasks-bugs-status task-bug-progress"><span>Progress</span><span className = "progress-num">2</span></div>
            {tasksProgress.map(task => <ListItem item = {task} key = {task.id} color = "warning"/>)}
          </Container>
          <Container className='d-flex flex-column mx-5'>
          <div className = "user-tasks-bugs-status task-bug-done"><span>Done</span><span className = "progress-num">3</span></div>
            {tasksDone.map(task => <ListItem item = {task} key = {task.id} color = "success"/>)}
          </Container>
        </div>
      }
    <h3>Your Bugs</h3>
      {currentUserBugs.length === 0? <p className='text-center text-danger'>User Has No Bugs To Display</p>:
        <div className = "d-flex justify-content-around mx-5">
          <Container className='d-flex flex-column mx-5'>
            <div className = "user-tasks-bugs-status task-bug-not-started"><span >Not Started</span><span className = "progress-num">1</span></div>
            {bugsCreated.map(bug => <ListItem item = {bug} key = {bug.id} color = "danger"/>)}
          </Container>
          <Container className='d-flex flex-column mx-5'>
          <div className = "user-tasks-bugs-status task-bug-progress"><span>Progress</span><span className = "progress-num">2</span></div>
            {bugsProgress.map(bug => <ListItem item = {bug} key = {bug.id} color = "warning"/>)}
          </Container>
          <Container className='d-flex flex-column mx-5'>
          <div className = "user-tasks-bugs-status task-bug-done"><span>Done</span><span className = "progress-num">3</span></div>
            {bugsDone.map(bug => <ListItem item = {bug} key = {bug.id} color = "success"/>)}
          </Container>
        </div>
      }
    </div>
  )
}

export default TasksAndBugs
