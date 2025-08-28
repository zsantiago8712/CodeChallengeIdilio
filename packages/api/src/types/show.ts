import z from "zod";
import { Category } from "@prisma/client";

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

export const getShowsSchema = showSchema.extend({
  limit: z.number().min(1).max(20).default(10),
  cursor: z.string().nullish().optional(),
});

export type Show = z.infer<typeof showSchema>;
