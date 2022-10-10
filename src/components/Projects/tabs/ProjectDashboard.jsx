import React, {useState} from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

const ProjectDashboard = () => {
  const [progress, setProgress] = useState(0);

  const creator = useSelector(state => state.currentProject.projectData.creator);

  return (
    <div>
      <h1>Project Overview</h1>
      <h3>Number of Members</h3>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value = {90} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${Math.round(90)}%`}</Typography>
          </Box>
      </Box>
    </div>
  )
}

export default ProjectDashboard
