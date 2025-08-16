import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface AnswerStreamProps {
  answer: string;
  isLoading: boolean;
  error: string | null;
}

export default function AnswerStream({ answer, isLoading, error }: AnswerStreamProps) {
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (isLoading && !answer) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Generating answer...</Text>
      </View>
    );
  }

  if (!answer && !isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Answer</Text>
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
        {isLoading && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>▋</Text>
          </View>
        )}
      </View>
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
    marginBottom: 12,
  },
  answerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  answerText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    flex: 1,
  },
  typingIndicator: {
    marginLeft: 4,
  },
  typingText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
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
