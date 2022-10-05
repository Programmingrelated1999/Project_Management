import React, {useEffect} from 'react'

//REDUX
import { setCurrentUser } from '../reducers/currentUserReducer';
import currentUserService from '../services/currentUserService';
import { useSelector, useDispatch } from 'react-redux';

const AppContainer = ({logout}) => {
  return (
    <div>
        <NavBar logout = {logout}/>
    </div>
  )
}

export default AppContainer
