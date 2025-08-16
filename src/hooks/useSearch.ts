import { useState, useEffect, useCallback } from 'react';
import { fetchSearch } from '../api/search';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  url?: string;
  relevance: number;
}

interface UseSearchReturn {
  searchResults: SearchResult[];
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function useSearch(query: string): UseSearchReturn {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setSearchResults([]);
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      reset();
      return;
    }

    let abortController: AbortController | null = null;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setSearchResults([]);

        abortController = new AbortController();
        
        const results = await fetchSearch(query, abortController.signal);
        setSearchResults(results);
        setIsLoading(false);

      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    // Add a small delay to avoid excessive API calls while typing
    const timeoutId = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timeoutId);
      if (abortController) {
        abortController.abort();
      }
    };
  }, [query, reset]);

  return {
    searchResults,
    isLoading,
    error,
    reset,
  };
}
