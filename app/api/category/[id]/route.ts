import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getJobsByCategory } from "../category.controller";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- params is a Promise
) {
  await dbConnect();

  try {
    const { id } = await context.params; // <-- now we await it

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const jobs = await getJobsByCategory(id);
    return NextResponse.json(jobs, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
