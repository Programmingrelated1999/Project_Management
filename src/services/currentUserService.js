//import
import axios from "axios";

//form and question base url
//const baseUrl = "http://localhost:3001/api/users";
const baseUrl = "'https://floating-everglades-17588.herokuapp.com/api/users"

//getAll
const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

//acceptInvite
const acceptInvite = async (userId, projectId) => {
  const response = await axios.put(`${baseUrl}/${userId}`, {acceptInvite: projectId});
  return response.data;
}

const rejectInvite = async (userId, projectId) => {
  const response = await axios.put(`${baseUrl}/${userId}`, {rejectInvite: projectId});
  return response.data;
}

export default {getUser, acceptInvite, rejectInvite};