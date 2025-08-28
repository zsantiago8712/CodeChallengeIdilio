import z from "zod";
import { Category } from "@prisma/client";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../../../packages/api/src/index";

export const categoryLabels = {
  [Category.ACTION]: "Action",
  [Category.COMEDY]: "Comedy",
  [Category.DRAMA]: "Drama",
  [Category.HORROR]: "Horror",
  [Category.ROMANCE]: "Romance",
  [Category.FANTASY]: "Fantasy",
  [Category.SCI_FI]: "Science Fiction",
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

export type Show = z.infer<typeof showSchema>;
export type Shows = inferProcedureOutput<
  AppRouter["shows"]["getShowsByCategory"]
>["shows"][number];
