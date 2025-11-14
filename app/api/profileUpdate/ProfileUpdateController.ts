import { dbConnect } from "@/lib/dbConnect"
import User from "../users/user.model";

export const updateProfile = async(data)=>{

  await  dbConnect();
const updated = await User.updateOne({email:data.email}, {$set:data});
return updated;

}