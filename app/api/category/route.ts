import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { getAllCategories, createCategory } from "./category.controller";

// ✅ Get all categories
export async function GET() {
  await dbConnect();
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ✅ Create a new category
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();

    // Validation check (optional)
    if (!body.name || !body.image) {
      return NextResponse.json(
        { error: "Name and image are required." },
        { status: 400 }
      );
    }

    const category = await createCategory(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 400 }
    );
  }
}

