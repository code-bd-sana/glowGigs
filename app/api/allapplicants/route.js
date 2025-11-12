// app/api/allapplicants/route.js
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../users/user.model";

export const GET = async (req) => {
  await dbConnect()
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery = {
      role: "JOB_SEEKER"
    };

    // Add search condition only if search term exists
    if (search) {
      // Check if search term is a valid MongoDB ObjectId (24 character hex string)
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(search);
      
      if (isObjectId) {
        // If search term is a valid ObjectId, search by _id
        searchQuery._id = search;
      } else {
        // If not ObjectId, search by name and email
        searchQuery.$or = [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ];
      }
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
    console.log(error, 'This is error')
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error: error.message,
      },
      { status: 500 }
    );
  }
};