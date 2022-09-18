//MONGOOSE
const mongoose = require("mongoose");

//Schema Definition
//name - String, description - String, will have a list of creators,admin,developer,clients by user._id
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  admin: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  developers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    }],
  bugs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug",
    }],
  createdDate: {
      type: Date,
      required: true,
  }, 
  endDate: {
      type: Date,
  }
});

//setSchema
projectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//export
module.exports = mongoose.model("Project", projectSchema);