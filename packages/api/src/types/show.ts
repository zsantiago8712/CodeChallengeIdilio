import { Category } from '@prisma/client';
import { inferProcedureOutput } from '@trpc/server';
import z from 'zod';
import { AppRouter } from '../../../../packages/api/src/index';

export const categoryLabels = {
    [Category.ACTION]: 'Action',
    [Category.COMEDY]: 'Comedy',
    [Category.DRAMA]: 'Drama',
    [Category.HORROR]: 'Horror',
    [Category.ROMANCE]: 'Romance',
    [Category.FANTASY]: 'Fantasy',
    [Category.SCI_FI]: 'Science Fiction',
};

export const showEpisondes = z.object({
    name: z.string(),
    description: z.string(),
    num_season: z.number(),
    num_episode: z.number(),
    duration: z.number(),
});

export const showSchema = z.object({
    name: z.string(),
    category: z.enum(Category),
    description: z.string(),
    num_seasons: z.number(),
    images: z.array(z.string()).optional(),
    episodes: z.array(showEpisondes).optional(),
});

export const getShowsSchema = z.object({
    category: z.enum(Category),
    limit: z.number().min(1).max(20).default(10),
    cursor: z.string().nullish().optional(),
});

export const getShowByIdSchema = z.object({
    id: z.uuid(),
});

export const setShowScoreSchema = z.object({
    show_id: z.uuid(),
    score: z.number().min(1).max(5),
});

export const setLikeShowSchema = z.object({
    show_id: z.uuid(),
});

export const getShowByTextSchema = z.object({
    text: z.string(),
});

export type GetShowId = z.infer<typeof getShowByIdSchema>;

export type Show = z.infer<typeof showSchema>;
export type Shows = inferProcedureOutput<AppRouter['shows']['getShowsByCategory']>['shows'][number];

export type ShowDetails = inferProcedureOutput<AppRouter['shows']['getShowById']>;
export type ShowDetailsEpisodes = ShowDetails['episodes'][number];

export type MyShows = inferProcedureOutput<AppRouter['shows']['getMyShows']>[number];

export type SearchShows = inferProcedureOutput<AppRouter['shows']['getShowsForSearch']>[number];
