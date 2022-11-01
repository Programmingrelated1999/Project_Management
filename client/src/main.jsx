import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

//REDUX
import { Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
//import reducers
import currentUserReducer from "./reducers/currentUserReducer";
import currentProjectReducer from './reducers/currentProjectReducer';
import currentTaskReducer from "./reducers/currentTaskReducer";
import currentBugReducer from "./reducers/currentBugReducer";
import allUsersReducer from './reducers/allUsersReducer';

//create store
const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    currentProject: currentProjectReducer,
    currentTask: currentTaskReducer,
    currentBug: currentBugReducer,
    allUsers: allUsersReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <App />
        </LocalizationProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
