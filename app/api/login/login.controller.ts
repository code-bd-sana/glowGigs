import { dbConnect } from "@/lib/dbConnect";
import User from "../users/user.model";

export const getUser = async (email: string) => {
  await dbConnect();
  const userDetails = await User.findOne({ email: email });
  return userDetails;
};
