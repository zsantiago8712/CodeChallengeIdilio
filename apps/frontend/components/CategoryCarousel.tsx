import React, { useCallback, useRef, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { TrendingUp, Sparkles } from 'lucide-react-native';
import { useShowsByCategory } from '../hooks/use-shows';
import { Category } from '@prisma/client';
import { categoryLabels, Shows } from '../../../packages/api/src/types/show';
import { AnimatedSkeleton } from './AnimatedSkeleton';
import InteractiveShowCard from './InteractiveShowCard';

interface CategoryCarouselProps {
  category: Category;
  onShowPress: (showId: string) => void;
}

const CategoryCarousel = ({ category, onShowPress }: CategoryCarouselProps) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useShowsByCategory({ category });

  const loadingMore = useRef(false);

  // Memoizar las funciones de scroll para mejor rendimiento
  const handleScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const threshold = 100;
      const isEndReached =
        contentOffset.x + layoutMeasurement.width >= contentSize.width - threshold;

      if (isEndReached && hasNextPage && !isFetchingNextPage && !loadingMore.current) {
        loadingMore.current = true;
        fetchNextPage().finally(() => {
          setTimeout(() => {
            loadingMore.current = false;
          }, 500);
        });
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !loadingMore.current) {
      loadingMore.current = true;
      fetchNextPage().finally(() => {
        setTimeout(() => {
          loadingMore.current = false;
        }, 500);
      });
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Memoizar funciones que no cambian
  const getCategoryIcon = useMemo(() => {
    switch (category) {
      case Category.ACTION:
      case Category.COMEDY:
      case Category.DRAMA:
      case Category.FANTASY:
      case Category.HORROR:
      case Category.ROMANCE:
        return <Sparkles size={16} color="#8B5CF6" />;
      default:
        return <TrendingUp size={16} color="#8B5CF6" />;
    }
  }, [category]);

  const renderShow = useCallback(
    ({ item }: { item: Shows }) => (
      <InteractiveShowCard show={item} onPress={onShowPress} width={220} />
    ),
    [onShowPress]
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={{ paddingLeft: 8 }}>
        <AnimatedSkeleton />
      </View>
    );
  }, [isFetchingNextPage]);

  const keyExtractor = useCallback((item: Shows) => item.id, []);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (isLoading) {
    return (
      <View>
        <Text className="mb-4 text-xl font-bold text-white">{category}</Text>
        <FlatList
          horizontal
          data={Array(5).fill(null)}
          renderItem={() => <AnimatedSkeleton />}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  if (!data?.shows || data.shows.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            {getCategoryIcon}
            <Text style={styles.categoryTitle}>{categoryLabels[category]}</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{data?.shows.length}</Text>
            </View>
          </View>
          <View style={styles.titleUnderline} />
        </View>
      </View>
      <FlatList
        data={data?.shows}
        renderItem={renderShow}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        snapToInterval={236}
        decelerationRate="fast"
        snapToAlignment="start"
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={10}
        getItemLayout={(_, index) => ({
          length: 236,
          offset: 236 * index,
          index,
        })}
        ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.7}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={renderFooter}
        removeClippedSubviews
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  titleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.8,
    flex: 1,
  },
  countBadge: {
    minWidth: 32,
    height: 32,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
    marginTop: 8,
  },
  carouselContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default CategoryCarousel;
