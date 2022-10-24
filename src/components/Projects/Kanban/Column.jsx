import React from 'react'
import { Container, Card } from 'react-bootstrap'

import "./Column.css"

const Column = ({name, tasks}) => {

  return (
    <Container className = "text-center my-4 mx-5 kanban-category">
        <h3 className = "kanban-title">{name}</h3>
      <Container className= {`kanban-category-body py-3 background-${name}`}>
        {tasks.map(task => 
        <Card className = "my-1 kanban-card" style = {{width: "18rem"}} key = {task.name}>
          <Card.Title>
            {task.name}
          </Card.Title>
          <Card.Body>
            {task.id}
          </Card.Body>
        </Card>)}
      </Container>
    </Container>
  )
}

export default Column
