import React from 'react'

//import CSS
import "./Card.css"

//import Bootstrap
import { ListGroup, Badge } from 'react-bootstrap';

const Card = () => {
  return (
    <div className = "task">
      <h1>Tasks List</h1>
      <ListGroup as="ol" numbered>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
              Cras justo odio
          </div>
          <Badge bg="primary" pill>
            Due on Oct 12
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
              Cras justo odio
          </div>
          <Badge bg="primary" pill>
            Due on Oct 1
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default Card
