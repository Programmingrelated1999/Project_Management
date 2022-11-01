import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// Create loadCurrentUserData here.
export const loadCurrentUserData = createAsyncThunk(
  'currentUser/loadCurrentUserData',
  async(id, thunkAPI) => {
    const response = await axios.get(`http://localhost:3001/api/users/${id}`);
    console.log("response", response);
    return response.data;
  }
)

//acceptInvite
export const acceptInvite = createAsyncThunk(
  'currentUser/acceptInvite',
  async({userId, projectId}, thunkAPI) => {
    const response = await axios.put(`http://localhost:3001/api/users/${userId}`, {acceptInvite: projectId});
    return response.data;
  }
)

//acceptInvite
export const rejectInvite = createAsyncThunk(
  'currentUser/rejectInvite',
  async({userId, projectId}, thunkAPI) => {
    const response = await axios.put(`http://localhost:3001/api/users/${userId}`, {rejectInvite: projectId});
    return response.data;
  }
)

//currentUserSlice
const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    personData: {},
    isLoading: true,
    hasError: false
  },
  reducers: {
    deleteTask: (state, action) => {
      state.personData.tasks = state.personData.tasks.filter((task) => task.id !== action.payload.task);
    },
    deleteBug: (state, action) => {
      state.personData.bugs = state.personData.bugs.filter((bug) => bug.id !== action.payload.bug);
    }
  },
  extraReducers: {
    [loadCurrentUserData.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadCurrentUserData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.personData = payload;
    },
    [loadCurrentUserData.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },

    [acceptInvite.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [acceptInvite.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.personData = payload;
    },
    [acceptInvite.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },

    [rejectInvite.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [rejectInvite.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.personData = payload;
    },
    [rejectInvite.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },

  },
})
export default currentUserSlice.reducer;