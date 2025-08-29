import { AnimatedSkeleton } from '@/components/AnimatedSkeleton';
import InteractiveShowCard from '@/components/InteractiveShowCard';
import { Badge, BadgeText, Box, Heading, Text } from '@/components/ui';
import { useShowsByCategory } from '@/hooks/use-shows';
import { Category } from '@prisma/client';
import { Sparkles, TrendingUp } from 'lucide-react-native';
import { useCallback, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';

import { categoryLabels, Shows } from '../../../packages/api/src/types/show';

interface CategoryCarouselProps {
    category: Category;
    onShowPress: (showId: string) => void;
}

const CategoryCarousel = ({ category, onShowPress }: CategoryCarouselProps) => {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useShowsByCategory({ category });

    const loadingMore = useRef(false);

    const handleEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage && !loadingMore.current) {
            loadingMore.current = true;
            fetchNextPage().finally(() => {
                setTimeout(() => {
                    loadingMore.current = false;
                }, 300);
            });
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
            <Box className="pl-2">
                <AnimatedSkeleton />
            </Box>
        );
    }, [isFetchingNextPage]);

    const keyExtractor = useCallback((item: Shows) => item.id, []);

    if (error) {
        return <Text className="p-4 text-center text-red-500">Error: {error.message}</Text>;
    }

    if (isLoading) {
        return (
            <Box className="py-6">
                <Heading className="mb-4 px-4 text-xl font-bold text-white">
                    {categoryLabels[category]}
                </Heading>
                <FlatList
                    horizontal
                    data={Array(5).fill(null)}
                    renderItem={() => <AnimatedSkeleton />}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </Box>
        );
    }

    if (!data?.shows || data.shows.length === 0) {
        return null;
    }

    return (
        <Box className="py-3">
            <Box className="bg-violet-500/8 mx-4 mb-4 rounded-3xl border border-violet-500/20 px-5 py-4">
                <Box className="mb-2 flex-row items-center justify-between">
                    <Box className="flex-1 flex-row items-center gap-3">
                        {getCategoryIcon}
                        <Heading className="flex-1 text-2xl font-bold tracking-tight text-white">
                            {categoryLabels[category]}
                        </Heading>
                        <Badge className="h-8 min-w-8 rounded-2xl border-2 border-white/30 bg-violet-500/90">
                            <BadgeText className="text-center text-sm font-black text-white">
                                {data?.shows.length}
                            </BadgeText>
                        </Badge>
                    </Box>
                </Box>
                <Box className="mt-2 h-1 w-10 rounded-sm bg-violet-500" />
            </Box>

            <FlatList
                data={data?.shows}
                renderItem={renderShow}
                keyExtractor={keyExtractor}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
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
                ItemSeparatorComponent={() => <Box className="w-1" />}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                removeClippedSubviews
                updateCellsBatchingPeriod={50}
            />
        </Box>
    );
};

export default CategoryCarousel;
