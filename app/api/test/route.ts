import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const connection = await dbConnect();
    const isConnected = connection.connection.readyState === 1; // 1 = connected
    return Response.json({
      success: true,
      message: isConnected
        ? "✅ MongoDB Connected Successfully!"
        : "⚠️ MongoDB Connection Not Ready",
    });
  } catch (error) {
    return Response.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
