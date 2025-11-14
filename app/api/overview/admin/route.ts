import { NextRequest, NextResponse } from "next/server";
import { getAdminOverview } from "./AdminOverview.controller";
import { dbConnect } from "@/lib/dbConnect";

export const GET = async(req:NextRequest)=>{
     await dbConnect()
    try {


       

        const res = await getAdminOverview();

        return NextResponse.json({
            message:"Success",
            data:res
            

        })

        
    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong!"
        }, {status:500})
    }
}