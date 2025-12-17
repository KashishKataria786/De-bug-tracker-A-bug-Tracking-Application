import {useState} from 'react'
import AnimatedModal from "./AnimatedModal";
import UpdateBugComponent from "./UpdateBugComponent.jsx";
import DeleteBug from "./DeleteBug.jsx";

const severityStyles = {
  Critical: "bg-red-50 text-red-700 ring-red-600 ",
  High: "bg-orange-50 text-orange-700 ring-orange-600",
  Medium: "bg-yellow-50 text-yellow-700 ring-yellow-600",
  Low: "bg-blue-50 text-blue-700 ring-blue-600",
  Trivial: "bg-gray-50 text-gray-700 ring-gray-600",
};
const borderStyle = {
  Critical: "bg-red-50 text-red-700 ring-red-600 ",
  High: "bg-orange-50 text-orange-700 ring-orange-600",
  Medium: "bg-yellow-50 text-yellow-700 ring-yellow-600",
  Low: "bg-blue-50 text-blue-700 ring-blue-600",
  Trivial: "bg-gray-50 text-gray-700 ring-gray-600",
}
const progressStyles = {
  "Not Started": "bg-gray-50 text-gray-700 ring-gray-600",
  "In Development": "bg-blue-50 text-blue-700 ring-blue-600",
  "In Code Review": "bg-indigo-50 text-indigo-700 ring-indigo-600",
  "In QA": "bg-purple-50 text-purple-700 ring-purple-600",
  "Ready for Release": "bg-green-50 text-green-700 ring-green-600",
  "Live": "bg-emerald-50 text-emerald-700 ring-emerald-600",
};

const BugTable = ({ bugs = [] ,fetchData}) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBug, setSelectedBug] = useState(null);
  const [idToDelete, setIdToDelete]= useState(null);
  const [dataToUpdate, setDataToUpdate]=useState(null);

  if (bugs.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-12 text-center text-sm text-gray-500">
        No bugs reported or Found yet.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white overflow-hidden">
        <table className="min-w-full">
          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-600 ">
              <th className="px-6 py-4 text-left">Bug</th>
              <th className="px-6 py-4 text-left">Severity</th>
              <th className="px-6 py-4 text-left">Progress</th>
              <th className="px-6 py-4 text-left">Reporter</th>
              <th className="px-6 py-4 text-left">Est. Time</th>
              <th className="px-6 py-4 text-left">Reported</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {bugs.map((bug) => (
              <tr
                key={bug._id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Title */}
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {bug.title}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    #{bug._id.slice(-6)}
                  </div>
                </td>

                {/* Severity */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ring-1 ${severityStyles[bug.severity]}`}
                  >
                    {bug.severity}
                  </span>
                </td>

                {/* Progress */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ring-1 ${progressStyles[bug.progress]}`}
                  >
                    {bug.progress}
                  </span>
                </td>

                {/* Reporter */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {bug.reporterName}
                </td>

                {/* Estimate */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {bug.estimatedFixTimeHours}h
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(bug.dateReported).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                 <div className=" flex gap-2">
                   <button
                    onClick={() => {
                      setSelectedBug(bug);
                      setOpenUpdateModal(true);
                      setDataToUpdate(bug)
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition"
                  >
                    Update
                  </button>
                   <button
                    onClick={() => {
                      setSelectedBug(bug);
                      setOpenDeleteModal(true);
                      setIdToDelete(bug?._id)
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

      {/* Update Modal */}
      <AnimatedModal
        isOpen={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        title="Update Bug Progress"

      >
        <UpdateBugComponent data={dataToUpdate} onUpdated={()=>{setOpenUpdateModal(false); fetchData()}}/>

      </AnimatedModal>
      <AnimatedModal isOpen={openDeleteModal} onClose={()=>setOpenDeleteModal(false)} title={"Delete Bug"}>
        <DeleteBug id={idToDelete}  onDeleted={()=>{setOpenDeleteModal(false) ;fetchData()}} onClose={()=>setOpenDeleteModal(false)} />
      </AnimatedModal>
    </>
  );
};

export default BugTable;
