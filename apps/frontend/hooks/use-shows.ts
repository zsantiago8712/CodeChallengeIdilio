import { useTRPC } from '../_trpc/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Category } from '@prisma/client';

interface CategoryShows {
  category: Category;
}

export const useShowsByCategory = ({ category }: CategoryShows) => {
  const trpc = useTRPC();

  const result = useInfiniteQuery({
    ...trpc.shows.getShowsByCategory.infiniteQueryOptions({ category, limit: 2 }),
    getNextPageParam: (last) => last.nextCursor,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      shows: data?.pages.flatMap((page) => page.shows) ?? [],
    }),
    staleTime: 5 * 60 * 1000, // 5 minutos
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
