"use client";

import { useSession } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You need to sign in first.</p>;

  return <p>Welcome {session.user?.name}!</p>;
}
