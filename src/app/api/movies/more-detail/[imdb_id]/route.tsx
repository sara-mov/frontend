import { NextRequest, NextResponse } from "next/server";

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const imdb_id = url.pathname.split("/").pop(); // Extract IMDb ID from URL

    if (!imdb_id || !/^tt\d+$/.test(imdb_id)) {
      return NextResponse.json({ error: "Invalid IMDb ID" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OMDB API key is missing" }, { status: 500 });
    }

    const response = await fetch(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${apiKey}`);
    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({
      error: `Failed to fetch movie details: ${error.message}`,
    }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
