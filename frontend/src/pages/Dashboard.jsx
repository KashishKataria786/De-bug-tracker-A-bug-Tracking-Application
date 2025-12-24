import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import BugTable from "../components/ui/BugTable.jsx";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import severityLevels from "../utils/SeverityLevels.js";
import progressStages from "../utils/ProgressLevels.js";
import axios from "axios";

const AnimatedModal = lazy(() => import("../components/ui/AnimatedModal.jsx"));
const CreateBugComponent = lazy(() =>
  import("../components/ui/CreateBugComponent.jsx")
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [openCreateBugModal, setOpenCreateBugModal] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND;

  const [selectedSeverities, setSelectedSeverities] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState([]);
  const [selectedReporter, setSelectedReporter] = useState("");
  const [dateRange, setDateRange] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedSeverities.length > 0) {
        params.append("severity", selectedSeverities.join(","));
      }
      if (selectedProgress.length > 0) {
        params.append("progress", selectedProgress.join(","));
      }
      if (selectedReporter) {
        params.append("reporter", selectedReporter);
      }

      const bugs = await axios.get(`${BASE_URL}/get-bugs?${params.toString()}`);
      console.log(bugs);
      setData(bugs?.data?.data);
    } catch (error) {
      toast.error("Not able to Get Data");

      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedProgress, selectedReporter, selectedSeverities]);

  const uniqueReporters = useMemo(() => {
    return [...new Set(data.map((bug) => bug.reporterName))];
  }, [data]);

  const isWithinDateRange = (date) => {
    if (dateRange === "all") return true;

    const now = new Date();
    const reportedDate = new Date(date);
    const diffDays =
      (now.getTime() - reportedDate.getTime()) / (1000 * 60 * 60 * 24);

    if (dateRange === "week") return diffDays <= 7;
    if (dateRange === "twoWeeks") return diffDays <= 14;
    if (dateRange === "month") return diffDays <= 30;

    return true;
  };

  const filteredBugs = useMemo(() => {
    return data.filter((bug) => {
      const severityMatch =
        selectedSeverities.length === 0 ||
        selectedSeverities.includes(bug.severity);

      const progressMatch =
        selectedProgress.length === 0 ||
        selectedProgress.includes(bug.progress);

      const reporterMatch =
        !selectedReporter || bug.reporterName === selectedReporter;

      const dateMatch = isWithinDateRange(bug.dateReported);

      return severityMatch && progressMatch && reporterMatch && dateMatch;
    });
  }, [data, selectedSeverities, selectedProgress, selectedReporter, dateRange]);

  const preloadCreateBug = () => {
    import("../components/ui/AnimatedModal.jsx");
    import("../components/ui/CreateBugComponent.jsx");
  };

  return (
    <>
      <Layout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>

            <button
              onMouseEnter={preloadCreateBug}
              onClick={() => setOpenCreateBugModal(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
            >
              Report a Bug
            </button>
          </div>

          {/* Filters */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Severity */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Severity
                </p>
                <div className="space-x-2 flex flex-wrap">
                  {severityLevels.map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedSeverities.includes(level)}
                        onChange={() =>
                          setSelectedSeverities((prev) =>
                            prev.includes(level)
                              ? prev.filter((s) => s !== level)
                              : [...prev, level]
                          )
                        }
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Progress
                </p>
                <div className="space-x-2 flex flex-wrap">
                  {progressStages.map((stage) => (
                    <label
                      key={stage}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedProgress.includes(stage)}
                        onChange={() =>
                          setSelectedProgress((prev) =>
                            prev.includes(stage)
                              ? prev.filter((p) => p !== stage)
                              : [...prev, stage]
                          )
                        }
                      />
                      {stage}
                    </label>
                  ))}
                </div>
              </div>

              {/* Reporter */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Reporter
                </p>
                <select
                  value={selectedReporter}
                  onChange={(e) => setSelectedReporter(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Reporters</option>
                  {uniqueReporters.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Date Reported
                </p>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="week">Past Week</option>
                  <option value="twoWeeks">Last 2 Weeks</option>
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <BugTable bugs={filteredBugs} fetchData={fetchData} />
          </div>
        </div>
      </Layout>

      {/* Create Bug Modal */}
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-black/30">
            <LoadingSpinner />
          </div>
        }
      >
        {openCreateBugModal && (
          <AnimatedModal
            isOpen={openCreateBugModal}
            onClose={() => setOpenCreateBugModal(false)}
            title="Create a New Bug"
          >
            <CreateBugComponent
              isCreated={() => {
                setOpenCreateBugModal(false);
                fetchData();
              }}
            />
          </AnimatedModal>
        )}
      </Suspense>
    </>
  );
};

export default Dashboard;
