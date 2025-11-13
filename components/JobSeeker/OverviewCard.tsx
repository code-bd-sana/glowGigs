/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetApplicationsByApplicantQuery } from "@/features/jobAppliedSlice";

const StatsCard = ({
  label,
  value,
  percentage,
  imgSrc,
}: {
  label: string;
  value: number;
  percentage: number | null;
  imgSrc: string;
}) => {
  return (
    <div className="flex flex-1 justify-between bg-white p-6 h-[134px] rounded-[8px] shadow-sm">
      <div>
        <div className="text-gray-600 text-sm">{label}</div>
        <div className="text-2xl mt-1 font-semibold text-black">{value}</div>

        {percentage === null ? (
          <div className="text-sm mt-1 text-gray-400">No previous data</div>
        ) : (
          <div
            className={`text-sm mt-1 ${
              percentage >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentage >= 0 ? `+${percentage}%` : `${percentage}%`} vs last
            period
          </div>
        )}
      </div>

      <div>
        <Image src={imgSrc} alt={label} width={36} height={36} />
      </div>
    </div>
  );
};

const OverviewCard = () => {
  const { data: session } = useSession();
  const applicantId = session?.user?.id;

  const { data: applications = [] } =
    useGetApplicationsByApplicantQuery(
      applicantId ? applicantId : skipToken
    );

  // 🧠 HELPER FUNCTION: calculate percentage change
  function calculatePercentage(current: number, previous: number) {
    if (previous === 0) return null; // No previous data
    return Math.round(((current - previous) / previous) * 100);
  }

  // 🧠 PROCESS REAL DATA (7-day analytics)
  const stats = useMemo(() => {
    const now = new Date();

    const isInLast7 = (dateStr: string) => {
      const date = new Date(dateStr);
      const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    };

    const isInPrevious7 = (dateStr: string) => {
      const date = new Date(dateStr);
      const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      return diff > 7 && diff <= 14;
    };

    // Filter sets
    const current7 = applications.filter((app: any) =>
      isInLast7(app.applicationDate)
    );

    const previous7 = applications.filter((app: any) =>
      isInPrevious7(app.applicationDate)
    );

    // COUNT current & previous period
    const count = (arr: any[], statuses: string[]) =>
      arr.filter((a) => statuses.includes(a.status)).length;

    const totalCurrent = current7.length;
    const totalPrev = previous7.length;

    const activeCurrent = count(current7, [
      "Applied",
      "Under Review",
      "Shortlisted",
      "Interview",
      "Interview Scheduled",
    ]);
    const activePrev = count(previous7, [
      "Applied",
      "Under Review",
      "Shortlisted",
      "Interview",
      "Interview Scheduled",
    ]);

    const shortlistedCurrent = count(current7, ["Shortlisted"]);
    const shortlistedPrev = count(previous7, ["Shortlisted"]);

    const interviewCurrent = count(current7, [
      "Interview",
      "Interview Scheduled",
    ]);
    const interviewPrev = count(previous7, [
      "Interview",
      "Interview Scheduled",
    ]);

    return {
      total: {
        value: totalCurrent,
        percentage: calculatePercentage(totalCurrent, totalPrev),
      },
      active: {
        value: activeCurrent,
        percentage: calculatePercentage(activeCurrent, activePrev),
      },
      shortlisted: {
        value: shortlistedCurrent,
        percentage: calculatePercentage(
          shortlistedCurrent,
          shortlistedPrev
        ),
      },
      interview: {
        value: interviewCurrent,
        percentage: calculatePercentage(interviewCurrent, interviewPrev),
      },
    };
  }, [applications]);

  return (
    <div className="flex space-x-6 justify-evenly mt-8">
      <StatsCard
        label="Total Applications"
        value={stats.total.value}
        percentage={stats.total.percentage}
        imgSrc="/jobSeeker/Container.png"
      />

      <StatsCard
        label="Active Applications"
        value={stats.active.value}
        percentage={stats.active.percentage}
        imgSrc="/jobSeeker/Container2.png"
      />

      <StatsCard
        label="Shortlisted Applications"
        value={stats.shortlisted.value}
        percentage={stats.shortlisted.percentage}
        imgSrc="/jobSeeker/Container3.png"
      />

     
    </div>
  );
};

export default OverviewCard;
