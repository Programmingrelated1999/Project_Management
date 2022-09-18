//create projectRouter from express Router module
const projectRouter = require("express").Router();

//require Modals
const Users = require("../models/users");
const Projects = require("../models/projects");

//GET ALL
projectRouter.get("/", (request, response) => {
  Projects.find({}).then((projects) => {
      response.json(projects);
    });
});

//POST
//find user who create the project with user id and then create a project with name, description from request body, createdDate as current time and creators set to user id
//save the project into MongoDB then with the returned object's id saved it to user projects.
//update the user and return newly created project.
projectRouter.post("/", async (request, response) => {
  const user = await Users.findById(request.body.userId);

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

module.exports = projectRouter;