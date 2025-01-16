/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/16/2024
 * @copyright 2024 monayem_hossain_limon
 */

const NotFound = () => {
  return (
    <main className="flex items-center justify-center h-screen mx-auto px-6 bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-xl shadow-2xl rounded-2xl p-10 max-w-xl w-full transform transition">
        <h1 className="text-3xl font-semibold text-white text-center mb-3">
          404
        </h1>
        <p className="text-gray-300 text-center text-sm mb-6">
          Oops! The page you are looking for doesn&apos;t exist.
        </p>
        <p
          className="flex justify-center text-blue-400 text-center cursor-pointer underline"
          // redirect to the home page
          onClick={() => window.location.replace('/')}
        >
          Go Back Home
        </p>
      </div>
    </main>
  );
};

// Export
export default NotFound;
