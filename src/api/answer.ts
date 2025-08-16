interface AnswerCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
}

export async function fetchAnswer(
  query: string, 
  callbacks: AnswerCallbacks, 
  signal: AbortSignal
): Promise<void> {
  try {
    const response = await fetch('/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({ query }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          callbacks.onComplete();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove 'data: ' prefix
            
            if (data === '[DONE]') {
              callbacks.onComplete();
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.chunk) {
                callbacks.onChunk(parsed.chunk);
              }
            } catch (parseError) {
              // If it's not JSON, treat it as plain text
              if (data.trim()) {
                callbacks.onChunk(data);
              }
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        // Request was aborted, don't call onError
        return;
      }
      callbacks.onError(error.message);
    } else {
      callbacks.onError('An unknown error occurred');
    }
  }
}
