import { NextRequest, NextResponse } from "next/server";
import { deleteJob, getJobById, updateJob } from "../job.controller";

// ✅ GET /api/jobs/:id
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const job = await getJobById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: job }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ✅ DELETE /api/jobs/:id
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const deletedJob = await deleteJob(id);

    return NextResponse.json({ success: true, data: deletedJob }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ✅ PATCH /api/jobs/:id
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    console.log("PATCH body:", body);

    const updatedJob = await updateJob(id, body);

    if (!updatedJob) {
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedJob }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
