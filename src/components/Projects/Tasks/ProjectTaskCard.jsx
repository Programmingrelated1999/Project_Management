import React from 'react'
import { Card } from 'react-bootstrap'

const ProjectTaskCard = ({name, description, createdDate, id, handleDeleteCard}) => {
  return (
    <div>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>{createdDate}</Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Link href="#">View Details</Card.Link>
                <Card.Link href="#">Edit</Card.Link>
                <Card.Link href="#" color = "red" onClick = {handleDeleteCard(id)}>Delete</Card.Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ProjectTaskCard
