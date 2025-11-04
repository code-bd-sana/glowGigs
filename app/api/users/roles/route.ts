import { NextResponse } from "next/server";
import { getUserRoleCounts } from "../user.controller";

export async function GET() {
  try {
    const result = await getUserRoleCounts();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching role counts:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error },
      { status: 500 }
    );
  }
}