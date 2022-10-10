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

//currentUserSlice
const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState: {
    projectData: {},
    isLoading: true,
    hasError: false
  },
  reducers: {
    setCurrentProject: (state, action) => {
      state.projectData.name = action.payload.name;
      state.projectData.description = action.payload.description;
      state.projectData.creator = action.payload.creator;
      state.projectData.createdDate = action.payload.createdDate;
      state.projectData.endDate = action.payload.endDate;
      state.projectData.admins = action.payload.admins;
      state.projectData.developers = action.payload.developers;
      state.projectData.invites = action.payload.invites;
      state.projectData.clients = action.payload.clients;
      state.projectData.tasks = action.payload.tasks;
      state.projectData.bugs = action.payload.bugs;
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