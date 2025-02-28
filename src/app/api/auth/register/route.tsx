/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { first_name, last_name, email, password } = await req.json();

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: userData, error } = await supabaseAdmin.auth.admin.createUser(
      {
        email: email,
        password: hashedPassword,
        email_confirm: true, // Automatically confirm the email
      }
    );

    if (error) {
      console.error("Supabase Auth Error:", error);
      return false;
    }

    await supabase.from("users").insert({
      id: userData.user.id,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      provider: "credentials",
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
