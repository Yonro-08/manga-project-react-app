import { useQuery } from "@tanstack/react-query";

import { getTotalLengthCategory } from "lib/api/bookmark";

const useFetchBookmarkTotalLength = () => {
	return useQuery({
		queryKey: ["bookmark", "totalLength"],
		queryFn: () => {
			return getTotalLengthCategory();
		},
	});
};

export default useFetchBookmarkTotalLength;
