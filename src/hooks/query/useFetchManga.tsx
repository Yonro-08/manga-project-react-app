import { useQuery } from "@tanstack/react-query";

import { getMangaByEndpoint } from "lib/api/manga";

const useFetchManga = (endpoint: string = "") => {
	return useQuery({
		queryKey: ["manga", endpoint],
		queryFn: () => {
			return getMangaByEndpoint(endpoint);
		},
	});
};

export default useFetchManga;
