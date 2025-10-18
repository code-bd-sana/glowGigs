import { dbConnect } from "@/lib/dbConnect";
import User from "../users/user.model";
import bcrypt from "bcryptjs";

export const changePassword = async (email: string, newPassword: string) => {
  await dbConnect();

  const hashPassword = await bcrypt.hash(newPassword, 10);

  const updated = await User.updateOne(
    { email: email },
    {
      $set: {
        password: hashPassword,
      },
    }
  );

  return updated;
};
