'use client'
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminPieChart() {
  const data = {
    labels: ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales', 'Design', 'Others'],
    datasets: [
      {
        data: [23, 18, 15, 12, 9, 8, 8, 9],
        backgroundColor: [
          '#6366F1', // Technology (Indigo-500)
          '#10B981', // Healthcare (Green-500)
          '#F59E0B', // Finance (Amber-500)
          '#EF4444', // Education (Red-500)
          '#8B5CF6', // Marketing (Purple-500)
          '#06B6D4', // Sales (Cyan-500)
          '#EC4899', // Design (Pink-500)
          '#6B7280', // Others (Gray-500)
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '60%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="bg-white  p-6 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Most Popular Categories</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}
