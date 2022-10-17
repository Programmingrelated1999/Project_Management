import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// Create loadCurrentUserData here.
export const loadCurrentBugData = createAsyncThunk(
  'currentBug/loadCurrentBugData',
  async(id, thunkAPI) => {
    const response = await axios.get(`http://localhost:3001/api/bugs/${id}`);
    return response.data;
  }
)

export const deleteSelectedBug = async(id) => {
  const token = `bearer ${JSON.parse(localStorage.getItem("token")).token}`;
  const response = await axios.delete(`http://localhost:3001/api/bugs/${id}`, {headers: {Authorization: token}});
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
    setCurrentBug: (state, action) => {
      state.bugData.name = action.payload.name;
      state.bugData.description = action.payload.description;
      state.bugData.project = action.payload.project;
      state.bugData.createdDate = action.payload.createdDate;
      state.bugData.endDate = action.payload.endDate;
      state.bugData.assigned = action.payload.assigned;
      state.bugData.status = action.payload.status;
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