import { NextRequest, NextResponse } from "next/server";
import { updateProfile } from "./ProfileUpdateController";
import { dbConnect } from "@/lib/dbConnect";

export const PUT = async (req:NextRequest)=>{
    try {
        await dbConnect();
        const data =await req.json()
     
       const updated =  await updateProfile(data);
      console.log(updated, "Khalid vaiyer personal M")
       return NextResponse.json({
        message:'Success',
        data:updated
       })
    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong!",
            error
        })
    }
}