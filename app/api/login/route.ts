import { NextRequest, NextResponse } from "next/server";
import User from "../users/user.model";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { getUser } from "./login.controller";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        message: "User Not Found!",
      });
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return NextResponse.json({
        message: "Wrong Password!",
      });
    }

    const userDetails = await getUser(email);
    return NextResponse.json({
      message: "Login Success",
      data: userDetails,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      error,
    });
  }
};
