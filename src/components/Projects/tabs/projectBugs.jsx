import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import ProjectTaskCard from '../Tasks/ProjectTaskCard';
import DeleteModal from '../Tasks/Modals/DeleteModal';
import ViewBugModal from '../Bugs/Modals/ViewBugModal';

import { deleteSelectedBug } from '../../../reducers/currentBugReducer';

const ProjectBugs = () => {
  const bugs = useSelector(state => state.currentProject.projectData.bugs);
  const isLoading = useSelector(state => state.currentProject.isLoading);
  const hasError = useSelector(state => state.currentProject.hasError);

  const dispatch = useDispatch();

  if(isLoading){
    return <p>Is Loading</p>
  }

  if(hasError){
    return <p>Has Error</p>
  }

  //view details, edit and delete modals variables
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [bugSelected, setBugSelected] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  //modal handlers
  const openViewDetails = async (bugId) => {
    await setBugSelected(bugId);
    setShowViewDetails(true);
  }
  const openEdit = (bugId) => {
    setBugSelected(bugId);
    setShowViewEdit(true);
  }
  const openDelete = (bugId) => {
    setBugSelected(bugId);
    setShowDelete(true);
  }

  const closeViewDetails = () => {
    setBugSelected('');
    setShowViewDetails(false);
  }
  const closeEdit = () => {
    setBugSelected('');
    setShowEdit(false);
  }
  const closeDelete = () => {
    setBugSelected('');
    setShowDelete(false);
  }

  const started = bugs.filter((bug) => bug.status === 'Created');
  const progress = bugs.filter((bug) => bug.status === 'Progress');
  const done = bugs.filter((bug) => bug.status === 'Done');

  const loadDelete = () => {
    setIsDelete(!isDelete);
  }

  const handleDelete = async () => {
    setIsDelete(true);
    const deletedBug = await deleteSelectedBug(bugSelected);
    dispatch({ type: 'currentProject/deleteBug', payload: {bug: bugSelected} });
    dispatch({ type: 'currentUser/deleteBug', payload: {bug: bugSelected} });
    setIsDelete(false);
    setShowDelete(false);
  }

  return (
    <div className='project-bugs'>
      <p>Started</p>
        {started.map((bug) => <ProjectTaskCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} taskId = {bug.id} openDelete = {() => openDelete(bug.id)} openViewDetails = { () => openViewDetails(bug.id)}/>)}
      <p>Progress</p>
        {progress.map((bug) => <ProjectTaskCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} taskId = {bug.id} openDelete = {() => openDelete(bug.id)} openViewDetails = { () => openViewDetails(bug.id)}/>)}  
      <p>Done</p>
        {done.map((bug) => <ProjectTaskCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} taskId = {bug.id} openDelete = {() => openDelete(bug.id)} openViewDetails = {( ) => openViewDetails(bug.id)}/>)}
      
      {bugSelected? <ViewBugModal showViewDetails={showViewDetails} closeViewDetails = {closeViewDetails} bugSelected={bugSelected}/>: null}
      <DeleteModal showDelete={showDelete} closeDelete = {closeDelete} loadDelete = {loadDelete} isDelete = {isDelete} handleDelete = {handleDelete}/>
    </div>
  )
}

export default ProjectBugs;
