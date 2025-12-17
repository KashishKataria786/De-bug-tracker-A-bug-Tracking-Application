import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const COLORS = [
  "#94a3b8", // Not Started
  "#3b82f6", // In Development
  "#6366f1", // Code Review
  "#a855f7", // QA
  "#10b981", // Live
];

const BugProgressPieChart = ({chartData}) => {
   

  return (
    <div className="  bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Bug Distribution by Progress
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={100}
            paddingAngle={2}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BugProgressPieChart;
