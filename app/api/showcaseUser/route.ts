import { NextResponse } from "next/server";
import User from "../users/user.model";

export const GET = async () => {
  try {
    // only users whose portfolio is NOT empty
    const users = await User.find({
      portfolio: { $exists: true, $not: { $size: 0 } }
    });

    return NextResponse.json({
      success: true,
      users
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error?.message,
    });
  }
};
