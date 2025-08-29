import { Badge, Box, Heading, Text } from '@/components/ui';
import { useDeleteLikeShow, useSetLikeShow, useSetShowScore, useShowByID } from '@/hooks/use-shows';
import { Category } from '@prisma/client';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    Calendar,
    ChevronDown,
    Clock,
    Download,
    Heart,
    Play,
    Share,
    Star,
    Tv,
} from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categoryLabels } from '../../../../packages/api/src/types/show';

const { width } = Dimensions.get('window');

export default function DetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const { data: show, isLoading, error } = useShowByID(id);

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [showSeasonModal, setShowSeasonModal] = useState(false);
    const [userRating, setUserRating] = useState<number>(0);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [numLikes, setNumLikes] = useState(0);

    const { mutateAsync: setLikeShow } = useSetLikeShow();
    const { mutateAsync: deleteLikeShow } = useDeleteLikeShow();
    const { mutateAsync: setShowScore } = useSetShowScore();

    // Sincronizar estados locales cuando lleguen los datos del servidor
    useEffect(() => {
        if (show) {
            setUserRating(Number(show.myScore) || 0);
            console.log('show.myScore', show.myScore);
            setIsLiked(show.isLiked || false);
            setNumLikes(show.numLikes || 0);
        }
    }, [show]);

    // Agrupar episodios por temporada
    const episodesBySeason = useMemo(() => {
        if (!show?.episodes) return {};

        return show.episodes.reduce((acc: Record<number, typeof show.episodes>, episode) => {
            const season = episode.num_season;
            if (!acc[season]) {
                acc[season] = [];
            }
            acc[season].push(episode);
            return acc;
        }, {});
    }, [show]);

    if ((error || !show) && !isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-slate-900">
                <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
                <Box className="flex-1 items-center justify-center px-6">
                    <Box className="mb-8 h-24 w-24 items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10">
                        <Text className="text-4xl">⚠️</Text>
                    </Box>
                    <Heading className="mb-4 text-center text-3xl font-black tracking-tight text-white">
                        ¡Oops! Algo salió mal
                    </Heading>
                    <Text className="mb-10 max-w-sm text-center text-lg leading-7 text-white/60">
                        No pudimos cargar los detalles del contenido. Inténtalo de nuevo más tarde.
                    </Text>
                    <TouchableOpacity
                        className="flex-row items-center rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 shadow-2xl shadow-violet-500/40"
                        onPress={() => router.back()}
                        activeOpacity={0.9}>
                        <ArrowLeft size={22} color="#FFFFFF" />
                        <Text className="ml-3 text-lg font-black tracking-tight text-white">
                            Volver al inicio
                        </Text>
                    </TouchableOpacity>
                </Box>
            </SafeAreaView>
        );
    }

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

    if (!show) {
        return null;
    }

    const seasons = Object.keys(episodesBySeason)
        .map(Number)
        .sort((a, b) => a - b);
    const currentSeasonEpisodes = episodesBySeason[selectedSeason] || [];

    const handleLikePress = (show_id: string) => {
        if (isLiked) {
            deleteLikeShow({
                show_id: show_id,
            });
            setNumLikes(numLikes - 1);
        } else {
            setLikeShow({
                show_id: show_id,
            });
            setNumLikes(numLikes + 1);
        }
        setIsLiked(!isLiked);
    };

    const SeasonSelector = () => (
        <TouchableOpacity
            className="bg-white/8 flex-row items-center rounded-xl border border-white/15 px-4 py-3"
            onPress={() => setShowSeasonModal(true)}
            activeOpacity={0.8}>
            <Calendar size={16} color="#8B5CF6" />
            <Text className="ml-2 mr-1 text-sm font-bold text-white">
                Temporada {selectedSeason}
            </Text>
            <ChevronDown size={16} color="#FFFFFF" />
        </TouchableOpacity>
    );

    // Modal selector de temporadas
    const SeasonModal = () => (
        <Modal
            visible={showSeasonModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowSeasonModal(false)}>
            <TouchableOpacity
                className="flex-1 items-center justify-center bg-black/60 px-6"
                activeOpacity={1}
                onPress={() => setShowSeasonModal(false)}>
                <Box className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-800 p-6">
                    <Heading className="mb-6 text-center text-xl font-bold text-white">
                        Seleccionar Temporada
                    </Heading>
                    <ScrollView showsVerticalScrollIndicator={false} className="max-h-64">
                        {seasons.map((season) => (
                            <TouchableOpacity
                                key={season}
                                className={`mb-2 flex-row items-center justify-between rounded-xl p-4 ${
                                    selectedSeason === season
                                        ? 'border border-violet-500/40 bg-violet-500/20'
                                        : 'border border-white/10 bg-white/5'
                                }`}
                                onPress={() => {
                                    setSelectedSeason(season);
                                    setShowSeasonModal(false);
                                }}
                                activeOpacity={0.8}>
                                <Box className="flex-row items-center">
                                    <Calendar
                                        size={20}
                                        color={selectedSeason === season ? '#8B5CF6' : '#FFFFFF'}
                                    />
                                    <Text
                                        className={`ml-3 text-lg font-bold ${
                                            selectedSeason === season
                                                ? 'text-violet-400'
                                                : 'text-white'
                                        }`}>
                                        Temporada {season}
                                    </Text>
                                </Box>
                                <Text className="text-sm font-medium text-white/60">
                                    {episodesBySeason[season]?.length} episodios
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Box>
            </TouchableOpacity>
        </Modal>
    );

    // Componente de rating con estrellas
    const StarRating = ({
        rating,
        show_id,
        onRatingChange,
    }: {
        rating: number;
        show_id: string;
        onRatingChange: (rating: number, show_id: string) => void;
    }) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const isFullStar = rating >= i;
            const isHalfStar = rating >= i - 0.5 && rating < i;

            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => onRatingChange(i, show_id)}
                    onLongPress={() => onRatingChange(i - 0.5, show_id)}
                    activeOpacity={0.7}
                    className="mx-1">
                    <Box className="relative">
                        {isHalfStar ? (
                            <Box className="flex-row">
                                <Box className="overflow-hidden" style={{ width: 12 }}>
                                    <Star size={24} color="#FFD700" fill="#FFD700" />
                                </Box>
                                <Box style={{ marginLeft: -12, width: 12 }}>
                                    <Star size={24} color="#4B5563" fill="transparent" />
                                </Box>
                            </Box>
                        ) : (
                            <Star
                                size={24}
                                color={isFullStar ? '#FFD700' : '#4B5563'}
                                fill={isFullStar ? '#FFD700' : 'transparent'}
                            />
                        )}
                    </Box>
                </TouchableOpacity>
            );
        }

        return <Box className="flex-row items-center justify-center">{stars}</Box>;
    };

    // Modal de calificación
    const RatingModal = () => (
        <Modal
            visible={showRatingModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowRatingModal(false)}>
            <TouchableOpacity
                className="flex-1 items-center justify-center bg-black/70 px-6"
                activeOpacity={1}
                onPress={() => setShowRatingModal(false)}>
                <Box className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-slate-800 p-8">
                    {/* Botón cerrar */}
                    <TouchableOpacity
                        className="absolute right-4 top-4 h-8 w-8 items-center justify-center rounded-full bg-white/10"
                        onPress={() => setShowRatingModal(false)}
                        activeOpacity={0.7}>
                        <Text className="text-lg font-bold text-white">×</Text>
                    </TouchableOpacity>

                    <Heading className="mb-2 text-center text-2xl font-bold text-white">
                        Calificar Serie
                    </Heading>
                    <Text className="mb-6 text-center text-white/70">
                        Toca para calificar de 1 a 5, mantén presionado para media estrella
                    </Text>

                    <StarRating
                        rating={userRating}
                        show_id={id}
                        onRatingChange={(rating, show_id) => {
                            setUserRating(rating);
                            setShowScore({ show_id: show_id, score: rating });
                            setShowRatingModal(false);
                        }}
                    />

                    <Text className="mt-4 text-center text-lg font-semibold text-white">
                        {userRating > 0
                            ? `${userRating}/5 estrellas`
                            : 'Selecciona tu calificación'}
                    </Text>
                </Box>
            </TouchableOpacity>
        </Modal>
    );

    const renderEpisode = ({
        item,
        index,
    }: {
        item: NonNullable<typeof show>['episodes'][0];
        index: number;
    }) => (
        <TouchableOpacity
            className="bg-white/3 mb-4 rounded-3xl border-2 border-violet-500/30 p-5 shadow-xl shadow-violet-500/20 transition-colors hover:border-violet-500/50"
            activeOpacity={0.9}>
            <Box className="mb-4 flex-row items-center">
                <Box className="mr-4 h-12 w-12 items-center justify-center rounded-xl border border-yellow-500/40 bg-yellow-600/80 shadow-lg shadow-yellow-600/30">
                    <Text className="text-lg font-black text-white">{item.num_episode}</Text>
                </Box>
                <Box className="flex-1">
                    <Text
                        className="mb-1 text-lg font-black leading-6 text-white"
                        numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Box className="flex-row items-center gap-4">
                        <Box className="flex-row items-center">
                            <Clock size={12} color="#8B5CF6" />
                            <Text className="ml-1 text-xs font-semibold text-violet-400">
                                {item.duration} min
                            </Text>
                        </Box>
                        <Box className="flex-row items-center">
                            <Star size={12} color="#FFD700" fill="#FFD700" />
                            <Text className="ml-1 text-xs font-semibold text-yellow-400">
                                {item.score || 0}
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <TouchableOpacity
                    className="h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
                    activeOpacity={0.8}>
                    <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
            </Box>

            <Text className="mb-3 text-sm leading-6 text-white/70" numberOfLines={3}>
                {item.description}
            </Text>

            <Box className="flex-row items-center justify-between">
                <Badge
                    className={`${index < 3 ? 'border-green-500/40 bg-green-500/20' : 'border-blue-500/40 bg-blue-500/20'}`}>
                    <Text
                        className={`text-xs font-bold ${index < 3 ? 'text-green-400' : 'text-blue-400'}`}>
                        {index < 3 ? '✓ Visto' : '• Nuevo'}
                    </Text>
                </Badge>
                <TouchableOpacity className="flex-row items-center">
                    <Download size={14} color="#8B5CF6" />
                    <Text className="ml-1 text-xs font-bold text-violet-400">Descargar</Text>
                </TouchableOpacity>
            </Box>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* Hero Section Mejorado */}
                <Box className="relative">
                    <Image
                        source={{ uri: show.showImages?.[0]?.url }}
                        style={{ width: width, height: 420 }}
                        className="bg-slate-800"
                        resizeMode="cover"
                    />

                    {/* Gradiente overlay mejorado */}
                    <Box className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />

                    {/* Header con botones flotantes */}
                    <Box className="absolute left-0 right-0 top-12 flex-row items-start justify-between px-6">
                        <TouchableOpacity
                            className="h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl"
                            onPress={() => router.back()}
                            activeOpacity={0.8}>
                            <ArrowLeft size={20} color="#FFFFFF" />
                        </TouchableOpacity>

                        <Box className="flex-row gap-3">
                            <TouchableOpacity
                                className={`h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl ${
                                    isLiked
                                        ? 'border-red-500/50 bg-red-500/20'
                                        : 'border-white/20 bg-black/60'
                                }`}
                                onPress={() => handleLikePress(show.id || '')}
                                activeOpacity={0.8}>
                                <Heart
                                    size={18}
                                    color={isLiked ? '#EF4444' : '#FFFFFF'}
                                    fill={isLiked ? '#EF4444' : 'none'}
                                />
                            </TouchableOpacity>
                        </Box>
                    </Box>

                    {/* Información del show en hero */}
                    <Box className="absolute bottom-0 left-0 right-0 p-6">
                        <Heading className="mb-3 text-4xl font-black leading-tight tracking-tight text-white">
                            {show.name}
                        </Heading>
                        <Box className="mb-4 flex-row items-center">
                            <Box className="mr-3 flex-row items-center rounded-xl bg-black/40 px-3 py-2 backdrop-blur-xl">
                                <Star size={14} color="#FFD700" fill="#FFD700" />
                                <Text className="ml-1 text-sm font-bold text-white">
                                    {show.score}
                                </Text>
                            </Box>
                            <Box className="mr-3 rounded-xl bg-black/40 px-3 py-2 backdrop-blur-xl">
                                <Text className="text-sm font-bold text-white">
                                    {show.year_released}
                                </Text>
                            </Box>
                            <Box className="mr-3 rounded-xl bg-black/40 px-3 py-2 backdrop-blur-xl">
                                <Text className="text-sm font-bold text-white">HD</Text>
                            </Box>
                            {userRating > 0 && (
                                <Box className="flex-row items-center rounded-xl border border-yellow-500/40 bg-yellow-500/20 px-3 py-2 backdrop-blur-xl">
                                    <Star size={12} color="#FFD700" fill="#FFD700" />
                                    <Text className="ml-1 text-sm font-bold text-yellow-400">
                                        Mi {userRating}
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Contenido principal */}
                <Box className="px-6 py-8">
                    {/* Botones de acción principales */}
                    <Box className="mb-8 flex-row">
                        <TouchableOpacity
                            className="mr-4 flex-1 flex-row items-center justify-center rounded-2xl bg-white py-4 shadow-xl shadow-white/20"
                            activeOpacity={0.9}>
                            <Play size={22} color="#000000" fill="#000000" />
                            <Text className="ml-3 text-lg font-black tracking-tight text-black">
                                Reproducir
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="mr-3 h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
                            activeOpacity={0.8}>
                            <Download size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="mr-3 h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
                            activeOpacity={0.8}>
                            <Share size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`h-14 w-14 items-center justify-center rounded-2xl border ${
                                userRating > 0
                                    ? 'border-yellow-500/50 bg-yellow-500/20'
                                    : 'border-white/20 bg-white/10'
                            }`}
                            onPress={() => setShowRatingModal(true)}
                            activeOpacity={0.8}>
                            <Star
                                size={24}
                                color={userRating > 0 ? '#FFD700' : '#FFFFFF'}
                                fill={userRating > 0 ? '#FFD700' : 'none'}
                            />
                        </TouchableOpacity>
                    </Box>

                    {/* Estadísticas mejoradas */}
                    <Box className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                        <Box className="flex-row justify-between">
                            <Box className="flex-1 items-center">
                                <Box className="mb-1 flex-row items-center">
                                    <Play size={16} color="#8B5CF6" />
                                    <Text className="ml-1 text-xl font-black text-white">
                                        {show.episodes?.length || 12}
                                    </Text>
                                </Box>
                                <Text className="text-sm font-semibold text-white/60">
                                    Episodios
                                </Text>
                            </Box>
                            <Box className="h-12 w-px bg-white/20" />
                            <Box className="flex-1 items-center">
                                <Box className="mb-1 flex-row items-center">
                                    <Tv size={16} color="#10B981" />
                                    <Text className="ml-1 text-xl font-black text-white">
                                        {seasons.length}
                                    </Text>
                                </Box>
                                <Text className="text-sm font-semibold text-white/60">
                                    Temporadas
                                </Text>
                            </Box>
                            <Box className="h-12 w-px bg-white/20" />
                            <Box className="flex-1 items-center">
                                <Box className="mb-1 flex-row items-center">
                                    <Heart size={16} color="#EC4899" />
                                    <Text className="ml-1 text-xl font-black text-white">
                                        {numLikes}
                                    </Text>
                                </Box>
                                <Text className="text-sm font-semibold text-white/60">
                                    Me gusta
                                </Text>
                            </Box>
                            <Box className="h-12 w-px bg-white/20" />
                            <Box className="flex-1 items-center">
                                <Box className="mb-1 flex-row items-center">
                                    <Star
                                        size={16}
                                        color="#FFD700"
                                        fill={userRating > 0 ? '#FFD700' : 'none'}
                                    />
                                    <Text className="ml-1 text-xl font-black text-white">
                                        {userRating > 0 ? userRating.toFixed(1) : '0.0'}
                                    </Text>
                                </Box>
                                <Text className="text-sm font-semibold text-white/60">
                                    Tu calificación
                                </Text>
                            </Box>
                        </Box>
                    </Box>

                    {/* Descripción */}
                    <Box className="mb-8">
                        <Heading className="mb-4 text-xl font-black tracking-tight text-white">
                            Sinopsis
                        </Heading>
                        <Text className="mb-4 text-base leading-7 text-white/80">
                            {show.description}
                        </Text>
                        <Box className="flex-row flex-wrap gap-2">
                            <Badge className="border-violet-500/40 bg-violet-500/20">
                                <Text className="text-xs font-bold text-violet-400">
                                    {categoryLabels[show.category as Category]}
                                </Text>
                            </Badge>

                            <Badge className="border-green-500/40 bg-green-500/20">
                                <Text className="text-xs font-bold text-green-400">
                                    {show.year_released}
                                </Text>
                            </Badge>
                        </Box>
                    </Box>

                    {/* Sección de episodios con selector de temporadas */}
                    <Box className="mb-6">
                        <Box className="mb-6 flex-row items-center justify-between">
                            <Heading className="text-2xl font-black tracking-tight text-white">
                                Episodios
                            </Heading>
                            <SeasonSelector />
                        </Box>

                        <FlatList
                            data={currentSeasonEpisodes}
                            renderItem={renderEpisode}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                        />
                    </Box>
                </Box>
            </ScrollView>

            <SeasonModal />
            <RatingModal />
        </SafeAreaView>
    );
}
