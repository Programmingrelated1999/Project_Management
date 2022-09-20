const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

//import Models
const Users = require("../models/users")

//initial data
const initialUsers = [
    {
        name: "User 1",
    }, 
    {
        name: "User 2",
    }
];

beforeEach(async () => {
    await Users.deleteMany({})
    for (let user of initialUsers) {
        let userObject = new Users(user)
        await userObject.save()
    }
});
//test if the response is in json type
test('users are returned as json', async () => {
  await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
})
//test if all users are returned by user count
test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length);
})

//test POST user method to make sure that a user is successfully added.
test('a user is successfully added', async () => {
    //new user to be added
    const newUser =  {
        name: "User 3",
    };
    await api.post('/api/users').send(newUser)
    //test if the user count is increased by 1.
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(initialUsers.length + 1)
    //test if the newly added user name is in the array
    const names = response.body.map((object) => object.name);
    expect(names).toContain('User 3');
});

//test DELETE user method to make sure that a user is successfully added.
test('a user is successfully removed', async () => {
    //get the users, store the ids in an array. store the first id user name, and delete the first id user
    const userArrayResponse = await api.get('/api/users');
    const idArray = userArrayResponse.body.map((user) => user.id)
    const userDeletedName = userArrayResponse.body[0].name;
    await api.delete(`/api/users/${idArray[0]}`);

    //check if users got reduced by 1. then check if the first user name got deleted.
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(initialUsers.length - 1);
    const finalUserNames = response.body.map((user)=>user.name);
    expect(finalUserNames).not.toContain(userDeletedName);
});

afterAll(() => {
  mongoose.connection.close()
})