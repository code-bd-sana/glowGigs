import { NextRequest, NextResponse } from "next/server";
import Job from "../../jobs/job.model";

export const GET = async (req: NextRequest) => {
  try {
    const allJobs = await Job.find();

    // Map করে সব department নাম আনলাম
    const allDepartments = allJobs.map(job => job.department);

    // Unique department list
    const uniqueDepartments = [...new Set(allDepartments)];

    // প্রতিটা department এর count
    const departmentCounts = uniqueDepartments.map(dep =>
      allDepartments.filter(d => d === dep).length
    );

    return NextResponse.json(
      {
        message: "Success",
        departments: uniqueDepartments,
        counts: departmentCounts,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error,
      },
      { status: 500 }
    );
  }
};
