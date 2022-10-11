import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { loadCurrentProjectData } from '../../reducers/currentProjectReducer';
import SideNavbar from '../commonlyUsedComponents/SideNavbar';

import "./projectHome.css";

const ProjectHome = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    //get Current Project
    const currentProject = useSelector(state => state.currentProject.projectData);
    const isLoading = useSelector(state => state.currentProject.projectData.isLoading);
    const hasError= useSelector(state => state.currentProject.projectData.hasError);

    const [status, setStatus] = useState(currentProject.status);

    //useEffect
    useEffect(() => {dispatch(loadCurrentProjectData(id))}, [id]);

    if(isLoading){
        return <p>Loading...</p>
    }

    if(hasError){
        return <p>Has Error</p>
    }

    return (
        <div>
            <h4 className = "project-detail-header">{currentProject.name}</h4>
            <h6 className = "project-detail-header">Description: {currentProject.description}</h6>
            <p className = "project-detail-header">Created On: {currentProject.createdDate}</p>
            {currentProject.endDate? <p className = "project-detail-header">currentProject.endDate</p>: <p className = "project-detail-header">End Date: N/A</p>}
            <SideNavbar/>
        </div>
    )
}

export default ProjectHome;
