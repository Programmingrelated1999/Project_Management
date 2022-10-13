import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// Create loadCurrentUserData here.
export const loadCurrentUserData = createAsyncThunk(
  'currentUser/loadCurrentUserData',
  async(id, thunkAPI) => {
    const response = await axios.get(`http://localhost:3001/api/users/${id}`);
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
  },
})
export default currentUserSlice.reducer;