import { NextRequest, NextResponse } from "next/server";
import {
  deleteApplication,
  getApplicationsByJob,
  updateApplicationStatus,
} from "../jobApplied.controller";

/**
 * GET: Fetch all applications for a specific job
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const applications = await getApplicationsByJob(id);
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Error fetching applications" },
      { status: 404 }
    );
  }
}

/**
 * PUT: Update status of a specific job application
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const { status } = await req.json();
    const updated = await updateApplicationStatus(id, status);
    return NextResponse.json(
      { message: "Status updated successfully", updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Error updating application" },
      { status: 400 }
    );
  }
}

/**
 * DELETE: Delete a specific job application
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await deleteApplication(id);
    return NextResponse.json(
      { message: "Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Error deleting application" },
      { status: 400 }
    );
  }
}
