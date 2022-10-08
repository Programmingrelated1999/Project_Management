import React from 'react'

//import CSS
import "./Card.css"

//import Bootstrap
import { ListGroup, Badge } from 'react-bootstrap';

const TaskListItem = ({task}) => {
  console.log(task);
  return (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{task.name}</div>
              {task.description}
          </div>
          <Badge bg="primary" pill>
            {task.createdDate}
          </Badge>
        </ListGroup.Item>
  )
}

export default TaskListItem
