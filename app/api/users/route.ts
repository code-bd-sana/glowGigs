import { dbConnect } from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server"
import User from "./user.model";

export const GET = async(req:NextRequest)=>{

    try {


   await dbConnect();
   const user = await User.find();
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
  try {
    await dbConnect();

    const data = await req.json(); 
    const newUser = new User(data);
    const saved = await newUser.save();

    return NextResponse.json(
      { message: "Success", data: saved },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
};
