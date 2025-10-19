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
      { message: "Application created successfully", newApplication },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: error || "Failed to create application" },
      { status: 400 }
    );
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
