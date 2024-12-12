import { useState } from 'react';

function useToken() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const saveToken = (userToken) => {
    localStorage.setItem('authToken', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  return {
    token,
    setToken: saveToken,
    removeToken: removeToken,
  };
}

export default useToken;
