export async function GET() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1?`
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
