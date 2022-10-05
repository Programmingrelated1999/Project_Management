import React from 'react'
import "./ProjectList.css"

//React Components
import Card from 'react-bootstrap/Card';

const ProjectList = ({name, description, id}) => {
  return (
    <Card style={{ width: '40rem' }}>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
            <Card.Link href="#">Go to Link</Card.Link>
        </Card.Body>
    </Card>
  )
}

export default ProjectList
