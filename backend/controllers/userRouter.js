const userRouter = require("express").Router();
const Users = require("../models/users");

//GET
userRouter.get("/", (request, response) => {
    Users.find({}).then((user) => {
      response.json(user);
    });
})

//POST
//create a new user only required name.
userRouter.post("/", (request, response) => {
    const user = new Users({
        name: request.body.name,
      });
      user.save().then((user) => {
        response.json(user);
      });
})

module.exports = userRouter;