import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";

//REDUX
import { Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
//import reducers
import currentUserReducer from "./reducers/currentUserReducer";
import currentProjectReducer from './reducers/currentProjectReducer';

//create store
const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    currentProject: currentProjectReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
