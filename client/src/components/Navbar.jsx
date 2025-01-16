/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/15/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal Dependencies
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  // Configuration
  const navigate = useNavigate();

  // Context
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const handleLogout = async () => {
    try {
      // configures `Axios` to include credentials like cookies, authorization headers, or client certificates with requests.
      axios.defaults.withCredentials = true;

      // Send a POST request to the server to log out the user
      const response = await axios.post(`${backendUrl}/api/auth/logout`);
      response.data.success && setIsLoggedIn(false);
      response.data.success && setUserData(false);

      // Redirect the user to the home page
      navigate('/');
    } catch (error) {
      // Handle any errors that occur during the logout process
      toast.error(
        error.response?.data?.error?.message ||
          error.message ||
          'An error occured',
      );
    }
  };

  const handleVerification = async () => {
    try {
      // configures Axios to include credentials like cookies, authorization headers, or client certificates with requests.
      axios.defaults.withCredentials = true;

      // Send a POST request to the server for verification
      const response = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
      );

      // Check if the response is successful
      if (response.data.success) {
        navigate('/email-verify');
        toast.success(response?.data?.success);
      } else {
        toast.error(response?.data?.error?.message);
      }
    } catch (error) {
      // Handle any errors that occur during the verification process
      toast.error(
        error.response?.data?.error?.message ||
          error.message ||
          'An error occured',
      );
    }
  };

  return (
    <div className="w-full flex items-center justify-between p-4 sm:p-6 sm:px-24 absolute top-0">
      <div className="text-3xl font-extrabold text-blue-900">
        auto<span className="text-blue-500">Bot</span>
      </div>
      {userData ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-lg font-semibold shadow-lg relative group">
          {userData?.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-14">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData?.isAccountVerified && (
                <li
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleVerification}
                >
                  Verify Email
                </li>
              )}
              <li
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-8 py-2.5 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

// Export
export default Navbar;
