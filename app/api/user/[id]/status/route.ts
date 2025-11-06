// app/api/users/[id]/status/route.js
import { NextRequest, NextResponse } from "next/server";
import User from "../../../users/user.model";

export const PUT = async (req: NextRequest, { params }) => {
  try {
    const { id } = params;
    const { status } = await req.json();

    // Validate status
    if (!['active', 'banned'].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    // Update user and return the updated document
    const updatedUser = await User.updateOne({_id:id}, {$set:{
      status:status
    }})

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `User ${status === 'banned' ? 'banned' : 'unbanned'} successfully`,
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
};

// Optional GET to test API
export const GET = async (req: NextRequest) => {
  return NextResponse.json(
    { message: "Status API is working" },
    { status: 200 }
  );
};
