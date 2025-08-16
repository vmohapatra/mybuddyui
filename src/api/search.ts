interface SearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  url?: string;
  relevance: number;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}

export async function fetchSearch(
  query: string, 
  signal: AbortSignal
): Promise<SearchResult[]> {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SearchResponse = await response.json();
    return data.results || [];

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        // Request was aborted, return empty results
        return [];
      }
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}
