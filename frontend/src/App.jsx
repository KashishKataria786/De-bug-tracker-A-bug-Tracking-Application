import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/ui/LoadingSpinner.jsx";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
