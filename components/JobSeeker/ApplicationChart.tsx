import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Use your actual data here (replace this with your actual values)
const labels = [
  "Jan 1",
  "Jan 2",
  "Jan 3",
  "Jan 4",
  "Jan 5",
  "Jan 6",
  "Jan 7",
  "Jan 8",
  "Jan 9",
  "Jan 10",
  "Jan 11",
  "Jan 12",
  "Jan 13",
  "Jan 14",
  "Jan 15",
];

// Example data - replace this with actual application data
const dataValues = [3, 2, 3, 1, 4, 3, 2, 3, 4, 4, 2, 3, 2, 1, 4];

// Calculate Average Daily, Peak Day, and Total Applications
const totalApplications = dataValues.reduce((a, b) => a + b, 0);
const averageDaily = (totalApplications / dataValues.length).toFixed(1); // Rounded to one decimal
const peakDay = Math.max(...dataValues);

export const data = {
  labels,
  datasets: [
    {
      label: "Applications Submitted",
      data: dataValues,
      backgroundColor: "#E3E3BE",
      borderColor: "#D1D5DB",
      borderWidth: 1,
    },
  ],
};

// Customizing chart options
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          size: 12,
        },
        color: "#333",
      },
    },
    tooltip: {
      backgroundColor: "#333",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#D1D5DB",
      borderWidth: 1,
      caretSize: 6,
      padding: 10,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        borderColor: "#E5E7EB", 
        borderWidth: 0.5,
      },
      ticks: {
        color: "#6B7280", 
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: "#E5E7EB", 
        borderColor: "#E5E7EB",
        borderWidth: 0.5,
      },
      ticks: {
        color: "#6B7280", 
        font: {
          size: 12,
        },
        stepSize: 1,
      },
    },
  },
};

export function ApplicationChart() {
  return (
    <div className="bg-white p-6 max-w-full rounded-lg shadow-md">
      <div className="mb-4">
        <div className="flex justify-between">
          <div className="">
            <p className="text-lg font-semibold text-gray-900">
              Applications Over Time
            </p>
            <span className="text-[#6B7280]">Daily application activity</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold">{totalApplications}</span>
            <span className="text-[#6B7280]">Total Applications</span>
          </div>
        </div>
        {/* Display Average Daily, Peak Day, and Total Applications */}

        <div className="flex gap-3.5 mt-5">
          <div className="flex flex-col">
            <span className="text-[#6B7280]">Average Daily</span>
            <span className="text-xl font-bold">{averageDaily}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#6B7280]">Peak Day</span>
            <span className="text-xl text-[#16A34A] font-bold">{peakDay}</span>
          </div>
        </div>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}
