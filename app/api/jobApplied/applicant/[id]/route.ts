import { NextRequest, NextResponse } from "next/server";
import { deleteJobApplied } from "@/app/api/jobApplied/jobApplied.controller";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await deleteJobApplied(id);

  return NextResponse.json({ message: result.message }, { status: result.status });
}