import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

declare module "next-auth" {
  interface User {
    first_name?: string;
    id?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user || user.provider !== "credentials") {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid email or password");

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        let { data } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (!data) {
          const { data: userData } =
            await supabaseAdmin.auth.admin.createUser({
              email: user.email ?? "",
              password: Math.random().toString(36).slice(-8),
              email_confirm: true,
            });

          const namePart = user.name?.trim().split(/\s+/);
          const { data: newUser } = await supabase
            .from("users")
            .insert({
              id: userData.user?.id ?? "",
              first_name: namePart ? namePart[0] : "",
              last_name: namePart ? namePart[1] : "",
              email: user.email,
              provider: "google",
            })
            .select("*")
            .single();

          data = newUser;
        }
        user.first_name = data.first_name;
        user.id = data.id;
        user = data;
      }
      return true;
    },

    async jwt({ token, user }) {
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

    async session({ session, token }) {
      session.jwt = token.jwt as string;
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.JWT_SECRET,
};
