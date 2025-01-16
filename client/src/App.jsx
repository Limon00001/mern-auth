/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Internal Dependencies
import EmailVerify from './pages/EmailVerify';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// Export
export default App;
