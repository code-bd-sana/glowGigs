import { request } from "http";
import { NextResponse } from "next/server";
import User from "../users/user.model";

export const PUT = async(request: Request) => {
try {

    const data = await request.json();
    console.log(data, "aha data oho data");
    const {email} = data;
    const {portfolioItems} = data;
const updated = await User.findOneAndUpdate(
  { email },
  { $set: { portfolio: portfolioItems } },
  { new: true, runValidators: true } // ✅ ensures schema validation
);


console.log(updated)
return NextResponse.json({message:"Portfolio updated successfully", updated}, {status:200})
    
    
} catch (error) {
  console.log(error)
    return NextResponse.json({message:"Error in updating portfolio", error}, {status:500})
}


}


