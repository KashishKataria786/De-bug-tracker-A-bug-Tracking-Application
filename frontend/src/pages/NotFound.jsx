import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" p-10 rounded-xl text-center max-w-md w-full"
      >
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 text-sm font-medium text-blue-600 hover:underline"
        >
          Go back to Home
        </Link>
      </motion.div>
    </div>
  );
}
