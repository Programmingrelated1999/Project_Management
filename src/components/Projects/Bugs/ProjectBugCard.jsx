import React from 'react'
import { Card } from 'react-bootstrap'
import { Button, Chip } from '@mui/material'

import "./ProjectBugCard.css"

const ProjectBugCard = ({name, description, createdDate, openDelete, openViewDetails, openEdit}) => {
  return (
    <div>
        <Card style={{ width: '18.5rem' }} className = "mx-4 my-2">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Chip label = {`Created on ${createdDate}`} color="primary" size="small" />
                <Card.Text>
                    {description}
                </Card.Text>
                <Button href="#" className = "project-bug-card"  onClick = {openViewDetails}>View Details</Button>
                <Button href="#" className = "project-bug-card" onClick = {openEdit}>Edit</Button>
                <Button href="#" color = "error" className = "project-bug-card" onClick = {openDelete}>Delete</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ProjectBugCard
