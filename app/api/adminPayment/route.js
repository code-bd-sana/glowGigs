import { NextResponse } from "next/server"
import PaymentHistory from '../payments/paymentHistory.model'
import { dbConnect } from "@/lib/dbConnect";

export const GET = async(req)=>{
await dbConnect();
    try {

        const allPayments = await PaymentHistory.find().populate("userId");
        return NextResponse.json({
            message:"Success",
            data:allPayments
        })
        
    } catch (error) {
        return NextResponse.json({
            error,
            message:error.message
        })
    }
}