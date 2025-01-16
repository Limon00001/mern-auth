/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/15/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URI;

  // configures `Axios` to include credentials like cookies, authorization headers, or client certificates with requests.
  axios.defaults.withCredentials = true;

  useEffect(() => {
    getAuthStatus();
  }, []);

  const getAuthStatus = async () => {
    try {
      // Send a GET request to the server to check if the user is authenticated
      const response = await axios.get(`${backendUrl}/api/auth/is-auth`);

      // Check if the response is successful
      if (response.data.success) {
        setIsLoggedIn(true);

        // Get the user data
        getUserData();
      }
    } catch (error) {
      // Handle any errors that occur during the authentication process
      toast.error(error.response?.data?.error?.message);
    }
  };

  const getUserData = async () => {
    try {
      // Send a GET request to the server to get the user data
      const response = await axios.get(`${backendUrl}/api/users/get-user`);

      // Check if the response is successful
      response.data.success
        ? setUserData(response.data.data)
        : toast.error(response?.data?.error?.message);

      // Or
      // if (!response.data.success) {
      //   toast.error(response?.data?.error?.message);
      // }
      // setUserData(response.data.data);
    } catch (error) {
      // Handle any errors that occur during the user data retrieval
      toast.error(
        error.response?.data?.error?.message ||
          error.message ||
          'An error occured',
      );
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Export
export { AppContext, AppContextProvider };
