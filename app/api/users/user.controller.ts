import { dbConnect } from "@/lib/dbConnect";
import User from "./user.model";
import bcrypt from "bcryptjs";

export const getAllUser = async()=>{
    await dbConnect();
   const users = await User.find();
   return users
}

export const saveUser = async(data:any)=>{

await dbConnect();
       const password = data?.password;
        const hashPassword =await bcrypt.hash(password, 10);
       data.password = hashPassword;
    
        const newUser = new User(data);
        const saved = await newUser.save();
        return saved;
}