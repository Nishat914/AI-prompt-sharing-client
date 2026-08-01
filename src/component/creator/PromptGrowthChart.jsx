"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const PromptGrowthChart = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-[#3D2C24] mb-6">
        Prompt Growth
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="prompts"
            stroke="#C9873F"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PromptGrowthChart;