import { useInfiniteQuery } from "@tanstack/react-query";

import { getBookmark } from "lib/api/bookmark";
import { BookmarkData } from "types/Auth";

const useInfinityFetchBookmark = (category: string, take = 5) => {
	return useInfiniteQuery<BookmarkData[], Error, { pages: BookmarkData[] }>({
		queryKey: ["bookmark", category],
		// @ts-ignore
		queryFn: ({ pageParam = 1 }: { pageParam: number }) => {
			return getBookmark(pageParam, take, category);
		},
		getNextPageParam: (lastPage, allPages) => {
			if (!lastPage || lastPage.length < take) return undefined;
			return allPages.length + 1;
		},
	});
};

export default useInfinityFetchBookmark;
