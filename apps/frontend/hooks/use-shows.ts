import { Category } from '@prisma/client';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '../_trpc/client';

interface CategoryShows {
    category: Category;
}

export const useShowsByCategory = ({ category }: CategoryShows) => {
    const trpc = useTRPC();

    const result = useInfiniteQuery({
        ...trpc.shows.getShowsByCategory.infiniteQueryOptions({ category, limit: 5 }),
        getNextPageParam: (last) => last.nextCursor,
        select: (data) => ({
            pages: data.pages,
            pageParams: data.pageParams,
            shows: data?.pages.flatMap((page) => page.shows) ?? [],
        }),
        staleTime: 5 * 60 * 1000,
    });

    return {
        data: result.data,
        isLoading: result.isLoading,
        error: result.error,
        refetch: result.refetch,
        fetchNextPage: result.fetchNextPage,
        hasNextPage: result.hasNextPage,
        isFetchingNextPage: result.isFetchingNextPage,
    };
};

export const useRefreshShows = () => {
    const queryClient = useQueryClient();
    return {
        refresh: () => {
            queryClient.invalidateQueries({ queryKey: ['shows'] });
        },
    };
};
