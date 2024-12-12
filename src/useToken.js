// useToken.js
import { useState } from 'react';

function useToken() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Store token in localStorage whenever it changes
  const saveToken = (userToken) => {
    localStorage.setItem('authToken', userToken);
    setToken(userToken);
  };

  return {
    token,
    setToken: saveToken, // Return the setter function for token
  };
}

export default useToken;
