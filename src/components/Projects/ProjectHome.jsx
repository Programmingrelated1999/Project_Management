import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { loadCurrentProjectData } from '../../reducers/currentProjectReducer';
import SideNavbar from '../commonlyUsedComponents/SideNavbar';

import moment from 'moment';

import "./projectHome.css";

const ProjectHome = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    //get Current Project
    const currentProject = useSelector(state => state.currentProject.projectData);
    const isLoading = useSelector(state => state.currentProject.projectData.isLoading);
    const hasError= useSelector(state => state.currentProject.projectData.hasError);

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
            <span className='my-1'>Project Date Range: &nbsp;
                <span className='text-success'>{moment(currentProject.createdDate).format("MMM-DD-YYYY")}</span> to &nbsp;
                {currentProject.endDate? <span className='text-danger'>{moment(currentProject.endDate).format("MMM-DD-YYYY")}</span>:<span>N/A</span>}
            </span>
            <SideNavbar/>
        </div>
    )
}

export default ProjectHome;
