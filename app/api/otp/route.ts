import { NextRequest, NextResponse } from "next/server";
import Otp from "./otp.model";
import { otpGenaretor, transporter } from "@/lib/utils";
import { sendOtp } from "./otp.controller";

export const POST = async(req:NextRequest)=>{
    try {

        const {email} =await req.json();
        await sendOtp(email);
      

    return NextResponse.json({
        message:"Send Otp to your email"
    }, {status:200})


        
    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong",
            error
        }, {status:500})
    }
};
