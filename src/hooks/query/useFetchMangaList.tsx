import { useQuery } from "@tanstack/react-query";

import { getMangaList } from "lib/api/manga";

const useFetchMangaList = () => {
	return useQuery({
		queryKey: ["mangaList"],
		queryFn: () => {
			return getMangaList();
		},
	});
};

export default useFetchMangaList;
