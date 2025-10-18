import { NextResponse } from "next/server";
import { createJob, getAllJobs } from "./job.controller";

export async function GET() {
  try {
    const jobs = await getAllJobs();
    return NextResponse.json(jobs, { status: 200 });
  } catch (error: unknown) {
    // ✅ Proper type check for unknown error
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const job = await createJob(body);
    return NextResponse.json(job, { status: 201 });
  } catch (error: unknown) {
    // ✅ Proper type check for unknown error
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}