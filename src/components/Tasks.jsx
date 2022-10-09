import React from 'react'
import "./Tasks.css"
import { ListGroup, Badge } from 'react-bootstrap'
import TaskListItem from './Tasks/TaskListItem'

import { useSelector } from 'react-redux'

const Tasks = () => {
  const currentUserTasks = useSelector(state => state.currentUser.personData.tasks);

  return (
    <div className='tasks'>
        <div className = "calander">
          <p>Calander</p>
        </div>
        <div className = "tasksLog">
          <h1>Tasks List</h1>
          <ListGroup as="ul">
            {currentUserTasks.map(task => <TaskListItem key = {task.id} task = {task}/>)}
            {console.log(currentUserTasks)}
          </ListGroup>
        </div>
    </div>
  )
}

export default Tasks
