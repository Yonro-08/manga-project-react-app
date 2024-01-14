import { useQuery } from "@tanstack/react-query";

import { getMangaList } from "lib/api/manga";

const useFetchMangaList = (category: string, limit?: number) => {
	return useQuery({
		queryKey: ["mangaList", category],
		queryFn: () => {
			return getMangaList(category, limit);
		},
	});
};

export default useFetchMangaList;
