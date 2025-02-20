import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Decode JWT using Web Crypto API (Edge-compatible)
async function verifyJWT(token: string) {
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
    const [header, payload, signature] = token.split(".");

    if (!header || !payload || !signature) {
      throw new Error("Invalid token format");
    }

    // Decode the signature
    const signatureBuffer = new Uint8Array(
      [...atob(signature.replace(/-/g, "+").replace(/_/g, "/"))].map((c) => c.charCodeAt(0))
    );

    // Import key
    const key = await crypto.subtle.importKey(
      "raw",
      secretKey,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Verify signature
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      new TextEncoder().encode(`${header}.${payload}`)
    );

    return isValid;
  } catch (error) {
    console.error("JWT verification error:", error);
    return false;
  }
}

// Middleware Function
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const isValid = await verifyJWT(token);
  if (!isValid) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

// Match only protected routes
export const config = {
  matcher: ["/search"], // Adjust as needed
};
