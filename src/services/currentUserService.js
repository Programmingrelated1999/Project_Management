//import
import axios from "axios";

//form and question base url
const formUrl = "http://localhost:3001/api/user",

//getAll
export const getUser = async (userId) => {
  const response = await axios.get(`${formUrl}/${userId}`);
  return response.data;
};
