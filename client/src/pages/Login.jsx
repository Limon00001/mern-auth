// External Dependencies
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal Dependencies
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  // Input handler
  const handleChange = (e) => {
    let { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // configures `Axios` to include credentials like cookies, authorization headers, or client certificates with requests.
      axios.defaults.withCredentials = true;

      // Send a POST request to the server
      let response;
      if (state === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/auth/register`, input);
      } else {
        response = await axios.post(`${backendUrl}/api/auth/login`, input);
      }

      // Handle the response
      if (response?.data?.success) {
        setIsLoggedIn(true);

        // Get the user data
        getUserData();
        navigate('/');
      } else {
        // Error handling
        toast.error(
          response?.data?.error?.message || 'Please try again later.',
        );
      }
    } catch (error) {
      // Error handling
      toast.error(
        error.response?.data?.error?.message ||
          error.message ||
          'An error occured',
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-gradient-to-br from-white via-blue-50 to-blue-200 ">
      <div
        className="text-3xl font-extrabold text-blue-900 absolute top-7 left-10 cursor-pointer w-28 sm:w-32 sm:left-20"
        onClick={() => navigate('/')}
      >
        auto<span className="text-blue-500">Bot</span>
      </div>
      <div className="bg-slate-900 rounded-lg shadow-lg w-full max-w-md p-10 sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === 'Sign Up'
            ? 'Create your account'
            : 'Login to your account'}
        </p>
        <form onSubmit={handleSubmit}>
          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
              <img src={assets.person_icon} alt="" />
              <input
                className="bg-transparent outline-none"
                name="name"
                type="text"
                autoComplete="off"
                placeholder="Full Name"
                value={input.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Email Address"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 bg-[#333A5C] rounded-full">
            <img src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>

          <p
            className="mb-4 text-indigo-500 cursor-pointer"
            onClick={() => navigate('/reset-password')}
          >
            Forgot password?
          </p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="text-xs text-gray-400 text-center mt-4">
            Already have an account?
            <span
              onClick={() => setState('Login')}
              className="text-blue-400 cursor-pointer underline ms-1"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-400 text-center mt-4">
            Don&apos;t have an account?
            <span
              onClick={() => setState('Sign Up')}
              className="text-blue-400 cursor-pointer underline ms-1"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

// Export
export default Login;
