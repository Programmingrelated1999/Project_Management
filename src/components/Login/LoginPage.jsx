    import React, {useState} from 'react';

    import loginService from './services/loginService';

    import { Button } from 'react-bootstrap';

    import "./LoginPage.css"

    const LoginPage = ({setToken}) => {

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [errorMessage, setErrorMessage] = useState(null);
        const [createNewAccount, setCreateNewAccount] = useState(false);
        const [newAccountUsername, setNewAccountUsername] = useState("");
        const [newAccountPassword, setNewAccountPassword] = useState("");
        const [newAccountName, setNewAccountName] = useState("");
        const [successMessage, setSuccessMessage] = useState(null);

        const changeUsername = (event) => {
            setUsername(event.target.value);
        }

        const changePassword = (event) => {
            setPassword(event.target.value);
        }

        const changeCreateNewAccount = (event) => {
            event.preventDefault();
            setCreateNewAccount(!createNewAccount);
        }

        const changeNewAccountUsername = (event) => {
            setNewAccountUsername(event.target.value);
        }

        const changeNewAccountName = (event) => {
            setNewAccountName(event.target.value);
        }

        const changeNewAccountPassword = (event) => {
            setNewAccountPassword(event.target.value);
        }

        const handleSubmit = async (event) => {
            event.preventDefault();
            const userInfo = {
                username, password
            }
            try{
                const data = await loginService.login(userInfo);
                setToken({token: data.token, id: data.id});
                setUsername('');
                setUserPassword('');
            } catch (exception){
                setErrorMessage('Wrong credentials')
                setTimeout(() => {
                setErrorMessage(null)
                }, 5000)
            }
        }

        const handleCreateAccount = async (event) => {
            event.preventDefault();
            const userInfo = {
                username: newAccountUsername,
                name: newAccountName,
                password: newAccountPassword
            }
            if(userInfo.password.length < 6){
                setErrorMessage('Password must be at least 6 letters')
                setTimeout(() => {
                setErrorMessage(null)
                }, 5000)
                return
            }
            if(userInfo.name == ""){
                setErrorMessage('Name is empty')
                setTimeout(() => {
                setErrorMessage(null)
                }, 5000)
                return
            }
            try{
                const data = await loginService.createAccount(userInfo);
                setNewAccountUsername('');
                setNewAccountName('');
                setNewAccountPassword('');
                setCreateNewAccount(false);
                setSuccessMessage('Account Created Succesfully, Login using credentials')
                setTimeout(() => {
                setSuccessMessage(null)
                }, 5000)
            } catch (error){
                console.log(error)
                if(error.response.data.code === 11000){
                    setErrorMessage('UserName already Exists, Use different Username')
                    setTimeout(() => {
                    setErrorMessage(null)
                    }, 5000)
                } else{
                    setErrorMessage('One or more field is missing')
                    setTimeout(() => {
                    setErrorMessage(null)
                    }, 5000)
                }
            }
        }

        return(
            <div className = "login-page">
                <div className = "login-container">
                    <div className = "login-picture">
                        <img src = ".../../../public/images/receptionist-receiving-visitor-at-desk.jpg"/>
                    </div>
                    {createNewAccount? 
                    <div className="login">
                        <h2 className = "text-primary">&lt;/&gt;Project Tracker</h2>
                        <div className="login-form">
                            <h3>Create Account</h3>
                            <h6 className = "text-danger">{errorMessage === null? null: errorMessage}</h6>
                            <h6 className = "text-success">{successMessage === null? null: successMessage}</h6>
                            <form onSubmit = {handleCreateAccount}>
                            <label className='d-block'>
                                <p className = "my-0">Username</p>
                                <input type="text" onChange = {changeNewAccountUsername} value={newAccountUsername}/>
                            </label>
                            <label className='d-block my-3'>
                                <p className = "my-0">Name</p>
                                <input type="text" onChange = {changeNewAccountName} value={newAccountName}/>
                            </label>
                            <label className ="d-block my-3">
                                <p className = "my-0">Password</p>
                                <input type="password" onChange = {changeNewAccountPassword} value={newAccountPassword}/>
                            </label>
                                <Button type="submit" className = "btn btn-success  ">CreateAccount</Button>
                            </form>
                            <h6 className = "text-danger">Dont Have an Account?</h6>
                            <a href = "#" className='text-primary' onClick = {changeCreateNewAccount}>Go Back to Login</a>
                        </div>
                    </div>: 
                    <div className="login">
                        <h2 className = "text-primary">&lt;/&gt;Project Tracker</h2>
                        <div className="login-form">
                            <h2>Please Log In</h2>
                            <h6 className = "text-danger">{errorMessage === null? null: errorMessage}</h6>
                            <h6 className = "text-success">{successMessage === null? null: successMessage}</h6>
                            <form onSubmit = {handleSubmit}>
                            <label className='d-block'>
                                <p className = "my-0">Username</p>
                                <input type="text" onChange = {changeUsername} value={username}/>
                            </label>
                            <label className ="d-block my-3">
                                <p className = "my-0">Password</p>
                                <input type="password" onChange = {changePassword} value={password}/>
                            </label>
                                <Button type="submit" className = "btn btn-success  ">Submit</Button>
                            </form>
                            <h6 className = "text-danger">Dont Have an Account?</h6>
                            <a href = "#" className='text-primary' onClick = {changeCreateNewAccount}>Sign Up Now</a>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }

    export default LoginPage;