import React from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Chip } from '@mui/material'

import "./Column.css"

const Column = ({name, tasks, bugs}) => {
  console.log("Tasks", tasks);
  console.log("Bugs", bugs);

  return (        
    <Container className = "my-4 mx-5 kanban-category">
        <h3 className = "kanban-title">{name}</h3>
          <Container className= {`kanban-category-body py-3 background-${name}`}>
            {tasks.map(task => (
                <Card style={{ width: '18.5rem' }} className = "kanban-card my-2">
                  <Card.Title>{task.name}</Card.Title>
                  <Card.Body>
                      <Chip label = {`Created on ${task.createdDate}`} color="primary" size="small" />
                      <Card.Text>
                        {task.description}
                      </Card.Text>
                  </Card.Body>
                  <Card.Footer className = "d-flex justify-content-end">
                    <Button className = "mx-1"> &lt; </Button>
                    <Button className = "mx-1"> &gt; </Button>
                  </Card.Footer>
                </Card>
            ))}
            {bugs.map(bug => (
              <Card style={{ width: '18.5rem' }} className = "kanban-card my-2">
                <Card.Title>{bug.name}</Card.Title>
                <Card.Body>
                  <Chip label = {`Created on ${bug.createdDate}`} color="primary" size="small" />
                  <Card.Text>
                    {bug.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className = "d-flex justify-content-end">
                    <Button className = "mx-1"> &lt; </Button>
                    <Button className = "mx-1"> &gt; </Button>
                </Card.Footer>
              </Card>
            ))}
          </Container>
    </Container>
  )
}

export default Column
