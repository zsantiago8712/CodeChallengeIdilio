import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DownloadsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descargas</Text>
      <Text style={styles.subtitle}>Tus contenidos descargados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});
