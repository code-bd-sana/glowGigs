// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET || "aidfjnvociydfnovfadf",

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        role: { type: "text" },
        _id: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials.email) return null;

        return {
          id: credentials._id,
          email: credentials.email,
          role: credentials.role,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          console.log("Google signIn callback:", { user, account });

          const role = account?.role || "customer";
          user.role = role;

          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/users/oauth`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                role: role,
                provider: "google",
                image: user.image,
              }),
            }
          );

          if (response.ok) {
            const userData = await response.json();
            user.id = userData._id;
          } else {
            console.error("Failed to save OAuth user");
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      // Update token with Google data
      if (account?.provider === "google") {
        token.role = user?.role || "customer";
        if (profile) {
          token.name = profile.name;
          token.email = profile.email;
          token.picture = profile.picture;
        }
      }

      /* 🔥 ADD PLAN HERE */
      if (token?.id) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://glowgigs.com";
     
            process.env.NEXT_PUBLIC_APP_URL ||
            "https://glowgigs.com";

          const res = await fetch(`${baseUrl}/api/users/get/${token.id}`);

          if (res.ok) {
            const dbUser = await res.json();
            token.plan = dbUser.plan || "free";
            token.planStatus = dbUser.planStatus || "inactive";
            token.currentPeriodEnd = dbUser.currentPeriodEnd || null;
          }
        } catch (err) {
          console.log("❌ Failed to load plan:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;

      /* 🔥 ADD PLAN TO SESSION */
      session.user.plan = token.plan || "free";
      session.user.planStatus = token.planStatus || "inactive";
      session.user.currentPeriodEnd = token.currentPeriodEnd || null;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login?error=",
  },

  debug: true,
});

export { handler as GET, handler as POST };
