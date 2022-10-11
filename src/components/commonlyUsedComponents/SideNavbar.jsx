import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import ProjectDashboard from "../Projects/tabs/ProjectDashboard"
import ProjectMembers from '../Projects/tabs/ProjectMembers';
import ProjectTasks from '../Projects/tabs/projectTasks';

const SideNavbar = () => {

  const [activeTab, setActiveTab] = useState(0);

  console.log(activeTab)

  return (
    <>
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href ="" onClick = {() => {setActiveTab(0)}}>Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href ="" onClick = {() => {setActiveTab(1)}}>Members</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href ="" onClick = {() => {setActiveTab(2)}}>Kanban</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href ="" onClick = {() => {setActiveTab(3)}}>Tasks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href ="" onClick = {() => {setActiveTab(4)}}>Bugs</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href ="" onClick = {() => {setActiveTab(5)}}>Settings</Nav.Link>
      </Nav.Item>
    </Nav>

    {activeTab === 0? <ProjectDashboard />: null}
    {activeTab === 1? <ProjectMembers />: null}
    {activeTab === 3? <ProjectTasks />: null}
  </>
  );
}

export default SideNavbar
