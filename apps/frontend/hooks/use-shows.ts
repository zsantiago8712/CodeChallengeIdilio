import { Category } from '@prisma/client';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useShowByID = (id: string) => {
    const trpc = useTRPC();

    const result = useQuery({
        ...trpc.shows.getShowById.queryOptions({ id }),
        staleTime: 5 * 60 * 1000,
    });

    return {
        data: result.data,
        isLoading: result.isLoading,
        error: result.error,
        refetch: result.refetch,
    };
};

export const useRefreshShows = () => {
    const queryClient = useQueryClient();
    return {
        refresh: () => {
            queryClient.invalidateQueries();
        },
    };
};

export const useSetLikeShow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.shows.setLikeShow.mutationOptions({
            onSuccess: () => {
                console.log('Show like success - invalidating queries...');

                queryClient.invalidateQueries();
            },

            onError: (error) => {
                console.error(error);
            },

            onSettled: () => {
                console.log('Like show settled');
            },
        })
    );
};

export const useDeleteLikeShow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.shows.deleteLikeShow.mutationOptions({
            onSuccess: () => {
                console.log('Show delike success - invalidating queries...');

                // Estrategia agresiva: invalidar y refetch
                queryClient.invalidateQueries();
            },

            onError: (error) => {
                console.error(error);
            },

            onSettled: () => {
                console.log('Delike show settled');
            },
        })
    );
};

export const useSetShowScore = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.shows.setShowScore.mutationOptions({
            onSuccess: () => {
                console.log('Show score success');
                // Invalidar todas las queries relacionadas con shows
                queryClient.invalidateQueries();
            },

            onError: (error) => {
                console.error(error);
            },

            onSettled: () => {
                console.log('Show score settled');
            },
        })
    );
};

export const useGetMyShows = () => {
    const trpc = useTRPC();

    const result = useQuery({
        ...trpc.shows.getMyShows.queryOptions(),
        staleTime: 5 * 60 * 1000,
    });

    return {
        data: result.data,
        isLoading: result.isLoading,
        error: result.error,
        refetch: result.refetch,
    };
};

export const useSearchShows = (searchTerm: string) => {
    const trpc = useTRPC();

    const result = useQuery({
        ...trpc.shows.getShowsForSearch.queryOptions({ text: searchTerm }),
        enabled: searchTerm.length > 0,
        staleTime: 5 * 60 * 1000,
    });

    return {
        data: result.data,
        isLoading: result.isLoading,
        error: result.error,
        refetch: result.refetch,
    };
};
