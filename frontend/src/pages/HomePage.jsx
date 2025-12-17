import { motion } from "framer-motion";
import Layout from "../components/Layout/Layout";
import {Link} from 'react-router-dom'
export default function HomePage() {
  return (
    <Layout>
    <section className="h-[90vh] w-screen flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl text-center"
      >
        <span className="inline-block mb-4 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
          Built for Software Engineers
        </span>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
          ABugTracker
        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          A clean and intuitive bug tracking system that helps engineering teams
          log issues, track progress, and deliver reliable software faster.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to='/dashboard' className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition shadow-sm">
            View Bugs
          </Link>
          
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Feature label="Severity Tracking" />
          <Feature label="Progress Analytics" />
          <Feature label="Smart Filters" />
          <Feature label="Built for Teams" />
        </div>
      </motion.div>
    </section>
    </Layout>
  );
}

function Feature({ label }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-600 hover:shadow-md transition">
      {label}
    </div>
  );
}
