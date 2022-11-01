import React from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Chip } from '@mui/material'

import "./Column.css"

const Column = ({name, tasks, bugs, handleForwardClick, handlePreviousClick}) => {
  return (        
    <Container className = "my-4 mx-5 kanban-category" id = {name}>
        <h3 className = "kanban-title">{name}</h3>
          <Container className= {`kanban-category-body py-3 background-${name}`}>
            {tasks.map(task => (
                <Card style={{ width: '18.5rem' }} className = "kanban-card my-2" key = {task.id}>
                  <Card.Body>
                    <Card.Title>{task.name}</Card.Title>
                      <Chip label = {`Created on ${task.createdDate}`} color="primary" size="small" />
                      <Card.Text>
                        {task.description}
                      </Card.Text>
                  </Card.Body>
                  <Card.Footer className = "d-flex justify-content-end">
                    <Button className = "mx-1 btn btn-danger" disabled = {task.status === 'Created'} onClick = {() => handlePreviousClick({id: task.id, status: task.status, type: 'Task'})}> &lt; </Button>
                    <Button className = "mx-1 btn btn-success" disabled = {task.status === 'Done'} onClick = {() => handleForwardClick({id: task.id, status: task.status, type: 'Task'})}> &gt; </Button>
                  </Card.Footer>
                </Card>
            ))}
            {bugs.map(bug => (
              <Card style={{ width: '18.5rem' }} className = "kanban-card my-2" key = {bug.id}>
                <Card.Body>
                  <Card.Title>{bug.name}</Card.Title>
                  <Chip label = {`Created on ${bug.createdDate}`} color="primary" size="small"/>
                  <Card.Text>
                    {bug.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className = "d-flex justify-content-end">
                    <Button className = "mx-1 btn btn-danger" disabled = {bug.status === 'Created'} onClick = {() => handlePreviousClick({id: bug.id, status: bug.status, type: 'Bug'})}> &lt; </Button>
                    <Button className = "mx-1 btn btn-success" disabled = {bug.status === 'Done'} onClick = {() => handleForwardClick({id: bug.id, status: bug.status, type: 'Bug'})}> &gt; </Button>
                </Card.Footer>
              </Card>
            ))}
          </Container>
    </Container>
  )
}

export default Column
