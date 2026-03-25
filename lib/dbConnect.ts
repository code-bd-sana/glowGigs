import mongoose, { Mongoose } from "mongoose";

const uri = `mongodb://root:fC9VQuhOQcdvpuigWkT8pEBhOPnJkEiBn5qOo7FZWFSGBJg3157KudWDxSAq5bJe@pbr4a9hziast4e6ifnfdceyt:27017/glowGigs/?directConnection=true`;
const MONGO_URI = uri as string;

if (!MONGO_URI) {
  throw new Error("Please add MONGO_URI in .env.local");
}

// Define type for cached connection
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Declare global type
declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Use global cache
const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

export async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    console.log("🔁 Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🚀 Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGO_URI, { dbName: "glowGigs" })
      .then((conn) => {
        console.log(
          "✅ MongoDB Connected:",
          conn.connection.db?.databaseName ?? "unknown"
        );

        return conn;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Failed:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;

  return cached.conn;
}
