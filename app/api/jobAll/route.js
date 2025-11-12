// app/api/jobAll/route.js
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Job from "../jobs/job.model";
import { dbConnect } from "@/lib/dbConnect";
import "../../api/users/user.model";

export const GET = async (req) => {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const department = searchParams.get("department") || "";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    const searchQuery = {};

    // 🔍 Search text
    if (search) {
      searchQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 🟩 Status filter
    if (status && status !== "All") {
      searchQuery.status = status;
    }

    // 🟦 Department filter (convert to ObjectId)
    if (department && department !== "All") {
      try {
        searchQuery.department = new mongoose.Types.ObjectId(department);
      } catch (err) {
        console.warn("Invalid department ID:", department);
      }
    }

    // Sorting
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    // Find jobs with filters
    const data = await Job.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sortDirection });

    const totalJobs = await Job.countDocuments(searchQuery);

    return NextResponse.json(
      {
        message: "Success",
        data,
        pagination: {
          total: totalJobs,
          page,
          limit,
          totalPages: Math.ceil(totalJobs / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Something went wrong!", error: error.message },
      { status: 500 }
    );
  }
};
