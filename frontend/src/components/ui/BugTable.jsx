import { lazy, Suspense, useState } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

const AnimatedModal = lazy(() => import("./AnimatedModal.jsx"));
const UpdateBugComponent = lazy(() => import("./UpdateBugComponent.jsx"));
const DeleteBug = lazy(() => import("./DeleteBug.jsx"));
const BugDetails = lazy(() => import("./BugDetails.jsx"));
const BugHistory = lazy(() => import("./BugHistory.jsx"));

const severityStyles = {
  Critical: "bg-red-50 text-red-700 ring-red-600",
  High: "bg-orange-50 text-orange-700 ring-orange-600",
  Medium: "bg-yellow-50 text-yellow-700 ring-yellow-600",
  Low: "bg-blue-50 text-blue-700 ring-blue-600",
  Trivial: "bg-gray-50 text-gray-700 ring-gray-600",
};

const progressStyles = {
  "Not Started": "bg-gray-50 text-gray-700 ring-gray-600",
  "In Development": "bg-blue-50 text-blue-700 ring-blue-600",
  "In Code Review": "bg-indigo-50 text-indigo-700 ring-indigo-600",
  "In QA": "bg-purple-50 text-purple-700 ring-purple-600",
  "Ready for Release": "bg-green-50 text-green-700 ring-green-600",
  Live: "bg-emerald-50 text-emerald-700 ring-emerald-600",
};

const BugTable = ({ bugs = [], fetchData }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [selectedBug, setSelectedBug] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  if (bugs.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-12 text-center text-sm text-gray-500">
        No bugs reported or found yet.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              <th className="px-6 py-4 text-left">Bug</th>
              <th className="px-6 py-4 text-left">Severity</th>
              <th className="px-6 py-4 text-left">Progress</th>
              <th className="px-6 py-4 text-left">Reporter</th>
              <th className="px-6 py-4 text-left">Est. Time</th>
              <th className="px-6 py-4 text-left">Reported</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bugs.map((bug) => (
              <tr
                key={bug._id}
                onClick={() => {
                  setSelectedBug(bug);
                  setOpenDetailModal(true);
                }}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{bug.title}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    #{bug._id.slice(-6)}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ring-1 ${severityStyles[bug.severity]
                      }`}
                  >
                    {bug.severity}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-medium ring-1 ${progressStyles[bug.progress]
                      }`}
                  >
                    {bug.progress}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {bug.reporterName}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {bug.estimatedFixTimeHours}h
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(bug.dateReported).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBug(bug);
                        setDataToUpdate(bug);
                        setOpenUpdateModal(true);
                      }}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBug(bug);
                        setIdToDelete(bug._id);
                        setOpenDeleteModal(true);
                      }}
                      className="text-sm font-medium text-red-600 hover:text-red-500 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE MODAL */}
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-black/30">
            <LoadingSpinner />
          </div>
        }
      >
        {openUpdateModal && (
          <AnimatedModal
            isOpen={openUpdateModal}
            onClose={() => setOpenUpdateModal(false)}
            title="Update Bug Progress"
          >
            <UpdateBugComponent
              data={dataToUpdate}
              onUpdated={() => {
                setOpenUpdateModal(false);
                fetchData();
              }}
            />
          </AnimatedModal>
        )}
      </Suspense>

      {/* DELETE MODAL */}
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-black/30">
            <LoadingSpinner />
          </div>
        }
      >
        {openDeleteModal && (
          <AnimatedModal
            isOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            title="Delete Bug"
          >
            <DeleteBug
              id={idToDelete}
              onDeleted={() => {
                setOpenDeleteModal(false);
                fetchData();
              }}
              onClose={() => setOpenDeleteModal(false)}
            />
          </AnimatedModal>
        )}
      </Suspense>

      {/* DETAILS + HISTORY MODAL */}
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-black/30">
            <LoadingSpinner />
          </div>
        }
      >
        {openDetailModal && (
          <AnimatedModal
            isOpen={openDetailModal}
            onClose={() => setOpenDetailModal(false)}
            title="Bug Details & History"
            width="max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-2">
              <BugDetails data={selectedBug} />
              <BugHistory data={selectedBug?.statusHistory || []} />
            </div>
          </AnimatedModal>
        )}
      </Suspense>
    </>
  );
};

export default BugTable;
