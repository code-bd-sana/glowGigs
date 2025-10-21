'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminChart() {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Applications',
        data: [400, 600, 750, 800, 900, 1050, 1200],
        backgroundColor: '#3B82F6', // Tailwind Blue-500
      },
    ],
  };
  // dekha jak ki hoi

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 300,
        },
      },
    },
  };

  return (
    <div className="bg-white flex-1 p-6 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Job Posting Trends</h2>
      <div className="flex gap-4 text-sm mb-2">
        <span className="cursor-pointer text-gray-400">Monthly View</span>
        <span className="cursor-pointer text-gray-400">Weekly View</span>
        <span className="cursor-pointer text-gray-400">Jobs Posted</span>
        <span className="cursor-pointer text-blue-500 font-bold border-b-2 border-blue-500">Applications</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}
