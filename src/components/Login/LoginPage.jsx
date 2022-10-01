import React, {useState} from 'react';

import loginService from './services/loginService';

const LoginPage = ({setToken}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInfo = {
            username, password
        }
        try{
            const data = await loginService(userInfo);
            setToken({token: data.token});
            setUsername('');
            setUserPassword('');
        } catch (exception){
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        }
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <h1>{errorMessage === null? null: errorMessage}</h1>
            <form onSubmit = {handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange = {changeUsername} value={username}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange = {changePassword} value={password}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
      </div>
    )
}

export default LoginPage;