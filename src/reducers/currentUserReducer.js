import { createSlice } from "@reduxjs/toolkit"

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {},
  reducers: {
    setCurrentUser(state, action) {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.bio = action.payload.bio;
      state.id = action.payload.id;
      state.tasks = action.payload.tasks;
      state.bugs = action.payload.bugs;
      state.projects = action.payload.projects;
      state.projectInvites = action.payload.projectInvites;
    },
    logout(state = initialState, action){
    }
  },
})

export const {setCurrentUser, logout} = currentUserSlice.actions

export default currentUserSlice.reducer;