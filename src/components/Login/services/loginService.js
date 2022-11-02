import axios from 'axios'

//for dev
/*
const baseUrl = 'http://localhost:3001/login'
const createAccountUrl = 'http://localhost:3001/api/users'
*/

//for production
const baseUrl = 'https://floating-everglades-17588.herokuapp.com/login'
const createAccountUrl = 'https://floating-everglades-17588.herokuapp.com/api/users'


export const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export const createAccount = async credentials => {
  const response = await axios.post(createAccountUrl, credentials)
  return response.status(200).data
}

export default {login, createAccount};