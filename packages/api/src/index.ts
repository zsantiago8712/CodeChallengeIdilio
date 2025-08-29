import { router } from './trpc';
import { showRouter } from './routes/shows';

export const appRouter = router({
    shows: showRouter,
});

export type AppRouter = typeof appRouter;
