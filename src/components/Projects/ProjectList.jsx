import React from 'react'
import "./ProjectList.css"

//React Components
import Card from 'react-bootstrap/Card';

const ProjectList = () => {
  return (
    <div className = "project-table">
        <Card style={{ width: '40rem' }}>
            <Card.Body>
                <Card.Title>Project 1</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Go to Link</Card.Link>
            </Card.Body>
        </Card>
        <Card style={{ width: '40rem' }}>
            <Card.Body>
                <Card.Title>Project 2</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Go to Link</Card.Link>
            </Card.Body>
        </Card>
        <Card style={{ width: '40rem' }}>
            <Card.Body>
                <Card.Title>Project 3</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Go to Link</Card.Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ProjectList
