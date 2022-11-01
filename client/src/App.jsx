//Import
import React from "react";

//Hooks
import useToken from "./hooks/useToken";

//Components
import AppContainer from "./AppContainer";
import LoginPage from './components/Login/LoginPage';

//CSS
import './App.css'

//App Component
const App = () => {
  const {token, setToken, resetToken} = useToken();

  const logout = () => {
    resetToken();
  }

  //if token is null, then render to login page
  if(!token) {
    return(
      <LoginPage setToken = {setToken}/>
    )
  }
  
  return (
    <div className="App">
      <AppContainer logout = {logout} />
    </div>
  )
}

export default App;