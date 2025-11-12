import { NextRequest, NextResponse } from "next/server";
import { deleteJobApplied } from "../../jobApplied.controller";


export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // 👈 FIX: Promise here
) {
  const { id } = await context.params; // 👈 FIX: await it
  const result = await deleteJobApplied(id);

  return NextResponse.json({ message: result.message }, { status: result.status });
}
