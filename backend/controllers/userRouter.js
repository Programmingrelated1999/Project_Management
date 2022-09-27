const userRouter = require("express").Router();
const userHelper = require("../helpers/userHelper");
const taskHelper = require("../helpers/taskHelper");
const { removeUsersFromTasks } = require("../helpers/taskHelper");

const Projects = require("../models/projects");
const Users = require("../models/users");
const Tasks = require("../models/tasks");
const Bugs = require("../models/bugs");

//GET ALL
userRouter.get("/", async (request, response) => {
  const allUsers = await Users.find({});
  response.json(allUsers);
})

//GET ONE
userRouter.get("/:id", async (request, response) => {
  const userToReturn = await Users.findById(request.params.id);
  response.json(userToReturn);
})

//POST
//create a new user only required name.
userRouter.post("/", async (request, response) => {
    const user = new Users({name: request.body.name, username: request.body.username});
    const savedUser = await user.save();
    response.json(savedUser);
});

//PUT
//update a user by id
userRouter.put("/:id", async (request, response) => {
  const user = await Users.findById(request.params.id);
  user.name = request.body.name? request.body.name: user.name;
  const savedUser = await user.save();
  response.json(savedUser);
});

//DELETE
userRouter.delete("/:id", async (request, response) => {
  const user = await Users.findById(request.params.id);

  //get all user related data to remove users
  const userProjects = user.projects;
  const userProjectInvites = user.projectInvites;
  const userTasks = user.tasks;
  const userBugs = user.bugs;

  //remove user from projects.
  for(let project of userProjects){
    const projectToUpdate = await Projects.findById(project);
    projectToUpdate.developers = projectToUpdate.developers.filter((userElement) => String(userElement) !== String(user._id));
    projectToUpdate.admins = projectToUpdate.admins.filter((userElement) => String(userElement) !== String(user._id));
    projectToUpdate.clients = projectToUpdate.clients.filter((userElement) => String(userElement) !== String(user._id));
    await projectToUpdate.save();
  }
  
  //remove user from projects Invites.
  for(let project of userProjectInvites){
    const projectToUpdate = await Projects.findById(project);
    projectToUpdate.clients = projectToUpdate.clients.filter((userElement) => String(userElement) !== String(user._id));
    await projectToUpdate.save();
  }

  //remove user from tasks
  for(let task of userTasks){
    const taskToUpdate = await Tasks.findById(task);
    taskToUpdate.assigned = taskToUpdate.assigned.filter((userElement) => String(userElement) !== String(user._id));
    await taskToUpdate.save();
  }

  //remove user from bugs
  for(let bug of userBugs){
    const bugToUpdate = await Bugs.findById(bug);
    bugToUpdate.assigned = bugToUpdate.assigned.filter((userElement) => String(userElement) !== String(user._id));
    await bugToUpdate.save();
  }

  const removedUser = await user.remove();
  response.json(removedUser);
});

module.exports = userRouter;