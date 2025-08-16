import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import SearchBox from '../components/SearchBox';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleSearch = (searchQuery: string) => {
    console.log('Search query:', searchQuery);
    setQuery(searchQuery);
    setSearchSubmitted(true);
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
            <Text style={styles.resultsTitle}>Search Results for: "{query}"</Text>
            <Text style={styles.resultsDescription}>
              This is a placeholder for the actual search results. 
              In the full version, you would see AI-generated answers and citations here.
            </Text>
            <View style={styles.mockResult}>
              <Text style={styles.mockResultTitle}>Sample Answer</Text>
              <Text style={styles.mockResultText}>
                This is where the AI-generated answer would appear. The system would process your query 
                and provide relevant information with proper citations and sources.
              </Text>
            </View>
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
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
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
});
