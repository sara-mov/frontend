/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { movie, movieId } = await req.json();

  // Check if the movie already exists in the watchlist
  const { data: existing, error: existingError } = await supabase
    .from("watchlist")
    .select("id")
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .maybeSingle();

  if (existingError && existingError.code !== "PGRST116") {
    console.error("Check existing error:", existingError);
  }

  if (existing) {
    // Remove from watchlist
    const { error: deleteError } = await supabase
      .from("watchlist")
      .delete()
      .eq("id", existing.id);

    if (deleteError) {
      console.error("Delete error:", deleteError);
      return NextResponse.json(
        { error: "Failed to remove from watchlist" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Removed from watchlist",
      added: false,
    });
  } else {
    // Insert movie into watchlist
    const { data, error } = await supabase.from("watchlist").insert([
      {
        user_id: userId,
        movie_id: Number(movie.id),
        title: movie.title,
        overview: movie.overview,
        genre_ids: movie.genre_ids,
        original_language: movie.original_language,
        rating: movie.rating,
        release_date: movie.release_date,
        runtime: movie.runtime,
        imdb_id: movie.imdb_id,
        production_companies: movie.production_companies,
        backdrop_path: movie.backdrop_path,
        adult: movie.adult,
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { error: "Failed to add to watchlist", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Added to watchlist", added: true });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("movie_id");

  // 🔹 Check if movie is in the user's watchlist
  if (movieId) {
    const { data: watchlist } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", userId)
      .eq("movie_id", movieId)
      .single();

    return NextResponse.json({ saved: !!watchlist, movie: watchlist || null });
  } else {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ watchlist: data });
  }
}
