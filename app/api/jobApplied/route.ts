/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  createJobApplication,
  getAllApplications,
} from "./jobApplied.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newApplication = await createJobApplication(body);
    return NextResponse.json(
      { success: true, message: "Application created successfully", data: newApplication },
      { status: 201 }
    );
  } catch (error: any) {
    const status = error?.status || 400;
    const message = error?.message || "Failed to create application";
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function GET() {
  try {
    const applications = await getAllApplications();
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
