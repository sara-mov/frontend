import { supabase } from "@/lib/supabase";

export async function fetchMoviesByGenre(genre: string) {
    console.log(genre)
    const { data, error } = await supabase
      .from('movies')
      // .from('hi_mr_movies')
      .select('*')
      .contains('genres', [genre])
      // .in('original_language', ['hi', 'en'])
      // .order('popularity', { ascending: false })
      .limit(50);
  
    if (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  
    return data;
  }