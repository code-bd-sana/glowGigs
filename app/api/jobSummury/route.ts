import { NextRequest, NextResponse } from "next/server";
import Job from "../jobs/job.model";

export const GET = async(req:NextRequest)=>{
    try {

        const totalJob = await Job.countDocuments();
const result = await Job.aggregate([
  {
    $project: {
      applicantCount: {
        $size: { $ifNull: ["$applicants", []] }
      }
    }
  },
  {
    $group: {
      _id: null,
      totalApplicants: { $sum: "$applicantCount" }
    }
  }
]);

const totalApplicant = result[0]?.totalApplicants || 0;

const totalActiveJob = await Job.countDocuments({status:"active"});
const totalInactiveJob = await Job.countDocuments({status:"inactive"});

const summury = {
    totalJob,
    totalApplicant,
    totalActiveJob,
    totalInactiveJob
}

return NextResponse.json({
    message:'Success',
    data:summury

})

        
    } catch (error) {
        return NextResponse.json({
            message:'Something went wrong!',
            error
        })
    }
}