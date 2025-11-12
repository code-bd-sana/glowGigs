import { NextRequest, NextResponse } from "next/server";
import User from "../users/user.model";

export const PUT = async (req:NextRequest)=>{
    try {

        const data =await req.json();
        console.log(data, "mejaj gorom");
        const {id, status} = data;
        
        const updated = await User.updateOne({_id:id}, {$set:{
            status:status
        }});
        return NextResponse.json({
            message:"Success",
            data:updated
        })
        
    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong!",
            error:error
        })
 
    }
}