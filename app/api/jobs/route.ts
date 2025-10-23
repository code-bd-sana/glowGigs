import { NextRequest, NextResponse } from "next/server";
import { createJob, getAllJobs } from "./job.controller";

export async function GET() {
  try {
    const jobs = await getAllJobs();
    return NextResponse.json(jobs, { status: 200 });
  } catch (error: unknown) {
    // ✅ Proper type check for unknown error
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST create job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // JSON expected
    return createJob(body);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
