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
})

//PUT
bugRouter.put("/", async (request, response) => {
    const updatedbug = await Bugs.findByIdAndUpdate(request.body.bugId, 
        {name: request.body.name? request.body.name: name}
    )

    const savedBug = await bug.save();
    project.bugs = project.bugs.concat(savedBug._id);
    await project.save();

    response.json(savedBug);
})

module.exports = bugRouter;