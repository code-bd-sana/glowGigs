"use client";
import React from "react";
import OverviewCard from "../JobSeeker/OverviewCard";
import RecentApplications from "../JobSeeker/RecentApplications";
import { ApplicationChart } from "../JobSeeker/ApplicationChart";


export default function AdminDashboard() {

  return (
    <div>
      <OverviewCard></OverviewCard>
      <div className="flex gap-5 mt-10">
       <div className="flex-1">
         <RecentApplications></RecentApplications>
       </div>
      <div className="flex-1">
        <ApplicationChart></ApplicationChart>
      </div>
      </div>
    </div>
  );
}
