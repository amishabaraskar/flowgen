import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/lib/db";
import User from "@/lib/models/User";

const handler = NextAuth({
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Your existing email/password login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          plan: user.plan,
        };
      },
    }),
  ],

  callbacks: {
    // Called when JWT is created — add userId and plan to token
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as any).plan || "free";
      }

      // Handle Google login — create user in DB if first time
      if (account?.provider === "google" && token.email) {
        await connect();
        let dbUser = await User.findOne({ email: token.email });

        if (!dbUser) {
          // First Google login — create user with no password
          dbUser = await User.create({
            email: token.email,
            password: await bcrypt.hash(Math.random().toString(36), 10),
            plan: "free",
            usageCount: 0,
            provider: "google",
          });
        }

        token.id = dbUser._id.toString();
        token.plan = dbUser.plan;
      }

      return token;
    },

    // Called when session is read — expose id and plan to client
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).plan = token.plan;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // use your custom login page
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
