import { NextRequest, NextResponse } from "next/server";
import { getAdminOverview } from "./AdminOverview.controller";

export const GET = async(req:NextRequest)=>{
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