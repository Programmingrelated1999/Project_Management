import React from 'react'
import "./Tasks.css"
import Card from './Tasks/Card'

const Tasks = () => {
  return (
    <div className='tasks'>
        <div className = "calander">
          <p>Calander</p>
        </div>
        <div className = "tasksLog">
            <Card />
        </div>
    </div>
  )
}

export default Tasks
