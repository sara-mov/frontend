import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    provider: string;
    jwt?: string; // ✅ Add jwt field
  }

  interface Session extends DefaultSession {
    jwt?: string;
    user: {
      id: string;
      email: string;
      provider: string;
      jwt?: string; // ✅ Include jwt in session
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    jwt?: string;
    id: string;
    provider: string;
  }
}
