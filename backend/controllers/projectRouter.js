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
//find user who create the project with user id and then create a project with name, description from request body, createdDate as current time and creators set to user id
//save the project into MongoDB then with the returned object's id saved it to user projects.
//update the user and return newly created project.
projectRouter.post("/", async (request, response) => {
  const user = await Users.findById(request.body.user);

  const project = new Projects({
    name: request.body.name,
    description: request.body.description,
    createdDate: Date.now(),
    creator: user._id,
  });

  const savedProject = await project.save();
  user.projects = user.projects.concat(savedProject._id);
  await user.save();
  
  response.json(savedProject);
});

//PUT
//update the Project using findOneAndUpdate method with the data is from request.body. Cannot set variable after awaiting update since findOneAndUpdate return object before update.
//get the project from the database since cannot immediately get data with findOneAndUpdate.
projectRouter.put("/:id", async(request, response) => {
  await Projects.findOneAndUpdate({_id: request.params.id}, request.body);
  const projectAfterUpdate = await Projects.findById(request.params.id);
  response.json(projectAfterUpdate);
})

//update the Project by adding users. First get the project from request.params.id. Then get a list of user to update from users list. 
//for each listofUsersToUpdate, find the user then add current project to the user projects. Then add the user to the project developers(everyone starts with developer role from adding).
//update the users and the project by saving. 
projectRouter.put("/:id/users", async(request, response) => {
  const project = await Projects.findById(request.params.id);
  const listOfUsersToUpdate = request.body.users;
  listOfUsersToUpdate.forEach(async (user)=> {
    const userToUpdate = await Users.findById(user);
    userToUpdate.projects = userToUpdate.projects.concat(project._id);
    await userToUpdate.save();
  });
  project.developers = project.developers.concat(listOfUsersToUpdate);
  const returnProject = await project.save();
  response.json(returnProject);
})

//update the Project by deleting users. First get the project from request.params.id. Then get a list of user to update from users list. 
//for each listofUsersToUpdate, find the user then remove current project to the user projects. Then remove the user from the project developers.
//update the users and the project by saving. 
projectRouter.put("/:id/users", async(request, response) => {
  const project = await Projects.findById(request.params.id);

  const isCreator = String(project.creator) === String(request.body.remover);

  const listOfUsersToUpdate = request.body.users;
  listOfUsersToUpdate.forEach(async (user)=> {
    const userToUpdate = await Users.findById(user);
    userToUpdate.projects = userToUpdate.projects.concat(project._id);
    await userToUpdate.save();
  });
  project.developers = project.developers.concat(listOfUsersToUpdate);
  const returnProject = await project.save();
  response.json(returnProject);
})

//DELETE
//get project by the id in the link. 
//Then for each of the tasks of the project find the task and remove it. Then for each of the bugs of the project find the bug and remove it.
//Then find the creator of the project, and get the user. In the user, remove the project from the projects and save.
//remove the project and return the removed project.
//THINGS TO NOTE:
//when deleting the tasks, and bugs: did not delete the tasks and bugs from the user's tasks and bugs list. will need a helper function to work on this. 
projectRouter.delete("/:id", async (request, response) => {
  const project = await Projects.findById(request.params.id);

  project.tasks.forEach(async (task) => {
    const taskToDelete = await Tasks.findById(task);
    await taskToDelete.remove();
  })

  project.bugs.forEach(async (bug) => {
    const bugToDelete = await Bugs.findById(bug);
    await bugToDelete.remove();
  })

  const creator = await Users.findById(project.creator);
  creator.projects = await creator.projects.filter((projectElement) => String(projectElement) !== String(project._id));
  await creator.save();

  const removedProject = await project.remove();

  response.json(removedProject);
});

module.exports = projectRouter;