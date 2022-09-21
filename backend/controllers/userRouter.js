const userRouter = require("express").Router();
const Users = require("../models/users");
const userHelper = require("../helpers/userHelper");
const taskHelper = require("../helpers/taskHelper");
const { removeUsersFromTasks } = require("../helpers/taskHelper");

//GET ALL
userRouter.get("/", async (request, response) => {
  const allUsers = await Users.find({});
  response.json(allUsers);
})

//GET ONE
userRouter.get("/:id", async (request, response) => {
  const userToReturn = await Users.findById(request.params.id);
  response.json(userToReturn);
})

//POST
//create a new user only required name.
userRouter.post("/", async (request, response) => {
    const user = new Users({name: request.body.name});
    const savedUser = await user.save();
    response.json(savedUser);
});

//PUT
//update a user by id
userRouter.put("/:id", async (request, response) => {
  const user = await Users.findById(request.params.id);
  user.name = request.body.name? request.body.name: user.name;
  const savedUser = await user.save();
  response.json(savedUser);
});

//DELETE
userRouter.delete("/:id", async (request, response) => {
  const user = await Users.findById(request.params.id);

  const removedUser = await user.remove();
  response.json(removedUser);
});

module.exports = userRouter;