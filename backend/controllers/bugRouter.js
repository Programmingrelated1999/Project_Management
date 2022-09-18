//create bugRouter from express Router module
const bugRouter = require("express").Router();

//require Modals
const Bugs = require("../models/bugs");
const Projects = require("../models/projects");

//GET ALL
bugRouter.get("/", (request, response) => {
    Bugs.find({}).then((bugs) => {
        response.json(bugs);
    });
});

//GET ONE
bugRouter.get("/:id", (request, response) => {
    Bugs.findById(request.params.id).then((bug) => {
        response.json(bug);
    });
});

//POST 
//find project who create the project with project id and then create a bug with name, description from request body, createdDate as current time and project set to project id
//save the bug into MongoDB then with the returned object's id saved it to project's bugs.
//update the project and return newly created bug.
bugRouter.post("/", async (request, response) => {
    const project = await Projects.findById(request.body.projectId);

    const bug = new Bugs({
        name: request.body.name,
        createdDate: Date.now(),
        description: request.body.description,
        project: project._id,
    });

    const savedBug = await bug.save();
    project.bugs = project.bugs.concat(savedBug._id);
    await project.save();

    response.json(savedBug);
});


//DELETE
//first get the bug from link id, then get the project from the bug.project. 
//filter the bugs from project to remove the current bug from the list, then saved the project. 
//remove the bug and then return the removedBug information.
bugRouter.delete("/:id", async (request, response) => {
    const bug = await Bugs.findById(request.params.id);
    const project = await Projects.findById(bug.project);

    project.bugs = await project.bugs.filter((bugElement) => 
        String(bugElement) !== String(bug._id)
    )

    await project.save();
    const removedBug = await bug.remove();

    response.json(removedBug);
})

module.exports = bugRouter;