import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#94a3b8",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#22c55e",
  "#10b981",
];

const BugProgressFunnelChart = ({chartData }) => {

  if(chartData&&chartData.length===0)return  <h1>No data To showcase</h1>

  return (
    <div className="bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Bug Flow Funnel
      </h2>

      <ResponsiveContainer width="100%" height={360}>
        <FunnelChart>
          <Tooltip />
          <Funnel dataKey="value" data={chartData}>
            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <LabelList
              position="right"
              dataKey="name"
              fill="#374151"
            />
            <LabelList
              position="inside"
              dataKey="value"
              fill="#ffffff"
              fontSize={22}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BugProgressFunnelChart;
