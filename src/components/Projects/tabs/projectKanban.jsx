import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from '../Kanban/Column';

const projectKanban = () => {

  const allTasks = useSelector(state => state.currentProject.projectData.tasks);
  const allBugs = useSelector(state => state.currentProject.projectData.bugs);
  const isLoading = useSelector(state=>state.currentProject.isLoading);
  const hasError = useSelector(state=>state.currentProject.hasError);

  if(isLoading){
    return <p>Is Loading</p>
  }

  if(hasError){
    return <p>Has Error</p>
  }

  const columns = [
    {name: 'Started', taskIds: [1,2]},
    {name: 'Progress', taskIds: [3,4]},
    {name: 'Complete', taskIds: [5,6]}
  ];

  const tasks = [
    {name: 'UX Development', id: 1},
    {name: 'UI Development', id: 2},
    {name: 'Web Development', id: 3},
    {name: 'Andriod Development', id: 4},
    {name: 'Phone Development', id: 5},
    {name: 'Mobile Development', id: 6},
  ]

  return (
    <div className="d-flex justify-content-around">
      {columns.map((column) => {
        const name = column.name;
        let taskList = [];
        for(let task of column.taskIds){
          const foundTask = tasks.find(element => element.id === task);
          taskList = taskList.concat(foundTask);
        }
        return (
          <Column name = {name} tasks = {taskList} key = {name}></Column>
        )
      })}
    </div>
  )
}

export default projectKanban
