/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { setLatestResult, getLatestResult } from '@/lib/state';
import Fuse from 'fuse.js';

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

const llm = new ChatGroq({
  model: 'llama-3.3-70b-versatile',
  apiKey: apiKey,
  temperature: 0,
});

const instruction =
  "Return only a array of objects containing exactly 5 movie titles as strings and year as number. No IMDb IDs, no extra text, no explanation — just a list of 5 movie names and year. Now process this query: ";
  
  async function getTmdbId(movieName: string): Promise<number | null> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(movieName)}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
  
      const data = await response.json();
      const results = data.results;
      if (!results || results.length === 0) return null;
  
      const fuse = new Fuse(results, {
        keys: ['title'],
        threshold: 0.3,
      });
  
      const [bestMatch] = fuse.search(movieName);
      return bestMatch && typeof bestMatch.item === 'object' && bestMatch.item !== null && 'id' in bestMatch.item
        ? (bestMatch.item as { id: number }).id
        : null;
    } catch {
      return null;
    }
  }
  
  export async function fetchTmdbIds(movieNames: string[]): Promise<number[]> {
    const idPromises = movieNames.map(getTmdbId);
    const ids = await Promise.all(idPromises);
    return ids.filter((id): id is number => id !== null); // Removes nulls
  }

export async function GET() {
  const result = getLatestResult();

  if (!result) {
    return NextResponse.json({ message: 'No input has been processed yet' }, { status: 404 });
  }

  return NextResponse.json({ movies: result });
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

    const responseText = response.text || '';
    const parsed = JSON.parse(responseText.replace(/'/g, '"'));
    // console.log(parsed)

    const result = await fetchTmdbIds(parsed.map((item: { title: string }) => item.title));
    

    setLatestResult(result);
    return NextResponse.json({ message: 'Input processed successfully', movies: result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
