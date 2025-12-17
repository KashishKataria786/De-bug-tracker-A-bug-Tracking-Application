import { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";

const BugProgressFunnelChart = lazy(() =>
  import("../components/charts/BugProgressFunnelChart.jsx")
);
const BugProgressPieChart = lazy(() =>
  import("../components/charts/BugProgressPieChart.jsx")
);

const AnalyticsPage = () => {
  const [pieData, setPieData] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND;
  const [loading, setLoading] = useState(true);

  const fetchPieAnalytics = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/pie-chart-analytics`);
      const { labels, data } = res.data.data;

      const formatted = labels.map((label, index) => ({
        name: label,
        value: data[index],
      }));

      setPieData(formatted);
    } catch (error) {
      console.error("Pie chart error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPieAnalytics();
  }, []);

  if (loading)
    return (
      <Layout className="w-screen  h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </Layout>
    );

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-black/30">
            <LoadingSpinner />
          </div>
        }
      >
        <div className="p-6">
          <h1 className="text-xl font-semibold text-gray-900 ">Analytics</h1>
          <div className="grid grid-cols-2 ">
            <BugProgressFunnelChart chartData={pieData} />
            <BugProgressPieChart chartData={pieData} />
          </div>
        </div>
      </Suspense>
    </Layout>
  );
};

export default AnalyticsPage;
