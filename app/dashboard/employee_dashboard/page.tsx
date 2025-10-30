// app/dashboard/page.tsx or pages/dashboard.tsx
import Card from "@/components/(dashboard)/Employee/Card";
import LatestApplications from "@/components/(dashboard)/Employee/LatestApplication";
import JobsPostedByWeek from "@/components/(dashboard)/Employee/JobsPostedByWeek";
import { FaUser, FaBriefcase } from "react-icons/fa";
import { Applicant } from "@/types/applicationTypes";
import { HiOutlineUsers } from "react-icons/hi";
import { MdWorkspacePremium } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";

const applicants: Applicant[] = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    status: "New",
    time: "2 hours ago",
  },
  {
    name: "Michael Chen",
    role: "UX Designer",
    status: "Reviewed",
    time: "4 hours ago",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    status: "Shortlisted",
    time: "6 hours ago",
  },
  {
    name: "David Wilson",
    role: "Backend Developer",
    status: "New",
    time: "1 day ago",
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Specialist",
    status: "Reviewed",
    time: "2 days ago",
  },
];

const jobsData = [
  { week: "Week 1", jobs: 3 },
  { week: "Week 2", jobs: 5 },
  { week: "Week 3", jobs: 2 },
  { week: "Week 4", jobs: 8 },
  { week: "Week 5", jobs: 6 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Jobs Posted" value={24} icon={<FaBriefcase />} />
        <Card title="Active Jobs" value={18} icon={<IoBagCheckOutline />} />
        <Card title="Total Applicants" value={156} icon={<HiOutlineUsers />} />
        <Card
          title="Membership Status"
          value="Premium"
          icon={<MdWorkspacePremium />}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* <LatestApplications  /> */}
        <JobsPostedByWeek data={jobsData} />
      </div>
    </div>
  );
}
