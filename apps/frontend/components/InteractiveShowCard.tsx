import { Badge, Box, Text } from '@/components/ui';
import { useDeleteLikeShow, useSetLikeShow } from '@/hooks/use-shows';
import { Heart, Play } from 'lucide-react-native';
import { memo, useCallback, useEffect, useState } from 'react';
import { Animated, Image, TouchableOpacity } from 'react-native';
import { Shows, categoryLabels } from '../../../packages/api/src/types/show';

interface InteractiveShowCardProps {
    show: Shows;
    onPress: (showId: string) => void;
    width?: number;
}

const InteractiveShowCard = memo(({ show, onPress, width = 150 }: InteractiveShowCardProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [scaleAnim] = useState(new Animated.Value(1));
    const [opacityAnim] = useState(new Animated.Value(1));
    const [isLiked, setIsLiked] = useState(false);
    const { mutateAsync: setLikeShow } = useSetLikeShow();
    const { mutateAsync: deleteLikeShow } = useDeleteLikeShow();

    useEffect(() => {
        setIsLiked(show.isLiked || false);
    }, [show]);

    // Usar la primera imagen disponible
    const firstImage = show.showImages[0]?.url || '';

    const handlePressIn = useCallback(() => {
        setIsPressed(true);
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.97,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, [scaleAnim, opacityAnim]);

    const handlePressOut = useCallback(() => {
        setIsPressed(false);
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    }, [scaleAnim, opacityAnim]);

    const handleLikePress = useCallback(
        (show_id: string) => {
            if (isLiked) {
                deleteLikeShow({
                    show_id: show_id,
                });
                setIsLiked(false);
            } else {
                setLikeShow({
                    show_id: show_id,
                });
                setIsLiked(true);
            }
        },
        [isLiked, setLikeShow, deleteLikeShow]
    );

    return (
        <Animated.View
            style={[
                { width },
                {
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}
            className="mb-4 mr-4">
            <TouchableOpacity
                onPress={() => onPress(show.id)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
                className="rounded-3xl border border-white/10 bg-white/5 p-2.5 shadow-xl">
                <Box className="relative overflow-hidden rounded-2xl">
                    <Image
                        source={{ uri: firstImage }}
                        style={{ width: '100%', height: 240 }}
                        className="bg-white/10"
                        resizeMode="cover"
                    />

                    <Box className="absolute inset-0 justify-between bg-black/30 p-4">
                        <Box className="flex-row items-start justify-between">
                            <Text className="rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-yellow-400">
                                ★ {show.score}
                            </Text>
                            <Badge className="border-white/20 bg-violet-500/90">
                                <Text className="text-xs font-extrabold tracking-wide text-white">
                                    HD
                                </Text>
                            </Badge>
                        </Box>

                        <Box className="flex-row items-center justify-between">
                            <TouchableOpacity className="flex-row items-center rounded-full border border-violet-500/40 bg-violet-500/20 px-3 py-1.5">
                                <Play size={14} color="#8B5CF6" />
                                <Text className="ml-1 text-xs font-semibold text-violet-400">
                                    Play
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`h-9 w-9 items-center justify-center rounded-full ${
                                    isLiked
                                        ? 'border border-red-500/40 bg-red-500/20'
                                        : 'border border-white/20 bg-white/15'
                                }`}
                                onPress={() => handleLikePress(show.id)}>
                                <Heart
                                    size={16}
                                    color={isLiked ? '#EF4444' : '#FFFFFF'}
                                    fill={isLiked ? '#EF4444' : 'none'}
                                />
                            </TouchableOpacity>
                        </Box>
                    </Box>

                    {isPressed && (
                        <Box className="border-3 absolute -inset-0.5 rounded-3xl border-violet-500/80 shadow-2xl shadow-violet-500/50">
                            <Box className="absolute inset-0.5 rounded-2xl bg-violet-500/10" />
                        </Box>
                    )}
                </Box>

                <Box className="p-4 pb-3">
                    <Text
                        className="mb-2 text-lg font-extrabold leading-6 tracking-tight text-white"
                        numberOfLines={2}>
                        {show.name}
                    </Text>
                    <Box className="mb-2 flex-row items-center">
                        <Badge className="mr-2 bg-violet-500/20">
                            <Text className="text-xs font-bold tracking-wide text-violet-400">
                                {categoryLabels[show.category]}
                            </Text>
                        </Badge>
                        <Text className="mx-1.5 text-xs text-white/40">•</Text>
                        <Text className="text-xs font-medium text-white/60">
                            {show.year_released}
                        </Text>
                        <Text className="mx-1.5 text-xs text-white/40">•</Text>
                        <Text className="text-xs font-medium text-white/60">
                            {show.num_seasons} seasons
                        </Text>
                    </Box>
                    <Box className="h-0.5 overflow-hidden rounded-sm bg-white/10">
                        <Box className="h-full w-[65%] rounded-sm bg-violet-500" />
                    </Box>
                </Box>
            </TouchableOpacity>
        </Animated.View>
    );
});

InteractiveShowCard.displayName = 'InteractiveShowCard';

export default InteractiveShowCard;
