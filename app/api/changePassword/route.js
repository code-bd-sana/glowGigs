import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../users/user.model"; // IUserDocument is optional
import { changePassword } from "../forgotPassword/changePassword.controller";

export const POST = async (req) => {
  try {
    const { email, oldPassword, newPassword }= await req.json();

    // Find user by email
    const user = await User.findOne({ email }).lean(); // lean() returns plain JS object

    if (!user) {
      return NextResponse.json(
        { message: "User Not Found!" },
        { status: 404 }
      );
    }

    // Type assertion to tell TypeScript password exists
    const password =user.password;

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Old password does not match" },
        { status: 400 }
      );
    }

    // Change password (hashed inside changePassword)
    const updated = await changePassword(email, newPassword);

    return NextResponse.json(
      { message: "Password updated successfully", data: updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error: error.message || error },
      { status: 500 }
    );
  }
};
