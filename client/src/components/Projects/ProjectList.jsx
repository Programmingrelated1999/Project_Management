import React from 'react'
import "./ProjectList.css"

//Import React Router
import {Link} from "react-router-dom"

//React Components
import Card from 'react-bootstrap/Card';

const ProjectList = ({name, description, projectId}) => {
  return (
    <>
      <Card style={{ width: '40rem' }}>
          <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                  {description}
              </Card.Text>
              <Link to={`/projects/${projectId}`}>Go to Link</Link>
          </Card.Body>
      </Card>
    </>
  )
}

export default ProjectList
