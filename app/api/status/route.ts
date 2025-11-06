import { NextRequest, NextResponse } from "next/server";
import User from "../users/user.model";

export const POST = async(req:NextRequest)=>{
    try {
        const updated = await User.updateMany({},{$set:{
              applications:0,

        }})

        return NextResponse.json({
            message:"Sucess",
            data:updated
        }, {status:200})
        
    } catch (error) {

        console.log(error)
        return NextResponse.json({
            message:"Something went wrong!",
            error

        }, {status:500})
    }
}