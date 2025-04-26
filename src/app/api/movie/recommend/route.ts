/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

const llm = new ChatGroq({
  model: 'llama-3.3-70b-versatile',
  apiKey: apiKey,
  temperature: 0,
});

const instruction =
  "Return only a array of objects JSON string containing exactly 5 movie titles as strings and year as number. No IMDb IDs, no extra text, no explanation — just a list JSON string of 5 movie names and year. Now process this query: ";
  
  async function getTmdbId(movieName: string, year?: number): Promise<number | null> {
    const baseUrl = `https://api.themoviedb.org/3/search/movie`;
    const params = new URLSearchParams({
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY!,
      query: movieName,
    });
  
    if (year !== undefined) {
      params.append('year', year.toString());
    }
  
    const url = `${baseUrl}?${params.toString()}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
  
      const data = await response.json();
      const results = data.results;
      if (!results || results.length === 0) return null;
  
      // Directly pick the first result (most relevant)
      const bestMatch = results[0];
      return bestMatch && typeof bestMatch.id === 'number' ? bestMatch.id : null;
    } catch {
      return null;
    }
  }
  
  async function fetchTmdbIds(movieList: { title: string, year?: number }[]): Promise<number[]> {
    const idPromises = movieList.map(movie => getTmdbId(movie.title, movie.year));
    const ids = await Promise.all(idPromises);
    return ids.filter((id): id is number => id !== null);
  }
  
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
    }

    const fullPrompt = instruction + prompt;
    const response = await llm.invoke(fullPrompt);
    console.log(response.text)

    const responseText = response.text || '';
    const parsed = JSON.parse(responseText);
    console.log(parsed)

    const result = await fetchTmdbIds(parsed.map((item: { title: string, year: number }) => ({
      title: item.title,
      year: item.year,
    })));
        
    return NextResponse.json({ message: 'Input processed successfully', movies: result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
