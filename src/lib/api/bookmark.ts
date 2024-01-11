import axios from "lib/axios";
import { BookmarkData } from "types/Auth";

interface bookmarkFormData {
	endpoint: string;
	url: string;
	title: string;
	category: string;
}

export const getBookmark = async (
	page: number,
	take: number,
	category: string
): Promise<BookmarkData[]> => {
	const params = new URLSearchParams({
		page: page.toString(),
		take: take.toString(),
		category: category.toString(),
	}).toString();

	const path = `/bookmarks?${params}`;

	const result = await axios.get(path);

	return result.data;
};

export const addBookmark = async (props: bookmarkFormData): Promise<void> => {
	const path = "/bookmarks";
	await axios.patch(path, props);
};

export const getTotalLengthCategory = async () => {
	const path = "/bookmarks/totalLength";
	const result = await axios.get(path);
	return result.data;
};
