import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SearchBox from '../components/SearchBox';
import AnswerStream from '../components/AnswerStream';
import CitationsList from '../components/CitationsList';
import { useFetchAnswer } from '../hooks/useFetchAnswer';
import { useSearch } from '../hooks/useSearch';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { answer, isLoading: isAnswerLoading, error: answerError } = useFetchAnswer(query);
  const { searchResults, isLoading: isSearchLoading, error: searchError } = useSearch(query);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
  };

  return (
    <View style={styles.container}>
      <SearchBox onSearch={handleSearch} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {query && (
          <>
            <AnswerStream 
              answer={answer} 
              isLoading={isAnswerLoading} 
              error={answerError} 
            />
            <CitationsList 
              citations={searchResults} 
              isLoading={isSearchLoading} 
              error={searchError} 
            />
          </>
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
});
