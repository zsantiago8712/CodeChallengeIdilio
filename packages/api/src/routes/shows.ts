import { publicProcedure, router } from '../trpc';
import {
    getShowByIdSchema,
    getShowByTextSchema,
    getShowsSchema,
    setLikeShowSchema,
    setShowScoreSchema,
} from '../types/show';

export const showRouter = router({
    getShowsByCategory: publicProcedure.input(getShowsSchema).query(async ({ ctx, input }) => {
        const shows = await ctx.prisma.show.findMany({
            where: {
                category: input.category,
            },
            take: input.limit,
            cursor: input.cursor ? { id: input.cursor } : undefined,
            skip: input.cursor ? 1 : 0,
            orderBy: {
                id: 'asc',
            },
            select: {
                id: true,
                name: true,
                description: true,
                num_seasons: true,
                year_released: true,
                category: true,
                showImages: {
                    select: {
                        url: true,
                    },
                    take: 1,
                },
                showRatings: {
                    select: {
                        score: true,
                        user_id: true,
                    },
                },
                userLikeShows: {
                    select: {
                        user_id: true,
                    },
                },
            },
        });

        let nextCursor: string | undefined = undefined;

        if (shows.length >= input.limit) {
            const nextItem = shows[shows.length > input.limit ? input.limit : input.limit - 1];
            nextCursor = nextItem.id;
            shows.length = input.limit;
        } else {
            nextCursor = undefined;
        }

        const showWithAvg = shows.map((show) => {
            const avg =
                show.showRatings.length > 0
                    ? show.showRatings.reduce((acc, rating) => acc + rating.score, 0) /
                      show.showRatings.length
                    : 0;
            return {
                id: show.id,
                name: show.name,
                description: show.description,
                num_seasons: show.num_seasons,
                year_released: show.year_released,
                category: show.category,
                showImages: show.showImages,
                myScore: (
                    (show.showRatings.find((rating) => rating.user_id === ctx.user_id)?.score ||
                        0) / 2
                ).toFixed(1),
                isLiked: show.userLikeShows.some((like) => like.user_id === ctx.user_id),
                score: (avg / 2).toFixed(1),
            };
        });

        return {
            shows: showWithAvg,
            nextCursor,
        };
    }),

    getShowById: publicProcedure.input(getShowByIdSchema).query(async ({ ctx, input }) => {
        const show = await ctx.prisma.show.findUnique({
            where: {
                id: input.id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                num_seasons: true,
                showImages: {
                    select: {
                        url: true,
                    },
                },
                year_released: true,
                category: true,
                showRatings: {
                    select: {
                        score: true,
                        user_id: true,
                    },
                },
                userLikeShows: {
                    select: {
                        user_id: true,
                    },
                },
                episodes: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        num_season: true,
                        num_episode: true,
                        duration: true,
                        episodeRatings: {
                            select: {
                                score: true,
                            },
                        },
                    },
                },
            },
        });

        if (!show) {
            throw new Error('Show not found');
        }

        const showWithAvg = {
            id: show.id,
            name: show.name,
            description: show.description,
            num_seasons: show.num_seasons,
            year_released: show.year_released,
            category: show.category,
            showImages: show.showImages,
            myScore: (
                (show.showRatings.find((rating) => rating.user_id === ctx.user_id)?.score || 0) / 2
            ).toFixed(1),
            isLiked: show.userLikeShows.some((like) => like.user_id === ctx.user_id),
            numLikes: show.userLikeShows.length,

            score: (show.showRatings.length > 0
                ? show.showRatings.reduce((acc, rating) => acc + rating.score, 0) /
                  show.showRatings.length /
                  2
                : 0
            ).toFixed(1),
            episodes: show.episodes.map((episode) => {
                const avg =
                    episode.episodeRatings.length > 0
                        ? episode.episodeRatings.reduce((acc, rating) => acc + rating.score, 0) /
                          episode.episodeRatings.length
                        : 0;
                return {
                    id: episode.id,
                    name: episode.name,
                    description: episode.description,
                    num_season: episode.num_season,
                    num_episode: episode.num_episode,
                    duration: episode.duration,
                    score: (avg / 2).toFixed(1) || 0,
                };
            }),
        };

        return showWithAvg;
    }),

    getShowsForSearch: publicProcedure.input(getShowByTextSchema).query(async ({ ctx, input }) => {
        const shows = await ctx.prisma.show.findMany({
            where: {
                name: {
                    contains: input.text,
                    mode: 'insensitive',
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                num_seasons: true,
                year_released: true,
                category: true,
                showImages: {
                    select: {
                        url: true,
                    },
                    take: 1,
                },
                showRatings: {
                    select: {
                        score: true,
                        user_id: true,
                    },
                },
                userLikeShows: {
                    select: {
                        user_id: true,
                    },
                },
            },
        });

        const showWithAvg = shows.map((show) => {
            const avg =
                show.showRatings.length > 0
                    ? show.showRatings.reduce((acc, rating) => acc + rating.score, 0) /
                      show.showRatings.length
                    : 0;
            return {
                id: show.id,
                name: show.name,
                description: show.description,
                num_seasons: show.num_seasons,
                year_released: show.year_released,
                category: show.category,
                showImages: show.showImages,
                myScore: (
                    (show.showRatings.find((rating) => rating.user_id === ctx.user_id)?.score ||
                        0) / 2
                ).toFixed(1),
                isLiked: show.userLikeShows.some((like) => like.user_id === ctx.user_id),
                score: (avg / 2).toFixed(1),
            };
        });

        return showWithAvg;
    }),

    deleteLikeShow: publicProcedure.input(setLikeShowSchema).mutation(async ({ ctx, input }) => {
        await ctx.prisma.userLikeShows.delete({
            where: {
                user_id_show_id: {
                    user_id: ctx.user_id,
                    show_id: input.show_id,
                },
            },
        });

        return { success: true };
    }),

    setLikeShow: publicProcedure.input(setLikeShowSchema).mutation(async ({ ctx, input }) => {
        await ctx.prisma.userLikeShows.create({
            data: {
                user_id: ctx.user_id,
                show_id: input.show_id,
            },
        });

        return { success: true };
    }),

    setShowScore: publicProcedure.input(setShowScoreSchema).mutation(async ({ ctx, input }) => {
        const showRating = await ctx.prisma.showRating.upsert({
            where: {
                user_id_show_id: {
                    user_id: ctx.user_id,
                    show_id: input.show_id,
                },
            },
            update: {
                score: input.score * 2,
            },
            create: {
                user_id: ctx.user_id,
                show_id: input.show_id,
                score: input.score * 2,
            },
        });

        return { success: true, score: (showRating.score / 2).toFixed(1) };
    }),

    getMyShows: publicProcedure.query(async ({ ctx }) => {
        const shows = await ctx.prisma.show.findMany({
            where: {
                userLikeShows: {
                    some: {
                        user_id: ctx.user_id,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                num_seasons: true,
                year_released: true,
                category: true,
                showImages: {
                    select: {
                        url: true,
                    },
                    take: 1,
                },
                showRatings: {
                    select: {
                        score: true,
                        user_id: true,
                    },
                },
                userLikeShows: {
                    select: {
                        user_id: true,
                    },
                },
            },
        });

        const showWithAvg = shows.map((show) => {
            const avg =
                show.showRatings.length > 0
                    ? show.showRatings.reduce((acc, rating) => acc + rating.score, 0) /
                      show.showRatings.length
                    : 0;
            const myScore =
                show.showRatings.find((rating) => rating.user_id === ctx.user_id)?.score || 0;

            return {
                id: show.id,
                name: show.name,
                description: show.description,
                num_seasons: show.num_seasons,
                year_released: show.year_released,
                category: show.category,
                showImages: show.showImages,
                score: (avg / 2).toFixed(1),
                myScore: myScore === 0 ? undefined : (myScore / 2).toFixed(1),
                isLiked: show.userLikeShows.some((like) => like.user_id === ctx.user_id),
            };
        });

        return showWithAvg;
    }),
});
