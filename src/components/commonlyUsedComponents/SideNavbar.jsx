import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import ProjectDashboard from "../Projects/tabs/ProjectDashboard"
import ProjectMembers from '../Projects/tabs/ProjectMembers';
import ProjectKanban from '../Projects/tabs/ProjectKanban';
import ProjectTasks from '../Projects/tabs/ProjectTasks';
import ProjectBugs from '../Projects/tabs/ProjectBugs';
import ProjectSetting from "../Projects/tabs/ProjectSetting";

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
    {activeTab === 2? <ProjectKanban />: null}
    {activeTab === 3? <ProjectTasks />: null}
    {activeTab === 4? <ProjectBugs />: null}
    {activeTab === 5? <ProjectSetting />: null}
  </>
  );
}

export default SideNavbar
