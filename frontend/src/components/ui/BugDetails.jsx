const BugDetails = ({ data }) => {
  if (!data) return <p>No bug data found.</p>;

  const {
    title,
    severity,
    progress,
    reporterName,
    estimatedFixTimeHours,
    dateReported,
    statusHistory = []
  } = data;

  return (
    <div style={{ padding: "16px" }}>
      <h2>🐞 {title}</h2>
      <p><strong>Severity:</strong> {severity}</p>
      <p><strong>Current Stage:</strong> {progress}</p>
      <p><strong>Reported By:</strong> {reporterName}</p>
      <p><strong>Estimated Fix Time:</strong> {estimatedFixTimeHours} hrs</p>
      <p><strong>Date Reported:</strong> {new Date(dateReported).toLocaleString()}</p>

    </div>
  );
};

export default BugDetails;
