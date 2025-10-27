import { NextRequest, NextResponse } from "next/server";
import { deleteJob, getJobById, updateJob } from "../job.controller";

// export async function GET(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params;
//     console.log(id);
//     const job = await getJobById(id);

//     if (!job) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     return NextResponse.json(job, { status: 200 });
//   } catch (error: unknown) {
//     const message =
//       error instanceof Error ? error.message : "Something went wrong";
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// ✅ DELETE /api/jobs/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedJob = await deleteJob(params.id);
    return NextResponse.json(
      { success: true, data: deletedJob },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ✅ GET /api/jobs/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await getJobById(params.id);

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
// ✅ PATCH /api/jobs/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    console.log("PATCH body:", body); // Debug incoming data

    // Call controller to update job partially
    const updatedJob = await updateJob(params.id, body);

    return NextResponse.json(
      { success: true, data: updatedJob },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    if (message === "Job not found") {
      return NextResponse.json({ success: false, message }, { status: 404 });
    }

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
