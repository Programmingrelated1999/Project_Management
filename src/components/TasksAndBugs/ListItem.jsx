import React from 'react'

//import CSS
import "./Card.css"

//import Bootstrap
import {Button, Card } from 'react-bootstrap';
import { Chip } from '@mui/material';
import ProjectServices from "../../services/currentProjectServices"
import LaunchIcon from '@mui/icons-material/Launch';

import { Link } from 'react-router-dom'

const ListItem = ({item, color}) => {

  const isDue = ProjectServices.checkDueDate(item.createdDate, item.endDate);

  return (
    <Card className = {`my-3 border-${color} shadow `}>
      <Card.Body>
      <Card.Title>{item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{isDue? <Chip color = "error" label = "Due" size = "small"/>: <Chip color = "success" label = 'Not Due' size = "small"/>}</Card.Subtitle>
        {item.status? <Chip color = "error" label = 'Not Complete' size = "small"/>: <Chip color = "success" label = "Complete" size = "small"/>}
        <Card.Text>{item.description}</Card.Text>
        <Link to = {`/projects/${item.project.id}`}><Button size = "sm" className = "btn btn-warning">Go To Project<LaunchIcon/></Button></Link>
      </Card.Body>
    </Card>
  )
}

export default ListItem
