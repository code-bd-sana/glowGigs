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
      }, {status:401});
    }

    const existInOtp = await Otp.findOne({ email: email });
    if (!existInOtp) {
      return NextResponse.json({
        message: "OTP expired, please try again!",
      }, {status:401});
    }

    console.log(otp, "amo tor otp")
    console.log(existInOtp.otp, "toi asis ne?")

    if (otp !== existInOtp.otp) {
      return NextResponse.json({ message: "Wrong OTP!" }, {status:401});
    }
    const updated = await changePassword(email, newPassword);


    return NextResponse.json({
      data:updated
    }, {status:201})




  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      error,
    }, {status:500});
  }
};
