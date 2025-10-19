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
  const maxJobs = Math.max(...data.map(d => d.jobs));
  
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="font-bold mb-4">Jobs Posted by Week</h2>
      <div className="space-y-3">
        {data.map((d, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm">{d.week}</span>
            <div className="flex-1 h-4 bg-gray-200 rounded mx-2">
              <div
                className="h-4 bg-blue-600 rounded"
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
