const userRouter = require("express").Router();
const Users = require("../models/users");

//GET ALL
userRouter.get("/", (request, response) => {
    Users.find({}).then((users) => {
      response.json(users);
    });
})

//GET ONE
userRouter.get("/:id", (request, response) => {
  Users.findById(request.params.id).then((user) => {
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