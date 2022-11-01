import React from 'react'
import { Button } from '@mui/material';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const Invitations = ({name, projectId, handleAcceptInvite, handleRejectInvite}) => {

  console.log("Project Id", projectId)

  return (
    <tr>
        <td>{name}</td>
        <td><Button color = "success" onClick = {() => handleAcceptInvite(projectId)}>Accept<ThumbUpAltIcon/></Button>
            <Button color = "error" onClick = {() => handleRejectInvite(projectId)}>Reject<ThumbDownAltIcon/></Button>
        </td>
    </tr>
  )
}

export default Invitations
