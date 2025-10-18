import { IOtp } from "@/types/otp.types";
import mongoose, { Schema } from "mongoose";


const otpSchema = new Schema<IOtp> ({
email:{
    type:String,
    required:[true, "Email Is Required"]
},
otp:{
    type:String,
    required:[true, "Otp is required"]
}
}, {timestamps:true});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = (mongoose.models.Otp  as mongoose.Model<IOtp>) || mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;




