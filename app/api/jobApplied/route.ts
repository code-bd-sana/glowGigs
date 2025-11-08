/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  createJobApplication,
  getAllApplications,
  getApplicationsByApplicant,
} from "./jobApplied.controller";

// ---------- CREATE NEW APPLICATION ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newApplication = await createJobApplication(body);
    return NextResponse.json(
      {
        success: true,
        message: "Application created successfully",
        data: newApplication,
      },
      { status: 201 }
    );
  } catch (error: any) {
    const status = error?.status || 400;
    const message = error?.message || "Failed to create application";
    return NextResponse.json({ success: false, message }, { status });
  }
}

// ---------- GET APPLICATION(S) ----------
export async function GET(req: NextRequest) {
  try {
    const applicantId = req.nextUrl.searchParams.get("applicant");

    if (applicantId) {
      // ✅ Only fetch this user's applications
      const applications = await getApplicationsByApplicant(applicantId);
      return NextResponse.json(applications, { status: 200 });
    }

    // ✅ If no query param, return all (admin or general view)
    const applications = await getAllApplications();
    return NextResponse.json(applications, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
