import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

//components
import ProjectBugCard from '../Bugs/ProjectBugCard';
import DeleteBugModal from '../Bugs/Modals/DeleteBugModal';
import ViewBugModal from '../Bugs/Modals/ViewBugModal';
import EditBugModal from '../Bugs/Modals/EditBugModal';

//other components
import { Container, Button } from 'react-bootstrap';

//reducer actions
import { deleteSelectedBug } from '../../../reducers/currentBugReducer';
import CreateANewBugModal from "../Bugs/Modals/CreateANewBugModal"

const ProjectBugs = () => {
  const bugs = useSelector(state => state.currentProject.projectData.bugs);
  const isLoading = useSelector(state => state.currentProject.isLoading);
  const hasError = useSelector(state => state.currentProject.hasError);

  //view details, edit and delete modals variables
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCreateBug, setShowCreateBug] = useState(false);
  const [bugSelected, setBugSelected] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useDispatch();

  if(isLoading){
    return <p>Is Loading</p>
  }

  if(hasError){
    return <p>Has Error</p>
  }

  //check if the user is admin or creator
  /*
  let isAuthorized = false;
  const userId = JSON.parse(localStorage.getItem("id"));
  console.log("userId", userId);
  console.log("creator id", currentProject.creator.id);
  if(userId === currentProject.creator.id){
    isAuthorized = true;
  }
  const adminIds = currentProject.admins.map((admin) => admin.id);
  console.log(adminIds);
  if(adminIds.includes(userId)){
    isAuthorized = true;
  }
  */

  //modal handlers
  const openViewDetails = async (bugId) => {
    await setBugSelected(bugId);
    setShowViewDetails(true);
  }
  const openEdit = (bugId) => {
    setBugSelected(bugId);
    setShowEdit(true);
  }
  const openDelete = (bugId) => {
    setBugSelected(bugId);
    setShowDelete(true);
  }
  const openCreateBug = () => {
    setShowCreateBug(true);
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
  const closeCreateBug = () => {
    setShowCreateBug(false);

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

  const handleCreateBug = async (bug) => {
    setShowCreateBug(false);
  }

  return (
    <div className='project-bugs'>    
      <Container className = "text-center my-2">
        <Button className = "btn btn-warning" onClick = {openCreateBug}>Create New Bug</Button>
      </Container>
      <p>Started</p>
        {started.map((bug) => <ProjectBugCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} bugId = {bug.id} openDelete = {() => openDelete(bug.id)} openViewDetails = { () => openViewDetails(bug.id)} openEdit = {() => openEdit(bug.id)}/>)}
      <p>Progress</p>
        {progress.map((bug) => <ProjectBugCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} bugId = {bug.id} openDelete = {() => openDelete(bug.id)} openViewDetails = { () => openViewDetails(bug.id)} openEdit = {() => openEdit(bug.id)} />)}  
      <p>Done</p>
        {done.map((bug) => <ProjectBugCard key = {bug.id} name = {bug.name} description = {bug.description} createdDate = {bug.createdDate} bugId = {bug.id} openDelete = {() => openDelete(bug.id)} openViewDetails = {( ) => openViewDetails(bug.id)} openEdit = {() => openEdit(bug.id)}/>)}
      
      {bugSelected? <ViewBugModal showViewDetails={showViewDetails} closeViewDetails = {closeViewDetails} bugSelected={bugSelected}/>: null}
      {bugSelected? <EditBugModal showEdit={showEdit} closeEdit = {closeEdit} bugSelected={bugSelected}/> : null}
      <DeleteBugModal showDelete={showDelete} closeDelete = {closeDelete} loadDelete = {loadDelete} isDelete = {isDelete} handleDelete = {handleDelete}/>
      <CreateANewBugModal showCreateBug={showCreateBug} closeCreateBug={closeCreateBug} handleCreateBug = {handleCreateBug}/>
    </div>
  )
}

export default ProjectBugs;
