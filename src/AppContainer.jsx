import { getListSubheaderUtilityClass } from '@mui/material'
import { current } from '@reduxjs/toolkit'
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import NavBar from './components/NavBar'

import { loadCurrentUserData } from './reducers/currentUserReducer'

const AppContainer = ({logout}) => {
  const id = JSON.parse(localStorage.getItem('id'));
  const isLoading = useSelector(state => state.currentUser.isLoading);
  const currentUser = useSelector(state => state.currentUser.personData);
  const hasError = useSelector(state => state.currentUser.hasError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentUserData(id))
  }, [dispatch])

  if(isLoading) return <p>Loading...</p>

  if(hasError){
    return <p>Error...</p>
  }

  return (
    <div style={{minHeight: '100vh'}}>
        <NavBar logout = {logout} currentUser = {currentUser}/>
    </div>
  )
}

export default AppContainer
