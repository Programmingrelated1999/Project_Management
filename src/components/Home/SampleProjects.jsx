import React from 'react';

//React Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { useSelector } from 'react-redux';

const SampleProjects = () => {

  const currentUser = useSelector(state => state.currentUser.userData);
  const isLoading = useSelector(state => state.currentUser.isLoading);
  const hasError = useSelector(state => state.currentUser.hasError);

  if(isLoading){
    return <p>Is Loading</p>
  }

  if(hasError){
    return <p>Has Error</p>
  }

  return (
        <Card style={{ width: '25rem', height: '14rem'} }>
            <Card.Header as="h5">Project 1</Card.Header>
            <Card.Body>
              <Card.Title>UX Mobile</Card.Title>
              <Card.Text>
                Building a UX mobile design by Friday for WhatsAPP.
              </Card.Text>
              <Button variant="primary">Go To Project</Button>
            </Card.Body>
          </Card>
  )
}

export default SampleProjects
