import { Box } from '@/components/ui';
import { useRefreshShows } from '@/hooks/use-shows';
import { Category } from '@prisma/client';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StatusBar } from 'react-native';
import CategoryCarousel from '../../components/CategoryCarousel';

export default function HomeScreen() {
    const router = useRouter();

    const [isRefreshing, setIsRefreshing] = useState(false);

    const { refresh } = useRefreshShows();

    const categories = Object.values(Category);

    const handleShowPress = (showId: string) => {
        router.push(`/show/${showId}`);
    };

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await refresh();

        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    }, [refresh]);

    const renderCategory = ({ item }: { item: Category }) => (
        <CategoryCarousel category={item} onShowPress={handleShowPress} />
    );

    return (
        <Box className="flex-1 bg-slate-900">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 40,
                    paddingBottom: 0,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        tintColor="#8B5CF6"
                        colors={['#8B5CF6']}
                        progressBackgroundColor="#1E293B"
                        title="Actualizando shows..."
                        titleColor="#FFFFFF"
                    />
                }
            />
        </Box>
    );
}
