/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('../assets/bg_img.png')] bg-cover bg-center">
        <Navbar />
        <Hero />
      </div>
    </>
  );
};

// Export
export default Home;
