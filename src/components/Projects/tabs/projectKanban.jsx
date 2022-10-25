import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from '../Kanban/Column';

const projectKanban = () => {

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

  return (
    <div className="d-flex justify-content-around">
      {columns.map((column) => 
          <Column name = {column.name} tasks = {column.taskList} bugs = {column.bugList} key={column.name}></Column>)}
    </div>
  )
}

export default projectKanban
