/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define the NextAuth configuration
const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Login (Email & Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Fetch user from Supabase based on email
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        // If user not found or provider mismatch, throw error
        if (error || !user || user.provider !== "credentials") {
          throw new Error("Invalid email or password");
        }

        // Compare the provided password with the hashed password stored in Supabase
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid email or password");

        // Return user object if authentication is successful.
        return user;
      },
    }),
  ],
  callbacks: {
    // Sign-in callback for handling new Google users.
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Look for the user in Supabase.
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        // If user doesn't exist, create a new record.
        if (!data) {
          await supabase.from("users").insert({
            name: user.name,
            email: user.email,
            provider: "google",
          });
        }
      }
      // For credentials-based sign in, errors are handled in authorize.
      return true;
    },

    // JWT callback: Generate a JWT on sign in.
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        const payload = { email: user.email };
        token.jwt = jwt.sign(payload, process.env.JWT_SECRET!, {
          expiresIn: "1d",
        });
      }
      return token;
    },

    // Session callback: Attach the JWT token to the session.
    async session({ session, token }: { session: Session; token: JWT }) {
      session.jwt = token.jwt as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

// Export NextAuth API Route Handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
