import { NextRequest, NextResponse } from "next/server";
import User from "../users/user.model";

export const GET = async(req:NextRequest)=>{
    try {

        const data = await User.find({role:"EMPLOYER"});
        return NextResponse.json({
            message:"Success",
            data
        }, {status: 200})
        
    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong!",
            error
        }, {status:500})
    }
}