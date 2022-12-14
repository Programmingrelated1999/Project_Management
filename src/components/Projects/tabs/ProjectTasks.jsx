import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

//components
import ProjectTaskCard from '../Tasks/ProjectTaskCard';
import DeleteModal from '../Tasks/Modals/DeleteModal';
import ViewTaskModal from '../Tasks/Modals/ViewTaskModal';
import EditTaskModal from '../Tasks/Modals/EditTaskModal';

//other components
import { Container, Button } from 'react-bootstrap';

//reducer actions
import { deleteSelectedTask } from '../../../reducers/currentTaskReducer';
import CreateANewTaskModal from '../Tasks/Modals/CreateANewTaskModal';

import "./ProjectTasks.css"

const ProjectTasks = () => {
  const tasks = useSelector(state => state.currentProject.projectData.tasks);
  const isLoading = useSelector(state => state.currentProject.isLoading);
  const hasError = useSelector(state => state.currentProject.hasError);

  //view details, edit and delete modals variables
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [taskSelected, setTaskSelected] = useState('');
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
  const openViewDetails = async (taskId) => {
    await setTaskSelected(taskId);
    setShowViewDetails(true);
  }
  const openEdit = (taskId) => {
    setTaskSelected(taskId);
    setShowEdit(true);
  }
  const openDelete = (taskId) => {
    setTaskSelected(taskId);
    setShowDelete(true);
  }
  const openCreateTask = () => {
    setShowCreateTask(true);
  }

  const closeViewDetails = () => {
    setTaskSelected('');
    setShowViewDetails(false);
  }
  const closeEdit = () => {
    setTaskSelected('');
    setShowEdit(false);
  }
  const closeDelete = () => {
    setTaskSelected('');
    setShowDelete(false);
  }
  const closeCreateTask = () => {
    setShowCreateTask(false);

  }

  const started = tasks.filter((task) => task.status === 'Created');
  const progress = tasks.filter((task) => task.status === 'Progress');
  const done = tasks.filter((task) => task.status === 'Done');

  const loadDelete = () => {
    setIsDelete(!isDelete);
  }

  const handleDelete = async () => {
    setIsDelete(true);
    const deletedTask = await deleteSelectedTask(taskSelected);
    dispatch({ type: 'currentProject/deleteTask', payload: {task: taskSelected} });
    dispatch({ type: 'currentUser/deleteTask', payload: {task: taskSelected} });
    setIsDelete(false);
    setShowDelete(false);
  }

  const handleCreateTask = async (task) => {
    setShowCreateTask(false);
  }

  return (
    <div className='project-tasks'>    
      <Container className = "text-center my-2">
        <Button className = "btn btn-warning" onClick = {openCreateTask}>Create New Task</Button>
      </Container>
      <p>Started</p>
        <div className = "task-card-container">{started.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} endDate = {task.endDate} taskId = {task.id} openDelete = {() => openDelete(task.id)} openViewDetails = { () => openViewDetails(task.id)} openEdit = {() => openEdit(task.id)}/>)}</div>
      <p>Progress</p>
        <div className="task-card-container">{progress.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} endDate = {task.endDate} taskId = {task.id} openDelete = {() => openDelete(task.id)} openViewDetails = { () => openViewDetails(task.id)} openEdit = {() => openEdit(task.id)} />)}</div>
      <p>Done</p>
        <div className="task-card-container">{done.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} endDate = {task.endDate} taskId = {task.id} openDelete = {() => openDelete(task.id)} openViewDetails = {( ) => openViewDetails(task.id)} openEdit = {() => openEdit(task.id)}/>)}</div>
      
      {taskSelected? <ViewTaskModal showViewDetails={showViewDetails} closeViewDetails = {closeViewDetails} taskSelected={taskSelected}/>: null}
      {taskSelected? <EditTaskModal showEdit={showEdit} closeEdit = {closeEdit} taskSelected={taskSelected}/> : null}
      <DeleteModal showDelete={showDelete} closeDelete = {closeDelete} loadDelete = {loadDelete} isDelete = {isDelete} handleDelete = {handleDelete}/>
      <CreateANewTaskModal showCreateTask={showCreateTask} closeCreateTask={closeCreateTask} handleCreateTask = {handleCreateTask}/>
    </div>
  )
}

export default ProjectTasks;
