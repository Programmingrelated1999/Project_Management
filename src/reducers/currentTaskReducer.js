import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

//dev url
//const tasksUrl = 'http://localhost:3001/api/tasks/';

//production url
const tasksUrl = 'https://floating-everglades-17588.herokuapp.com/api/tasks/'

// Create loadCurrentUserData here.
export const loadCurrentTaskData = createAsyncThunk(
  'currentTask/loadCurrentTaskData',
  async(id, thunkAPI) => {
    console.log("id", id);
    const response = await axios.get(`${tasksUrl}${id}`);
    return response.data;
  }
)

export const deleteSelectedTask = async(id) => {
    const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    const response = await axios.delete(`${tasksUrl}${id}`, {headers: {Authorization: token}});
    return response.data;
}

export const createTask = async(data) => {
    const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    const response = await axios.post(tasksUrl, data, {headers: {Authorization: token}});
    return response.data;
}

export const editSelectedTask = async(id, data) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const response = await axios.put(`${tasksUrl}${id}`, data, {headers: {Authorization: token}});
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
    addAssignee: (state, action) => {
      state.taskData.assigned = state.taskData.assigned.concat(action.payload.addUser);
    },
    deleteAssignee: (state, action) => {
      state.taskData.assigned = state.taskData.assigned.filter((user) => user.id !== action.payload.deleteUser);
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