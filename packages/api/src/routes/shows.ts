import { publicProcedure, router } from "../trpc";
import { showSchema, getShowsSchema } from "../types/show";
import { z } from "zod";

export const showRouter = router({
  createShow: publicProcedure
    .input(showSchema)
    .mutation(async ({ ctx, input }) => {
      const show = await ctx.prisma.show.create({
        data: {
          name: input.name,
          category: input.category,
          description: input.description,
          num_seasons: input.num_seasons,
          images: input.images
            ? { create: input.images.map((image) => ({ url: image })) }
            : undefined,

          episodes: input.episodes
            ? {
                create: input.episodes.map((episode) => ({
                  name: episode.name,
                  description: episode.description,
                  num_season: episode.num_season,
                  num_episode: episode.num_episode,
                  duration: episode.duration,
                })),
              }
            : undefined,
        },
      });

      return show;
    }),

  getShowsForDisplay: publicProcedure
    .input(getShowsSchema)
    .query(async ({ ctx, input }) => {
      const shows = await ctx.prisma.show.findMany({
        take: input.limit,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        select: {
          id: true,
          name: true,
          description: true,
          num_seasons: true,
          images: {
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
      if (shows.length > input.limit) {
        const nextItem = shows.pop();
        nextCursor = nextItem!.id;
      }

      const showWithAvg = shows.map((show) => {
        const avg =
          show.showRatings.reduce((acc, rating) => acc + rating.score, 0) /
          show.showRatings.length;
        return {
          ...show,
          avg,
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
        images: {
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
      throw new Error("Show not found");
    }

    const showWithAvg = {
      ...show,
      score:
        (show.showRatings.reduce((acc, rating) => acc + rating.score, 0) ?? 0) /
        (show.showRatings.length ?? 1),
      episodes: show.episodes.map((episode) => {
        const avg =
          episode.episodeRatings.reduce(
            (acc, rating) => acc + rating.score,
            0,
          ) / episode.episodeRatings.length;
        return {
          ...episode,
          score: avg,
        };
      }),
    };

    return showWithAvg;
  }),

  getShowsForSearch: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
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
          images: {
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
      }),
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
      }),
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
