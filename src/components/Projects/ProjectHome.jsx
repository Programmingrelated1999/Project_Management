import React from 'react'

import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const ProjectHome = () => {
    const { id } = useParams();
    const projects = useSelector(state => state.currentUser.personData.projects);

    const currentProject = projects.find(project => project.id === id);
    console.log(currentProject);

    return (
        <div>
            <h4>{currentProject.name}</h4>
            <h3>{currentProject.description}</h3>
            <p>{currentProject.createdDate}</p>
        </div>
    )
}

export default ProjectHome;
