//Import
import React from "react";

//Hooks
import useToken from "./hooks/useToken";

//Components
import NavBar from './components/NavBar'
import LoginPage from './components/Login/LoginPage';

//import Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from "./reducers/currentUserReducer";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer
  }
})

currentUserService.getUser().then(currentUser =>
    store.dispatch(setCurrentUser(currentUser))
)

//CSS
import './App.css'

//App Component
function App() {
  const {token, setToken, resetToken} = useToken();

  const logout = () => {
    resetToken();
  }

  //if token is null, then render to login page
  if(!token) {
    return <LoginPage setToken={setToken}/>
  }

  return (
    <div className="App">
      <Provider store = {store}>
        <NavBar logout={logout}/>
      </Provider>
    </div>
  )
}

export default App
