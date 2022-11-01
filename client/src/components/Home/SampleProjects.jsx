import React from 'react';

//React Components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Launch from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import { Chip } from '@mui/material';

import { useSelector } from 'react-redux';

const SampleProjects = () => {

  const currentUser = useSelector(state => state.currentUser.personData);
  const isLoading = useSelector(state => state.currentUser.isLoading);
  const hasError = useSelector(state => state.currentUser.hasError);

  if(isLoading){
    return <p>Is Loading</p>
  }

  if(hasError){
    return <p>Has Error</p>
  }

  const randomNum = Math.ceil(Math.random() * (currentUser.projects.length-1));
  const randomProject = currentUser.projects[randomNum];

  console.log("endDate", randomProject.endDate);

  return (
        <Card style={{ width: '25rem', height: '14rem'} }>
            <Card.Header as="h5">Jump into this Project</Card.Header>
            <Card.Body>
              <Card.Title>
                {randomProject.name}
              </Card.Title>
              <Card.Subtitle>
                <h6>From <span className='text-success'>{moment(randomProject.createdDate).format("MMM DD YYYY")}</span> To <span className='text-danger'>{randomProject.endDate? moment(randomProject.endDate).format("MMM DD YYYY"): "N/A"}</span></h6>
              </Card.Subtitle>
              <Card.Text>
                {randomProject.description}
              </Card.Text>
              <Link to = {`/projects/${randomProject.id}`}><Button variant="warning" size = "small">Go To Project<Launch/></Button></Link>
            </Card.Body>
          </Card>
  )
}

export default SampleProjects
