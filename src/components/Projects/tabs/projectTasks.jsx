import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import ProjectTaskCard from '../Tasks/ProjectTaskCard';
import DeleteModal from '../Tasks/Modals/DeleteModal';
import ViewTaskModal from '../Tasks/Modals/ViewTaskModal';

import { deleteSelectedTask } from '../../../reducers/currentTaskReducer';

const ProjectTasks = () => {
  const tasks = useSelector(state => state.currentProject.projectData.tasks);
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
  const [taskSelected, setTaskSelected] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  //modal handlers
  const openViewDetails = async (taskId) => {
    await setTaskSelected(taskId);
    setShowViewDetails(true);
  }
  const openEdit = (taskId) => {
    setTaskSelected(taskId);
    setShowViewEdit(true);
  }
  const openDelete = (taskId) => {
    setTaskSelected(taskId);
    setShowDelete(true);
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

  return (
    <div className='project-tasks'>
      <p>Started</p>
        {started.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} taskId = {task.id} openDelete = {() => openDelete(task.id)} openViewDetails = { () => openViewDetails(task.id)}/>)}
      <p>Progress</p>
        {progress.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} taskId = {task.id} openDelete = {() => openDelete(task.id)} openViewDetails = { () => openViewDetails(task.id)}/>)}  
      <p>Done</p>
        {done.map((task) => <ProjectTaskCard key = {task.id} name = {task.name} description = {task.description} createdDate = {task.createdDate} taskId = {task.id} openDelete = {() => openDelete(task.id)} openViewDetails = {( ) => openViewDetails(task.id)}/>)}
      
      {taskSelected? <ViewTaskModal showViewDetails={showViewDetails} closeViewDetails = {closeViewDetails} taskSelected={taskSelected}/>: null}
      <DeleteModal showDelete={showDelete} closeDelete = {closeDelete} loadDelete = {loadDelete} isDelete = {isDelete} handleDelete = {handleDelete}/>
    </div>
  )
}

export default ProjectTasks;
