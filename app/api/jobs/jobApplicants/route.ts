import { NextRequest } from "next/server";
import { getApplicantsForPoster } from "../job.controller";
import { dbConnect } from "@/lib/dbConnect";
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const posterId = url.searchParams.get("posterId");

    if (!posterId) {
      return new Response(JSON.stringify({ message: "posterId is required" }), {
        status: 400,
      });
    }

    return getApplicantsForPoster(posterId);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}
