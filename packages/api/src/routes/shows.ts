import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const showRouter = router({
  getShows: publicProcedure.query(async ({ ctx }) => {
    const shows = await ctx.prisma.show.findMany();
    return { shows, user: ctx.user };
  }),

  getShowById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const show = await ctx.prisma.show.findUnique({
        where: { id: input },
      });
      return { show, user: ctx.user };
    }),
});
