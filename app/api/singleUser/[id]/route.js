import { NextResponse } from "next/server";
import User from '../../../api/users/user.model'
import { dbConnect } from "@/lib/dbConnect";

export const GET = async (request, { params }) => {
  try {
    await dbConnect();
    
    // Extract ID from params
    const { id } = params;
    
    console.log("Fetching user with ID:", id);

    // Validate ID
    if (!id || id === 'undefined' || id === 'null') {
      return NextResponse.json(
        { 
          message: "Invalid user ID",
          error: "User ID is required" 
        },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await User.findById(id).select('-password'); // Exclude password

    if (!user) {
      return NextResponse.json(
        { 
          message: "User not found",
          error: "No user found with the provided ID" 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User fetched successfully",
      data: user
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      return NextResponse.json(
        { 
          message: "Invalid user ID format",
          error: "Please provide a valid user ID" 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      },
      { status: 500 }
    );
  }
};