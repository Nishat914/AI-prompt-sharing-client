"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CopiesChart = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-[#3D2C24] mb-6">
        Total Copies by Prompt
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="copies"
            fill="#C9873F"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CopiesChart;