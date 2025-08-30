import InteractiveShowCard from '@/components/InteractiveShowCard';
import { Box, Heading, Text } from '@/components/ui';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchShows } from '@/hooks/use-shows';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchShows } from '../../../../packages/api/src/types/show';

export default function SearchScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [shows, setShows] = useState<SearchShows[] | undefined>(undefined);
    const router = useRouter();

    const { data: searchResults, isLoading, error } = useSearchShows(debouncedSearchTerm);

    useEffect(() => {
        if (debouncedSearchTerm.length >= 3 && searchResults) {
            setShows(searchResults);
        } else {
            setShows(undefined);
        }
    }, [debouncedSearchTerm, searchResults]);

    if (error) {
        return (
            <View className="flex-1 items-center justify-center bg-slate-900">
                <Text className="text-red-500">Error al realizar la búsqueda</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <View className="px-4 py-6">
                {/* Barra de búsqueda */}
                <Box className="mb-6">
                    <Heading className="mb-4 text-3xl font-black text-white">Buscar Shows</Heading>
                    <TextInput
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                        placeholder="Escribe el nombre del show..."
                        placeholderTextColor="#94A3B8"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        style={{ fontSize: 16 }}
                    />
                </Box>

                {/* Resultados */}
                {isLoading && debouncedSearchTerm.length > 0 && (
                    <Box className="flex-1 items-center justify-center">
                        <Box className="mb-6 h-16 w-16 animate-pulse rounded-full bg-violet-500/20" />
                        <Heading className="mb-2 text-2xl font-black text-white">
                            Buscando...
                        </Heading>
                        <Text className="text-base text-white/60">Encontrando resultados</Text>
                    </Box>
                )}

                {debouncedSearchTerm.length === 0 && (
                    <Box className="flex-1 items-center justify-center">
                        <Text className="mb-2 text-xl font-bold text-white/70">
                            Comienza a escribir
                        </Text>
                        <Text className="text-base text-white/50">
                            para buscar tu serie o película favorita
                        </Text>
                    </Box>
                )}

                {(!shows || shows.length === 0) && !isLoading && (
                    <Box className="flex-1 items-center justify-center">
                        <Text className="mb-2 text-xl font-bold text-white/70">Sin resultados</Text>
                        <Text className="text-base text-white/50">
                            No se encontraron shows con &quot;{debouncedSearchTerm}&quot;
                        </Text>
                    </Box>
                )}

                {shows && shows.length > 0 && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {shows.map((show) => (
                            <InteractiveShowCard
                                key={show.id}
                                show={show}
                                onPress={() => router.push(`/detail/${show.id}`)}
                                style={{ width: '100%', marginBottom: 16 }}
                                userScore={Number(show.myScore) || undefined}
                            />
                        ))}
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
}
