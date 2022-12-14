import React, {useState} from 'react'

import "./SearchUsersModal.css"

import { Modal, Button, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const SearchUsersModal = ({showAdd, closeAdd, addInvite, invites}) => {

    const allUsers = useSelector(state => state.allUsers.allUsersData);
    const isLoading = useSelector(state => state.allUsers.isLoading);
    const hasError = useSelector(state => state.allUsers.hasError);

    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState('');
    const [userFound, setUserFound] = useState();

    if(isLoading){
        return <p>Loading</p>
    }

    if(hasError){
        return <p>Has Error</p>
    }    

    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    const findUser = () => {
        const user = allUsers.find(user => user.username === filter);
        if(user){
            if(user?.id === JSON.parse(localStorage.getItem("id"))){
                setNotification('Cannot add Yourself')
            } 
            else{
                if(invites.includes(user)){
                    setNotification('User Already in invite list')
                }else{
                    setNotification('Found User')
                    setUserFound(user);
                }
            }
        }
        else{
            setNotification('User not found!')
        }
    }

    const handleAddInvite = () =>{
        setFilter("")
        setNotification("")
        addInvite(userFound);
        setUserFound();
        closeAdd();
    }

    return (
        <Modal show={showAdd} onHide={closeAdd} centered>
            <Modal.Header closeButton>
                <Modal.Title>Enter Username to Add</Modal.Title>
            </Modal.Header>
            <Modal.Body className = "text-danger">
                <input placeholder='Type Username' value = {filter} onChange = {handleFilter}/> <Button variant = "success" onClick = {findUser}>Search</Button>
                {userFound?     
                    <>
                        <div>{userFound.name}</div>
                        {console.log(userFound.id)}
                        <button onClick = {handleAddInvite}>Add</button>
                    </>
                    :<p>{notification}</p>
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
    </Modal>
    )
}

export default SearchUsersModal
