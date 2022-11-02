import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

//dev url
//const projectsUrl = 'http://localhost:3001/api/projects/';

//production url
const projectsUrl = 'https://floating-everglades-17588.herokuapp.com/api/projects/'


// Create loadCurrentUserData here.
export const loadCurrentProjectData = createAsyncThunk(
  'currentProject/loadCurrentProjectData',
  async(id, thunkAPI) => {
    const response = await axios.get(`${projectsUrl}${id}`);
    return response.data;
  }
)

//create a new project
export const createANewProject = async(projectData) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const response = await axios.post(projectsUrl, projectData, {headers: {Authorization: token}});
  return response.data;
}

export const editSelectedProject = async(id, data) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const response = await axios.put(`${projectsUrl}${id}`, data, {headers: {Authorization: token}});
  return response.data;
}

export const changeUserRoleInProject = async(id, userId, data) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const response = await axios.put(`${projectsUrl}${id}/${userId}`, data, {headers: {Authorization: token}});
  return response.data;
}

export const deleteSelectedProject = async(projectId) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const response = await axios.delete(`${projectsUrl}${projectId}`, {headers: {Authorization: token}});
  return response.data;
}

//currentUserSlice
const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState: {
    projectData: {},
    isLoading: true,
    hasError: false
  },
  reducers: {
    deleteTask: (state, action) => {
      state.projectData.tasks = state.projectData.tasks.filter((task) => task.id !== action.payload.task);
    },
    deleteBug: (state, action) => {
      state.projectData.bugs = state.projectData.bugs.filter((bug) => bug.id !== action.payload.bug);
    },
    resetProject: (state, action) => {
      state.projectData = {};
    }
  },
  extraReducers: {
    [loadCurrentProjectData.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadCurrentProjectData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.projectData = payload;
    },
    [loadCurrentProjectData.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
})

export default currentProjectSlice.reducer;