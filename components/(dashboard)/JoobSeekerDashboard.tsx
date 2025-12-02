import React from "react";
import OverviewCard from "../JobSeeker/OverviewCard";
import RecentApplications from "../JobSeeker/RecentApplications";
import { ApplicationChart } from "../JobSeeker/ApplicationChart";

export default function JoobSeekerDashboard() {
  return (
    <div>
      <OverviewCard></OverviewCard>
      <div className="2xl:flex gap-5 mt-10">
        <div className="2xl:max-w-[50%]">
          <RecentApplications></RecentApplications>
        </div>
        <div className="flex-1 2xl:max-w-[50%] overflow-x-scroll">
          <ApplicationChart></ApplicationChart>
        </div>
      </div>
    </div>
  );
}
