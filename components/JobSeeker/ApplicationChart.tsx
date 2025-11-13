/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
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
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetApplicationsByApplicantQuery } from "@/features/jobAppliedSlice";

// Register Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ApplicationChart() {
  const { data: session } = useSession();
  const applicantId = session?.user?.id;

  const { data: applications = [], isLoading } =
    useGetApplicationsByApplicantQuery(
      applicantId ? applicantId : skipToken
    );

  // 🔥 PROCESS REAL DATA
  const { labels, dataValues, totalApplications, averageDaily, peakDay } =
    useMemo(() => {
      if (!applications.length) {
        return {
          labels: [],
          dataValues: [],
          totalApplications: 0,
          averageDaily: 0,
          peakDay: 0,
        };
      }

      // Group applications by date
      const dateCounts: Record<string, number> = {};

      applications.forEach((app: any) => {
        const date = new Date(app.applicationDate)
          .toISOString()
          .split("T")[0]; // YYYY-MM-DD
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      });

      // Sort dates (old → new)
      const dates = Object.keys(dateCounts).sort();

      return {
        labels: dates,
        dataValues: dates.map((d) => dateCounts[d]),
        totalApplications: applications.length,
        averageDaily: (applications.length / dates.length).toFixed(1),
        peakDay: Math.max(...Object.values(dateCounts)),
      };
    }, [applications]);

  // ⭐ Chart dataset
  const chartData = {
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

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: { grid: { display: true } },
      y: { ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="bg-white p-6 max-w-full rounded-lg shadow-md">
      <div className="mb-4">
        <div className="flex justify-between">
          <div>
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

        {/* Stats Section */}
        <div className="flex gap-6 mt-5">
          <div className="flex flex-col">
            <span className="text-[#6B7280]">Average Daily</span>
            <span className="text-xl font-bold">{averageDaily}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#6B7280]">Peak Day</span>
            <span className="text-xl font-bold text-green-600">{peakDay}</span>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <p className="text-center py-10 text-gray-500">Loading chart...</p>
      ) : labels.length > 0 ? (
        <Bar options={options} data={chartData} />
      ) : (
        <p className="text-center py-10 text-gray-500">
          No application data available.
        </p>
      )}
    </div>
  );
}
