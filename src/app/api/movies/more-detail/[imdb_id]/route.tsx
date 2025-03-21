import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const imdb_id = url.pathname.split("/").pop(); // Extract IMDb ID from URL

    if (!imdb_id) {
      return NextResponse.json({ error: "Invalid IMDb ID" }, { status: 400 });
    }

    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdb_id}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch movie details: ${error}` },
      { status: 500 }
    );
  }
}
