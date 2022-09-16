import React from 'react';

//React Components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const SampleProjects = () => {
  return (
    <Container >
      <Row>
        <Col>
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
        </Col>
        <Col>
          <Card style={{ width: '25rem', height: '14rem'}}>
            <Card.Header as="h5">Project 2</Card.Header>
            <Card.Body>
              <Card.Title>Game</Card.Title>
              <Card.Text>
                Build a Game with C++ Programming Language.
              </Card.Text>
              <Button variant="primary">Go To Project</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '25rem', height: '14rem'}}>
            <Card.Header as="h5">Project 3</Card.Header>
            <Card.Body>
              <Card.Title>Python</Card.Title>
              <Card.Text>
                Python Programming
              </Card.Text>
              <Button variant="primary">Go To Project</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SampleProjects
