//create bugRouter from express Router module
const bugRouter = require("express").Router();

const bugs = require("../models/bugs");
//require Modals
const Bugs = require("../models/bugs");
const Projects = require("../models/projects");
const Users = require("../models/users");

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
    const project = await Projects.findById(request.body.project);

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

//PUT
bugRouter.put("/:id", async(request, response) => {
    //find the bug to Update with id from request.params.id
    const bugToUpdate = await Bugs.findById(request.params.id);

    //check the basics data of bug to update, if there is any basic data from incoming request update.
    bugToUpdate.name = request.body.name? request.body.name : bugToUpdate.name;
    bugToUpdate.description = request.body.description? request.body.description : bugToUpdate.description;
    bugToUpdate.endDate = request.body.endDate? request.body.endDate : bugToUpdate.endDate;

    //if there are any assigned - linking data, update the assigned list in the bug along with updating the bugs of the users to include the current bug.
    if(request.body.assigned){
        //first unique checks if there are any bug in existing array that is not in new array. Second vise versa. 
        let unique = []
        const oldArray = bugToUpdate.assigned.map((user) => String(user));
        const newArray = request.body.assigned.map((user) => String(user));
        console.log("Old array", oldArray);
        console.log("New array", newArray);
        for(let user of oldArray){
            if(!newArray.includes(user)){
                unique = unique.concat(user);
            }
        }
        console.log("Does old array contain any user not in new array", unique);
        for(let user of newArray){
            if(!oldArray.includes(user)){
                unique = unique.concat(user);
            }
        }
        console.log("Does new array contain any user not in old array", unique);

        console.log("Number of unique memebers", unique.length);

        for(let userId of unique){
            const userToUpdate = await Users.findById(userId);
            //console.log("The user can be retrieved from the unique array");

            if(userToUpdate.bugs.includes(bugToUpdate.id)) {                
                    console.log("needs to remove", userToUpdate.name);
                    userToUpdate.bugs = userToUpdate.bugs.filter((bug) => String(bug) !== String(bugToUpdate._id));
                    bugToUpdate.assigned = bugToUpdate.assigned.filter((user) => String(user) !== String(userToUpdate._id));
                    await userToUpdate.save();
            } else {
                    console.log("needs to add", userToUpdate.name);
                    userToUpdate.bugs = userToUpdate.bugs.concat(bugToUpdate.id);
                    bugToUpdate.assigned = bugToUpdate.assigned.concat(userToUpdate.id);
                    await userToUpdate.save();
            }
        };
    }
    const savedBug = await bugToUpdate.save();
    response.json(savedBug);
})


//DELETE
//first get the bug from link id, then get the project from the bug.project. 
//filter the bugs from project to remove the current bug from the list, then saved the project. 
//remove the bug and then return the removedBug information.
bugRouter.delete("/:id", async (request, response) => {
    const bugToDelete = await Bugs.findById(request.params.id);
    const project = await Projects.findById(bugToDelete.project);

    project.bugs = await project.bugs.filter((bugElement) => 
        String(bugElement) !== String(bugToDelete._id)
    )

    await project.save();

    const userList = bugToDelete.assigned.map((user) => user.id);
    for (let user of userList){
        const userToUpdate = await Users.findById(user);
        userToUpdate.bugs = userToUpdate.bugs.filter((bug) => bug != bugToDelete.id);
        await userToUpdate.save();
    }

    const removedBug = await bugToDelete.remove();

    response.json(removedBug);
})

module.exports = bugRouter;