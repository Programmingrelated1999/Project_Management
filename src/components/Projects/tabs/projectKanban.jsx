import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Column from '../Kanban/Column';

import {editSelectedTask} from "../../../reducers/currentTaskReducer";
import {editSelectedBug} from "../../../reducers/currentBugReducer";
import { loadCurrentProjectData } from '../../../reducers/currentProjectReducer';

const projectKanban = () => {

  const dispatch = useDispatch();
  let currentProjectId = useSelector(state => state.currentProject.projectData.id);
  let allTasks = useSelector(state => state.currentProject.projectData.tasks);
  let allBugs = useSelector(state => state.currentProject.projectData.bugs);
  const isLoading = useSelector(state=>state.currentProject.isLoading);
  const hasError = useSelector(state=>state.currentProject.hasError);
  
  const[taskSelected, setTaskSelected] = useState();
  const[bugSelected, setBugSelected] = useState();

  if(isLoading){
    return <p>Is Loading</p>
  }

  if(hasError){
    return <p>Has Error</p>
  }

  let tasksCreated = [];
  let tasksProgress = [];
  let tasksDone = [];
  let bugsCreated = [];
  let bugsProgress = [];
  let bugsDone = [];

  let tempTaskList = allTasks.filter(task => task.status === 'Created');
  tasksCreated = tasksCreated.concat(tempTaskList);
  tempTaskList = allTasks.filter(task => task.status === 'Progress');
  tasksProgress = tasksProgress.concat(tempTaskList);
  tempTaskList = allTasks.filter(task => task.status === 'Done');
  tasksDone = tasksDone.concat(tempTaskList);
  let tempBugList = allBugs.filter(bug => bug.status === 'Created');
  bugsCreated = bugsCreated.concat(tempBugList);
  tempBugList = allBugs.filter(bug => bug.status === 'Progress');
  bugsProgress = bugsProgress.concat(tempBugList);
  tempBugList = allBugs.filter(bug => bug.status === 'Done');
  bugsDone = bugsDone.concat(tempBugList);

  const columns = [
    {name: "Started", taskList: tasksCreated, bugList: bugsCreated},
    {name: "Progress", taskList: tasksProgress, bugList: bugsProgress},
    {name: "Done", taskList: tasksDone, bugList: bugsDone},
  ]

  const handleForwardClick = async ({id, status, type}) => {
    let newStatus;
    if(status === 'Created'){
      newStatus = 'Progress'
    }
    if(status === 'Progress'){
      newStatus = "Done"
    }
    if(type == 'Task'){
      let data = {
        status: newStatus
      }
      await editSelectedTask(id, data);
      await dispatch(loadCurrentProjectData(currentProjectId));
    }
    if(type == 'Bug'){
      let data = {
        status: newStatus
      }
      await editSelectedBug(id, data);
      await dispatch(loadCurrentProjectData(currentProjectId));
    }
  }

  const handlePreviousClick = async ({id, status, type}) => {
    let newStatus;
    if(status === 'Progress'){
      newStatus = 'Created'
    }
    if(status === 'Done'){
      newStatus = "Progress"
    }
    if(type == 'Task'){
      let data = {
        status: newStatus
      }
      await editSelectedTask(id, data);
      await dispatch(loadCurrentProjectData(currentProjectId));
    }
    if(type == 'Bug'){
      let data = {
        status: newStatus
      }
      console.log("Data", data);
      await editSelectedBug(id, data);
      await dispatch(loadCurrentProjectData(currentProjectId));
    }
  }

  return (
    <div className="d-flex justify-content-around">
      {columns.map((column) => 
          <Column name = {column.name} tasks = {column.taskList} bugs = {column.bugList} key={column.name} handleForwardClick = {handleForwardClick} handlePreviousClick={handlePreviousClick}></Column>)}
    </div>
  )
}

export default projectKanban
