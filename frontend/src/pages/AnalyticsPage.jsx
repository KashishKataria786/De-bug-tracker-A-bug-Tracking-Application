import { useEffect, useState } from "react";
import BugProgressPieChart from "../components/charts/BugProgressPieChart.jsx";
import axios from "axios";
import Layout from "../components/Layout/Layout.jsx";
import BugProgressFunnelChart from "../components/charts/BugProgressFunnelChart.jsx";

const AnalyticsPage = () => {
  const [pieData, setPieData] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND;

  const fetchPieAnalytics = async () => {
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
    }
  };

  useEffect(() => {
    fetchPieAnalytics();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 ">Analytics</h1>
        <div className="grid grid-cols-2 ">
          <BugProgressFunnelChart chartData={pieData} />

          <BugProgressPieChart chartData={pieData} />
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
