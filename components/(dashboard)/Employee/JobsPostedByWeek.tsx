// components/JobsPostedByWeek.tsx
import React from "react";

interface WeekData {
  week: string;
  jobs: number;
}

interface JobsPostedByWeekProps {
  data: WeekData[];
}

const JobsPostedByWeek: React.FC<JobsPostedByWeekProps> = ({ data }) => {
  const maxJobs = Math.max(...data.map((d) => d.jobs));

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <p className="font-bold my-4 mb-10">Jobs Posted by Week</p>
      <div className="space-y-6">
        {data.map((d, index) => (
          <div key={index} className="flex items-center justify-between gap-6">
            <span className="text-sm text-gray-500">{d.week}</span>
            <div className="flex-1 h-3 bg-gray-200 rounded mx-2">
              <div
                className="h-3 bg-[#2563eb] rounded-full"
                style={{ width: `${(d.jobs / maxJobs) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm">{d.jobs}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPostedByWeek;
