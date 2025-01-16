/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/16/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import axios from 'axios';
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal Dependencies
import { AppContext } from '../context/AppContext';

const EmailVerify = () => {
  const inputRefs = useRef([]);

  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

  const navigate = useNavigate();

  // configures `Axios` to include credentials like cookies, authorization headers, or client certificates with requests.
  axios.defaults.withCredentials = true;

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

  // Submits the form
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Collects the input values
      const otpArray = inputRefs.current.map((input) => input.value);
      const otp = otpArray.join('');

      // Sends the request
      const respose = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        {
          otp,
        },
      );

      // Handles the response
      if (respose.data.success) {
        toast.success(respose?.data?.message);
        getUserData();
        navigate('/');
      } else {
        // Error handling
        toast.error(respose?.data?.error?.message);
      }
    } catch (error) {
      // Error handling
      toast.error(error.response?.data?.error?.message);
    }
  };

  // Get the user data
  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedIn, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-200">
      <div
        className="text-3xl font-extrabold text-blue-900 absolute top-7 left-10 cursor-pointer w-28 sm:w-32 sm:left-20"
        onClick={() => navigate('/')}
      >
        auto<span className="text-blue-500">Bot</span>
      </div>
      <form
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verification
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
        <button className="w-full text-white py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-lg">
          Verify Email
        </button>
      </form>
    </div>
  );
};

// Export
export default EmailVerify;
