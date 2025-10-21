import React from "react";
import Image from "next/image";

const StatsCard = ({
  label,
  value,
  percentage,
  imgSrc,
}: {
  label: string;
  value: number;
  percentage: number;
  imgSrc: string;
}) => {
  return (
    <div className=" flex flex-1 justify-between bg-white p-6 h-[134px] rounded-[8px] shadow-sm">
      <div>
        <div className="text-gray-600 text-sm">{label}</div>
        <div className="text-2xl mt-1 font-semibold text-black">{value}</div>
        <div
          className={`text-sm mt-1 ${
            percentage >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {percentage >= 0 ? `+${percentage}%` : `${percentage}%`} vs last
          period
        </div>
      </div>
      <div>
        <Image src={imgSrc} alt={label} width={36} height={36} />
      </div>
    </div>
  );
};

const OverviewCard = () => {
  return (
    <div className="flex space-x-6 justify-evenly mt-8">
      {" "}
      {/* Spacing adjusted for alignment */}
      <StatsCard
        label="Total Applications"
        value={47}
        percentage={12}
        imgSrc="/jobSeeker/Container.png"
      />
      <StatsCard
        label="Active Applications"
        value={23}
        percentage={5}
        imgSrc="/jobSeeker/Container2.png"
      />
      <StatsCard
        label="Shortlisted Applications"
        value={8}
        percentage={3}
        imgSrc="/jobSeeker/Container3.png"
      />
      <StatsCard
        label="Interview Scheduled"
        value={3}
        percentage={2}
        imgSrc="/jobSeeker/Container4.png"
      />
    </div>
  );
};

export default OverviewCard;
