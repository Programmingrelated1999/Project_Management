import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Chip } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';
import moment from "moment"

const MiniTaskAndBugs = ({tasks, bugs}) => {

  if(tasks.length === 0){
    return (
    <div style={{ height: '12rem', width: '25rem', padding: '3rem', borderRadius: '1rem'}} className = "text-center invitations">
      <h6 className = "text-danger">User Have No Projects</h6>
    </div>
    )
  }

  return (
    <div overflow = "scrollable ">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>End Date</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) =>     
            <tr key = {task.id}>
              <td>{task.name}</td>
              <td>{task.endDate? moment(task.endDate).format("MMM DD YYYY"): "N/A"}</td>
              <td><Chip label = "Task" color = "warning" size = "small"/></td>
              <td><Link to = {`projects/${String(task.project)}`}><Button className = "btn btn-warning" size = "sm  ">Jump To Project <LaunchIcon/></Button></Link></td>
            </tr>)
          }
          {bugs.map((bug) =>     
            <tr key = {bug.id}>
              <td>{bug.name}</td>
              <td>{bug.endDate? moment(bug.endDate).format("MMM DD YYYY"): "N/A"}</td>
              <td><Chip label = "Bug" color = "success" size = "small"/></td>
              <td><Link to = {`projects/${String(bug.project)}`}><Button className = "btn btn-warning" size = "sm  ">Jump To Project <LaunchIcon/></Button></Link></td>
            </tr>)
          }
        </tbody>
      </Table>
    </div>
  )
}

export default MiniTaskAndBugs
