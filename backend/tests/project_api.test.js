const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

//import Models
const Tasks = require("../models/tasks");
const Projects = require("../models/projects");
const Users = require("../models/users");
const Bugs = require("../models/bugs");

//import testHelper
const testHelper = require("./test_helper");

//initial data
const initialUsers = testHelper.initialUsers;
const initialProjects = testHelper.initialProjects;
const initialTasks = testHelper.initialTasks;
const initialBugs = testHelper.initialBugs;

//setting data before each test is run. 
beforeEach(async () => {
    await Users.deleteMany({});
    await Projects.deleteMany({});
    await Tasks.deleteMany({});
    for (let user of initialUsers) {
        let userObject = new Users(user)
        await userObject.save()
    }
    //get usersAfterCreation to update the projects and tasks with user id later
    const usersAfterCreation = await Users.find({});
    //the first user will be the creator of 2 projects. The second user will be the admin, the third user will be the developer and the fourth will be the client.
    for(let project of initialProjects){
        project.creator = usersAfterCreation[0].id;
        project.admins = [].concat(usersAfterCreation[1].id);
        project.developers = [].concat(usersAfterCreation[2]);
        project.clients = [].concat(usersAfterCreation[3]);
        project.createdDate = Date.now();
        let projectObject = new Projects(project);
        await projectObject.save();
    }
    //get projectsAfterCreation to update the task and users with projects id later
    const projectsAfterCreation = await Projects.find({});
    const projectIds = projectsAfterCreation.map((project) => (project.id));
    //All users will have the projects as part of their projects list.
    for(let user of usersAfterCreation){
        user.projects = user.projects.concat(projectIds);
        await user.save();
    }
    //the first project will own first 2 tasks. The other will own the rest.
    for(let task of initialTasks.slice(0,2)){
        task.project = projectIds[0];
        task.assigned = [].concat([projectsAfterCreation[0].admins[0], projectsAfterCreation[0].developers[0]]);
        task.createdDate = Date.now();
        let taskObject = new Tasks(task);
        await taskObject.save();
    }
    for(let task of initialTasks.slice(2,initialTasks.length)){
        task.project = projectIds[1];
        task.assigned = [].concat(projectsAfterCreation[1].developers[0]);
        task.createdDate = Date.now();
        let taskObject = new Tasks(task);
        await taskObject.save();
    }
    //get tasksAfterCreation to update the projects and users with tasks id later
    const tasksAfterCreation = await Tasks.find({});
    const taskIds = tasksAfterCreation.map((task) => (task.id));
    projectsAfterCreation[0].tasks = projectsAfterCreation[0].tasks.concat(taskIds.slice(0,2));
    await projectsAfterCreation[0].save();
    projectsAfterCreation[1].tasks = projectsAfterCreation[1].tasks.concat(taskIds.slice(2,taskIds.length));
    await projectsAfterCreation[1].save();
    usersAfterCreation[1].tasks = usersAfterCreation[1].tasks.concat(taskIds.slice(0,2));
    await usersAfterCreation[1].save();
    usersAfterCreation[2].tasks = usersAfterCreation[2].tasks.concat(taskIds);
    await usersAfterCreation[2].save();
});

//Task GET method
describe('task GET methods', () => {
    //test if the response is in json type
    test('tasks are returned as json', async () => {
        await api.get('/api/projects').expect(200).expect('Content-Type', /application\/json/)
    })

    //test if the Get method returns all
    test('all projects are returned', async () => {
        const response = await api.get('/api/projects')
        expect(response.body).toHaveLength(initialProjects.length);
    })
        
    //test GET user method by id
    test('a project is returned by id', async () => {
        //get all projects and store the project user's id and name for checking
        const projectArrayResponse = await Projects.find({});
        const idToCheck = projectArrayResponse[0].id;
        const projectNameCheck = projectArrayResponse[0].name;
        //use the first project's id to find a project by Id, if the response is the same project(check by name), test pass
        const projectSingleResponse = await Projects.findById(idToCheck);
        expect(projectSingleResponse.name).toEqual(projectNameCheck);
    });
})

afterAll(() => {
    mongoose.connection.close()
}) 