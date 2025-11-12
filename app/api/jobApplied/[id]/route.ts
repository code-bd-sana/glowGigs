import { NextRequest, NextResponse } from "next/server";
import {
  deleteApplication,
  getApplicationsByJob,
  updateApplicationStatus,
  updateJobAppliedStatus,
} from "../jobApplied.controller";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import JobApplied from "../jobApplied.model";

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

//shortlisted


export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ params is a Promise
) {
  try {
    const resolvedParams = await context.params; // ✅ await params
    const id = resolvedParams.id;

    console.log("Route hit! ID:", id);

    await dbConnect();
    const { status } = await req.json();
    console.log("Status from body:", status);

    const updated = await updateJobAppliedStatus(id, status);

    return NextResponse.json({ message: "Status updated", data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
}
