import { NextRequest, NextResponse } from "next/server";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobsByPoster,
} from "./job.controller";

// export async function GET() {
//   try {
//     const jobs = await getAllJobs();
//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error: unknown) {
//     // ✅ Proper type check for unknown error
//     const message =
//       error instanceof Error ? error.message : "Something went wrong";
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const jobPoster = url.searchParams.get("jobPoster");

    // If a jobPoster query param exists, return jobs for that poster
    if (jobPoster) {
      return getJobsByPoster(jobPoster);
    }

    // Otherwise, return all jobs
    const jobs = await getAllJobs();
    return NextResponse.json(jobs, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
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

// // ✅ DELETE - Delete job by ID
// export async function DELETE(request: NextRequest) {
//   try {
//     const { id } = await request.json();

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: "Job ID is required" },
//         { status: 400 }
//       );
//     }

//     const deletedJob = await deleteJob(id);
//     return NextResponse.json(
//       { success: true, data: deletedJob },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     const message =
//       error instanceof Error ? error.message : "Something went wrong";
//     return NextResponse.json({ success: false, message }, { status: 500 });
//   }
// }
