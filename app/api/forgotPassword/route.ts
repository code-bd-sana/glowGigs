import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../users/user.model";
import Otp from "../otp/otp.model";
import { changePassword } from "./changePassword.controller";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const { email, otp, newPassword } = await req.json();
    const isExist = await User.findOne({ email: email });

    if (!isExist) {
      return NextResponse.json({
        message: "User not found",
      });
    }

    const existInOtp = await Otp.findOne({ email: email });
    if (!existInOtp) {
      return NextResponse.json({
        message: "OTP expired, please try again!",
      });
    }

    if (otp !== existInOtp) {
      return NextResponse.json({ message: "Wrong OTP!" });
    }
    const updated = await changePassword(email, newPassword);
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      error,
    });
  }
};
