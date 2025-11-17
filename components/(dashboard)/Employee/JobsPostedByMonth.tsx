"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Job {
  createdAt: string;
}

interface Props {
  data: Job[];
}

const JobPostedByMonth: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Get year from the first job
  const year = new Date(data[0].createdAt).getFullYear();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const monthlyData = Array(12).fill(0);

  data.forEach((job) => {
    const monthIndex = new Date(job.createdAt).getMonth();
    monthlyData[monthIndex]++;
  });

  const chartData = monthNames.map((month, i) => ({
    month,
    jobs: monthlyData[i],
  }));

  return (
 <div className="bg-white p-6 pt-8 rounded-xl shadow w-full">
  <p className="text-2xl font-semibold mb-20">
    Jobs Posted in {year}
  </p>

  {/* 👇 Graph bottom e anar jonno */}
  <div className="flex h-[500px] items-center justify-center">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} domain={[0, "auto"]} />
        <Tooltip />
        <Bar dataKey="jobs" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

  );
};

export default JobPostedByMonth;
