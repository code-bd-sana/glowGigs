"use client";

import OverviewCard from "../JobSeeker/OverviewCard";
import RecentApplications from "../JobSeeker/RecentApplications";
import { ApplicationChart } from "../JobSeeker/ApplicationChart";
import AdminCard from "./admin/AdminCard";
import AdminChart from "./admin/AdminChart";
import AdminPieChart from "./admin/AdminPieChart";
import React from "react";

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
      <AdminCard />
      {/*joy bangla  */}

      <div className="lg:flex mt-8 gap-8 overflow-hidden">
        <div className="lg:w-[40%]">
          <AdminPieChart />
        </div>
        <div className="flex-1">
          <AdminChart />
        </div>
      </div>
    </div>
  );
}
