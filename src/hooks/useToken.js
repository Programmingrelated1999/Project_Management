import React, {useState} from 'react';

const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };
    
      const [token, setToken] = useState(getToken());
    
      const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify({token: userToken.token}));
        localStorage.setItem('id', JSON.stringify(userToken.id));
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