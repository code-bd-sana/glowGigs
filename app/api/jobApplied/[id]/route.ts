import { NextRequest, NextResponse } from "next/server";
import {
  deleteApplication,
  getApplicationsByJob,
  updateApplicationStatus,
} from "../jobApplied.controller";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id;
    const applications = await getApplicationsByJob(jobId);
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    const updated = await updateApplicationStatus(params.id, status);
    return NextResponse.json(
      { message: "Status updated successfully", updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteApplication(params.id);
    return NextResponse.json(
      { message: "Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
