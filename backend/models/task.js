//MONGOOSE
const mongoose = require("mongoose");

//Schema Definition
//name - String, description - String, will have a list assigned users by user._id
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    assigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }],
});

//setSchema
taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//export
module.exports = mongoose.model("Task", taskSchema);