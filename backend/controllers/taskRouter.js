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

//GET ONE
taskRouter.get("/:id", (request, response) => {
    Tasks.findById(request.params.id).then((task) => {
        response.json(task);
    });
});

//POST 
//find project who create the project with project id and then create a task with name, description from request body, createdDate as current time and project set to project id
//save the task into MongoDB then with the returned object's id saved it to project's tasks.
//update the project and return newly created task.
taskRouter.post("/", async (request, response) => {
    const project = await Projects.findById(request.body.project);

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

//PUT
//update the task using findOneAndUpdate method with the data is from request.body. Cannot set variable after awaiting update since findOneAndUpdate return object before update.
//get the task from the database since cannot immediately get data with findOneAndUpdate.
taskRouter.put("/:id", async(request, response) => {
    const taskToUpdate = await Tasks.findById(request.params.id);

    taskToUpdate.assigned = request.body.assigned? request.body.assigned : taskToUpdate.assigned;

    const returnTask = await taskToUpdate.save();

    response.json(returnTask);
});

//DELETE
//first get the task from link id, then get the project from the task.project. 
//filter the tasks from project to remove the current task from the list, then saved the project. 
//remove the task and then return the removedTask information.
taskRouter.delete("/:id", async (request, response) => {
    const task = await Tasks.findById(request.params.id);
    const project = await Projects.findById(task.project);

    project.tasks = await project.tasks.filter((taskElement) => 
        String(taskElement) !== String(task._id)
    )
    
    await project.save();
    const removedTask = await task.remove();

    response.json(removedTask);
})

module.exports = taskRouter;