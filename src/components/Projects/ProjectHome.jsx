import React, {useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { loadCurrentProjectData } from '../../reducers/currentProjectReducer';
import SideNavbar from '../commonlyUsedComponents/SideNavbar';
import { Chip } from '@mui/material';
import ProjectServices from "../../services/currentProjectServices"

import moment from 'moment';

import "./projectHome.css";

const ProjectHome = () => {
    //get Current Project
    const currentProject = useSelector(state => state.currentProject.projectData);
    const isCurrentProjectLoading = useSelector(state => state.currentProject.isLoading);
    const hasCurrentProjectError = useSelector(state => state.currentProject.hasError);

    const dispatch = useDispatch();
    const { id } = useParams();

    //useEffect
    useEffect(() => {    
        dispatch(loadCurrentProjectData(id))}, [id]);

    if(isCurrentProjectLoading || currentProject == null){
        return <p>Loading...</p>
    }
    if(hasCurrentProjectError){
        return <p>Has Error</p>
    }

    let isDue =  ProjectServices.checkDueDate(currentProject.createdDate, currentProject.endDate);

    return (
        <div>
            <h4 className = "project-detail-header">{currentProject.name}</h4>
            <h6 className = "project-detail-header">Description: {currentProject.description}</h6>
            <span className='my-1'><h6 className = "d-inline">Project Date Range: &nbsp; </h6>
                <span className='text-success'>{moment(currentProject.createdDate).format("MMM-DD-YYYY")}</span> to &nbsp;
                {currentProject.endDate? <span className='text-danger'>{moment(currentProject.endDate).format("MMM-DD-YYYY")}</span>:<span>N/A</span>}
            </span>
            {isDue? <h6>Project Deadline: <Chip color = "error" label = "Due" size = "small"/></h6> : <h6>Project Deadline: <Chip color = "success" label = "Not Due" size = "small"/></h6>}
            {currentProject.status? <h6>Project Status: <Chip color = "success" label = "Complete" size = "small"/></h6> : <h6>Project Status: <Chip color = "error" label = "Not Complete" size = "small"/></h6>}
            <SideNavbar/>
        </div>
    )
}

export default ProjectHome;
