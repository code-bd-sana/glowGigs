import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      plan?: string;               // ⭐ your Stripe plan ("free", "growth", "pro")
      currentPeriodEnd?: string;   // ⭐ optional: next billing date
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    plan?: string;                 // ⭐ comes from database
    currentPeriodEnd?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    plan?: string;                 // ⭐ saved into token
    currentPeriodEnd?: string;
  }
}
