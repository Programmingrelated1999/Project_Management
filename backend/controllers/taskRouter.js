//create taskRouter from express Router module
const taskRouter = require("express").Router();

//require Modals
const Tasks = require("../models/tasks");
const Projects = require("../models/projects");
const Users = require("../models/users");

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
taskRouter.put("/:id", async(request, response) => {
    //find the task to Update with id from request.params.id
    const taskToUpdate = await Tasks.findById(request.params.id);

    //check the basics data of task to update, if there is any basic data from incoming request update.
    taskToUpdate.name = request.body.name? request.body.name : taskToUpdate.name;
    taskToUpdate.description = request.body.description? request.body.description : taskToUpdate.description;
    taskToUpdate.endDate = request.body.endDate? request.body.endDate : taskToUpdate.endDate;

    //if there are any assigned - linking data, update the assigned list in the task along with updating the tasks of the users to include the current task.
    if(request.body.assigned){
        //first unique checks if there are any task in existing array that is not in new array. Second vise versa. 
        let unique = []
        const oldArray = taskToUpdate.assigned.map((user) => String(user));
        const newArray = request.body.assigned.map((user) => String(user));
        console.log("Old array", oldArray);
        console.log("New array", newArray);
        for(let user of oldArray){
            if(!newArray.includes(user)){
                unique = unique.concat(user);
            }
        }
        for(let user of newArray){
            if(!oldArray.includes(user)){
                unique = unique.concat(user);
            }
        }
        for(let userId of unique){
            const userToUpdate = await Users.findById(userId);
            //console.log("The user can be retrieved from the unique array");

            if(userToUpdate.tasks.includes(taskToUpdate.id)) {                
                    console.log("needs to remove", userToUpdate.name);
                    userToUpdate.tasks = userToUpdate.tasks.filter((task) => String(task) !== String(taskToUpdate._id));
                    taskToUpdate.assigned = taskToUpdate.assigned.filter((user) => String(user) !== String(userToUpdate._id));
                    await userToUpdate.save();
            } else {
                    console.log("needs to add", userToUpdate.name);
                    userToUpdate.tasks = userToUpdate.tasks.concat(taskToUpdate.id);
                    taskToUpdate.assigned = taskToUpdate.assigned.concat(userToUpdate.id);
                    await userToUpdate.save();
            }
        };
    }
    const savedTask = await taskToUpdate.save();
    response.json(savedTask);
})

//DELETE
//first get the task from link id, then get the project from the task.project. 
//filter the tasks from project to remove the current task from the list, then saved the project. 
//remove the task and then return the removedTask information.
taskRouter.delete("/:id", async (request, response) => {
    const taskToDelete = await Tasks.findById(request.params.id);
    const project = await Projects.findById(taskToDelete.project);

    project.tasks = await project.tasks.filter((taskElement) => 
        String(taskElement) !== String(taskToDelete._id)
    )

    await project.save();

    const userList = taskToDelete.assigned.map((user) => user.id);
    for (let user of userList){
        const userToUpdate = await Users.findById(user);
        userToUpdate.tasks = userToUpdate.tasks.filter((task) => task != taskToDelete.id);
        await userToUpdate.save();
    }

    const removedTask = await taskToDelete.remove();

    response.json(removedTask);
})

module.exports = taskRouter;