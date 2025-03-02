import { supabase } from "@/lib/supabase";

export async function fetchMoviesByGenre(genre: string) {
    console.log(genre)
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .contains('genres', [genre])
      .order('popularity', { ascending: false })
      .limit(50);
  
    if (error) {
      console.error('Error fetching movies:', error);
      return [];
    }

    console.log(data)
  
    return data;
  }