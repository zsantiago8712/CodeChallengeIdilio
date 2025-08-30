import InteractiveShowCard from '@/components/InteractiveShowCard';
import { Box, Heading, Text } from '@/components/ui';
import { useGetMyShows } from '@/hooks/use-shows';
import { useRouter } from 'expo-router';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyList() {
    const { data: myShows, isLoading, error } = useGetMyShows();
    const router = useRouter();

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-slate-900">
                <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
                <Box className="flex-1 items-center justify-center">
                    <Box className="mb-6 h-16 w-16 animate-pulse rounded-full bg-violet-500/20" />
                    <Heading className="mb-2 text-2xl font-black text-white">Cargando...</Heading>
                    <Text className="text-base text-white/60">Preparando el contenido</Text>
                </Box>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-red-500">Error al cargar la lista</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-slate-900 px-4 py-6">
            {myShows?.map((show) => (
                <InteractiveShowCard
                    key={show.id}
                    show={{
                        ...show,
                        myScore: show.myScore === undefined ? '' : show.myScore,
                    }}
                    onPress={() => router.push(`/detail/${show.id}`)}
                    style={{ width: '100%', marginBottom: 16 }} // Ajuste para ancho completo
                    userScore={show.myScore === undefined ? undefined : Number(show.myScore)}
                />
            ))}
        </ScrollView>
    );
}
