import { NextRequest, NextResponse } from "next/server"
import { getSingleUser, isExistUser } from "../user.controller";

export const GET  = async(  req: NextRequest,
  { params }: { params: { email: string } })=>{
    try {

        

        const {email} = params;
        const isExist = isExistUser(email);

        if(!isExist){
            return NextResponse.json({
                message:"User Not Found"
            }, {status:404})
        }
        const data = await getSingleUser(email);
        return NextResponse.json({

            message:"Success",
            data
        }, {status:200})



        
    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong!"
        })
    }
}