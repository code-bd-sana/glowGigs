import { NextRequest, NextResponse } from "next/server";
import { getSingleUser, isExistUser } from "../user.controller";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await context.params; // ✅ await promise param

    const isExist = await isExistUser(email);

    if (!isExist) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const data = await getSingleUser(email);
    return NextResponse.json({ message: "Success", data }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
