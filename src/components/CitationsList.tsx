import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Citation {
  id: string;
  title: string;
  content: string;
  source: string;
  url?: string;
  relevance: number;
}

interface CitationsListProps {
  citations: Citation[];
  isLoading: boolean;
  error: string | null;
}

export default function CitationsList({ citations, isLoading, error }: CitationsListProps) {
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading citations: {error}</Text>
      </View>
    );
  }

  if (isLoading && citations.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Searching for sources...</Text>
      </View>
    );
  }

  if (citations.length === 0) {
    return null;
  }

  const renderCitation = ({ item }: { item: Citation }) => (
    <View style={styles.citationItem}>
      <View style={styles.citationHeader}>
        <Text style={styles.citationTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.relevanceBadge}>
          <Text style={styles.relevanceText}>{Math.round(item.relevance * 100)}%</Text>
        </View>
      </View>
      
      <Text style={styles.citationContent} numberOfLines={3}>
        {item.content}
      </Text>
      
      <View style={styles.citationFooter}>
        <Text style={styles.citationSource}>{item.source}</Text>
        {item.url && (
          <TouchableOpacity style={styles.linkButton}>
            <Ionicons name="open-outline" size={16} color="#007AFF" />
            <Text style={styles.linkText}>Open</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sources & Citations</Text>
      <FlatList
        data={citations}
        renderItem={renderCitation}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loadingMore}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.loadingMoreText}>Loading more sources...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  citationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
  },
  citationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  citationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  relevanceBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  relevanceText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '600',
  },
  citationContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  citationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  citationSource: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  linkText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  loadingMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  loadingMoreText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    fontSize: 16,
    color: '#c62828',
  },
});
