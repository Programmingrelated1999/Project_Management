//create projectRouter from express Router module
const projectRouter = require("express").Router();

//require Modals
const Users = require("../models/users");
const Projects = require("../models/projects");
const Tasks = require("../models/tasks");
const Bugs = require("../models/bugs");

//GET ALL
projectRouter.get("/", (request, response) => {
  Projects.find({}).then((projects) => {
      response.json(projects);
    });
});

//GET ONE
projectRouter.get("/:id", (request, response) => {
  Projects.findById(request.params.id).then((project) => {
      response.json(project);
  });
});

//POST
//find user who create the project with user id and then create a project with name, description from request body, createdDate as current time and creator set to user id
//check if there are any invites, get the user from the invites and save it. 
//save the project into MongoDB.
projectRouter.post("/", async (request, response) => {
  //get the user who is going to create the project by id from request.body.creator. Create inviteList for storing users who are invited for storing created project id.
  const creator = await Users.findById(request.body.creator);
  let inviteList = [];

  //define the project. 
  const project = new Projects({
    name: request.body.name,
    description: request.body.description,
    createdDate: Date.now(),
    creator: creator.id,
  });

  //if there are any users invited from the project, then saved the list of users in the invite list.
  if(request.body.invites){
    project.invites = request.body.invites;
    inviteList = request.body.invites;
  }

  //save the project and set the savedProject with the returned data. 
  const savedProject = await project.save();

  //saved the created project to the creator's projects
  creator.projects = creator.projects.concat(savedProject._id);
  await creator.save();

  //save the project to the invited user's project invites list.
  for(let user of inviteList){
    let invitedUser = await Users.findById(user);
    invitedUser.projectInvites = invitedUser.projectInvites.concat(savedProject._id);
    await invitedUser.save();
  }

  //returned the created project
  response.json(savedProject);
});

//PUT
projectRouter.post("/", async (request, response) => {
  //get the user who is going to create the project by id from request.body.creator. Create inviteList for storing users who are invited for storing created project id.
  const creator = await Users.findById(request.body.creator);
  let inviteList = [];

  //define the project. 
  const project = new Projects({
    name: request.body.name,
    description: request.body.description,
    createdDate: Date.now(),
    creator: creator.id,
  });

  //if there are any users invited from the project, then saved the list of users in the invite list.
  if(request.body.invites){
    project.invites = request.body.invites;
    inviteList = request.body.invites;
  }

  //save the project and set the savedProject with the returned data. 
  const savedProject = await project.save();

  //saved the created project to the creator's projects
  creator.projects = creator.projects.concat(savedProject._id);
  await creator.save();

  //save the project to the invited user's project invites list.
  for(let user of inviteList){
    let invitedUser = await Users.findById(user);
    invitedUser.projectInvites = invitedUser.projectInvites.concat(savedProject._id);
    await invitedUser.save();
  }

  //returned the created project
  response.json(savedProject);
});

//update the Project by adding users. First get the project from request.params.id. Then get a list of user to update from users list. 
//for each listofUsersToUpdate, find the user then add current project to the user projects. Then add the user to the project developers(everyone starts with developer role from adding).
//update the users and the project by saving. 
projectRouter.put("/:id", async(request, response) => {
  //get the project to be updated and store it in projectToUpdate variable.
  const projectToUpdate = await Projects.findById(request.params.id);

  //update the basics of the project
  projectToUpdate.name = request.body.name? request.body.name: projectToUpdate.name;
  projectToUpdate.description = request.body.description? request.body.description: projectToUpdate.description;

  const savedProject = await projectToUpdate.save();
  response.json(savedProject);
})

//DELETE
//get project by the id in the link. Then delete each tasks and bugs from the project.
//get all user types, delete the project from all user types's projects and projectInvites.
projectRouter.delete("/:id", async (request, response) => {
  const project = await Projects.findById(request.params.id);

  //delete task
  for(let task of project.tasks){
    const taskToDelete = await Tasks.findById(task);
    for(let user of taskToDelete.assigned){
      const userToUpdate = await Users.findById(user);
      userToUpdate.tasks = userToUpdate.tasks.filter((taskElement) => String(taskElement) !== String(taskToDelete._id));
      await userToUpdate.save();
    }
    await taskToDelete.remove();
  };

  //delete bugs
  await project.bugs.forEach(async (bug) => {
    const bugToDelete = await Bugs.findById(bug);
    await bugToDelete.remove();
  })

  //delete creator
  const creator = await Users.findById(project.creator);
  creator.projects = await creator.projects.filter((projectElement) => String(projectElement) !== String(project._id));
  await creator.save();

  //delete admin
  await project.admins.forEach(async (admin) => {
    const adminToUpdate = await Users.findById(admin);
    adminToUpdate.projects = await adminToUpdate.projects.filter((projectElement) => String(projectElement) !== String(project._id));
    await adminToUpdate.save();
  })

  //delete developers
  await project.developers.forEach(async (developer) => {
    const developerToUpdate = await Users.findById(developer);
    developerToUpdate.projects = await developerToUpdate.projects.filter((projectElement) => String(projectElement) !== String(project._id));
    await developerToUpdate.save();
  })

  //delete clients
  await project.clients.forEach(async (client) => {
    const clientToUpdate = await Users.findById(client);
    clientToUpdate.projects = await clientToUpdate.projects.filter((projectElement) => String(projectElement) !== String(project._id));
    await clientToUpdate.save();
  })

  //delete invites
  await project.invites.forEach(async (invite) => {
    const inviteToUpdate = await Users.findById(invite);
    inviteToUpdate.projectInvites = await inviteToUpdate.projectInvites.filter((projectElement) => String(projectElement) !== String(project._id));
    await inviteToUpdate.save();
  })

  //remove the project
  const removedProject = await project.remove();

  //return the removed project
  response.json(removedProject);
});

module.exports = projectRouter;