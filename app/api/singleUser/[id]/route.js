import { NextResponse } from "next/server";
import User from '../../../api/users/user.model'
import { dbConnect } from "@/lib/dbConnect";

export const GET = async (req, { params }) => {

await dbConnect()
  try {
    console.log(params.id, "User ID");

    const id = await params?.id


    const user = await User.findOne({_id:id})

    return NextResponse.json({
      message: "Success",
     data:user
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
