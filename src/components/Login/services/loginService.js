import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

export const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export const createAccount = async credentials => {
  const response = await axios.post('http://localhost:3001/api/users', credentials)
  return response.data
}

export default {login, createAccount};