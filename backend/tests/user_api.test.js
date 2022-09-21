const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

//import Models
const Users = require("../models/users");

//import testHelper
const testHelper = require("./test_helper");

//initial data
const initialUsers = testHelper.initialUsers;

//setting data before each test is run. 
beforeEach(async () => {
    await Users.deleteMany({})
    for (let user of initialUsers) {
        let userObject = new Users(user)
        await userObject.save()
    }
});

//User GET method
describe('user GET methods', () => {
  //test if the response is in json type
  test('users are returned as json', async () => {
    await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
  })
  
  //test if all users are returned by user count
  test('all users are returned', async () => {
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialUsers.length);
  })
  
  //test GET user method by id
  test('a user is returned by id', async () => {
      //get all users and store the first user's id and name for checking
      const userArrayResponse = await Users.find({});
      const idToCheck = userArrayResponse[0].id;
      const userNameCheck = userArrayResponse[0].name;
  
      //use the first user's id to get a user by id request, if the response is the same user(check by name), test pass
      const userSingleResponse = await api.get(`/api/users/${idToCheck}`);
      expect(userSingleResponse.body.name).toEqual(userNameCheck);
  });
})

//User POST METHOD
describe('user POST Method', () => {
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
})

//User PUT METHOD
describe('user PUT Method', () => {
    //test POST user method to make sure that a user is successfully added.
    test('a user can be updated by id', async () => {
      //get all users and change the first user name and then store the first user id for PUT
      const userArrayResponse = await api.get('/api/users');
      const firstUser = userArrayResponse.body[0];
      const newName = "User 3"
      firstUser.name = newName;
      const firstUserId = firstUser.id;

      //updated user Name
      await api.put(`/api/users/${firstUserId}`).send(firstUser);
      const updatedUser = await api.get(`/api/users/${firstUserId}`);
      expect(updatedUser.body.name).toEqual(newName);      
    });
})

//User DELETE METHOD
describe('user DELETE method', () => {
  //test DELETE user method to make sure that a user is successfully deleted.
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
})


afterAll(() => {
  mongoose.connection.close()
})