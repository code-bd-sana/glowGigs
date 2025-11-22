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

       console.log(data, "All User Data")
    
        const newUser = new User(data);
        const saved = await newUser.save();
        return saved;
}

export const getSingleUser = async (email:string) =>{
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

export const getUserRoleCounts = async () => {
  await dbConnect();

  // 🧮 Count per role
  const employerCount = await User.countDocuments({ role: "EMPLOYER" });
  const adminCount = await User.countDocuments({ role: "ADMIN" });
  const seekerCount = await User.countDocuments({ role: "SEEKER" });

  // 🧩 Return structured summary
  return {
    success: true,
    roles: {
      EMPLOYER: employerCount,
      ADMIN: adminCount,
      SEEKER: seekerCount,
    },
    total: employerCount + adminCount + seekerCount,
  };
};
