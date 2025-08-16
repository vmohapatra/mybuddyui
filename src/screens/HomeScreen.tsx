import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import SearchBox from '../components/SearchBox';

interface Citation {
  id: string;
  title: string;
  content: string;
  source: string;
  url?: string;
  relevance: number;
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [citations, setCitations] = useState<Citation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    console.log('Search query:', searchQuery);
    setQuery(searchQuery);
    setSearchSubmitted(true);
    setIsLoading(true);
    setCurrentAnswer('');
    setCitations([]);
    setError(null);

    // Add to search history
    if (!searchHistory.includes(searchQuery)) {
      setSearchHistory((prev: string[]) => [searchQuery, ...prev.slice(0, 4)]);
    }

    // Simulate AI processing delay with potential errors
    setTimeout(() => {
      // Simulate random errors (10% chance)
      if (Math.random() < 0.1) {
        setIsLoading(false);
        setError('Sorry, the AI service is temporarily unavailable. Please try again in a few moments.');
        return;
      }

      setIsLoading(false);
      // Simulate AI answer generation
      setCurrentAnswer(`Here's what I found about "${searchQuery}":\n\nThis is a simulated AI-generated response that would normally come from an actual AI service. The system would analyze your query, search through relevant databases, and provide comprehensive answers with proper citations.\n\nIn a real implementation, you would see:\n• Detailed analysis of your question\n• Relevant facts and information\n• Multiple perspectives on the topic\n• Proper citations and sources\n• Related follow-up questions`);
      
      // Simulate citations
      setCitations([
        {
          id: '1',
          title: 'Primary Source on the Topic',
          content: 'This would be the main source material used to generate the answer.',
          source: 'Academic Database',
          url: 'https://example.com/source1',
          relevance: 0.95
        },
        {
          id: '2',
          title: 'Supporting Research',
          content: 'Additional research and studies that support the main findings.',
          source: 'Research Journal',
          url: 'https://example.com/source2',
          relevance: 0.87
        }
      ]);
    }, 2000);
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    handleSearch(historyQuery);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const retrySearch = () => {
    if (query) {
      handleSearch(query);
    }
  };

  const startNewSearch = () => {
    setSearchSubmitted(false);
    setQuery('');
    setCurrentAnswer('');
    setCitations([]);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <SearchBox onSearch={handleSearch} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!searchSubmitted ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>Welcome to MyBuddyUI</Text>
            <Text style={styles.subtitle}>Your AI-powered search assistant</Text>
            <Text style={styles.description}>
              Ask me anything and I'll help you find the answers you need. 
              Simply type your question in the search box above and press Enter or click Search.
            </Text>
            
            {searchHistory.length > 0 && (
              <View style={styles.historyContainer}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyTitle}>Recent Searches</Text>
                  <TouchableOpacity onPress={clearHistory}>
                    <Text style={styles.clearHistoryText}>Clear</Text>
                  </TouchableOpacity>
                </View>
                {searchHistory.map((historyQuery: string, index: number) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.historyItem}
                    onPress={() => handleHistoryClick(historyQuery)}
                  >
                    <Text style={styles.historyQuery}>{historyQuery}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Features:</Text>
              <Text style={styles.featureItem}>• AI-powered search and answers</Text>
              <Text style={styles.featureItem}>• Real-time streaming responses</Text>
              <Text style={styles.featureItem}>• Citation tracking and references</Text>
              <Text style={styles.featureItem}>• Cross-platform compatibility</Text>
            </View>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Search Results for: "{query}"</Text>
              <TouchableOpacity style={styles.newSearchButton} onPress={startNewSearch}>
                <Text style={styles.newSearchButtonText}>New Search</Text>
              </TouchableOpacity>
            </View>
            
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>AI is analyzing your query...</Text>
                <Text style={styles.loadingSubtext}>This may take a few moments</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorTitle}>Search Failed</Text>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={retrySearch}>
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.answerContainer}>
                  <Text style={styles.answerTitle}>AI Answer</Text>
                  <Text style={styles.answerText}>{currentAnswer}</Text>
                </View>
                
                {citations.length > 0 && (
                  <View style={styles.citationsContainer}>
                    <Text style={styles.citationsTitle}>Sources & Citations</Text>
                    {citations.map((citation: Citation) => (
                      <View key={citation.id} style={styles.citationItem}>
                        <View style={styles.citationHeader}>
                          <Text style={styles.citationTitle}>{citation.title}</Text>
                          <View style={styles.relevanceBadge}>
                            <Text style={styles.relevanceText}>{Math.round(citation.relevance * 100)}%</Text>
                          </View>
                        </View>
                        <Text style={styles.citationContent}>{citation.content}</Text>
                        <View style={styles.citationFooter}>
                          <Text style={styles.citationSource}>{citation.source}</Text>
                          <TouchableOpacity style={styles.linkButton}>
                            <Text style={styles.linkText}>Open Source</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    paddingLeft: 8,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  newSearchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  newSearchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 24,
  },
  mockResult: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  mockResultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  mockResultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  historyContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearHistoryText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  historyItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  historyQuery: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginTop: 15,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  answerContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  answerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  citationsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
  },
  citationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  citationItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  citationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  citationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  relevanceBadge: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  relevanceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796b',
  },
  citationContent: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    marginBottom: 10,
  },
  citationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  citationSource: {
    fontSize: 14,
    color: '#666',
  },
  linkButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#ffeeba',
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#856404',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
