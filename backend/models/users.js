//MONGOOSE
const mongoose = require("mongoose");

//Schema Definition
//name - String, description - String, questions - {Question - Schema}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: ''
  },
  projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    }],
  tasks:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
  }],
  bugs:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug",
  }],
});

//setSchema
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//export
module.exports = mongoose.model("User", userSchema);