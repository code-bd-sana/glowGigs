// app/dashboard/page.tsx or pages/dashboard.tsx
import Card from "@/components/(dashboard)/Employee/Card";
import LatestApplications from "@/components/(dashboard)/Employee/LatestApplication";
import JobsPostedByWeek from "@/components/(dashboard)/Employee/JobsPostedByWeek";
import { FaUser, FaBriefcase } from "react-icons/fa";

import { HiOutlineUsers } from "react-icons/hi";
import { MdWorkspacePremium } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGetJobsByPosterQuery, useGetJobsQuery } from "@/features/JobSlice";
import {
  useGetAllUsersQuery,
  useGetUserRoleCountQuery,
} from "@/features/UserApi";


const jobsData = [
  { week: "Week 1", jobs: 3 },
  { week: "Week 2", jobs: 5 },
  { week: "Week 3", jobs: 2 },
  { week: "Week 4", jobs: 8 },
  { week: "Week 5", jobs: 6 },
];

export default function EmployeeDashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      console.log("Logged-in User ID:", session.user.id);
      console.log("Role:", session.user.role);
      console.log("Email:", session.user.email);
    }
  }, [session, status]);

  const posterId = session?.user?.id;
  const {
    data: jobs,
    isLoading,
    error,
  } = useGetJobsByPosterQuery(posterId ?? "", {
    skip: !posterId,
  });
  console.log(jobs?.total);
  console.log(jobs?.total);

  const { data: allJobs } = useGetJobsQuery();
  console.log(allJobs?.total);

  const { data: userByRole } = useGetUserRoleCountQuery();
  console.log(userByRole?.roles?.SEEKER);
  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Jobs Posted"
          value={jobs?.total || 0}
          icon={<FaBriefcase />}
        />
        <Card
          title="Active Jobs"
          value={allJobs?.total || 0}
          icon={<IoBagCheckOutline />}
        />
        <Card
          title="Total Applicants"
          value={userByRole?.roles?.SEEKER || 0}
          icon={<HiOutlineUsers />}
        />
        <Card
          title="Membership Status"
          value="Premium"
          icon={<MdWorkspacePremium />}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <LatestApplications />
        <JobsPostedByWeek data={jobsData} />
      </div>
    </div>
  );
}
