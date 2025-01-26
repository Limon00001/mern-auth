/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/15/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const handleClick = () => {
    if (!userData) {
      navigate('/login');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto flex flex-col w-full max-w-7xl items-center justify-between px-8 py-6">
      <div className="relative transform rounded-full bg-gradient-to-br from-white via-blue-50 to-blue-100 p-10 shadow-sm transition-transform">
        <img src={assets.robot} alt="Robot" className="h-48 w-48" />
      </div>
      <h1 className="mt-10 flex items-center gap-2 text-xl font-medium mb-2 sm:text-2xl">
        {userData ? `Welcome, ${userData?.name}` : 'Hey, Anonymous'}!
        <img
          className="w-6 md:w-7 aspect-square"
          src={assets.hand_wave}
          alt=""
        />
      </h1>
      <h2 className="text-3xl text-center text-blue-900 font-semibold mb-4 md:text-4xl">
        Experience seamless, secure AI interactions today.
      </h2>
      <p className="mb-8 max-w-md text-center">
        Let&apos;s start with a quick walkthrough to get you up to speed!
      </p>
      <button
        className="border border-gray-500 rounded-full px-8 py-2.5 transition-all"
        onClick={handleClick}
      >
        {userData ? 'Go to Dashboard' : 'Get Started'}
      </button>
    </div>
  );
};

// Export
export default Hero;
