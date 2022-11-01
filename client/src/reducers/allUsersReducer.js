import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// Create loadCurrentUserData here.
export const loadAllUsersData = createAsyncThunk(
  'currentBug/loadAllUsersData',
  async(id, thunkAPI) => {
    const response = await axios.get(`http://localhost:3001/api/users`);
    return response.data;
  }
)

//currentUserSlice
const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    allUsersData: {},
    isLoading: true,
    hasError: false
  },
  reducers: {
    deleteTask: (state, action) => {
      state.projectData.tasks = state.projectData.tasks.filter((task) => task.id !== action.payload.task);
    }
  },
  extraReducers: {
    [loadAllUsersData.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadAllUsersData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.allUsersData = payload;
    },
    [loadAllUsersData.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
})

export default allUsersSlice.reducer;