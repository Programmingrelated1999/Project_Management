//Initial States
const initialState = [];

//Form Reducers
//Action type is "New_Questions, append the new question to the state.question array"
const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case " ":
      return [...state, action.data];
    default:
      return state;
  }
}

export default currentUserReducer;