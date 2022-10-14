import React, {useState} from 'react'

import "./SearchUsersModal.css"

import { Modal, Button, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const SearchUsersModal = ({showAdd, closeAdd}) => {

    const allUsers = useSelector(state => state.allUsers.allUsersData);
    const isLoading = useSelector(state => state.allUsers.isLoading);
    const hasError = useSelector(state => state.allUsers.hasError);
    const currentUser = useSelector(state => state.currentUser.personData);
    const isCurrentUserLoading = useSelector(state => state.currentUser.isLoading);
    const hasCurrentUserError = useSelector(state => state.currentUser.hasError);

    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState('');
    const [userFound, setUserFound] = useState();

    if(isLoading || isCurrentUserLoading){
        return <p>Loading</p>
    }

    if(hasError || hasCurrentUserError){
        return <p>Has Error</p>
    }    

    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    const findUser = () => {
        const user = allUsers.find(user => user.username === filter);
        if(user.name === currentUser.name){
            setNotification('Cannot add Yourself')
        } else if(user){
            setNotification('Found User')
            setUserFound(user);
        } else{
            setNotification('User not found!')
        }
    }

    return (
        <Modal show={showAdd} onHide={closeAdd} centered>
            <Modal.Header closeButton>
                <Modal.Title>Enter Username to Add</Modal.Title>
            </Modal.Header>
            <Modal.Body className = "text-danger">
                <input placeholder='username forexample - username1' value = {filter} onChange = {handleFilter}/> <Button variant = "success" onClick = {findUser}>Search</Button>
                {userFound?     
                <div>{userFound.name}</div>:<p>{notification}</p>}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick = {closeAdd}>
                Yes
            </Button>
            <Button variant="primary" onClick = {closeAdd}>
                No
            </Button>
            </Modal.Footer>
    </Modal>
    )
}

export default SearchUsersModal
