//create taskRouter from express Router module
const taskRouter = require("express").Router();

//require Modals
const Tasks = require("../models/tasks");
const Projects = require("../models/projects");

//GET ALL
taskRouter.get("/", (request, response) => {
    Tasks.find({}).then((tasks) => {
        response.json(tasks);
    });
});

//POST 
//find project who create the project with project id and then create a task with name, description from request body, createdDate as current time and project set to project id
//save the task into MongoDB then with the returned object's id saved it to project's tasks.
//update the project and return newly created task.
taskRouter.post("/", async (request, response) => {
    const project = await Projects.findById(request.body.projectId);

    const task = new Tasks({
        name: request.body.name,
        createdDate: Date.now(),
        description: request.body.description,
        project: project._id,
    });

    const savedTask = await task.save();
    project.tasks = project.tasks.concat(savedTask._id);
    await project.save();

    response.json(savedTask);
})

module.exports = taskRouter;