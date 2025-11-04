import { NextRequest, NextResponse } from "next/server";
import jobAppliedModel from "../../jobApplied/jobApplied.model";

export const GET = async (req: NextRequest) => {
  try {
    const result: number[] = [];

    const now = new Date();

    for (let i = 0; i < 7; i++) {
      // current week start → Monday or simply 7 days block
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i + 1) * 7);

      // next week end boundary
      const weekEnd = new Date(now);
      weekEnd.setDate(now.getDate() - i * 7);

      const count = await jobAppliedModel.countDocuments({
        createdAt: { $gte: weekStart, $lt: weekEnd }
      });

      result.unshift(count); // oldest → first
    }

    return NextResponse.json(
      {
        message: "Success",
        weeklyData: result,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error,
      },
      { status: 500 }
    );
  }
};
