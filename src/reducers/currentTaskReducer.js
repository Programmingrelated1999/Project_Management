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

export const deleteSelectedTask = async(id) => {
    const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    const response = await axios.delete(`http://localhost:3001/api/tasks/${id}`, {headers: {Authorization: token}});
    return response.data;
}

//currentUserSlice
const currentTaskSlice = createSlice({
  name: 'currentTask',
  initialState: {
    taskData: {},
    isLoading: true,
    hasError: false
  },
  reducers: {
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