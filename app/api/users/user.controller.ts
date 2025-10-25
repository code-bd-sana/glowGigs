import { dbConnect } from "@/lib/dbConnect";
import User from "./user.model";
import bcrypt from "bcryptjs";
import { IUser } from "@/types/user.types";

export const getAllUser = async()=>{
    await dbConnect();
   const users = await User.find();
   return users
}

export const saveUser = async(data:IUser)=>{

await dbConnect();
       const password = data?.password;
        const hashPassword =await bcrypt.hash(password, 10);
       data.password = hashPassword;
    
        const newUser = new User(data);
        const saved = await newUser.save();
        return saved;
}

export const getSingleUser = async (email:String) =>{
    const user = await User.findOne({email:email});
    return user;
}


export const isExistUser = async(email:string)=>{

    const user = await User.findOne({email:email});
    if(user){
        return true
    }
    else{
        return false
    }

}