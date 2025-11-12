import { NextRequest, NextResponse } from "next/server";
import User from "../../users/user.model";

export const DELETE = async (req , params ) => {
  try {
    const { id } = params; 
    console.log("Deleting user with id:", id);
    const deleted = await User.deleteOne({_id:id});

    return NextResponse.json({
        message:"Success",
        data:deleted
        
    })

  

  
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong!",
      error,
    });
  }
};
