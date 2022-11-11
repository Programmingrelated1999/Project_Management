import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Button, Card, Table} from "react-bootstrap"
import { editSelectedProject, loadCurrentProjectData } from '../../../reducers/currentProjectReducer'
import SearchUsersModal from '../Modals/SearchUsersModal'
import { Button as MaterialUIButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { loadAllUsersData } from '../../../reducers/allUsersReducer'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteProjectMemberModal from '../Modals/DeleteProjectMemberModal';
import { Chip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {IconButton, Tooltip} from '@mui/material'
import { DatePicker } from '@mantine/dates'
import ProjectServices from "../../../services/currentProjectServices"
import moment from 'moment/moment'
import DeleteProjectModal from "../Modals/DeleteProjectModal"
import { deleteSelectedProject } from '../../../reducers/currentProjectReducer'
import { loadCurrentUserData } from '../../../reducers/currentUserReducer'
import { useNavigate } from 'react-router'

import "./ProjectSetting.css";
import ChangeUserRoleModal from '../Modals/ChangeUserRoleModal'

const ProjectSetting = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const currentProject = useSelector(state => state.currentProject.projectData);
  const isCurrentProjectLoading = useSelector(state => state.currentProject.isLoading);
  const hasCurrentProjectError = useSelector(state => state.currentProject.hasError);

  const allUsersIsLoading = useSelector(state => state.allUsers.isLoading);
  const allUsersHasError = useSelector(state => state.allUsers.hasError);

  useEffect(() => {dispatch(loadAllUsersData())}, [])

  const name = useRef();
  const description = useRef();

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPromoteDemote, setShowPromoteDemote] = useState(false);
  const [showProjectDelete, setShowProjectDelete] = useState(false);
  const [invites, setInvites] = useState([]);
  const [notification, setNotification] = useState('');
  const [userToKick, setUserToKick] = useState();
  const [userToChangeStatus, setUserToChangeStatus] = useState();
  const [newUserRole, setNewUserRole] = useState();
  const [endDate, setEndDate] = useState(new Date());

  if(isCurrentProjectLoading || allUsersIsLoading){
    return <p>Loading</p>
  }

  if(hasCurrentProjectError || allUsersHasError){
    return <p>Has Error</p>
  }  

  let allPeopleInProject = [currentProject.creator.id];
  allPeopleInProject = allPeopleInProject.concat(currentProject.admins.map((admin) => admin.id));
  allPeopleInProject = allPeopleInProject.concat(currentProject.developers.map((developer) => developer.id));
  allPeopleInProject = allPeopleInProject.concat(currentProject.invites.map((invite) => invite.id));

  const isUserCreator = JSON.parse(localStorage.getItem("id")) === currentProject.creator.id;
  const currentProjectAdminList = currentProject.admins.map((admin) => admin.id);
  const isUserAdmin = currentProjectAdminList.includes(JSON.parse(localStorage.getItem("id")));

  const openAdd = () => {
    setShowAdd(true);
  }
  const closeAdd = () => {
    setShowAdd(false);
  }
  const openDelete = () => {
    setShowDelete(true);
  }
  const openProjectDelete = () => {
    setShowProjectDelete(true);
  }
  const closeDelete = () => {
    setShowDelete(false);
  }
  const openUserChangeStatus = () => {
    setShowPromoteDemote(true);
  }
  const closeUserChangeStatus = () => {
    setShowPromoteDemote(false);
  }
  const closeProjectDelete = () => {
    setShowProjectDelete(false);
  }
  const addInvite = (invitedPerson) => {
    setInvites(invites.concat(invitedPerson));
  }
  const handleOpenDelete = (person) => {
    openDelete();
    console.log("Got here ")
    setUserToKick(person)
  }
  const removeInvite = (inviteId) => {
    const newInviteList = invites.filter((invite) => invite.id !== inviteId);
    setInvites(newInviteList);
  }
  const handleEndDate = (value) => {
    const dateFormatEndDate = moment(value).toISOString();
    console.log("dateFormatEndDate", dateFormatEndDate);
    setEndDate(dateFormatEndDate);
  }
  const handlePromoteDemote = ({type, person}) => {
    if(type === "Promote"){
      openUserChangeStatus();
      setUserToChangeStatus(person);
      setNewUserRole("admin");
    } else{
      openUserChangeStatus();
      setUserToChangeStatus(person);
      setNewUserRole("developer");
    }
  }

  const doesInviteListIncludesProjectMembers = () => {
    let returnVal = true;
    for(let person of invites){
      if(allPeopleInProject.includes(person.id)){
        returnVal = false;
        return returnVal;
      }
    }
    return returnVal;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!doesInviteListIncludesProjectMembers()){
      setNotification("Invite List Error: At least one person is already in the project.");
      setTimeout(() => {
        setNotification("");
      }, 4000)
    } else{
      const inviteList = invites.map(invite => invite.id);
      const data = {
        name: name.current.value, 
        description: description.current.value,
        addInvites: inviteList
      }
      if(endDate){
        data.endDate = endDate;
      }
      console.log("Data", data);
      const id = currentProject.id;
      await editSelectedProject(id, data);
      await dispatch(loadCurrentProjectData(id));
      setInvites([])
    }
  }

  const markAsComplete = async (event) => {
    event.preventDefault();
    const data = {
      status: true,
    }
    const id = currentProject.id;
    await editSelectedProject(id, data);
    await dispatch(loadCurrentProjectData(id));
  }

  const handleProjectDelete = async (event) => {
    event.preventDefault();
    openProjectDelete();
  }

  const deleteProject = async() => {
    await deleteSelectedProject(currentProject.id);
    await dispatch(loadCurrentUserData(JSON.parse(localStorage.getItem("id"))));
    dispatch({ type: 'currentProject/resetProject'});
    navigate("/projects");
  }

    //for displaying dashboard stats
    const taskDone = currentProject.tasks.reduce( (count, task) => task.status === 'Done'? count + 1 : count, 0)
    const bugDone = currentProject.bugs.reduce( (count, bug) => bug.status === 'Done'? count + 1 : count, 0)
  
    let projectProgress = Math.round(((taskDone+bugDone)/(currentProject.tasks.length + currentProject.bugs.length)) * 100)
    if(!projectProgress){
      projectProgress = 0;
    }

  return (
    <div className = "d-flex flex-column align-items-center my-1">
      {projectProgress === 100? <div className = "my-3 d-flex align-items-end"><h4 className='text text-success'>Project Progress is 100%</h4><Button onClick = {markAsComplete} className = "btn btn-success mx-2">Mark Project As Complete</Button></div>: null}
      {isUserCreator? <Button className = "my-3 btn btn-danger" onClick = {handleProjectDelete}>Delete This Project</Button>: null}
      <Card className = 'px-5'>
      <Form onSubmit = {handleSubmit} className = "d-flex flex-column align-items-center">
        {notification? <p className = "text-danger">{notification}</p>: null}
        <Form.Group className=" my-3 mb-3 d-flex flex-column align-items-center" controlId="projectName">
          <Form.Label className = "mx-2">Name</Form.Label>
          <input className = "text-center" defaultValue = {currentProject.name} ref = {name}></input>
        </Form.Group>
      
        <Form.Group className="d-flex mb-3 d-flex flex-column align-items-center" controlId="projectDescription">
          <Form.Label className = "mx-2 d-flex flex-column align-items-center">Description</Form.Label>
          <textarea rows="4" cols="50" defaultValue = {currentProject.description} ref = {description}/>
        </Form.Group>

        <Form.Group className="d-flex mb-3 d-flex flex-column align-items-center" controlId="projectDescription">
          <Form.Label className = "mx-2 d-flex flex-column align-items-center">
          <span className='my-1'>Current Date Range: &nbsp;
          <span className='text-success'>{moment(currentProject.createdDate).format("YYYY-MM-DD")}</span> to &nbsp;
          {currentProject.endDate? <span className='text-danger'>{moment(currentProject.endDate).format("YYYY-MM-DD")}</span>:<span>N/A</span>}
          </span>
          <h6>Change End Date</h6>
          <DatePicker
            value={endDate}
            onChange={(newValue) => {
              handleEndDate(newValue);
            }}
          />
          </Form.Label>
        </Form.Group>

        <div className = "d-block">
        <h3> Invite List: </h3>
        {invites.map(invite => 
        <MaterialUIButton variant="outlined" color="error" key = {invite.id} onClick = {() => removeInvite(invite.id)}>
          {invite.username} <CancelIcon />
        </MaterialUIButton>)}
        </div>
        <SearchUsersModal showAdd = {showAdd} closeAdd = {closeAdd} addInvite = {addInvite} invites = {invites}/>
        <Button variant="success" className='buttons-vertical mx-auto' onClick = {openAdd}>Add Users</Button>
        <br />

        <h3>Current Member List:</h3>
        <Table>
          <thead>
            <tr>  
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
              <th>Kick Out</th>
            </tr>
          </thead>
          <tbody>
            <tr key = {currentProject.creator.id}>
              <td>{currentProject.creator.name}</td>
              <td>{currentProject.creator.username}</td>
              <td>                
              <Chip label="Creator" color = "error"/>
              </td>
              <td></td>
              <td><MaterialUIButton variant="outlined" color="error"><DeleteForeverIcon/></MaterialUIButton></td>
            </tr>
            {currentProject.admins.map(admin => <tr key = {admin.id}>
              <td>{admin.name}</td>
              <td>{admin.username}</td>
              <td>
                <Chip label="Admin" color = "warning"/>
              </td>
              <td>
              <Tooltip title="Demote to Developer"><IconButton aria-label="demote" size="small" color = "error" disabled = {!isUserCreator} onClick = {() => handlePromoteDemote({type: "Demote", person: admin})}><ArrowDownwardIcon/></IconButton></Tooltip>                
              </td>
              <td><MaterialUIButton variant="outlined" color="error" onClick = {() => handleOpenDelete(admin)}><DeleteForeverIcon/></MaterialUIButton></td>
            </tr>)}
            {currentProject.developers.map(developer => <tr key = {developer.id}>
              <td>{developer.name}</td>
              <td>{developer.username}</td>
              <td>                
                <Chip label="Developer" color = "secondary" />
              </td>
              <td>
                <Tooltip title="Promote to Admin"><IconButton aria-label="promote" size="small" color = "success" disabled = {!(isUserAdmin || isUserCreator)} onClick = {() => handlePromoteDemote({type: "Promote", person: developer})}><ArrowUpwardIcon/></IconButton></Tooltip>
              </td>
              <td><MaterialUIButton variant="outlined" color="error" onClick = {() => handleOpenDelete(developer)}><DeleteForeverIcon/></MaterialUIButton></td>
            </tr>)}
          </tbody>
        </Table>
        <Button variant="success" type="submit" className='buttons-vertical mx-auto'>Submit</Button>
      </Form>
      </Card>
      {userToKick? <DeleteProjectMemberModal showDelete = {showDelete} closeDelete = {closeDelete} userToKick = {userToKick}/>: null}
      {userToChangeStatus? <ChangeUserRoleModal showPromoteDemote={showPromoteDemote} closeUserChangeStatus={closeUserChangeStatus} userToChangeStatus={userToChangeStatus} newUserRole={newUserRole}/>: null}
      <DeleteProjectModal  showProjectDelete = {showProjectDelete} closeProjectDelete = {closeProjectDelete} deleteProject = {deleteProject}/>
    </div>
  )
}

export default ProjectSetting
