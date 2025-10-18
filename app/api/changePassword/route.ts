import { NextRequest, NextResponse } from "next/server";
import User from "../users/user.model";
import bcrypt from "bcryptjs";
import { changePassword } from "../forgotPassword/changePassword.controller";

export const POST = async (req: NextRequest) => {
  try {
    const { email, oldPassword, newPassword } = await req.json();

    const isExist = await User.findOne({ email: email });
    if (!isExist) {
      return NextResponse.json({
        message: "User Not Found!",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, isExist?.password);

    if (!isMatch) {
      return NextResponse.json({
        message: "Password Not Match",
      });
    }

    const updated = await changePassword(email, newPassword);
    return NextResponse.json({
      message: "Success",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong!",
      error,
    });
  }
};
 