import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// Create loadCurrentUserData here.
export const loadCurrentProjectData = createAsyncThunk(
  'currentProject/loadCurrentProjectData',
  async(id, thunkAPI) => {
    const response = await axios.get(`http://localhost:3001/api/projects/${id}`);
    return response.data;
  }
)

//create a new project
export const createANewProject = async(projectData) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const response = await axios.post(`http://localhost:3001/api/projects`, projectData, {headers: {Authorization: token}});
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