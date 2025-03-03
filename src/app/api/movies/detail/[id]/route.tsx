import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { params } = context;
  const id = params.id;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    );
    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: `Failed to fetch data ${error}` },
      { status: 500 }
    );
  }
}
