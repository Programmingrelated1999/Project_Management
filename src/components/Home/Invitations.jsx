import React from 'react'
import { Button } from '@mui/material';

const Invitations = ({name, projectId, handleAcceptInvite}) => {

  console.log("Project Id", projectId)

  return (
    <tr>
        <td>{name}</td>
        <td><Button onClick = {() => handleAcceptInvite(projectId)}>Accept</Button><Button>Reject</Button></td>
    </tr>
  )
}

export default Invitations
