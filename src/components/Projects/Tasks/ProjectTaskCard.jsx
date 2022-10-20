import React from 'react'
import { Card } from 'react-bootstrap'
import { Button, Chip } from '@mui/material'

import "./ProjectTaskCard.css"

const ProjectTaskCard = ({name, description, createdDate, openDelete, openViewDetails, openEdit}) => {
  return (
    <div>
        <Card style={{ width: '18.5rem' }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Chip label = {`Created on ${createdDate}`} color="primary" size="small" />
                <Card.Text>
                    {description}
                </Card.Text>
                <Button href="#" className = "project-task-card"  onClick = {openViewDetails}>View Details</Button>
                <Button href="#" className = "project-task-card" onClick = {openEdit}>Edit</Button>
                <Button href="#" color = "error" className = "project-task-card" onClick = {openDelete}>Delete</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ProjectTaskCard
