import React from 'react'
import { useSelector } from 'react-redux'
import "./projectMembers.css"

const ProjectMembers = () => {

  const project = useSelector(state => state.currentProject.projectData);
  console.log(project);
  const creator = useSelector(state => state.currentProject.projectData.creator);
  const admins = useSelector(state => state.currentProject.projectData.admins);
  const developers = useSelector(state => state.currentProject.projectData.developers);
  const clients = useSelector(state => state.currentProject.projectData.clients);
  const invites = useSelector(state => state.currentProject.projectData.invites);

  const isLoading = useSelector(state => state.currentProject.isLoading);
  const hasError = useSelector(state => state.currentProject.hasError);

  if(isLoading){
    return <p>isLoading</p>
  }

  if(hasError){
    return <p>Error</p>
  }

  return (
    <div>
      <h3 className = "role-person">Creator:</h3>
      <h5>{creator.name}</h5>
      <h3 className = "role-person">Admins</h3>
      {admins.length === 0? <h5>No Admins</h5>: admins.map((admin) => <h5 key = {admin.id}>{admin.name}</h5>)}
      <h3 className = "role-person">Developers</h3>
      {developers.length === 0? <h5>No Developers</h5>: developers.map((developer) => <h5 key = {developer.id}>{developer.name}</h5>)}
      <h3 className = "role-person">Clients</h3>
      {clients.length === 0? <h5>No Clients</h5>: clients.map((client) => <h5 key = {client.id}>{client.name}</h5>)}
      <h3 className = "role-person">Invites</h3>
      {invites.length === 0? <h5>No Invites</h5>: invites.map((invite) => <h5 key = {invite.id}>{invite.name}</h5>)}
    </div>
  )
}

export default ProjectMembers
