import React from 'react'
import { Table, Button } from 'react-bootstrap';

const MiniTask = ({tasks}) => {

  if(tasks.length === 0){
    return <p>No Tasks assigned</p>
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Tasks Name</th>
          <th>Project Info</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) =>     
          <tr key = {task.id}>
            <td>{task.name}</td>
            <td>{task.project.name}</td>
            <td><Button>Jump To Kanban</Button></td>
          </tr>)
        }
      </tbody>
    </Table>
  )
}

export default MiniTask
