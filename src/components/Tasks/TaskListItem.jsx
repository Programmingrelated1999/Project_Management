import React from 'react'

//import CSS
import "./Card.css"

//import Bootstrap
import { ListGroup, Badge, Button } from 'react-bootstrap';

const TaskListItem = ({task}) => {
  return (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              <h2 className = "text-start">{task.name}</h2>
            </div>
            <p className = "text-start">{task.description}</p>
            <Button className ="btn btn-primary btn-sm float-start">Quick Jump Task</Button>
          </div> 
          <Badge bg="primary" pill className = "my-2">
            {task.createdDate}
          </Badge>     
        </ListGroup.Item>
  )
}

export default TaskListItem
