require("dotenv").config();

//port and mongodb uri are
const PORT = process.env.PORT;

//Mongodb uri
const MONGODB_URI = process.env.MONGODB_URI;

//export mongodb uri and port
module.exports = {
  MONGODB_URI,
  PORT,
};