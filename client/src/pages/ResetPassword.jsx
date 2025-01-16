/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/16/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal Dependencies
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const ResetPassword = () => {
  const [input, setInput] = useState({
    email: '',
    newPassword: '',
  });
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  // Cookies
  // configures `Axios` to include credentials like cookies, authorization headers, or client certificates with requests.
  axios.defaults.withCredentials = true;

  // Input handler
  const handleChange = (e) => {
    let { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Sets the focus on the next input element
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // sets the focus on the previous input element
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // pastes the copied text from the clipboard
  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    const pasteArray = pastedText.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // Form submit handler
  const handleSubmitEmail = async (e) => {
    try {
      e.preventDefault();

      // Request to the server
      const response = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        input,
      );

      // Check if the request is unsuccessful
      if (!response.data.success) {
        toast.error(response?.data?.error?.message);
      }

      // Show success message if successful
      toast.success(response?.data?.message);
      setIsEmailSent(true);
    } catch (error) {
      // Error handling
      toast.error(error.response?.data?.error?.message);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      // Collects the input values
      const otpArray = inputRefs.current.map((input) => input.value);

      // input values to string
      setOtp(otpArray.join(''));
      setIsOtpSubmitted(true);
    } catch (error) {
      // Error handling
      toast.error(error.response?.data?.error?.message);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      // Request to the server
      const response = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          otp,
          email: input.email,
          newPassword: input.newPassword,
        },
      );

      // Check if the request is unsuccessful
      if (!response.data.success) {
        toast.error(response?.data?.error?.message);
      }

      // Show success message if successful
      toast.success(response?.data?.message);
      navigate('/login');
    } catch (error) {
      // Error handling
      toast.error(error.response?.data?.error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-200">
      <div
        className="text-3xl font-extrabold text-blue-900 absolute top-10 left-10 cursor-pointer w-28 sm:w-32 sm:left-20"
        onClick={() => navigate('/')}
      >
        auto<span className="text-blue-500">Bot</span>
      </div>

      {!isEmailSent && (
        // Email form
        <form
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          onSubmit={handleSubmitEmail}
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your email address to reset your password.
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img className="w-3 h-3" src={assets.mail_icon} alt="" />
            <input
              type="email"
              className="bg-transparent outline-none text-white"
              name="email"
              placeholder="Email Address"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white mt-3 rounded-xl">
            Submit
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmitted && (
        // OTP form
        <form
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          onSubmit={handleSubmitOtp}
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit OTP sent to your email.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {/* To create an array of 6 elements, which are then mapped to individual input fields. */}
            {Array(6)
              .fill(6)
              .map((_, index) => (
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type="text"
                  maxLength="1"
                  key={index}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  required
                />
              ))}
          </div>
          <button className="w-full text-white py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-lg">
            Submit
          </button>
        </form>
      )}

      {isOtpSubmitted && (
        // Password form
        <form
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          onSubmit={handleSubmitPassword}
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your new password.
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img className="w-3 h-3" src={assets.lock_icon} alt="" />
            <input
              type="password"
              className="bg-transparent outline-none text-white"
              name="newPassword"
              placeholder="Password"
              value={input.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white mt-3 rounded-xl">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

// Export
export default ResetPassword;
