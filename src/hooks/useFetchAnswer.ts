import { useState, useEffect, useCallback } from 'react';
import { fetchAnswer } from '../api/answer';

interface UseFetchAnswerReturn {
  answer: string;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function useFetchAnswer(query: string): UseFetchAnswerReturn {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setAnswer('');
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
        setAnswer('');

        abortController = new AbortController();
        
        await fetchAnswer(query, {
          onChunk: (chunk: string) => {
            setAnswer(prev => prev + chunk);
          },
          onComplete: () => {
            setIsLoading(false);
          },
          onError: (errorMessage: string) => {
            setError(errorMessage);
            setIsLoading(false);
          },
        }, abortController.signal);

      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [query, reset]);

  return {
    answer,
    isLoading,
    error,
    reset,
  };
}
