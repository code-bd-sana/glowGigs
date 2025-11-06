import { NextRequest, NextResponse } from "next/server";
import Job from "../../jobs/job.model";
import Category from "../../category/category.model";

export const GET = async (req: NextRequest) => {
  try {
    // Fetch all jobs
    const allJobs = await Job.find();

    // Extract all department IDs from jobs
    const allDepartmentIds = allJobs.map((job) => job.department);

    // Unique department IDs
    const uniqueDepartmentIds = [...new Set(allDepartmentIds)];

    // Fetch all relevant categories (departments) by their IDs
    const categories = await Category.find({ _id: { $in: uniqueDepartmentIds } });

    // Map each category ID to its name
    const idToNameMap = new Map(
      categories.map((cat) => [cat._id.toString(), cat.name])
    );

    // Replace IDs with names
    const departmentNames = allDepartmentIds.map(
      (id) => idToNameMap.get(id.toString()) || "Unknown"
    );

    // Get unique department names
    const uniqueDepartments = [...new Set(departmentNames)];

    // Count how many times each department appears
    const departmentCounts = uniqueDepartments.map(
      (dep) => departmentNames.filter((d) => d === dep).length
    );

    // Return JSON response
    return NextResponse.json(
      {
        message: "Success",
        departments: uniqueDepartments,
        counts: departmentCounts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching department data:", error);
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
