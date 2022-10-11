import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// Create loadCurrentUserData here.
export const loadCurrentTaskData = createAsyncThunk(
  'currentTask/loadCurrentTaskData',
  async(id, thunkAPI) => {
    const response = await axios.get(`http://localhost:3001/api/tasks/${id}`);
    return response.data;
  }
)

//currentUserSlice
const currentTaskSlice = createSlice({
  name: 'currentTask',
  initialState: {
    taskData: {},
    isLoading: true,
    hasError: false
  },
  reducers: {
    setCurrentTask: (state, action) => {
      state.taskData.name = action.payload.name;
      state.taskData.description = action.payload.description;
      state.taskData.project = action.payload.project;
      state.taskData.createdDate = action.payload.createdDate;
      state.taskData.endDate = action.payload.endDate;
      state.taskData.assigned = action.payload.assigned;
      state.taskData.status = action.payload.status;
    }
  },
  extraReducers: {
    [loadCurrentTaskData.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadCurrentTaskData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.taskData = payload;
    },
    [loadCurrentTaskData.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
})

export default currentTaskSlice.reducer;