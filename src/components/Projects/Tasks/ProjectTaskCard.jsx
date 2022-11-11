import React from 'react'
import { Card } from 'react-bootstrap'
import { Button, Chip } from '@mui/material'

import moment from "moment"

import "./ProjectTaskCard.css"

const ProjectTaskCard = ({name, description, createdDate, endDate, openDelete, openViewDetails, openEdit}) => {
  return (
        <Card style={{ width: '18.5rem' }} className = "mx-4 my-2">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Chip label = {`Created on ${moment(createdDate).format("MMM-DD-YYYY")}`} color="primary" size="small" />
                <Chip label = {endDate? `End on ${moment(endDate).format("MMM-DD-YYYY")}`: 'N/A'} color="error" size="small" />
                <Card.Text>
                    {description}
                </Card.Text>
                <Button className = "project-task-card"  onClick = {openViewDetails}>View Details</Button>
                <Button className = "project-task-card" onClick = {openEdit}>Edit</Button>
                <Button className = "project-task-card" color = "error" onClick = {openDelete}>Delete</Button>
            </Card.Body>
        </Card>
  )
}

export default ProjectTaskCard
