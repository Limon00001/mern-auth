/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal Dependencies
import { AppContext } from '../context/AppContext';
import { formatDate } from '../utils/fotmatDate';

const Dashboard = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);
  console.log(userData);

  // configures `Axios` to include credentials like cookies, authorization headers, or client certificates with requests.
  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    try {
      // Send a POST request to the server to log out the user
      const response = await axios.post(`${backendUrl}/api/auth/logout`);
      if (response?.data?.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate('/');
      }
    } catch (error) {
      // Handle any errors that occur during the logout process
      toast.error(
        error.response?.data?.error?.message ||
          error.message ||
          'An error occured',
      );
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 via-teal-100 to-pink-100 p-6 h-screen dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-800 dark:to-black dark:text-white">
      <div className="hover:shadow-3xl dark:shadow-3xl fade-in mx-auto max-w-md w-full transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ease-in-out dark:bg-gray-800 dark:hover:shadow-xl">
        <div className="relative z-10 p-8">
          <h2 className="glow mb-5 text-2xl text-center leading-tight font-bold text-gray-800 dark:text-gray-100">
            Dashboard
          </h2>
          <div className="w-full border border-gray-100 bg-gray-50 rounded-lg p-4">
            <h3 className="mb-2 text-xl text-gray-700 font-semibold dark:text-gray-300">
              Profile Information
            </h3>
            <p className="text-sm font-semibold text-indigo-600 transition duration-200">
              Name:{' '}
              <span className="font-normal text-black ms-1">
                {userData.name}
              </span>
            </p>
            <p className="text-sm font-semibold text-indigo-600 transition duration-200">
              Email:{' '}
              <span className="font-normal text-black ms-1">
                {userData.email}
              </span>
            </p>
          </div>
          <div className="w-full border border-gray-100 bg-gray-50 rounded-lg p-4 mt-4">
            <h3 className="mb-2 text-xl text-gray-700 font-semibold dark:text-gray-300">
              Account Activity
            </h3>
            <p className="text-sm font-semibold text-indigo-600 transition duration-200">
              Joined:{' '}
              <span className="font-normal text-black ms-1">
                {formatDate(userData.lastLogin)}
              </span>
            </p>
          </div>

          <button
            type="button"
            className="text-white w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 me-2 mb-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
