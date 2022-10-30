import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// Create loadCurrentUserData here.
export const loadCurrentBugData = createAsyncThunk(
  'currentBug/loadCurrentBugData',
  async(id, thunkAPI) => {
    console.log("id", id);
    const response = await axios.get(`http://localhost:3001/api/bugs/${id}`);
    return response.data;
  }
)

export const deleteSelectedBug = async(id) => {
    const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    const response = await axios.delete(`http://localhost:3001/api/bugs/${id}`, {headers: {Authorization: token}});
    return response.data;
}

export const createBug = async(data) => {
    const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
    const response = await axios.post(`http://localhost:3001/api/bugs`, data, {headers: {Authorization: token}});
    return response.data;
}

export const editSelectedBug = async(id, data) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const response = await axios.put(`http://localhost:3001/api/bugs/${id}`, data, {headers: {Authorization: token}});
  return response.data;
}

//currentUserSlice
const currentBugSlice = createSlice({
  name: 'currentBug',
  initialState: {
    bugData: {},
    isLoading: true,
    hasError: false
  },
  reducers: {
    addAssignee: (state, action) => {
      state.bugData.assigned = state.bugData.assigned.concat(action.payload.addUser);
    },
    deleteAssignee: (state, action) => {
      state.bugData.assigned = state.bugData.assigned.filter((user) => user.id !== action.payload.deleteUser);
    }
  },
  extraReducers: {
    [loadCurrentBugData.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadCurrentBugData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.bugData = payload;
    },
    [loadCurrentBugData.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
})

export default currentBugSlice.reducer;