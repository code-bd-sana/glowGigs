import { dbConnect } from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server"
import bcrypt  from "bcryptjs";
import User from "./user.model";
import { getAllUser, saveUser } from "./user.controller";

export const GET = async(req:NextRequest)=>{

    try {


 const user =await getAllUser()
   return NextResponse.json({
    message:"Success",
    data:user
   }, {status: 200})
        
    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong",
            error
        }, {status: 500})
    }
}




export const POST = async (req: NextRequest) => {
  console.log("HIT")
  try {
    await dbConnect();

    const data = await req.json(); 


    const existEmail = await User.findOne({email:data?.email});
    if(existEmail){
      return NextResponse.json({
        message:"User already exist"
      }, {status:401})
    }
    
    
    const saved = await saveUser(data)

    return NextResponse.json(
      { message: "Success", data: saved },
      { status: 200 }
    );
  } catch (error) {

    console.log(error)
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
};
