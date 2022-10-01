import React, {useState} from 'react';

const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };
    
      const [token, setToken] = useState(getToken());
    
      const saveToken = userToken => {
        console.log("userToken", userToken.token);
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };

      const resetToken = () => {
        localStorage.clear();
        setToken();
      }

    return {
        token, setToken: saveToken, resetToken
    }
};

export default useToken;