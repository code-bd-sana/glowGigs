
import React from "react";

const statuses = [
  { count: 6, label: "All Status" },
  { count: 2, label: "Pending" },
  { count: 2, label: "Shortlisted" },
  { count: 1, label: "Interview" },
  { count: 1, label: "Rejected" },
];

export default function StatusCards() {
  return (
    <div className="flex gap-4 py-4">
      {statuses.map((item, index) => (
        <div
          key={index}
          className="flex flex-1 flex-col items-center justify-center w-[231.04px] h-[98.03px] bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          <span className="text-2xl font-semibold text-gray-900">
            {item.count}
          </span>
          <span className="text-sm text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
