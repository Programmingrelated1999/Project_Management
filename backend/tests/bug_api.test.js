const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

//import Models
const Bugs = require("../models/bugs");
const Projects = require("../models/projects");
const Users = require("../models/users");

//import testHelper
const testHelper = require("./test_helper");

//initial data
const initialUsers = testHelper.initialUsers;
const initialProjects = testHelper.initialProjects;
const initialBugs = testHelper.initialBugs;

//setting data before each test is run. 
beforeEach(async () => {
    await Users.deleteMany({});
    await Projects.deleteMany({});
    await Bugs.deleteMany({});
    for (let user of initialUsers) {
        let userObject = new Users(user)
        await userObject.save()
    }
    //get usersAfterCreation to update the projects and bugs with user id later
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
    //get projectsAfterCreation to update the bug and users with projects id later
    const projectsAfterCreation = await Projects.find({});
    const projectIds = projectsAfterCreation.map((project) => (project.id));
    //All users will have the projects as part of their projects list.
    for(let user of usersAfterCreation){
        user.projects = user.projects.concat(projectIds);
        await user.save();
    }
    //the first project will own first 2 bugs. The other will own the rest.
    for(let bug of initialBugs.slice(0,2)){
        bug.project = projectIds[0];
        bug.assigned = [].concat([projectsAfterCreation[0].admins[0], projectsAfterCreation[0].developers[0]]);
        bug.createdDate = Date.now();
        let bugObject = new Bugs(bug);
        await bugObject.save();
    }
    for(let bug of initialBugs.slice(2,initialBugs.length)){
        bug.project = projectIds[1];
        bug.assigned = [].concat(projectsAfterCreation[1].developers[0]);
        bug.createdDate = Date.now();
        let bugObject = new Bugs(bug);
        await bugObject.save();
    }
    //get bugsAfterCreation to update the projects and users with bugs id later
    const bugsAfterCreation = await Bugs.find({});
    const bugIds = bugsAfterCreation.map((bug) => (bug.id));
    projectsAfterCreation[0].bugs = projectsAfterCreation[0].bugs.concat(bugIds.slice(0,2));
    await projectsAfterCreation[0].save();
    projectsAfterCreation[1].bugs = projectsAfterCreation[1].bugs.concat(bugIds.slice(2,bugIds.length));
    await projectsAfterCreation[1].save();
    usersAfterCreation[1].bugs = usersAfterCreation[1].bugs.concat(bugIds.slice(0,2));
    await usersAfterCreation[1].save();
    usersAfterCreation[2].bugs = usersAfterCreation[2].bugs.concat(bugIds);
    await usersAfterCreation[2].save();
});

//Bug GET method
describe('bug GET methods', () => {
    //test if the response is in json type
    test('bugs are returned as json', async () => {
        await api.get('/api/bugs').expect(200).expect('Content-Type', /application\/json/)
    })

    //test if all bugs are returned
    test('all bugs are returned', async () => {
        const response = await api.get('/api/bugs')
        expect(response.body).toHaveLength(initialBugs.length);
    })

    //test GET user method by id
    test('a bug is returned by id', async () => {
    //get all users and store the first user's id and name for checking
    const bugArrayResponse = await Bugs.find({});
    const idToCheck = bugArrayResponse[0].id;
    const bugNameCheck = bugArrayResponse[0].name;

    //use the first user's id to get a user by id request, if the response is the same user(check by name), test pass
    const bugSingleResponse = await api.get(`/api/bugs/${idToCheck}`);
    expect(bugSingleResponse.body.name).toEqual(bugNameCheck);
    });
})

//Bug POST METHOD
describe('bug POST Method', () => {
    //test POST bug method to make sure that a bug is successfully added.
    test('a bug is successfully added', async () => {
      //get first project for the bug
      const project = await Projects.findOne({name: initialProjects[0].name});
      //new bug to be added
      const newBug =  {
          name: "Bug 5",
          description: "Bug Description 5",
          project: project._id,
      };
      //post the bug
      await api.post('/api/bugs').send(newBug)
      //test if the bugs count is increased by 1.
      const response = await api.get('/api/bugs');
      expect(response.body).toHaveLength(initialBugs.length + 1)
      //test if the newly added bug name is in the array
      const names = response.body.map((object) => object.name);
      expect(names).toContain('Bug 5');
    });
})

afterAll(() => {
    mongoose.connection.close()
}) 