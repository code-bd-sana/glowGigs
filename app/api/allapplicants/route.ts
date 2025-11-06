// app/api/allapplicants/route.js
import { NextRequest, NextResponse } from "next/server";
import User from "../users/user.model";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery = {
      role: "JOB_SEEKER",
      $or: [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { _id: { $regex: search, $options: "i" } }
      ]
    };

    // If no search term, remove the $or condition to get all applicants
    if (!search) {
      delete searchQuery.$or;
    }

    // Determine sort order
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    // Find applicants with pagination, search, and sorting
    const data = await User.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sortDirection });

    // Get total count with search filter
    const totalApplicants = await User.countDocuments(searchQuery);

    return NextResponse.json(
      {
        message: "Success",
        data,
        pagination: {
          total: totalApplicants,
          page,
          limit,
          totalPages: Math.ceil(totalApplicants / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error:error.message,
      },
      { status: 500 }
    );
  }
};



