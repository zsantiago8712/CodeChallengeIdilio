import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { getShowsSchema } from '../types/show';

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
                show.showRatings.reduce((acc, rating) => acc + rating.score, 0) /
                show.showRatings.length;
            return {
                ...show,
                score: avg.toFixed(1),
            };
        });

        return {
            shows: showWithAvg,
            nextCursor,
        };
    }),

    getShowById: publicProcedure.input(z.uuid()).query(async ({ ctx, input }) => {
        const show = await ctx.prisma.show.findUnique({
            where: {
                id: input,
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
                showRatings: {
                    select: {
                        score: true,
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
            ...show,
            score:
                (show.showRatings.reduce((acc, rating) => acc + rating.score, 0) ?? 0) /
                (show.showRatings.length ?? 1),
            episodes: show.episodes.map((episode) => {
                const avg =
                    episode.episodeRatings.reduce((acc, rating) => acc + rating.score, 0) /
                    episode.episodeRatings.length;
                return {
                    ...episode,
                    score: avg,
                };
            }),
        };

        return showWithAvg;
    }),

    getShowsForSearch: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const shows = await ctx.prisma.show.findMany({
            where: {
                name: {
                    contains: input,
                },
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
                    take: 1,
                },
            },
        });

        return shows;
    }),

    setShowScore: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                showId: z.uuid(),
                score: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const show = await ctx.prisma.showRating.create({
                data: {
                    user_id: input.userId,
                    show_id: input.showId,
                    score: input.score,
                },
            });

            return show;
        }),

    setEpisodeScore: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                episodeId: z.uuid(),
                score: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const episode = await ctx.prisma.episodeRating.create({
                data: {
                    user_id: input.userId,
                    episode_id: input.episodeId,
                    score: input.score,
                },
            });

            return episode;
        }),
});
