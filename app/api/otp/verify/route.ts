import { NextRequest, NextResponse } from "next/server";
import User from "../../users/user.model";
import Otp from "../otp.model";

export const POST = async(req: NextRequest)=>{
    try {

        const {email, otp} = await req.json();

        const isExist = await User.findOne({email:email});
        if(!isExist){
            return NextResponse.json({
                message:"User Not Found!"
            })
        }

        const otpExist = await Otp.findOne({email:email});
        if(!otpExist){
            return NextResponse.json({
                message:'OTP Not found on database'
            })
        }

        if(otp !== otpExist.otp){
            return NextResponse.json({
                message:"OTP does not Match",

            })
        }


        const updated = await User.updateOne({email:email}, {$set:{
            isVerified:true
        }});

        return NextResponse.json({
            message:"Success",
            data: updated
        })





    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong!",
            error
        })
    }
}