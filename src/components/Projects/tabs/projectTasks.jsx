import React from 'react'
import { useSelector } from 'react-redux';

const ProjectTasks = () => {
  const currentProject = useSelector(state => state.currentProject.projectData);

  console.log(currentProject.tasks);

  return (
    <div className='project-tasks'>
      {currentProject.tasks.map((task) => <p>{task.name}</p>)}
    </div>
  )
}

export default ProjectTasks;
