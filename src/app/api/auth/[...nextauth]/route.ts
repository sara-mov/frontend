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
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Define the NextAuth configuration
export const authOptions: NextAuthOptions = {
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
        let { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        // If user doesn't exist, create a new record.
        if (!data) {
          // console.log("user", user);
          const { data: userData, error } =
            await supabaseAdmin.auth.admin.createUser({
              email: user.email,
              password: Math.random().toString(36).slice(-8), // Generate a random password
              email_confirm: true, // Automatically confirm the email
            });

          if (error) {
            console.error("Supabase Auth Error:", error);
            return false;
          }

          // console.log("userData", userData);

          const namePart = user.name?.trim().split(/\s+/);
          const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert({
              id: userData.user.id,
              first_name: namePart ? namePart[0] : "",
              last_name: namePart ? namePart[1] : "",
              email: user.email,
              provider: "google",
            })
            .select("*")
            .single(); // Fetch the newly inserted user

          if (insertError) {
            console.error("Error inserting user:", insertError);
            return false;
          }

          data = newUser; // Assign newly created user to data
        }
        user.first_name = data.first_name;
        user.id = data.id;
        user = data;
      }
      // For credentials-based sign in, errors are handled in authorize.
      return true;
    },

    // JWT callback: Generate a JWT on sign in.
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        const payload = {
          email: user.email,
          name: user.first_name,
          id: user.id,
        };
        token.id = user.id;
        token.name = user.first_name;
        token.jwt = jwt.sign(payload, process.env.JWT_SECRET!, {
          expiresIn: "1d",
        });
      }
      return token;
    },

    // Session callback: Attach the JWT token to the session.
    async session({ session, token }: { session: Session; token: JWT }) {
      session.jwt = token.jwt as string;
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      // console.log(session);
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
