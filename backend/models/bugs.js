//MONGOOSE
const mongoose = require("mongoose");

//Schema Definition
//name - String, description - String, will have a list assigned users by user._id
const bugSchema = new mongoose.Schema({
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
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
});

//setSchema
bugSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
});

//export
module.exports = mongoose.model("Bug", bugSchema);