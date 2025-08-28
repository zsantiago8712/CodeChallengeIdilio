import React from 'react';
import { FlatList, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import CategoryCarousel from '../../components/CategoryCarousel';
import { Category } from '@prisma/client';

/**
 * Home Screen - Shows carousel for each category
 * Each carousel handles its own data fetching
 */
export default function HomeScreen() {
  const router = useRouter();

  // Categorías a mostrar
  const categories = [
    Category.ACTION,
    Category.DRAMA,
    Category.COMEDY,
    Category.SCI_FI,
    Category.FANTASY,
    Category.HORROR,
    Category.ROMANCE,
  ];

  /**
   * Handle show selection
   */
  const handleShowPress = (showId: string) => {
    router.push(`/show/${showId}`);
  };

  /**
   * Render each category carousel
   */
  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryCarousel category={item} onShowPress={handleShowPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  contentContainer: {
    paddingBottom: 140,
  },
});
