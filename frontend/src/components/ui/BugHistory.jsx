
const BugHistory = ({ data = [] }) => {
  const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // sort oldest → newest (optional if already sorted)
  const sorted = [...data].sort(
    (a, b) => new Date(a.changedAt) - new Date(b.changedAt)
  );

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3">Bug History</h3>

      <ul className="relative border-l border-gray-300">
        {sorted.map((item, idx) => (
          <li key={idx} className="mb-6 ml-4">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -left-1.5 border border-white"></div>

            <time className="text-xs text-gray-500">
              {formatDate(item.changedAt)}
            </time>

            <p className="text-sm font-medium text-gray-900">
              Stage changed to:{" "}
              <span className="font-semibold">{item.stage}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugHistory;
